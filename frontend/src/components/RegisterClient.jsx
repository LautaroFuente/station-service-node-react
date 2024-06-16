function RegisterClient() {
  return (
    <>
      <h1>¡REGISTRATE!</h1>
      <form onSubmit={{}}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div>
          <label htmlFor="lastName">Apellido:</label>
          <input type="text" id="lastName" name="lastName" required />
        </div>
        <div>
          <label htmlFor="dni">DNI:</label>
          <input type="text" id="dni" name="dni" required />
        </div>
        <div>
          <label htmlFor="age">Edad:</label>
          <input type="number" id="age" name="age" required />
        </div>
        <button type="submit" className="submit">
          Registrarse
        </button>
      </form>
    </>
  );
}

export default RegisterClient;
