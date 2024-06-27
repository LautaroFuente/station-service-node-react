import PhotoProduct from "../img/product.png";
import { NavLink } from "react-router-dom";

function SelectFuelProduct() {
  return (
    <>
      <h1>ELIGE EL PRODUCTO</h1>
      <div className="container-grid">
        <div className="grid-item">
          <div>
            <p>Tipo Gasolina 1</p>
            <img src={PhotoProduct} alt="Tipo Gasolina" />
          </div>
        </div>
        <div className="grid-item">
          <div>
            <p>Tipo Gasolina 2</p>
            <img src={PhotoProduct} alt="Tipo Gasolina" />
          </div>
        </div>
        <div className="grid-item">
          <div>
            <p>Tipo Gasolina 3</p>
            <img src={PhotoProduct} alt="Tipo Gasolina" />
          </div>
        </div>
        <div className="grid-item">
          <div>
            <p>Tipo Gasolina 4</p>
            <img src={PhotoProduct} alt="Tipo Gasolina" />
          </div>
        </div>
      </div>
      <NavLink to={"/"}>
        <button className="btn-back-home">Volver al inicio</button>
      </NavLink>
    </>
  );
}

export default SelectFuelProduct;
