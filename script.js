var fecha = new Date();
var anio = fecha.getFullYear();
var mes = fecha.getMonth();
function crearCalendario(data) {

    let diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    let calendario = document.getElementById("calendario");
    let tabla = document.createElement("table");
    //tabla.innerHTML="";
    let fila = document.createElement("tr");
    for (let i = 0; i < diasSemana.length; i++) {
        let head = document.createElement("th");
        head.textContent = diasSemana[i];
        fila.appendChild(head);
    }
    tabla.appendChild(fila);
    //rellenando diasSemana
    let primerDia = new Date(anio, mes, 1).getDay();
    let totalDias = new Date(anio, mes + 1, 0).getDate();

    //evitamos que salga -1
    if (primerDia === 0) {
        primerDia = 7;
    }
    //celdas vacias
    let filas = document.createElement("tr")
    for (let i = 0; i < primerDia - 1; i++) {
        let td = document.createElement("td");
        filas.appendChild(td);
    }

    //todas las celdas
    for (let dia = 1; dia <= totalDias; dia++) {
        let td = document.createElement("td");
        let divNros = document.createElement("div");
        divNros.classList.add("divNros");
        td.appendChild(divNros);
        divNros.textContent = dia;
        filas.appendChild(td);
        let eventos = nodoEvento(dia, data);
        //incluimos eventos
        eventos.forEach(evento => {
            td.appendChild(evento);
        });
        calendario.appendChild(tabla);
        tabla.appendChild(filas);
        //console.log(primerDia);
        if (filas.children.length === 7) {
            tabla.appendChild(filas);
            filas = document.createElement("tr");
        }
        if (dia == new Date().getDate()) {
            divNros.style.color = "#ff6f61";
        }
        //colo a fin de semana
        let finde = filas.children.length;
        if (finde === 6 || finde === 7) {
            td.style.background = "#ffebeb";
        }
    }
    if (filas.children.length > 0) {
        tabla.appendChild(filas);
    }

}


document.addEventListener('DOMContentLoaded', function () {
    fetch('datos.json').then(response => {
        return response.json();
    }).then(data => {
        //console.log(data);
        crearCalendario(data);
    })
})

let posicionesGlobales = {};
let posicionesGlobales2 = {};
//crear function para eventos
function nodoEvento(dia, data) {
    let nodo = [];
    let fecha = new Date(anio, mes, dia);
    let fechaInicio;
    let fechaFin;
    let divContenedor = document.createElement("div");
    divContenedor.classList.add("divContenedorColores");
    for (let i = 0; i < data.length; i++) {
        fechaInicio = new Date(data[i].fechaAlta);
        fechaFin = new Date(data[i].fechaFinalizacion);
        //normalizar horas
        fechaInicio.setHours(0, 0, 0, 0);
        fechaFin.setHours(0, 0, 0, 0);
        if (fecha.getTime() == fechaInicio.getTime()) {
           
            let div = document.createElement("div");
            div.classList.add("div-evento");
            let titulo = document.createElement("h2");
            titulo.style.backgroundColor = data[i].color;
            let eventoId2 = `evento_${i}`;
            if (!posicionesGlobales[eventoId2]) {
                posicionesGlobales[eventoId2] = Object.keys(posicionesGlobales).length + 1;
            }
            if (!posicionesGlobales[data[i].titulo]) {
                posicionesGlobales[data[i].titulo] = Object.keys(posicionesGlobales).length + 1;
            }
            let posicionIndex2 = posicionesGlobales[eventoId2];
            titulo.style.marginTop = `${(posicionIndex2 -4) * 8}px`; // Separación vertical fija
            titulo.textContent = data[i].titulo;
            nodo.push(titulo);

        }
        else if (fecha.getTime() > fechaInicio.getTime() && fecha.getTime() <= fechaFin.getTime()) {
            let eventoId = `evento_${i}`;

            // Asignar una posición fija al evento
            if (!posicionesGlobales[eventoId]) {
                posicionesGlobales[eventoId] = Object.keys(posicionesGlobales).length + 1;
            }

            let divcolor = document.createElement("div");
            divcolor.classList.add("divcolor");
            divcolor.style.backgroundColor = data[i].color;

            // Aplicar posición fija basada en el índice del evento
            if (!posicionesGlobales[data[i].titulo]) {
                posicionesGlobales[data[i].titulo] = Object.keys(posicionesGlobales).length + 1;
            }
            let posicionIndex = posicionesGlobales[eventoId];
            divcolor.style.marginTop = `${(posicionIndex - 4) * 8}px`; // Separación vertical fija

            divContenedor.appendChild(divcolor);
            nodo.push(divContenedor);
        }
    }

    // if (divContenedor.children.length > 0) {
    //     nodo.push(divContenedor);
    // }

    return nodo;
}
