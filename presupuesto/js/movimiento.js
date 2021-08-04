class Movimiento {
    constructor (id, descripcion, valor) {
        this._id = id;
        this._descripcion = descripcion;
        this._valor = valor;
    }

    get id () {
        return this._id;
    }

    get descripcion () {
        return this._descripcion;
    }

    set descripcion (descripcion) {
        this._descripcion = descripcion;
    }

    get valor () {
        return this._valor;
    }

    set valor (valor) {
        this._valor = valor;
    }
}

export {Movimiento};