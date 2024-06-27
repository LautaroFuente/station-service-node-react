import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { PurchaseContext } from "../contexts/PurchaseContext";
import { ClientContext } from "../contexts/ClientContext";
import { createRef, useContext } from "react";

function EnterAmount() {
  const navigate = useNavigate();
  const { purchase, setPurchase } = useContext(PurchaseContext);
  const { client } = useContext(ClientContext);
  const { token } = client;
  const refDisplay = createRef();

  const handleClickSubmit = (amount) => {
    const amountNumber = Number(amount);
    setPurchase({
      description: {
        ...purchase.description,
        total: `Costo ${amountNumber}`,
        litros: `Litros ${amountNumber / 10}`,
      },
      total_amount: amountNumber,
    });
    navigate("/description");
  };

  const handleClickButton = (value) => {
    if (value === -1) {
      refDisplay.current.innerText = "";
    } else {
      refDisplay.current.innerText = refDisplay.current.innerText + value;
    }
  };

  return (
    <>
      {token ? (
        <div>
          <h1>INGRESE EL IMPORTE A SUMINISTRAR</h1>
          <div className="display" ref={refDisplay}></div>
          <div className="grid-numeric">
            <div className="grid-number" onClick={() => handleClickButton(1)}>
              1
            </div>
            <div className="grid-number" onClick={() => handleClickButton(2)}>
              2
            </div>
            <div className="grid-number" onClick={() => handleClickButton(3)}>
              3
            </div>
            <div className="grid-number" onClick={() => handleClickButton(4)}>
              4
            </div>
            <div className="grid-number" onClick={() => handleClickButton(5)}>
              5
            </div>
            <div className="grid-number" onClick={() => handleClickButton(6)}>
              6
            </div>
            <div className="grid-number" onClick={() => handleClickButton(7)}>
              7
            </div>
            <div className="grid-number" onClick={() => handleClickButton(8)}>
              8
            </div>
            <div className="grid-number" onClick={() => handleClickButton(9)}>
              9
            </div>
            <div className="grid-number" onClick={() => handleClickButton(0)}>
              0
            </div>
            <div
              className="grid-number"
              onClick={() => handleClickButton(-1)}
              id="grid-delete"
            >
              Borrar
            </div>
          </div>
          <div className="container-content">
            <button
              className="btn-accept"
              onClick={() => handleClickSubmit(refDisplay.current.innerText)}
            >
              ACEPTAR
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

export default EnterAmount;
