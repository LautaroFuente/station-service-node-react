import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const dataForPage = 10;

function AllEmployedView({ token, setError }) {
  const [employed, setEmployed] = useState([]);
  const [filteredEmployed, setFilteredEmployed] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(filteredEmployed.length / dataForPage);

  const currentData = filteredEmployed.slice(
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

  const fetchEmployed = async () => {
    try {
      const response = await fetch("http://localhost:3000/server/employeds/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al cargar todos los empleados");
      }
      const data = await response.json();
      setEmployed(data);
      setFilteredEmployed(data);
      setError({ state: false, message: "" });
    } catch (error) {
      console.log(error);
      setError({ state: true, message: "Error al cargar todos los empleados" });
    }
  };

  useEffect(() => {
    fetchEmployed();
  }, []);

  useEffect(() => {
    const filterData = employed.filter((employed) => {
      if (employed.dni.toString().includes(inputSearch)) return employed;
    });
    setFilteredEmployed(filterData);
  }, [inputSearch]);

  const handleInputSearch = (e) => {
    setInputSearch(e.target.value);
  };

  const handleClickViewPurchases = (dni) => {
    navigate(`/one-employed/${dni}`);
  };

  return (
    <div className="container-content">
      <div>
        <h3>Buscar empleado por dni</h3>
        <input
          type="text"
          placeholder="Escribe DNI"
          onChange={handleInputSearch}
        />
      </div>
      {currentData.length > 0 &&
        currentData.map((employed) => {
          return (
            <div
              key={employed.dni}
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                border: "solid 2px black",
              }}
            >
              <h4>{`Empleado: ${employed.employed_id}`}</h4>
              <h4>{`Apellido: ${employed.last_name}`}</h4>
              <h4>{`Nombre: ${employed.name}`}</h4>
              <h4>{`DNI: ${employed.dni}`}</h4>
              <button onClick={() => handleClickViewPurchases(employed.dni)}>
                Ver Compras
              </button>
            </div>
          );
        })}
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
    </div>
  );
}

export default AllEmployedView;
