import { useForm } from "../hooks/useForm";

function RegisterClient() {
  const initialForm = {
    name: "",
    last_name: "",
    dni: "",
    age: "",
  };

  const { form, handleInputChange, resetForm } = useForm(initialForm);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
    } catch (error) {
      console.error("Error:", error);
    }

    resetForm;
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
        </div>
        <button type="submit" className="submit">
          Registrarse
        </button>
      </form>
    </>
  );
}

export default RegisterClient;
