function SuccessMessage({ message }) {
  return (
    <div className="container-success">
      <span role="img" aria-label="success" style={{ marginRight: "0.5rem" }}>
        ✅
      </span>
      <h3>{message}</h3>
    </div>
  );
}

export default SuccessMessage;
