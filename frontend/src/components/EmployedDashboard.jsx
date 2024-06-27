import { NavLink } from "react-router-dom";

function EmployedDashboard() {
  return (
    <>
      <p>panel empleados</p>{" "}
      <NavLink to={"/"}>
        <button className="btn-back-home">Volver al inicio</button>
      </NavLink>
    </>
  );
}

export default EmployedDashboard;
