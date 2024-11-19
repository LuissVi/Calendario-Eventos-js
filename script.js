var fecha = new Date();
var anio = fecha.getFullYear();
var mes = fecha.getMonth();
function crearCalendario() {
   
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
    if(primerDia===0){
        primerDia=7;
    }
    //celdas vacias
    let filas=document.createElement("tr")
    for (let i = 0; i < primerDia-1; i++) {
       let td=document.createElement("td");
       filas.appendChild(td);
    }
    tabla.appendChild(filas);
    //todas las celdas
    for (let dia = 1; dia <= totalDias; dia++) {
        let td=document.createElement("td");
        let divNros=document.createElement("div");
        divNros.classList.add("divNros");
        td.appendChild(divNros);
        divNros.textContent=dia;
        filas.appendChild(td);
        if(filas.children.length===7){
            tabla.appendChild(filas);
            filas=document.createElement("tr");
        }
        if(dia==new Date().getDate()){
            divNros.style.color="#ff6f61";
        }
        //colo a fin de semana
        let finde=filas.children.length;
        if(finde===0||finde===6){
            td.style.background="#ffebeb";
        }  
    }
    if(filas.children.length>0){
        tabla.appendChild(filas);
    }

    calendario.appendChild(tabla);
    console.log(primerDia);
}
crearCalendario();