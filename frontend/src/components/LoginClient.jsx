import { useContext, useState } from "react";
import { validateLoguinClientData } from "../helpers/validateFormData";
import { useForm } from "../hooks/useForm";
import ErrorMessage from "./ErrorMessage";
import { useNavigate } from "react-router-dom";
import { ClientContext } from "../contexts/ClientContext";
import { NavLink } from "react-router-dom";
import { fetchGeneric } from "../helpers/fetchGeneric";

const initialForm = { dni: "" };

function LoginClient() {
  const [formErrorServer, setFormErrorServer] = useState(false);
  const [clientNotRegistered, setClientNotRegistered] = useState({
    state: false,
    message: "",
  });
  const { dispatchClient } = useContext(ClientContext);

  const navigate = useNavigate();

  const {
    form,
    errorForm,
    handleInputChange,
    handleErrorForm,
    resetForm,
    resetErrorForm,
  } = useForm(initialForm);

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetErrorForm();
    setFormErrorServer(false);
    setClientNotRegistered({
      state: false,
      message: "",
    });
    const result = validateLoguinClientData(form);
    if (result.success) {
      try {
        console.log(`Validacion correcta`);
        const response = await fetchGeneric("http://localhost:3000/server/auth/login-client", "POST", {
          "Content-Type": "application/json",
        }, JSON.stringify(form));

        if (response == null) {
          throw new Error("Error al iniciar sesion");
        }

        const { token, data } = response;
        if (response.error) {
          setClientNotRegistered({ state: true, message: response.error });
        } else {
          console.log("Inicio de sesion exitoso");
          dispatchClient({
            type:"SET_CLIENT",
            payload:{
              client_id: data[0].client_id,
              name: data[0].name,
              last_name: data[0].last_name,
              dni: data[0].dni,
              token,
            }
          })
          navigate("/pump");
        }
        resetForm();
        resetErrorForm();
      } catch (error) {
        console.error("Error:", error);
        resetForm();
        resetErrorForm();
        setFormErrorServer(true);
      }
    } else {
      console.log(`Falla validacion `);
      const errors = result.error.errors;
      errors.forEach((error) => {
        if (error.message === "Expected number, received nan") {
          error.message = "El dni debe ser un numero";
        }
        handleErrorForm(error.path, error.message);
      });
    }
  };

  return (
    <>
      <h1>¡INICIA SESIÓN COMO CLIENTE!</h1>
      {clientNotRegistered.state && (
        <ErrorMessage message={clientNotRegistered.message}></ErrorMessage>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="dni">DNI:</label>
          <input
            type="text"
            id="dni"
            name="dni"
            onChange={handleInputChange}
            value={form.dni}
            required
          />
          {errorForm.dni && (
            <ErrorMessage message={errorForm.dni}></ErrorMessage>
          )}
        </div>
        <button type="submit" className="submit">
          Ingresar
        </button>
      </form>
      {formErrorServer && (
        <ErrorMessage message="Error con el servidor"></ErrorMessage>
      )}
      <div className="container-content">
        <NavLink to={"/"}>
          <button className="btn-back-home">Volver al inicio</button>
        </NavLink>
      </div>
    </>
  );
}

export default LoginClient;
