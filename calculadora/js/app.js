const form = document.getElementById('form');

console.log(form['operando-b']);

const btnSumar = document.getElementById('btn-sumar');
const btnRestar = document.getElementById('btn-restar');
const btnMultiplicar = document.getElementById('btn-multiplicar');
const btnDividir = document.getElementById('btn-dividir');

function mostrarResultado (resultado) {
    let mensaje = '';
    if (!isNaN(resultado))
        mensaje = `Resultado: ${(resultado.toFixed(2))}`;
    else
        mensaje = 'Operandos incorrectos';
         
    document.getElementById('resultado').innerHTML = mensaje;
}

btnSumar.addEventListener('click', () => {
    let resultado= parseFloat(form['operando-a'].value) + parseFloat(form['operando-b'].value);
    mostrarResultado(resultado)
});

btnRestar.addEventListener('click', () => {
    let resultado= parseFloat(form['operando-a'].value) - parseFloat(form['operando-b'].value);
    mostrarResultado(resultado)
});

btnMultiplicar.addEventListener('click', () => {
    let resultado= parseFloat(form['operando-a'].value) * parseFloat(form['operando-b'].value);
    mostrarResultado(resultado)
});

btnDividir.addEventListener('click', () => {
    let resultado= parseFloat(form['operando-a'].value) / parseFloat(form['operando-b'].value);
    mostrarResultado(resultado)
});

