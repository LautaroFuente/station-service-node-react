import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { EmployedContext } from "../contexts/EmployedContext";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import AllClientsView from "./AllClientsView";
import AllEmployedView from "./AllEmployedView";
import AllPurchaseView from "./AllPurchasesView";
import AddEmployedForm from "./AddEmployedForm";

function EmployedDashboard() {
  const { employed, resetEmployed } = useContext(EmployedContext);
  const { token } = employed;
  const navigate = useNavigate();

  const [viewClients, setViewClients] = useState(false);
  const [viewEmployed, setViewEmployed] = useState(false);
  const [viewPurchase, setViewPurchase] = useState(false);
  const [viewAddEmployed, setViewAddEmployed] = useState(false);
  const [error, setError] = useState({ state: false, message: "" });

  const handleLogout = () => {
    resetEmployed();
    navigate("/");
  };

  const resetOptions = () => {
    setViewAddEmployed(false);
    setViewClients(false);
    setViewEmployed(false);
    setViewPurchase(false);
  };

  const handleViewAddEmployed = () => {
    resetOptions();
    setViewAddEmployed(true);
  };

  const handleViewPurchase = () => {
    resetOptions();
    setViewPurchase(true);
  };

  const handleViewEmployed = () => {
    resetOptions();
    setViewEmployed(true);
  };

  const handleViewClients = () => {
    resetOptions();
    setViewClients(true);
  };

  return (
    <>
      {token ? (
        <div>
          <h1>Panel Empleados</h1>
          <ul className="panel">
            <li className="panel-item">
              <button onClick={handleViewAddEmployed}>Alta de Empleado</button>
            </li>
            <li className="panel-item">
              <button onClick={handleViewClients}>Ver Clientes</button>
            </li>
            <li className="panel-item">
              <button onClick={handleViewEmployed}>Ver Empleados</button>
            </li>
            <li className="panel-item">
              <button onClick={handleViewPurchase}>Ver Compras</button>
            </li>
          </ul>
          {viewClients && <AllClientsView token={token} setError={setError} />}
          {viewEmployed && (
            <AllEmployedView token={token} setError={setError} />
          )}
          {viewPurchase && (
            <AllPurchaseView token={token} setError={setError} />
          )}
          {viewAddEmployed && (
            <AddEmployedForm token={token} setError={setError} />
          )}
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
