import PhotoProduct from "../img/product.png";
import PhotoPumpFuel from "../img/fuel-pump.png";
import PhotoPayMethod from "../img/pay-method.png";
import PhotoQuantity from "../img/quantity.png";
import { NavLink } from "react-router-dom";
import { PurchaseContext } from "../contexts/PurchaseContext";
import { ClientContext } from "../contexts/ClientContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ErrorMessage from "./ErrorMessage";

function OrderDescription() {
  const { purchase, resetPurchase } = useContext(PurchaseContext);
  const { client, resetClient } = useContext(ClientContext);
  const { name, last_name, token } = client;
  const navigate = useNavigate();

  const [formErrorServer, setFormErrorServer] = useState(false);

  const fetchPurchase = async () => {
    let dataPurchase = {
      client: purchase.client,
      employed: purchase.employed,
      purchase_date: purchase.purchase_date,
      description: `${purchase.description.surtidor}, ${purchase.description.producto}, ${purchase.description.metodo_pago}, ${purchase.description.total}, ${purchase.description.litros}`,
      total_amount: purchase.total_amount,
    };

    try {
      const response = await fetch("http://localhost:3000/server/purchases/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataPurchase),
      });

      if (!response.ok) {
        throw new Error("Error al agregar");
      }
      const data = await response.json();
      console.log("Agregado con exito:", data);
    } catch (error) {
      console.error("Error:", error);
      setFormErrorServer(true);
    }
  };

  const handleClickSubmit = () => {
    console.log(purchase);
    console.log("Fin Compra");
    fetchPurchase();
    resetClient();
    resetPurchase();
    navigate("/");
  };

  return (
    <>
      {token ? (
        <div>
          <h1>¡Compra Terminada!</h1>
          <h2>Resumen del pedido:</h2>
          <div className="container-grid">
            <div className="grid-item">
              <div>
                <p>{purchase.description.surtidor}</p>
                <img src={PhotoPumpFuel} alt="Surtidor" />
              </div>
            </div>
            <div className="grid-item">
              <div>
                <p>{purchase.description.producto}</p>
                <img src={PhotoProduct} alt="Gasolina" />
              </div>
            </div>
            <div className="grid-item">
              <div>
                <p>{purchase.description.metodo_pago}</p>
                <img src={PhotoPayMethod} alt="Metodo de Pago" />
              </div>
            </div>
            <div className="grid-item">
              <div>
                <p>{purchase.description.litros}</p>
                <img src={PhotoQuantity} alt="Cantidad" />
              </div>
            </div>
          </div>
          <h2>{`${purchase.description.total} a nombre de ${name} ${last_name}`}</h2>
          {formErrorServer && (
            <ErrorMessage message="Error con el servidor"></ErrorMessage>
          )}
          <div className="container-content">
            <button className="btn-accept" onClick={handleClickSubmit}>
              Aceptar compra y finalizar
            </button>
            <NavLink to={"/"}>
              <button className="btn-back-home">Volver al inicio</button>
            </NavLink>
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

export default OrderDescription;
