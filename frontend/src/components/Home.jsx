import cursor from "../img/cursor.png";
import red_button from "../img/red-button.png";
import { NavLink, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleClickNavigate = (url) => {
    navigate(url);
  };

  return (
    <>
      <div className="container-content">
        <button
          className="btn"
          onClick={() => handleClickNavigate("/register-client")}
        >
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
        </button>
        <button
          className="btn"
          onClick={() => handleClickNavigate("/login-client")}
        >
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
        </button>

        <NavLink to={"/login-employed"} style={{ display: "contents" }}>
          <button className="btn btn-red">
            <h4>Identificarse como empleado</h4>
            <img src={red_button} alt="icono de boton rojo" />
          </button>
        </NavLink>
      </div>
    </>
  );
}

export default Home;
