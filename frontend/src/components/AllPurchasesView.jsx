import { useState, useEffect } from "react";
import { fetchGeneric } from "../helpers/fetchGeneric";

const dataForPage = 10;
const apiUrl = import.meta.env.VITE_API_URL;
const urlAllPurchases = `${apiUrl}/purchases/`;

function AllPurchaseView({ token, setError }) {
  const [purchases, setPurchases] = useState([]);
  const [filteredPurchases, setFilteredPurchases] = useState([]);
  const [inputFrom, setInputFrom] = useState("");
  const [inputTo, setInputTo] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(filteredPurchases.length / dataForPage);

  const currentData = filteredPurchases.slice(
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

  const fetchPurchase = async () => {
    try {
      const data = await fetchGeneric(urlAllPurchases, "GET", {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      });

      if (data == null) {
        throw new Error("Error al cargar todas las compras");
      }

      setPurchases(data);
      setFilteredPurchases(data);
      setError({ state: false, message: "" });
    } catch (error) {
      console.log(error);
      setError({ state: true, message: "Error al cargar todas las compras" });
    }
  };

  useEffect(() => {
    fetchPurchase();
  }, []);

  useEffect(() => {
    if (inputFrom != "" && inputTo != "") {
      const from = new Date(inputFrom);
      const to = new Date(inputTo);
      const filterData = purchases.filter((purchase) => {
        let date = new Date(purchase.purchase_date);
        if (date >= from && date <= to) return purchase;
      });
      setFilteredPurchases(filterData);
    } else {
      setFilteredPurchases(purchases);
    }
  }, [inputFrom, inputTo]);

  const handleInputFrom = (e) => {
    setInputFrom(e.target.value);
  };

  const handleInputTo = (e) => {
    setInputTo(e.target.value);
  };

  return (
    <div className="container-content">
      <div>
        <h3>Filtrar por fechas</h3>
        <div style={{ display: "flex", gap: "1rem" }}>
          <div>
            <p>DESDE</p>
            <input type="date" onChange={handleInputFrom} />
          </div>
          <div>
            <p>HASTA</p>
            <input type="date" onChange={handleInputTo} />
          </div>
        </div>
      </div>
      {currentData.map((purchases, index) => {
        return (
          <div key={index} className="data-card">
            <div className="data-info">
              <p>
                <strong>Fecha:</strong> {purchases.purchase_date}
              </p>
              <p>
                <strong>Monto:</strong> {purchases.total_amount}
              </p>
              <p>
                <strong>Descripción:</strong> {purchases.description}
              </p>
            </div>
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

export default AllPurchaseView;
