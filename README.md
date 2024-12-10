# Calendario de eventos

Este proyecto es una aplicación web de calendario, permite crear eventos y vusualizarlos desde un calendario creado. Los eventos son añadidos mediante una ventana emergente(PopUp) donde se ingresan detalles del evento: Título, f. inicio, f. finalización,cliente,contacto, color.

## características:

- **Formulario Popup:** Permite crear eventos fácilmente con un formulario emergente.
- **Colores Personalizados:** Cada evento se muestra con un color único para facilitar su identificación.
- **Ignorar Fines de Semana:** Los eventos no se muestran en los fines de semana.
- **Interacción Dinámica:** Los eventos se almacenan y se recuperan  en PHP, utilizando `fetch` para enviar y recibir los datos.
- **Visualización de Eventos:** Los 'Títulos' se visualizan el primer día del evento de manera dinámica en el calendario, con los días de duración coloreados. Al hacer 'click' en el Título se mostrará el evento completo.

## Tecnologías Utilizadas:

- **HTML/CSS:** Para la estructura y el diseño visual del calendario y el formulario.
- **JavaScript:** Para la  creación e interacción con el calendario, incluyendo la creación de eventos y la visualización.
- **PHP:** Para procesar los datos del formulario y convertirlos a formato JSON.
- **Fetch API:** Para realizar solicitudes de datos al servidor (enviando y recibiendo información de los eventos).

## requisitos:

- Instalar XAMPP (apache,PHP).

