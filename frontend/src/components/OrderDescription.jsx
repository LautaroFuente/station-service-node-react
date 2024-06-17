import PhotoProduct from "../img/product.png";
import PhotoPumpFuel from "../img/fuel-pump.png";
import PhotoPayMethod from "../img/pay-method.png";
import PhotoQuantity from "../img/quantity.png";

function OrderDescription() {
  return (
    <>
      <h1>¡Compra Terminada!</h1>
      <h2>Resumen del pedido:</h2>
      <div className="container-grid">
        <div className="grid-item">
          <div>
            <p>Surtidor:</p>
            <img src={PhotoPumpFuel} alt="Surtidor" />
          </div>
        </div>
        <div className="grid-item">
          <div>
            <p>Tipo Producto:</p>
            <img src={PhotoProduct} alt="Gasolina" />
          </div>
        </div>
        <div className="grid-item">
          <div>
            <p>Metodo Pago:</p>
            <img src={PhotoPayMethod} alt="Metodo de Pago" />
          </div>
        </div>
        <div className="grid-item">
          <div>
            <p>Cantidad:</p>
            <img src={PhotoQuantity} alt="Cantidad" />
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderDescription;
