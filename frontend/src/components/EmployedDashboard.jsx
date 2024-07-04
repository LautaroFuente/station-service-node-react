import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { EmployedContext } from "../contexts/EmployedContext";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";

function EmployedDashboard() {
  const { employed, resetEmployed } = useContext(EmployedContext);
  const { token } = employed;
  const navigate = useNavigate();

  const [clients, setClients] = useState([]);
  const [error, setError] = useState({ state: false, message: "" });

  const handleLogout = () => {
    resetEmployed();
    navigate("/");
  };

  const fetchClients = async () => {
    try {
      const response = await fetch("http://localhost:3000/server/clients/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al cargar todos los clientes");
      }
      const data = await response.json();
      setError({ state: false, message: "" });
      return data;
    } catch (error) {
      console.log(error);
      setError({ state: true, message: "Error al cargar todos los clientes" });
    }
  };

  const handleViewClients = async () => {
    const clients = await fetchClients();
    setClients(clients);
  };

  return (
    <>
      {token ? (
        <div>
          <h1>Panel Empleados</h1>
          <ul className="panel">
            <li className="panel-item">
              <button>Alta de Empleado</button>
            </li>
            <li className="panel-item">
              <button>Baja de empleado</button>
            </li>
            <li className="panel-item">
              <button onClick={handleViewClients}>Ver Clientes</button>
            </li>
            <li className="panel-item">
              <button>Opcion</button>
            </li>
          </ul>
          <div className="container-content">
            {clients.length > 0 &&
              clients.map((client) => {
                return (
                  <div
                    key={client.dni}
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      border: "solid 2px black",
                    }}
                  >
                    <h4>{`Cliente: ${client.client_id}`}</h4>
                    <h4>{`Apellido: ${client.last_name}`}</h4>
                    <h4>{`Nombre: ${client.name}`}</h4>
                    <h4>{`DNI: ${client.dni}`}</h4>
                    <h4>{`Edad: ${client.age}`}</h4>
                  </div>
                );
              })}
          </div>
          {error.state && <ErrorMessage message={error.message}></ErrorMessage>}
          <div className="container-content">
            <NavLink to={"/"}>
              <button className="btn-back-home">Volver al inicio</button>
            </NavLink>
            <button className="btn-back-home" onClick={handleLogout}>
              Cerrar sesion
            </button>
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
