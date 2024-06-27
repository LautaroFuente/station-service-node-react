import { NavLink } from "react-router-dom";

function EmployedDashboard() {
  return (
    <>
      <p>panel empleados</p>{" "}
      <div className="container-content">
        <NavLink to={"/"}>
          <button className="btn-back-home">Volver al inicio</button>
        </NavLink>
      </div>
    </>
  );
}

export default EmployedDashboard;
