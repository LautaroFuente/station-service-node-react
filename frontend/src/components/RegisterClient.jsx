import { useForm } from "../hooks/useForm";
import { validateNewClientData } from "../helpers/validateFormData";
import ErrorMessage from "./ErrorMessage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { fetchGeneric } from "../helpers/fetchGeneric";

const initialForm = {
  name: "",
  last_name: "",
  dni: "",
  age: "",
};
const apiUrl = import.meta.env.VITE_API_URL;

function RegisterClient() {
  const [formErrorServer, setFormErrorServer] = useState("");
  const navigate = useNavigate();
  const {
    form,
    errorForm,
    handleInputChange,
    handleErrorForm,
    resetForm,
    resetErrorForm,
  } = useForm(initialForm);

  // En un componente de React
  const createClientLocal = async () => {
    const newClient = {
      name: "Ezequiel",
      last_name: "Luna",
      dni: 33333333,
      age: 44,
    };

    try {
      const response = await fetch(`${apiUrl}/clients/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newClient),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const data = await response.json();
      console.log("Client created successfully:", data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  // En un componente de React
  const createClientDocker = async () => {
    const newClient = {
      name: "Ezequiel",
      last_name: "Luna",
      dni: 33333333,
      age: 44,
    };

    try {
      const response = await fetch(`${apiUrl}/clients/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newClient),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const data = await response.json();
      console.log("Client created successfully:", data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleSubmit2 = async (event) => {
    event.preventDefault(); // Evita que la página se recargue al enviar un formulario

    try {
      console.log("Iniciando creación de cliente en entorno local...");
      await createClientLocal(); // Llama al primer método
      console.log("Creación de cliente en entorno local finalizada.");

      console.log("Iniciando creación de cliente en entorno Docker...");
      await createClientDocker(); // Llama al segundo método
      console.log("Creación de cliente en entorno Docker finalizada.");
    } catch (error) {
      console.error("Un error ha ocurrido durante el proceso:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = validateNewClientData(form);
    if (result.success) {
      try {
        console.log(`Validacion correcta`);
        console.log(apiUrl);
        const data = await fetchGeneric(
          `${apiUrl}/clients/`,
          "POST",
          {
            "Content-Type": "application/json",
          },
          {
            name: "Ezequiel",
            last_name: "Luna",
            dni: 33333333,
            age: 44,
          }
          //JSON.stringify(form)
        );

        if (data == null) {
          throw new Error("Error al agregar");
        }
        if (data == "Error DNI ya registrado") {
          throw new Error("Error DNI ya registrado");
        }

        console.log("Agregado con exito:", data);
        resetForm();
        resetErrorForm();
        navigate("/login-client");
      } catch (error) {
        console.error(error.message);
        resetForm();
        resetErrorForm();
        if (error.message == "Error DNI ya registrado") {
          setFormErrorServer(error.message);
        } else {
          setFormErrorServer("Error con el servidor");
        }
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
      <form onSubmit={handleSubmit2}>
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
      {formErrorServer != "" && (
        <ErrorMessage message={formErrorServer}></ErrorMessage>
      )}
      <div className="container-content">
        <NavLink to={"/"}>
          <button className="btn-back-home">Volver al inicio</button>
        </NavLink>
      </div>
    </>
  );
}

export default RegisterClient;
