import { Ingreso } from "./ingreso.js";
import { Egreso } from "./egreso.js";

const ingresos = [
    new Ingreso('sueldo', 2100.00),
    new Ingreso('venta coche', 1500.00)    
];

const egresos = [
    new Egreso('renta departamento', 900),
    new Egreso('ropa', 400)
];

function calcularTotal (movimientos) {
    return movimientos.reduce( (sum, movimiento) => sum + movimiento.valor, 0);   
}

function aplicarFormatoMoneda (valor) {
    return valor.toLocaleString('en-US', 
        {style: 'currency', currency: 'USD', minimumFractionDigits: 2});
}

function aplicarFormatoPorcentaje (valor) {
    return valor.toLocaleString('en-US', 
        {style: 'percent', minimumFractionDigits: 2});
}

function calcularFinanzas(ingresos, egresos) {
    let totalIngresos = calcularTotal(ingresos);
    let totalEgresos = calcularTotal(egresos);

    return {
        ingresos: totalIngresos,
        egresos: totalEgresos,        
        presupuesto: totalIngresos - totalEgresos 
    };
}

function cargarBalance (finanzas) {
    document.getElementById('presupuesto').innerHTML = 
        aplicarFormatoMoneda(finanzas.presupuesto);

    let porcentajeEgreso = finanzas.egresos / finanzas.ingresos;
    document.getElementById('porcentaje-egreso').innerHTML = 
        aplicarFormatoPorcentaje(porcentajeEgreso); 

    document.getElementById('ingresos').innerHTML = 
        aplicarFormatoMoneda(finanzas.ingresos);
    
    document.getElementById('egresos').innerHTML = 
        aplicarFormatoMoneda(finanzas.egresos);
}


function mostrarFinanzas(ingresos, egresos) {
    const finanzas = calcularFinanzas(ingresos, egresos);    
    cargarBalance(finanzas);
}


function eliminarIngreso (id) {
    let indiceEliminar = ingresos.findIndex(ingreso => id === ingreso.id);
    ingresos.splice(indiceEliminar, 1);
    mostrarFinanzas(ingresos, egresos);
}

function cargarIngreso (ingreso) {
    return `
    <div class="elemento limpiar-estilos">
        <div class="elemento-descripcion">${ingreso.descripcion}</div>
        <div class="derecha limpiar-estilos">
            <div class="elemento-valor">+ ${aplicarFormatoMoneda(ingreso.valor)}</div>
            <div class="elemento-eliminar">
                <button class="elemento-eliminar--btn">
                    <ion-icon name="close-circle-outline" onclick='eliminarIngreso(${ingreso.id})'>                    
                    </ion-icon>
                </button>
            </div>
        </div>
    </div>
    `
}

function eliminarEgreso (id) {
    let indiceEliminar = egresos.findIndex(egreso => id === egreso.id);
    egresos.splice(indiceEliminar, 1);
    mostrarFinanzas(ingresos, egresos);
}

function cargarEgreso (egreso) {
    return `
    <div class="elemento limpiar-estilos">
        <div class="elemento-descripcion">${egreso.descripcion}</div>
        <div class="derecha limpiar-estilos">
            <div class="elemento-valor">- ${aplicarFormatoMoneda(egreso.valor)}</div>
            <div class="elemento_porcentaje">${aplicarFormatoPorcentaje(egreso.valor / calcularTotal(egresos))}</div>
            <div class="elemento-eliminar">
                <button class="elemento-eliminar--btn">
                    <ion-icon name="close-circle-outline" onclick='eliminarEgreso(${egreso.id})'>
                    </ion-icon>
                </button>
            </div>
        </div>
    </div>
    
    `
}

function cargarIngresos (ingresos) {
    let ingresosHtml = '';
    
    for (let ingreso of ingresos) 
        ingresosHtml += cargarIngreso(ingreso);

    document.getElementById('lista-ingresos').innerHTML = ingresosHtml;
}

function cargarEgresos (egresos) {
    let egresosHtml = '';
    
    for (let egreso of egresos) 
        egresosHtml += cargarEgreso(egreso);

    document.getElementById('lista-egresos').innerHTML = egresosHtml;
}


window.addEventListener('load', () => {
    mostrarFinanzas(ingresos, egresos);
    cargarIngresos(ingresos);
    cargarEgresos(egresos);  
});