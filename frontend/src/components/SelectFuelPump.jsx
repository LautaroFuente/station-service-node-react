import { useContext } from "react";
import PhotoPumpFuel from "../img/fuel-pump.png";
import { ClientContext } from "../contexts/ClientContext";
import { NavLink } from "react-router-dom";

function SelectFuelPump() {
  const { client } = useContext(ClientContext);
  const { name, last_name, token } = client;

  return (
    <>
      {token ? (
        <div>
          <h2>{`¡Hola ${name} ${last_name}!`}</h2>
          <h1>ELIGE EL SURTIDOR</h1>
          <div className="container-grid">
            <div className="grid-item">
              <div>
                <p>Surtidor 1</p>
                <img src={PhotoPumpFuel} alt="Surtidor" />
              </div>
            </div>
            <div className="grid-item">
              <div>
                <p>Surtidor 2</p>
                <img src={PhotoPumpFuel} alt="Surtidor" />
              </div>
            </div>
            <div className="grid-item">
              <div>
                <p>Surtidor 3</p>
                <img src={PhotoPumpFuel} alt="Surtidor" />
              </div>
            </div>
            <div className="grid-item">
              <div>
                <p>Surtidor 4</p>
                <img src={PhotoPumpFuel} alt="Surtidor" />
              </div>
            </div>
            <div className="grid-item">
              <div>
                <p>Surtidor 5</p>
                <img src={PhotoPumpFuel} alt="Surtidor" />
              </div>
            </div>
            <div className="grid-item">
              <div>
                <p>Surtidor 6</p>
                <img src={PhotoPumpFuel} alt="Surtidor" />
              </div>
            </div>
          </div>
          <NavLink to={"/"}>
            <button className="btn-back-home">Volver al inicio</button>
          </NavLink>
        </div>
      ) : (
        <div>
          <p>Sin acceso</p>
          <NavLink to={"/"}>
            <button className="btn-back-home">Volver al inicio</button>
          </NavLink>{" "}
        </div>
      )}
    </>
  );
}

export default SelectFuelPump;
