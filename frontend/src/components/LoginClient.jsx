import { useState } from "react";
import { validateExistClient } from "../helpers/validateFormData";
import { useForm } from "../hooks/useForm";
import ErrorMessage from "./ErrorMessage";

const initialForm = { dni: "" };

function LoginClient() {
  const [formErrorServer, setFormErrorServer] = useState(false);

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
    const result = validateExistClient(form);
    if (result.success) {
      try {
        console.log(`Validacion correcta`);
        const response = await fetch(
          "http://localhost:3000/server/auth/login-client",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          }
        );

        if (!response.ok) {
          throw new Error("Error al iniciar sesion");
        }

        const data = await response.json();
        if (data.error) {
          console.log(data.error);
        } else {
          console.log("Inicio de sesion exitoso");
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
        handleErrorForm(error.path, error.message);
      });
    }
  };

  return (
    <>
      <h1>¡INICIA SESIÓN COMO CLIENTE!</h1>
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
    </>
  );
}

export default LoginClient;
