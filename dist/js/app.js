const campos = {
        marca: filtrarCampos,
        year: filtrarCampos,
        min: filtrarCampos,
        max: filtrarCampos,
        puertas: filtrarCampos,
        transmision: filtrarCampos,
        color: filtrarCampos
    };

const camposActualizados = {
    marca: '',
    year: '',
    min: '',
    max: '',
    puertas: '',
    transmision: '',
    color: ''
};

document.addEventListener('DOMContentLoaded', ()=> {
    const anios = Array.from({ length: 11 }, (_, i) => 2021 - i);

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
    limpiarHtml();
    const resultados = document.querySelector('.resultados');
    agregarAlerta(datos);
    datos.map( dato => {
        const {marca, modelo, year, precio, puertas, transmision, color} = dato;
        const resultado = document.createElement('P');
        resultado.classList.add('resultado');
        resultado.textContent = `${marca} ${modelo} - ${year} - ${puertas} puertas - transmisión: ${transmision} - precio: ${precio} - color: ${color}`;
        resultados.appendChild(resultado);
    });
}

function leerEventos() {
    const form = document.querySelector('.form');
    form.addEventListener('change', e =>{
        const id = e.target.id;
        const valor = e.target.value
        const validador = campos[id];
        if (validador) {
            camposActualizados[id] = valor;
            validador(valor);
        }
    });
}
function filtrarCampos() {
    const {marca, year, min, max, puertas, transmision, color} = camposActualizados;

    const nuevoArray = autos.filter(auto => {
        return (marca === '' || marca === auto.marca.toLowerCase()) && 
               (year === '' || Number(year) === auto.year) &&
               (min === '' || auto.precio >= Number(min)) &&
               (max === '' || auto.precio <= Number(max)) &&
               (puertas === '' || auto.puertas === Number(puertas)) &&
               (transmision === '' || transmision === auto.transmision.toLowerCase()) &&
               (color === '' || color === auto.color.toLowerCase());
    });

    agregarInfo(nuevoArray);
}

function limpiarHtml() {
    const resultados = document.querySelector('.resultados');
    while(resultados.firstElementChild) {
        resultados.firstElementChild.remove();
    }
}

function agregarAlerta(entrada) {
    const alerta = document.querySelector('.resultados__alert');

    if ((entrada.length === 0 && alerta.classList.contains('activo')) || (entrada.length !== 0 && alerta.classList.contains('inactivo'))) return;

    else if(entrada.length === 0 && alerta.classList.contains('inactivo')) {
        alerta.classList.remove('inactivo');
        alerta.classList.add('activo');
    }
    else {
        alerta.classList.remove('activo');
        alerta.classList.add('inactivo');
    }
}
