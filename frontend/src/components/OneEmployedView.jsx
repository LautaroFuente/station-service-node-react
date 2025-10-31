import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { EmployedContext } from "../contexts/EmployedContext";
import { useParams } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import { fetchGeneric } from "../helpers/fetchGeneric";

const dataForPage = 10;
const apiUrl = import.meta.env.VITE_API_URL;

function OneEmployedView() {
  const { stateEmployed } = useContext(EmployedContext);
  const { token } = stateEmployed;
  const navigate = useNavigate();
  let { dni } = useParams();
  const [employedData, setEmployedData] = useState([]);
  const [errorDataEmployed, setErrorDataEmployed] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(employedData.length / dataForPage);

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
      const data = await fetchGeneric(
        `${apiUrl}/purchases/employed/${dni}`,
        "GET",
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      );
      console.log(data);
      setEmployedData(data || []);
    } catch (error) {
      console.log(
        `Error al traer las compras a cargo del empleado , error: ${error} `
      );
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
                  <div key={index} className="data-card">
                    <div className="data-info">
                      <p>
                        <strong>Apellido:</strong> {purchase.last_name}
                      </p>
                      <p>
                        <strong>Nombre:</strong> {purchase.name}
                      </p>
                      <p>
                        <strong>Fecha:</strong> {purchase.purchase_date}
                      </p>
                      <p>
                        <strong>Total:</strong> {purchase.total_amount}
                      </p>
                      <p>
                        <strong>Descripción:</strong> {purchase.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div
            style="
    display: flex;
    justify-content: center;
"
          >
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
          <p
            style="
    display: flex;
    justify-content: center;
"
          >
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
