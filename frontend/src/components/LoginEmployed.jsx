import { NavLink } from "react-router-dom";

function LoginEmployed() {
  const handleSubmit = () => {
    console.log("Enviando");
  };
  return (
    <>
      <h1>¡INICIA SESION COMO EMPLEADO!</h1>
      <form onSubmit={{ handleSubmit }}>
        <div>
          <label htmlFor="dni">DNI:</label>
          <input type="text" id="dni" name="dni" required />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input type="text" id="password" name="password" required />
        </div>
        <button type="submit" className="submit">
          Identificarse
        </button>
      </form>
      <NavLink to={"/"}>
        <button className="btn-back-home">Volver al inicio</button>
      </NavLink>
    </>
  );
}

export default LoginEmployed;
