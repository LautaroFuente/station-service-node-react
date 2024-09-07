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
import { fetchGeneric } from "../helpers/fetchGeneric";

function OrderDescription() {
  const { statePurchase, dispatchPurchase } = useContext(PurchaseContext);
  const { stateClient, dispatchClient } = useContext(ClientContext);
  const { name, last_name, token } = stateClient;
  const navigate = useNavigate();

  const [formErrorServer, setFormErrorServer] = useState(false);

  const fetchPurchase = async () => {
    let dataPurchase = {
      client: statePurchase.client,
      employed: statePurchase.employed,
      purchase_date: statePurchase.purchase_date,
      description: `${statePurchase.description.surtidor}, ${statePurchase.description.producto}, ${statePurchase.description.metodo_pago}, ${statePurchase.description.total}, ${statePurchase.description.litros}`,
      total_amount: statePurchase.total_amount,
    };

    try {
      const data = await fetchGeneric(
        "http://localhost:3000/server/purchases/",
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        JSON.stringify(dataPurchase)
      );

      if (data == null) {
        throw new Error("Error al agregar");
      }
      console.log("Agregado con exito:", data);
    } catch (error) {
      console.error("Error:", error);
      setFormErrorServer(true);
    }
  };

  const handleClickSubmit = () => {
    console.log("Fin Compra");
    fetchPurchase();
    dispatchClient({ type: "RESET_CLIENT" });
    dispatchPurchase({ type: "RESET_PURCHASE" });
    navigate("/");
  };

  const handleLogout = () => {
    dispatchClient({ type: "RESET_CLIENT" });
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
                <p>{statePurchase.description.surtidor}</p>
                <img src={PhotoPumpFuel} alt="Surtidor" />
              </div>
            </div>
            <div className="grid-item">
              <div>
                <p>{statePurchase.description.producto}</p>
                <img src={PhotoProduct} alt="Gasolina" />
              </div>
            </div>
            <div className="grid-item">
              <div>
                <p>{statePurchase.description.metodo_pago}</p>
                <img src={PhotoPayMethod} alt="Metodo de Pago" />
              </div>
            </div>
            <div className="grid-item">
              <div>
                <p>{statePurchase.description.litros}</p>
                <img src={PhotoQuantity} alt="Cantidad" />
              </div>
            </div>
          </div>
          <h2>{`${statePurchase.description.total} a nombre de ${name} ${last_name}`}</h2>
          {formErrorServer && (
            <ErrorMessage message="Error con el servidor"></ErrorMessage>
          )}
          <div className="container-content">
            <button className="btn-accept" onClick={handleClickSubmit}>
              Aceptar compra y finalizar
            </button>
            <NavLink to={"/"}>
              <button className="btn-back-home" onClick={handleLogout}>
                Volver al inicio
              </button>
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
