import { useState } from "react";
import { useForm } from "../hooks/useForm";
import ErrorMessage from "./ErrorMessage";
import { validateNewEmployedData } from "../helpers/validateFormData";
import SuccessMessage from "./SuccessMessage";

const initialForm = {
  name: "",
  last_name: "",
  dni: "",
  employed_password: "",
};

function AddEmployedForm({ token }) {
  const [formErrorServer, setFormErrorServer] = useState(false);
  const [addOK, setAddOK] = useState(false);

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
    const result = validateNewEmployedData(form);
    if (result.success) {
      try {
        console.log(`Validacion correcta`);
        const response = await fetch(
          "http://localhost:3000/server/employeds/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(form),
          }
        );

        if (!response.ok) {
          throw new Error("Error al agregar");
        }

        const data = await response.json();
        console.log("Agregado con exito:", data);
        resetForm();
        resetErrorForm();
        setAddOK(true);
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
    <div className="container-content">
      <h1>Alta Empleado</h1>
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
          <label htmlFor="employed_password">Contraseña:</label>
          <input
            type="password"
            id="employed_password"
            name="employed_password"
            value={form.employed_password}
            onChange={handleInputChange}
            required
          />
          {errorForm.age && (
            <ErrorMessage message={errorForm.age}></ErrorMessage>
          )}
        </div>
        <button type="submit" className="submit">
          Registrar
        </button>
      </form>
      {formErrorServer && (
        <ErrorMessage message="Error con el servidor"></ErrorMessage>
      )}
      {addOK && <SuccessMessage message="Agregado con exito"></SuccessMessage>}
    </div>
  );
}

export default AddEmployedForm;
