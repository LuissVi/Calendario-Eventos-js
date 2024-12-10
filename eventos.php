<?php
header('Content-Type: application/json; charset=UTF-8');

$archivo = "eventos.json";
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!empty($_POST["titulo"]) && !empty($_POST["alta"]) && !empty($_POST["baja"]) && !empty($_POST["cliente"]) && !empty($_POST["contacto"]) && !empty($_POST["color"])) {

        $titulo = $_POST["titulo"];
        $alta = $_POST["alta"];
        $baja = $_POST["baja"];
        $cliente = $_POST["cliente"];
        $contacto = $_POST["contacto"];
        $color = $_POST["color"];



        //creamos evento para asociar
        $evento = [
            "fechaAlta" => $alta,
            "fechaFinalizacion" => $baja,
            "titulo" => $titulo,
            "cliente" => $cliente,
            "contacto" => $contacto,
            "color" => $color
        ];
        $hex = $_POST['color']; 

        //  color hexadecimal a RGBA
        if (preg_match('/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i', $hex, $matches)) {
            $r = hexdec($matches[1]);
            $g = hexdec($matches[2]);
            $b = hexdec($matches[3]);
            $opacity = 0.4; 
            $rgba = "rgba($r, $g, $b, $opacity)";

            $evento['color'] = $rgba;
        }
        //accedemos al archivo 

        if (file_exists($archivo)) {
            //leemos y convertimos a forma de  cadena
            $cadena = file_get_contents($archivo);
            //archivo convertimos a variable PHP
            $arrayAsociativo = json_decode($cadena, true);
        } else {
            $arrayAsociativo = [];
        }

        $arrayAsociativo[] = $evento;

        file_put_contents($archivo, json_encode($arrayAsociativo, JSON_PRETTY_PRINT));
        echo "evento agregado correctamente";
    } else {
        echo "complete los campos vacios";
    }
}
?>