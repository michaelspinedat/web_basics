import { Movimiento } from "./movimiento.js";

class Egreso extends Movimiento {
    static contadorEgresos = 0;

    constructor(descripcion, valor) {
        super(++Egreso.contadorEgresos, descripcion, valor);
    }
}

export {Egreso};