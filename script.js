var fecha = new Date();
var anio = fecha.getFullYear();
var mes = fecha.getMonth();
<<<<<<< HEAD
=======
var meses;
var mesActual = fecha.getMonth();

>>>>>>> feature-pruebas
function crearCalendario(data) {

    let diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    let calendario = document.getElementById("calendario");
    let tabla = document.createElement("table");
    tabla.innerHTML = "";
    calendario.innerHTML = "";
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
<<<<<<< HEAD

=======
>>>>>>> feature-pruebas
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
<<<<<<< HEAD
        let eventos = nodoEvento(dia, data);
        //incluimos eventos
        eventos.forEach(evento => {
            td.appendChild(evento);
        });
        calendario.appendChild(tabla);
        tabla.appendChild(filas);
        //console.log(primerDia);
=======
        let eventos = nodoEventos(dia, data);
        eventos.forEach(evento => {
            td.appendChild(evento);
        });
>>>>>>> feature-pruebas
        if (filas.children.length === 7) {
            tabla.appendChild(filas);
            filas = document.createElement("tr");
        }
        if (dia == new Date().getDate()) {
            divNros.style.color = "#ff6f61";
<<<<<<< HEAD
        }
        //colo a fin de semana
        let finde = filas.children.length;
        if (finde === 6 || finde === 7) {
            td.style.background = "#ffebeb";
        }
=======
        }
        //color a fin de semana
        let finde = filas.children.length;
        if (finde === 0 || finde === 6) {
            td.style.background = "#fde2e2";
        }
>>>>>>> feature-pruebas
    }
    if (filas.children.length > 0) {
        tabla.appendChild(filas);
    }
    //celdas vacias en la ultima fila
    let ultimoDia = new Date(anio, mes + 1, 0).getDay();
    let celdasFaltantes = 7 - ultimoDia;
    for (let i = 0; i < celdasFaltantes; i++) {
        let td = document.createElement("td");
        filas.appendChild(td);
    }
    tabla.appendChild(filas);

<<<<<<< HEAD
}


document.addEventListener('DOMContentLoaded', function () {
    fetch('datos.json').then(response => {
        return response.json();
    }).then(data => {
        //console.log(data);
        crearCalendario(data);

    });
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

    divContenedor_h2_divEvento=document.createElement("div");
    divContenedor_h2_divEvento.classList.add("divContenedor_h2_divEvento");

    for (let i = 0; i < data.length; i++) {
        fechaInicio = new Date(data[i].fechaAlta);
        fechaFin = new Date(data[i].fechaFinalizacion);
        //normalizar horas
        fechaInicio.setHours(0, 0, 0, 0);
        fechaFin.setHours(0, 0, 0, 0);
        if (fecha.getTime() == fechaInicio.getTime()) {
            let divEvento = document.createElement("div");
            
            divEvento.classList.add("div-eventos");
            divEvento.style.backgroundColor = data[i].color;
            let titulo = document.createElement("h2");
            titulo.classList.add('titulo');
            titulo.style.backgroundColor = data[i].color;

            //completar datos de json al div
            let alta = document.createElement("p");
            alta.textContent = `Fecha de inicio: ${data[i].fechaAlta}`;
            divEvento.appendChild(alta);

            let fin = document.createElement("p");
            fin.textContent = `Finalización: ${data[i].fechaFinalizacion}`;
            divEvento.appendChild(fin);

            let cliente = document.createElement("p");
            cliente.textContent = `Cliente: ${data[i].cliente}`;
            divEvento.appendChild(cliente);

            let contacto = document.createElement("p");
            contacto.textContent = `Contacto: ${data[i].contacto}`;
            divEvento.appendChild(contacto);
            //console.log(p);
            

             let eventoId2 = `evento_${i}`;
            // console.log(eventoId2);
             if (!posicionesGlobales2[eventoId2]) {
                posicionesGlobales2[eventoId2] = Object.keys(posicionesGlobales2).length + 1;
             }
             if (!posicionesGlobales2[data[i].titulo]) {
                 posicionesGlobales2[data[i].titulo] = Object.keys(posicionesGlobales2).length + 1;
             }
             let posicionIndex2 = posicionesGlobales2[eventoId2];
             titulo.style.marginTop = `${(posicionIndex2 - 4) * 8}px`; // Separación vertical fija
            titulo.textContent = data[i].titulo;
            
            divContenedor_h2_divEvento.appendChild(titulo);
            divContenedor_h2_divEvento.appendChild(divEvento);
            nodo.push(divContenedor_h2_divEvento);
            

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
         divcolor.style.marginTop = `${(posicionIndex -4) * 8}px`; // Separación vertical fija

            divContenedor.appendChild(divcolor);
            nodo.push(divContenedor);
        }
    }

    // if (divContenedor.children.length > 0) {
    //     nodo.push(divContenedor);
    // }

    return nodo;

}
=======
    calendario.appendChild(tabla);
    //console.log(primerDia);
}
//creamos fetch para leer el archivo .json
document.addEventListener("DOMContentLoaded", function () {
    fetch("eventos.json").then(response => response.json()).then(data => {
        crearCalendario(data);
    })
    meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    mesActual = meses[mes];
    let divMeses = document.querySelector("#meses span");
    divMeses.textContent = mesActual + " - " + anio;

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
        let divcolor = document.createElement("div");
        divcolor.classList.add("divcolor");
        divcolor.style.backgroundColor = data[i].color;

        //comparamos fecha-calendario con fecha-evento,  solo fechas(sin horas) muestra detalles (primer dia evento)
        if (fecha.toDateString() == new Date(fechaInicio).toDateString()) {
            let divtitEven = document.createElement("div");
            divtitEven.classList.add("divtitEven");

            let h2 = document.createElement("h2");
            h2.classList.add("titulo");
            h2.textContent = data[i].titulo;
            h2.style.backgroundColor = data[i].color;
            divtitEven.appendChild(h2)
            divTitulos.appendChild(divtitEven);
            //creamos div para restode eventos
            let totalEventos = document.createElement("div");
            totalEventos.classList.add("totalEventos");

            //resto de eventos
            let inicio = document.createElement("p");
            inicio.textContent = `Inicio: ${data[i].fechaAlta}`;
            totalEventos.appendChild(inicio);
            divtitEven.appendChild(totalEventos);

            let fin = document.createElement("p");
            fin.style.backgroundColor = data[i].color;
            fin.textContent = `Fin: ${data[i].fechaFinalizacion}`;
            totalEventos.appendChild(fin);

            let cliente = document.createElement("p");
            cliente.textContent = `Cliente: ${data[i].cliente}`;
            totalEventos.appendChild(cliente);

            let contacto = document.createElement("p");
            contacto.textContent = `contacto: ${data[i].contacto}`;
            totalEventos.appendChild(contacto);

            divTitulos.appendChild(divtitEven);

            //aplicamos evento click en h2
            h2.addEventListener("click", function () {
                if (!totalEventos.style.display || totalEventos.style.display === "none") {
                    totalEventos.style.display = "block";

                } else {
                    totalEventos.style.display = "none";
                }
            });

            // document.addEventListener("click", function (e) {
            //     if(!e.target.matches(".titulo")){
            //         totalEventos.style.display="none";
            //     }else{
            //         totalEventos.style.display="block";
            //     }
            // });
            nodos.push(divTitulos);

        }
        //fechaInicio y fechaFin
        else if (fecha.getTime() > new Date(fechaInicio).getTime() && fecha.getTime() <= new Date(fechaFin).getTime() && fecha.getDay() !== 0 && fecha.getDay() !== 6) {
            let divColor = document.createElement("div");
            divColor.classList.add("divColor");
            divColor.style.backgroundColor = data[i].color;
            divTitulos.appendChild(divColor);
            nodos.push(divTitulos);
        }
    }
    return nodos;
}

//aumentar mes
function avanzarMes() {
    mes += 1;
    if (mes > 11) {
        mes = 0;
        anio += 1;
    }
    mesActual = meses[mes];
    let divMeses = document.querySelector("#meses span");
    divMeses.textContent = mesActual + " - " + anio;
    fetch("eventos.json").then(response => response.json()).then(data => {
        crearCalendario(data);
    });
}
//disminuir mes
function disminuirMes() {
    mes -= 1;
    if (mes < 0) {
        mes = 11;
        anio -= 1;
    }
    mesActual = meses[mes];
    let divMeses = document.querySelector("#meses span");
    divMeses.textContent = mesActual + " - " + anio;
    fetch("eventos.json").then(response => response.json()).then(data => {
        crearCalendario(data);
    });
}

//ventana nodal
function mostrar() {
    //document.querySelector(".popup").style.display="block";
    const popup = document.querySelector('.popup');
    popup.classList.add('show'); // Aparece
    popup.style.pointerEvents="auto";
    setTimeout(() => {
        document.getElementById("titulo").focus();
        //ocultamos eventos
        let ocultarDiv = document.querySelectorAll(".totalEventos");
        ocultarDiv.forEach((divEven) => {
            divEven.style.display = "none";
        })
    }, 100);

}

function ocultar() {
    // document.querySelector(".popup").style.display="none";
    const popup = document.querySelector('.popup');
    popup.classList.remove('show'); // Desaparece
    let valInput=document.querySelectorAll('.inp');
    valInput.forEach(function(val){
        val.value="";
    })
    popup.style.pointerEvents="none";

    
}
//envio de formulario
let formulario = document.getElementById("formulario");
formulario.addEventListener("submit", function (e) {
    e.preventDefault();
    //console.log("click");
    let datosForm = new FormData(formulario);
    //(datosForm.get("cliente"));
    fetch("eventos.php", {
        method: "POST",
        body: datosForm
    }).then(response => {
        // console.log(response);
        return response.text();
    }).then(data => {
        alert(data);
        location.reload();
    }).catch(error => {
        console.error('Error:', error);
    });
   
})
>>>>>>> feature-pruebas
