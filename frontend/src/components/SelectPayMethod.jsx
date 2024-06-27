import PhotoCard from "../img/credit-card.png";
import PhotoCash from "../img/cash.png";
import { NavLink } from "react-router-dom";

function SelectPayMethod() {
  return (
    <>
      <h1>ELIGE METODO DE PAGO</h1>
      <div className="container-grid">
        <div className="grid-item">
          <div>
            <p>Efectivo</p>
            <img src={PhotoCard} alt="Efectivo" />
          </div>
        </div>
        <div className="grid-item">
          <div>
            <p>Tarjeta</p>
            <img src={PhotoCash} alt="Tarjeta" />
          </div>
        </div>
      </div>
      <NavLink to={"/"}>
        <button className="btn-back-home">Volver al inicio</button>
      </NavLink>
    </>
  );
}

export default SelectPayMethod;
