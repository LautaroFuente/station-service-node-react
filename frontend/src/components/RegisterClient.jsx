import { useForm } from "../hooks/useForm";
import { validateNewClient } from "../helpers/validateNewClient";
import ErrorMessage from "./ErrorMessage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterClient() {
  const initialForm = {
    name: "",
    last_name: "",
    dni: "",
    age: "",
  };

  const [formErrorServer, setFormErrorServer] = useState(false);
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
    const result = validateNewClient(form);
    if (result.success) {
      try {
        console.log(`Validacion correcta`);
        const response = await fetch("http://localhost:3000/server/clients/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        if (!response.ok) {
          throw new Error("Error al agregar");
        }

        const data = await response.json();
        console.log("Agregado con exito:", data);
        resetForm();
        resetErrorForm();
        navigate("/login-client");
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
      <h1>¡REGISTRATE!</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            required
          />
          {errorForm.name && (
            <ErrorMessage message={errorForm.name}></ErrorMessage>
          )}
        </div>
        <div>
          <label htmlFor="last_name">Apellido:</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={form.last_name}
            onChange={handleInputChange}
            required
          />
          {errorForm.last_name && (
            <ErrorMessage message={errorForm.last_name}></ErrorMessage>
          )}
        </div>
        <div>
          <label htmlFor="dni">DNI:</label>
          <input
            type="text"
            id="dni"
            name="dni"
            value={form.dni}
            onChange={handleInputChange}
            required
          />
          {errorForm.dni && (
            <ErrorMessage message={errorForm.dni}></ErrorMessage>
          )}
        </div>
        <div>
          <label htmlFor="age">Edad:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={form.age}
            onChange={handleInputChange}
            required
          />
          {errorForm.age && (
            <ErrorMessage message={errorForm.age}></ErrorMessage>
          )}
        </div>
        <button type="submit" className="submit">
          Registrarse
        </button>
      </form>
      {formErrorServer && (
        <ErrorMessage message="Error con el servidor"></ErrorMessage>
      )}
    </>
  );
}

export default RegisterClient;
