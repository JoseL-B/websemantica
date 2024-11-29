// JavaScript creado con Claude 3.5 Sonnet

/*
    Permite calcular el tamaño del título con posicionamiento absoluto
    para poder así poner el texto justo debajo y que no se solape
*/

// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    const titulo = document.getElementById('titulo');
    const contenido = document.getElementById('contenido');

    function ajustarPosicionTexto() {
        // Obtiene la altura actual del título
        const alturaDelTitulo = titulo.offsetHeight;

        // Encuentra el primer elemento de texto dentro del contenido
        const primerElementoTexto = contenido.querySelector('p, div, span, h3');

        if (primerElementoTexto) {
            // Resetea el margen superior a 0 para evitar acumulación
            primerElementoTexto.style.marginTop = '0px';

            // Calcula la posición del borde inferior del título
            const posicionInferiorTitulo = titulo.getBoundingClientRect().bottom;

            // Calcula la posición del borde superior del primer elemento de texto
            const posicionSuperiorTexto = primerElementoTexto.getBoundingClientRect().top;

            // Calcula la diferencia
            const diferencia = posicionInferiorTitulo - posicionSuperiorTexto;

            // Aplica el nuevo margen superior si es necesario
            if (diferencia > 0) {
                primerElementoTexto.style.marginTop = `${diferencia}px`;
            }
        }
    }

    // Ejecuta la función de ajuste inicialmente
    ajustarPosicionTexto();

    // Vuelve a ajustar si la ventana cambia de tamaño
    window.addEventListener('resize', ajustarPosicionTexto);
});
