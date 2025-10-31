import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchGeneric } from "../helpers/fetchGeneric";
import "../styles/TableCards.css";

const dataForPage = 10;
const apiUrl = import.meta.env.VITE_API_URL;
const urlAllEmployed = `${apiUrl}/employeds/`;

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
      const data = await fetchGeneric(urlAllEmployed, "GET", {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      });

      if (data == null) {
        throw new Error("Error al cargar todos los empleados");
      }
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
        currentData.map((employed) => (
          <div key={employed.dni} className="data-card">
            <div className="data-info">
              <p>
                <strong>ID:</strong> {employed.employed_id}
              </p>
              <p>
                <strong>Apellido:</strong> {employed.last_name}
              </p>
              <p>
                <strong>Nombre:</strong> {employed.name}
              </p>
              <p>
                <strong>DNI:</strong> {employed.dni}
              </p>
            </div>
            <button
              className="data-btn"
              onClick={() => handleClickViewPurchases(employed.dni)}
            >
              Ver Compras
            </button>
          </div>
        ))}

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
