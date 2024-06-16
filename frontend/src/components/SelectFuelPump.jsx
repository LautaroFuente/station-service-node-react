import PhotoPumpFuel from "../img/fuel-pump.png";

function SelectFuelPump() {
  return (
    <>
      <h1>ELIGE EL SURTIDOR</h1>
      <div className="container-grid">
        <div className="grid-item">
          <div>
            <p>Surtidor 1</p>
            <img src={PhotoPumpFuel} alt="Surtidor" />
          </div>
        </div>
        <div className="grid-item">
          <div>
            <p>Surtidor 2</p>
            <img src={PhotoPumpFuel} alt="Surtidor" />
          </div>
        </div>
        <div className="grid-item">
          <div>
            <p>Surtidor 3</p>
            <img src={PhotoPumpFuel} alt="Surtidor" />
          </div>
        </div>
        <div className="grid-item">
          <div>
            <p>Surtidor 4</p>
            <img src={PhotoPumpFuel} alt="Surtidor" />
          </div>
        </div>
        <div className="grid-item">
          <div>
            <p>Surtidor 5</p>
            <img src={PhotoPumpFuel} alt="Surtidor" />
          </div>
        </div>
        <div className="grid-item">
          <div>
            <p>Surtidor 6</p>
            <img src={PhotoPumpFuel} alt="Surtidor" />
          </div>
        </div>
      </div>
    </>
  );
}

export default SelectFuelPump;
