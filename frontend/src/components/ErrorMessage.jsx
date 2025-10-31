function ErrorMessage({ message }) {
  return (
    <div className="container-error">
      <span role="img" aria-label="error" style={{ marginRight: "0.5rem" }}>
        ❌
      </span>
      <h3>{message}</h3>
    </div>
  );
}

export default ErrorMessage;
