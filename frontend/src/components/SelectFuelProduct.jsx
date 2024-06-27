import PhotoProduct from "../img/product.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { PurchaseContext } from "../contexts/PurchaseContext";
import { ClientContext } from "../contexts/ClientContext";
import { useContext } from "react";

function SelectFuelProduct() {
  const navigate = useNavigate();
  const { purchase, setPurchase } = useContext(PurchaseContext);
  const { client } = useContext(ClientContext);
  const { token } = client;

  const handleClick = (product) => {
    setPurchase({
      description: { ...purchase.description, producto: `Producto ${product}` },
    });
    navigate("/pay");
  };

  return (
    <>
      {token ? (
        <div>
          <h1>ELIGE EL PRODUCTO</h1>
          <div className="container-grid">
            <div
              className="grid-item"
              onClick={() => handleClick(`Gasolina 1`)}
            >
              <div>
                <p>Tipo Gasolina 1</p>
                <img src={PhotoProduct} alt="Tipo Gasolina" />
              </div>
            </div>
            <div
              className="grid-item"
              onClick={() => handleClick(`Gasolina 2`)}
            >
              <div>
                <p>Tipo Gasolina 2</p>
                <img src={PhotoProduct} alt="Tipo Gasolina" />
              </div>
            </div>
            <div
              className="grid-item"
              onClick={() => handleClick(`Gasolina 3`)}
            >
              <div>
                <p>Tipo Gasolina 3</p>
                <img src={PhotoProduct} alt="Tipo Gasolina" />
              </div>
            </div>
            <div
              className="grid-item"
              onClick={() => handleClick(`Gasolina 4`)}
            >
              <div>
                <p>Tipo Gasolina 4</p>
                <img src={PhotoProduct} alt="Tipo Gasolina" />
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

export default SelectFuelProduct;
