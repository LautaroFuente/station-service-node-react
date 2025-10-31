import cursor from "../img/cursor.png";
import red_button from "../img/red-button.png";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();

  const handleClickNavigate = (url) => {
    navigate(url);
  };

  return (
    <div className="home-container">
      <main className="home-content">
        <button
          className="home-btn"
          onClick={() => handleClickNavigate("/register-client")}
        >
          <div className="home-btn-text">
            <h2>¿Cliente Nuevo?</h2>
            <p>Pulsa aquí</p>
          </div>
          <img src={cursor} alt="cursor icon" className="home-btn-icon" />
        </button>

        <button
          className="home-btn"
          onClick={() => handleClickNavigate("/login-client")}
        >
          <div className="home-btn-text">
            <h2>¿Ya sos Cliente?</h2>
            <p>Pulsa aquí</p>
          </div>
          <img src={cursor} alt="cursor icon" className="home-btn-icon" />
        </button>

        <NavLink to={"/login-employed"} style={{ display: "contents" }}>
          <button className="home-btn home-btn-red">
            <h4>Identificarse como empleado</h4>
            <img src={red_button} alt="botón rojo" className="home-red-icon" />
          </button>
        </NavLink>
      </main>
    </div>
  );
}

export default Home;
