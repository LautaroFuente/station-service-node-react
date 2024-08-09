import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { EmployedContext } from "../contexts/EmployedContext";
import { useParams } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";

const dataForPage = 10;

function OneEmployedView() {
  const { employed } = useContext(EmployedContext);
  const { token } = employed;
  const navigate = useNavigate();
  let { dni } = useParams();
  const [employedData, setEmployedData] = useState([]);
  const [errorDataEmployed, setErrorDataEmployed] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(employedData.length / dataForPage);

  const currentData = employedData.slice(
    currentPage * dataForPage,
    currentPage * dataForPage + dataForPage
  );

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const fetchOneEmployed = async () => {
    try {
      let response = await fetch(
        `http://localhost:3000/server/purchases/employed/${dni}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let data = await response.json();
      setEmployedData(data);
    } catch (error) {
      console.log(`Error al traer las compras del cliente, error: ${error} `);
      setErrorDataEmployed(true);
    }
  };

  useEffect(() => {
    fetchOneEmployed();
  }, []);

  const handleBack = () => {
    navigate("/employed-dashboard");
  };

  return (
    <>
      {token ? (
        <div>
          <h1>{`Compras a cargo del empleado DNI: ${dni}`}</h1>
          {errorDataEmployed ? (
            <ErrorMessage
              message={
                "Error con el servidor al cargar compras a cargo del empleado"
              }
            />
          ) : (
            <div>
              {employedData.map((purchase, index) => {
                return (
                  <div
                    key={{ index }}
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      border: "solid 2px black",
                    }}
                  >
                    <h4>{`Apellido: ${purchase.last_name}`}</h4>
                    <h4>{`Nombre: ${purchase.name}`}</h4>
                    <h4>{`Fecha: ${purchase.purchase_date}`}</h4>
                    <h4>{`Total: ${purchase.total_amount}`}</h4>
                    <h4>{`Descripcion: ${purchase.description}`}</h4>
                  </div>
                );
              })}
            </div>
          )}
          <div>
            <button onClick={handlePrevPage} disabled={currentPage === 0}>
              Anterior
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
            >
              Siguiente
            </button>
          </div>
          <p>
            Pagina {currentPage + 1} de {totalPages}
          </p>
          <div className="container-content">
            <button className="btn-back-home" onClick={handleBack}>
              Volver atras
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h1>Debes iniciar sesion</h1>
          <div className="container-content">
            <NavLink to={"/"}>
              <button className="btn-back-home">Volver al inicio</button>
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
}

export default OneEmployedView;
