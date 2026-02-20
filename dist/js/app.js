const camposActualizados = {
    marca: '',
    year: '',
    min: '',
    max: '',
    puertas: '',
    transmision: '',
    color: ''
};

const autoNormalizado = autos.map(auto =>{

    return {
        ...auto,
        marca: auto.marca.toLowerCase(),
        transmision: auto.transmision.toLowerCase(),
        color: auto.color.toLowerCase()
    }
});

document.addEventListener('DOMContentLoaded', ()=> {
    const anios = Array.from({ length: 11 }, (_, i) => 2021 - i);
    agregarAnios(anios);
    agregarInfo(autoNormalizado);
    leerEventos();
    
});

function agregarAnios(datos) {
    const year = document.querySelector('#year');

    datos.forEach( dato => {
        const option = document.createElement('option');
        option.textContent = dato;
        option.value = dato;
        year.appendChild(option);
    });
};

function agregarInfo(datos) {
    limpiarHtml();
    const resultados = document.querySelector('.resultados');
    datos.forEach((dato)=>{
        const {marca, modelo, year, precio, puertas, transmision, color} = dato;
        const resultado = document.createElement('P');
        resultado.classList.add('resultado');
        resultado.textContent = `${marca} ${modelo} - ${year} - ${puertas} puertas - transmisión: ${transmision} - precio: ${precio} - color: ${color}`;
        resultados.appendChild(resultado);
    });

}

function leerEventos() {
    const form = document.querySelector('.form');
    form.addEventListener('change', e => {
        const {id, value} = e.target;
        if(!(id in camposActualizados)) return;
        camposActualizados[id] = value;
        filtradoCompletado()
    });
}
function filtrarCampos(tipado, objetoPrincipal) {
    const {marca, year, min, max, puertas, transmision, color} = tipado;

    const nuevoArray = objetoPrincipal.filter(objeto => {
        return ((marca === '' || marca === objeto.marca) && 
               (year === '' || year === objeto.year) &&
               (min === '' || objeto.precio >= min) &&
               (max === '' || objeto.precio <= max) &&
               (puertas === '' || objeto.puertas === puertas) &&
               (transmision === '' || transmision === objeto.transmision) &&
               (color === '' || color === objeto.color));
    });

    return nuevoArray
}

function limpiarHtml() {
    const resultados = document.querySelector('.resultados');
    while(resultados.firstElementChild) {
        resultados.firstElementChild.remove();
    }
}

function agregarAlerta(entrada) {
    const alerta = document.querySelector('.resultados__alert');
    alerta.classList.toggle('activo', entrada.length=== 0);
    alerta.classList.toggle('inactivo', entrada.length!== 0);
}

function cambiarTipo(entrada) {
    return {
        ...entrada,
        year: (entrada.year !== '' ? Number(entrada.year) : entrada.year),
        min: (entrada.min !== '' ? Number(entrada.min) : entrada.min),
        max: (entrada.max !== '' ? Number(entrada.max) : entrada.max),
        puertas: (entrada.puertas !== '' ? Number(entrada.puertas) : entrada.puertas)
    };
}

function filtradoCompletado() {
    const objetoTipado = cambiarTipo(camposActualizados);
    const objetoFiltrado = filtrarCampos(objetoTipado, autoNormalizado);
    agregarAlerta(objetoFiltrado);
    agregarInfo(objetoFiltrado);
}