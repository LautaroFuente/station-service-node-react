import PhotoCard from "../img/credit-card.png";
import PhotoCash from "../img/cash.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { PurchaseContext } from "../contexts/PurchaseContext";
import { ClientContext } from "../contexts/ClientContext";
import { useContext } from "react";

function SelectPayMethod() {
  const navigate = useNavigate();
  const { purchase, setPurchase } = useContext(PurchaseContext);
  const { client } = useContext(ClientContext);
  const { token } = client;

  const handleClick = (method) => {
    setPurchase({
      ...purchase,
      description: {
        ...purchase.description,
        metodo_pago: `Metodo de pago ${method}`,
      },
    });
    navigate("/amount");
  };

  return (
    <>
      {token ? (
        <div>
          <h1>ELIGE METODO DE PAGO</h1>
          <div className="container-grid">
            <div className="grid-item" onClick={() => handleClick(`Efectivo`)}>
              <div>
                <p>Efectivo</p>
                <img src={PhotoCard} alt="Efectivo" />
              </div>
            </div>
            <div className="grid-item" onClick={() => handleClick(`Tarjeta`)}>
              <div>
                <p>Tarjeta</p>
                <img src={PhotoCash} alt="Tarjeta" />
              </div>
            </div>
          </div>
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

export default SelectPayMethod;
