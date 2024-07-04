import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { EmployedContext } from "../contexts/EmployedContext";

function EmployedDashboard() {
  const { employed } = useContext(EmployedContext);
  const { token } = employed;

  return (
    <>
      {token ? (
        <div>
          <p>panel empleados</p>
          <ul>
            <li>Opcion del panel numero 1</li>
            <li>Opcion del panel numero 2</li>
            <li>Opcion del panel numero 3</li>
            <li>Opcion del panel numero 4</li>
          </ul>
          <div className="container-content">
            <NavLink to={"/"}>
              <button className="btn-back-home">Volver al inicio</button>
            </NavLink>
            <button className="btn-back-home">Cerrar sesion</button>
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

export default EmployedDashboard;
