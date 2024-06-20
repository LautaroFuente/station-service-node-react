function ErrorMessage({ message }) {
  return (
    <div className="container-error">
      <h3 style={{ textAlign: "center" }}>{message}</h3>
    </div>
  );
}

export default ErrorMessage;
