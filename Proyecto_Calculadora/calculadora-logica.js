let valorAcumulado = ""; 
let operadorActual = "";

function mostrarPantalla(valorBtn) {
    const valorBoton = valorBtn.target.innerText;
    let inputPantalla = document.getElementById("pantalla");

    // SI ES UN NÚMERO
    if (valorBoton != "+" && valorBoton != "-" && valorBoton != "/" && valorBoton != "*") {
        inputPantalla.value += valorBoton; 
    } 
    // SI ES UN OPERADOR
    else {
        if (valorAcumulado === "") {
            // PRIMERA OPERACIÓN: Solo guardamos el primer número
            valorAcumulado = inputPantalla.value;
        } else {
            // SEGUNDA O MÁS OPERACIONES: Calculamos antes de seguir
            // El valor actual es lo que está en pantalla ahora
            let valorActualEnPantalla = inputPantalla.value;
            
            // Llamamos a la función y guardamos el resultado como el nuevo "acumulado"
            valorAcumulado = calcularOperacion(valorAcumulado, valorActualEnPantalla, operadorActual);
            
            // Mostramos el resultado parcial en consola o pantalla
            console.log(`Resultado parcial: ${valorAcumulado}`);
        }

        // Guardamos el nuevo operador que se acaba de pulsar
        operadorActual = valorBoton;
        // Limpiamos la pantalla para el siguiente número
        inputPantalla.value = ""; 
    }
}

function calcularOperacion(v1, v2, op) {
    // Si v2 está vacío (el usuario no escribió el segundo número aún)
    // devolvemos v1 para evitar el NaN
    if (v2 === "") return v1;

    let num1 = parseFloat(v1);
    let num2 = parseFloat(v2);
    
    // Verificación extra por seguridad
    if (isNaN(num1) || isNaN(num2)) return v1;

    let resultado = 0;
    if (op === "+") resultado = num1 + num2;
    if (op === "-") resultado = num1 - num2;
    if (op === "*") resultado = num1 * num2;
    if (op === "/") resultado = num1 / num2;

    return resultado.toString();
}
function mostrarResultadoEnPantalla() {
    const inputPantalla = document.getElementById("pantalla");
    let valorActualEnPantalla = inputPantalla.value;

    // Hacemos el último cálculo pendiente
    if (valorAcumulado !== "" && operadorActual !== "") {
        valorAcumulado = calcularOperacion(valorAcumulado, valorActualEnPantalla, operadorActual);
    }

    // Ahora sí, mostramos el resultado final
    inputPantalla.value = valorAcumulado;
    
    // Limpiamos las variables para una nueva operación
    operadorActual = "";
    // OJO: No limpies valorAcumulado si quieres seguir operando sobre el resultado
}