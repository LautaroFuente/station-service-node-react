import { useState, useEffect } from "react";

const dataForPage = 10;

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
      const response = await fetch("http://localhost:3000/server/purchases/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al cargar todas las compras");
      }
      const data = await response.json();
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
      {currentData.length > 0 &&
        currentData.map((purchases, index) => {
          return (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                border: "solid 2px black",
              }}
            >
              <h4>{`Fecha: ${purchases.purchase_date}`}</h4>
              <h4>{`Monto: ${purchases.total_amount}`}</h4>
              <h4>{`Descripcion: ${purchases.description}`}</h4>
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
