import cursor from "../img/cursor.png";
import red_button from "../img/red-button.png";
import { NavLink } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="container-content">
        <button className="btn">
          <NavLink to={"/register-client"}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <h2>Cliente Nuevo?</h2>
              <p>Pulsa aquí!</p>
            </div>
            <img src={cursor} alt="icono de cursor" />
          </NavLink>
        </button>

        <button className="btn">
          <NavLink to={"/login-client"}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <h2>Ya sos Cliente?</h2>
              <p>Pulsa aquí!</p>
            </div>
            <img src={cursor} alt="icono de cursor" />
          </NavLink>
        </button>

        <button className="btn btn-red">
          <NavLink to={"/login-employed"}>
            <h4>Identificarse como empleado</h4>
            <img src={red_button} alt="icono de boton rojo" />
          </NavLink>
        </button>
      </div>
    </>
  );
}

export default Home;
