import PhotoCard from "../img/credit-card.png";
import PhotoCash from "../img/cash.png";

function SelectPayMethod() {
  return (
    <>
      <h1>ELIGE METODO DE PAGO</h1>
      <div className="container-grid">
        <div className="grid-item">
          <div>
            <p>Efectivo</p>
            <img src={PhotoCard} alt="Tipo Gasolina" />
          </div>
        </div>
        <div className="grid-item">
          <div>
            <p>Tarjeta</p>
            <img src={PhotoCash} alt="Tipo Gasolina" />
          </div>
        </div>
      </div>
    </>
  );
}

export default SelectPayMethod;
