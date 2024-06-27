import PhotoProduct from "../img/product.png";
import PhotoPumpFuel from "../img/fuel-pump.png";
import PhotoPayMethod from "../img/pay-method.png";
import PhotoQuantity from "../img/quantity.png";
import { NavLink } from "react-router-dom";
import { PurchaseContext } from "../contexts/PurchaseContext";
import { ClientContext } from "../contexts/ClientContext";
import { useContext } from "react";

function OrderDescription() {
  const { purchase } = useContext(PurchaseContext);
  const { client } = useContext(ClientContext);
  const { name, last_name, token } = client;

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
          <div className="container-content">
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
