function LoginEmployed() {
  return (
    <>
      <h1>¡INICIA SESION COMO EMPLEADO!</h1>
      <form onSubmit={{}}>
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
    </>
  );
}

export default LoginEmployed;
