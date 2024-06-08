import cursor from "../img/cursor.png";
import red_button from "../img/red-button.png";

function Home() {
  return (
    <>
      <div className="container-content">
        <button className="btn">
          <a href="/register-client">
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
          </a>
        </button>

        <button className="btn">
          <a href="/login-client">
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
          </a>
        </button>

        <button className="btn btn-red">
          <a href="/login-employed">
            <h4>Identificarse como empleado</h4>
            <img src={red_button} alt="icono de boton rojo" />
          </a>
        </button>
      </div>
    </>
  );
}

export default Home;
