import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import SelectFuelPump from "./components/SelectFuelPump";
import SelectFuelProduct from "./components/SelectFuelProduct";
import SelectPayMethod from "./components/SelectPayMethod";
import EnterAmount from "./components/EnterAmount";
import OrderDescription from "./components/OrderDescription";
import LoginClient from "./components/LoginClient";
import LoginEmployed from "./components/LoginEmployed";
import RegisterClient from "./components/RegisterClient";
import EmployedDashboard from "./components/EmployedDashboard";
import { ClientProvider } from "./contexts/ClientContext";
import { PurchaseProvider } from "./contexts/PurchaseContext";
import { EmployedProvider } from "./contexts/EmployedContext";
import OneClientView from "./components/OneClientView";
import OneEmployedView from "./components/OneEmployedView";

function App() {
  return (
    <>
      <div className="header">
        <img src="./src/img/favicon.png" alt="logo de estacion de servicio" />
        <h2>Estación LF</h2>
      </div>
      <EmployedProvider>
        <ClientProvider>
          <PurchaseProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login-client" element={<LoginClient />} />
                <Route path="/login-employed" element={<LoginEmployed />} />
                <Route path="/register-client" element={<RegisterClient />} />
                <Route path="/pump" element={<SelectFuelPump />} />
                <Route path="/fuel" element={<SelectFuelProduct />} />
                <Route path="/pay" element={<SelectPayMethod />} />
                <Route path="/amount" element={<EnterAmount />} />
                <Route path="/description" element={<OrderDescription />} />
                <Route
                  path="/employed-dashboard"
                  element={<EmployedDashboard />}
                />
                <Route path="/one-client/:dni" element={<OneClientView />} />
                <Route
                  path="/one-employed/:dni"
                  element={<OneEmployedView />}
                />
              </Routes>
            </BrowserRouter>
          </PurchaseProvider>
        </ClientProvider>
      </EmployedProvider>
    </>
  );
}

export default App;
