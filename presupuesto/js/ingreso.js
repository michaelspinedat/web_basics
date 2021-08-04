import { Movimiento } from "./movimiento.js";

class Ingreso extends Movimiento {
    static contadorIngresos = 0;

    constructor(descripcion, valor) {
        super(++Ingreso.contadorIngresos, descripcion, valor);
    }
}

export {Ingreso};