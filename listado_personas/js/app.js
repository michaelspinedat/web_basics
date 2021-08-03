import { Persona } from "./persona.js";

const personas = [
    new Persona('Juan', 'Perez'),
    new Persona('Karla', 'Lara')
];

function mostrarPersonas (personas) {
    let htmlStr = '';
    for (let persona of personas) {
        htmlStr += `<li>${persona.nombre} ${persona.apellido}</li>`;
    }
    document.getElementById('personas').innerHTML = htmlStr;
}

function agregarPersona (personas) {
    let form = document.forms['form'];
    const nombre = form['nombre'].value.trim();
    const apellido = form['apellido'].value.trim();
    
    if (nombre !== '' && apellido !== '') {        
        personas.push(new Persona(nombre, apellido));
        mostrarPersonas(personas);
    }
}

const btnAgregar = document.getElementById('btn-agregar');

btnAgregar.addEventListener('click', () => {
    agregarPersona(personas);    
})

window.addEventListener('load', () => {
    mostrarPersonas(personas);
})