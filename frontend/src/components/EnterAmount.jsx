function EnterAmount() {
  return (
    <>
      <h1>INGRESE EL IMPORTE A SUMINISTRAR</h1>
      <div className="display"></div>
      <div className="grid-numeric">
        <div className="grid-number">1</div>
        <div className="grid-number">2</div>
        <div className="grid-number">3</div>
        <div className="grid-number">4</div>
        <div className="grid-number">5</div>
        <div className="grid-number">6</div>
        <div className="grid-number">7</div>
        <div className="grid-number">8</div>
        <div className="grid-number">9</div>
        <div className="grid-number">0</div>
        <div className="grid-number" id="grid-delete">
          Borrar
        </div>
      </div>
    </>
  );
}

export default EnterAmount;
