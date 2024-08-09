import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import ErrorMessage from "./ErrorMessage";
import { EmployedContext } from "../contexts/EmployedContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { validateLoguinEmployedData } from "../helpers/validateFormData";
import { fetchGeneric } from "../helpers/fetchGeneric";

const initialForm = { dni: "", employed_password: "" };

function LoginEmployed() {
  const [formErrorServer, setFormErrorServer] = useState(false);
  const [employedNotRegistered, setEmployedNotRegistered] = useState({
    state: false,
    message: "",
  });
  const { setEmployed } = useContext(EmployedContext);

  const {
    form,
    errorForm,
    handleInputChange,
    handleErrorForm,
    resetForm,
    resetErrorForm,
  } = useForm(initialForm);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetErrorForm();
    setFormErrorServer(false);
    setEmployedNotRegistered({
      state: false,
      message: "",
    });
    const result = validateLoguinEmployedData(form);
    if (result.success) {
      try {
        console.log(`Validacion correcta`);
        const response = await fetchGeneric("http://localhost:3000/server/auth/login-employed", "POST", {
          "Content-Type": "application/json",
        }, JSON.stringify(form));

        if (response == null) {
          throw new Error("Error al iniciar sesion");
        }

        const { token, data } = response;
        if (response.error) {
          setEmployedNotRegistered({ state: true, message: response.error });
        } else {
          console.log("Inicio de sesion exitoso");
          setEmployed({
            employed_id: data[0].employed_id,
            name: data[0].name,
            last_name: data[0].last_name,
            dni: data[0].dni,
            token,
          });
          navigate("/employed-dashboard");
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
      <h1>¡INICIA SESION COMO EMPLEADO!</h1>
      {employedNotRegistered.state && (
        <ErrorMessage message={employedNotRegistered.message}></ErrorMessage>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="dni">DNI:</label>
          <input
            type="text"
            id="dni"
            name="dni"
            required
            onChange={handleInputChange}
          />
          {errorForm.dni && (
            <ErrorMessage message={errorForm.dni}></ErrorMessage>
          )}
        </div>
        <div>
          <label htmlFor="employed_password">Contraseña:</label>
          <input
            type="password"
            id="employed_password"
            name="employed_password"
            required
            onChange={handleInputChange}
          />
          {errorForm.password && (
            <ErrorMessage message={errorForm.password}></ErrorMessage>
          )}
        </div>
        <button type="submit" className="submit">
          Identificarse
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

export default LoginEmployed;
