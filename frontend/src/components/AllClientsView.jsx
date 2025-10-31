import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchGeneric } from "../helpers/fetchGeneric";

const dataForPage = 10;
const apiUrl = import.meta.env.VITE_API_URL;
const urlAllClients = `${apiUrl}/clients/`;

function AllClientsView({ token, setError }) {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(filteredClients.length / dataForPage);

  const currentData = filteredClients.slice(
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

  const fetchClients = async () => {
    try {
      const data = await fetchGeneric(urlAllClients, "GET", {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      });

      if (data == null) {
        throw new Error("Error al cargar todos los clientes");
      }
      setClients(data);
      setFilteredClients(data);
      setError({ state: false, message: "" });
    } catch (error) {
      console.log(error);
      setError({ state: true, message: "Error al cargar todos los clientes" });
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    const filterData = clients.filter((client) => {
      if (client.dni.toString().includes(inputSearch)) return client;
    });
    setFilteredClients(filterData);
  }, [inputSearch]);

  const handleInputSearch = (e) => {
    setInputSearch(e.target.value);
  };

  const handleClickViewPurchases = (dni) => {
    navigate(`/one-client/${dni}`);
  };

  return (
    <div className="container-content">
      <div>
        <h3>Buscar cliente por dni</h3>
        <input
          type="text"
          placeholder="Escribe DNI"
          onChange={handleInputSearch}
        />
      </div>
      {currentData.length > 0 &&
        currentData.map((client) => {
          return (
            <div key={client.dni} className="data-card">
              <div className="data-info">
                <p>
                  <strong>ID:</strong> {client.client_id}
                </p>
                <p>
                  <strong>Apellido:</strong> {client.last_name}
                </p>
                <p>
                  <strong>Nombre:</strong> {client.name}
                </p>
                <p>
                  <strong>DNI:</strong> {client.dni}
                </p>
                <p>
                  <strong>Edad:</strong> {client.age}
                </p>
              </div>
              <button
                className="data-btn"
                onClick={() => handleClickViewPurchases(client.dni)}
              >
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

export default AllClientsView;
