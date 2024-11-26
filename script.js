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
    tabla.appendChild(filas);
    //todas las celdas
    for (let dia = 1; dia <= totalDias; dia++) {
        let td = document.createElement("td");
        let divNros = document.createElement("div");
        divNros.classList.add("divNros");
        td.appendChild(divNros);
        divNros.textContent = dia;
        filas.appendChild(td);
        let eventos = nodoEventos(dia, data);
        eventos.forEach(evento => {
            td.appendChild(evento);
        });
        if (filas.children.length === 7) {
            tabla.appendChild(filas);
            filas = document.createElement("tr");
        }
        if (dia == new Date().getDate()) {
            divNros.style.color = "#ff6f61";
        }

        //color a fin de semana
        let finde = filas.children.length;
        if (finde === 0 || finde === 6) {
            td.style.background = "#ffebeb";
        }
    }
    if (filas.children.length > 0) {
        tabla.appendChild(filas);
    }

    calendario.appendChild(tabla);
    //console.log(primerDia);
}

//creamos fetch para leer el archivo .json

document.addEventListener("DOMContentLoaded", function () {
    fetch("eventos.json").then(response => response.json()).then(data => {
        crearCalendario(data);
        //console.log(data);
    })
})

//creando funcion para los eventos
function nodoEventos(dia, data) {
    fecha = new Date(anio, mes, dia);
    nodos = [];
    //div para los titulos(h2)
    let divTitulos = document.createElement("div");
    divTitulos.classList.add("divTitulos");
    for (let i = 0; i < data.length; i++) {
        let fechaInicio = new Date(data[i].fechaAlta);
        let fechaFin = new Date(data[i].fechaFinalizacion);
        fechaInicio.setHours(0,0,0,0);
        fechaFin.setHours(0,0,0,0);
     
        let divcolor = document.createElement("div");
        divcolor.classList.add("divcolor");
        divcolor.style.backgroundColor = data[i].color;

        //comparamos fecha-calendario con fecha-evento,  solo fechas(sin horas)
        if (fecha.toDateString() == new Date(fechaInicio).toDateString()) {
            let h2 = document.createElement("h2");
            h2.classList.add("titulo");
            h2.textContent = data[i].titulo;
            h2.style.backgroundColor = data[i].color;
            divTitulos.appendChild(h2);  
            nodos.push(divTitulos);
        }
        //fechaInicio y fechaFin
        else if (fecha.getTime() > new Date(fechaInicio).getTime() && fecha.getTime() <= new Date(fechaFin).getTime()) {
            let divColor = document.createElement("div");
            divColor.classList.add("divColor");
            divColor.style.backgroundColor=data[i].color;
            divTitulos.appendChild(divColor);
            nodos.push(divTitulos);
        }
    }
    return nodos;

}
