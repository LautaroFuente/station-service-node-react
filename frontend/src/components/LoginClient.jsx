function LoginClient() {
  return (
    <>
      <h1>¡INICIA SESION COMO CLIENTE!</h1>
      <form onSubmit={{}}>
        <div>
          <label htmlFor="dni">DNI:</label>
          <input type="text" id="dni" name="dni" required />
        </div>
        <button type="submit" className="submit">
          Ingresar
        </button>
      </form>
    </>
  );
}

export default LoginClient;
