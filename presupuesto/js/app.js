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

// Calcula la suma de todos los movimientos (egresos o ingresos).
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

// Muestra en la página los balances financieros: presupuesto, ingresos y egresos.
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

function agregarFuncionalidadBtns () {
    const btns = document.querySelectorAll('.elemento-eliminar--btn');
    btns.forEach(btn => {
        btn.addEventListener('click', e => {
            const tipoMovimiento = e.currentTarget.dataset.tipo;
            const id = e.currentTarget.dataset.id;
            if (tipoMovimiento === 'ingreso') 
                eliminarIngreso(id);
            else 
                eliminarEgreso(id);
            mostrarFinanzas(ingresos, egresos);
        });
    });    
}

// Muestra en la página los balances financieros y los movimientos (ingresos y egresos). 
function mostrarFinanzas(ingresos, egresos) {
    const finanzas = calcularFinanzas(ingresos, egresos);    
    cargarBalance(finanzas);
    cargarIngresos(ingresos);
    cargarEgresos(egresos);
    agregarFuncionalidadBtns();
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
                <button class="elemento-eliminar--btn" data-tipo="ingreso" data-id=${ingreso.id}>
                    <ion-icon name="close-circle-outline">                    
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
                <button class="elemento-eliminar--btn" data-tipo="egreso" data-id=${egreso.id}>
                    <ion-icon name="close-circle-outline">
                    </ion-icon>
                </button>
            </div>
        </div>
    </div>
    
    `
}

// Muestra en la página todos los ingresos realizados.
function cargarIngresos (ingresos) {
    let ingresosHtml = '';
    
    for (let ingreso of ingresos) 
        ingresosHtml += cargarIngreso(ingreso);

    document.getElementById('lista-ingresos').innerHTML = ingresosHtml;
}

// Muestra en la página todos los egresos realizados.
function cargarEgresos (egresos) {
    let egresosHtml = '';
    
    for (let egreso of egresos) 
        egresosHtml += cargarEgreso(egreso);

    document.getElementById('lista-egresos').innerHTML = egresosHtml;
}


// agrega un movimiento (egreso o ingreso).
function agregarMovimiento () {
    let form = document.forms['form'];
    let tipo = form['tipo'].value;
    let descripcion = form['descripcion'].value;
    let valor = form['valor'].value;

    if (descripcion !== '' && valor !== '') {
        let movimiento;
        if (tipo === 'ingreso')
            ingresos.push(new Ingreso(descripcion, +valor));
        else
            egresos.push(new Egreso(descripcion, +valor));
        mostrarFinanzas(ingresos, egresos);        
    }
}

window.addEventListener('load', () => {
    mostrarFinanzas(ingresos, egresos);
});

const btnAgregarMovimiento = document.querySelector('.agregar-btn');

btnAgregarMovimiento.addEventListener('click', () => {
    agregarMovimiento();
});