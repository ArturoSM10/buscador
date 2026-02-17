const campos = {
        marca: obtenerInfo,
        year: obtenerInfo,
        min: obtenerInfo,
        max: obtenerInfo,
        puertas: obtenerInfo,
        transmision: obtenerInfo,
        color: obtenerInfo
    };

document.addEventListener('DOMContentLoaded', ()=> {
    const anios = Array.from({ length: 11 }, (_, i) => new Date().getFullYear() - i);

    agregarAnios(anios);
    agregarInfo(autos);
    leerEventos();
    
});

function agregarAnios(datos) {
    const year = document.querySelector('#year');

    Object.values(datos).map( dato => {
        const option = document.createElement('option');
        option.textContent = dato;
        option.value = dato;
        year.appendChild(option);
    });
};

function agregarInfo(datos) {
    const resultados = document.querySelector('.resultados');
    datos.map( dato => {
        const {marca, modelo, year, precio, puertas, transmision, color} = dato;
        const resultado = document.createElement('P');
        resultado.classList.add('resultado');
        resultado.textContent = `${marca} ${modelo} - ${year} - ${puertas} puertas - transmisión: ${transmision} - precio: ${precio} - color: ${color}`;
        resultados.appendChild(resultado);
    });
}

function leerEventos(entrada) {
    const form = document.querySelector('.form');
    form.addEventListener('change', e =>{
        const validador = campos[e.target.id];
        if (validador) {
            validador(e.target);
        }
    });
}

function obtenerInfo(input) {
    return input.value;
}