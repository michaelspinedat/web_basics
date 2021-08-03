function mostrarHora (fecha) {
    let hr = (fecha.getHours() + '').padStart(2, 0);
    let min = (fecha.getMinutes() + '').padStart(2, 0);
    let seg = (fecha.getSeconds() + '').padStart(2, 0);    
    document.getElementById('hora').innerHTML = `${hr}:${min}:${seg}`;
}

function mostrarFecha (fecha) {
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", 
        "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    
    const dias = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

    let mes = meses[fecha.getMonth()].slice(0, 3);
    let diaSemana = dias[fecha.getDay()].slice(0, 3);
    let dia = (fecha.getDate() + '').padStart(2, 0);

    let fechaTexto = `${diaSemana}, ${dia} ${mes}`;
    document.getElementById('fecha').innerHTML = fechaTexto;
}

function animar () {
    document.getElementById('contenedor').classList.toggle('animar');
}

function mostrarReloj () {
    let fecha = new Date();
    mostrarHora(fecha);
    mostrarFecha(fecha);
    animar();
}

setInterval(mostrarReloj, 1000);