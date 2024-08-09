import { useContext } from "react";
import PhotoPumpFuel from "../img/fuel-pump.png";
import { ClientContext } from "../contexts/ClientContext";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { PurchaseContext } from "../contexts/PurchaseContext";
import { createDate } from "../helpers/createDate";

function SelectFuelPump() {
  const { state } = useContext(ClientContext);
  const { client_id, name, last_name, token } = state;
  const navigate = useNavigate();
  const { purchase, setPurchase } = useContext(PurchaseContext);

  const handleClick = (num) => {
    const date = createDate();
    setPurchase({
      ...purchase,
      client: client_id,
      employed: 1,
      purchase_date: date,
      description: { ...purchase.description, surtidor: `Surtidor ${num}` },
    });
    navigate("/fuel");
  };

  return (
    <>
      {token ? (
        <div>
          <h2>{`¡Hola ${name} ${last_name}!`}</h2>
          <h1>ELIGE EL SURTIDOR</h1>
          <div className="container-grid">
            <div className="grid-item" onClick={() => handleClick(1)}>
              <div>
                <p>Surtidor 1</p>
                <img src={PhotoPumpFuel} alt="Surtidor" />
              </div>
            </div>
            <div className="grid-item" onClick={() => handleClick(2)}>
              <div>
                <p>Surtidor 2</p>
                <img src={PhotoPumpFuel} alt="Surtidor" />
              </div>
            </div>
            <div className="grid-item" onClick={() => handleClick(3)}>
              <div>
                <p>Surtidor 3</p>
                <img src={PhotoPumpFuel} alt="Surtidor" />
              </div>
            </div>
            <div className="grid-item" onClick={() => handleClick(4)}>
              <div>
                <p>Surtidor 4</p>
                <img src={PhotoPumpFuel} alt="Surtidor" />
              </div>
            </div>
            <div className="grid-item" onClick={() => handleClick(5)}>
              <div>
                <p>Surtidor 5</p>
                <img src={PhotoPumpFuel} alt="Surtidor" />
              </div>
            </div>
            <div className="grid-item" onClick={() => handleClick(6)}>
              <div>
                <p>Surtidor 6</p>
                <img src={PhotoPumpFuel} alt="Surtidor" />
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

export default SelectFuelPump;
