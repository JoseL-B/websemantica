// JavaScript creado con Claude 3.5 Sonnet

/*
  Función para obtener parámetros de la URL
  @param {string} name - Nombre del parámetro a buscar en la URL
  @return {string} - Valor del parámetro o cadena vacía si no existe
 */
  function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

/*
  Función principal para filtrar artículos según la categoría seleccionada
  @param {string} filter - El filtro a aplicar (todos, tecnologia, opinion, etc)
 */
function filtrarArticulos(filter) {
    // Eliminar clase a--disabled de todos los enlaces para resetear el estado visual
    document.querySelectorAll('.categories a').forEach(link => {
        link.classList.remove('a--disabled');
    });
    
    // Añadir clase a--disabled al enlace seleccionado para destacarlo visualmente
    document.querySelector(`.categories a[data-filter="${filter}"]`).classList.add('a--disabled');
    
    // Variables para controlar si hay artículos y obtener el elemento del mensaje
    let hayArticulos = false;
    const mensajeNoArticulos = document.getElementById('no-articles');
    
    // Recorrer todos los artículos para mostrar u ocultar según el filtro
    document.querySelectorAll('.article-card').forEach(article => {
        if (filter === 'todos') {
            // Si el filtro es 'todos', mostrar el artículo y marcar que hay artículos
            article.style.display = '';
            hayArticulos = true;
        } else {
            // Obtener los tags del artículo y comprobar si incluye el filtro seleccionado
            const tags = article.dataset.tags.split(',');
            if (tags.includes(filter)) {
                // Si el artículo tiene el tag, mostrarlo y marcar que hay artículos
                article.style.display = '';
                hayArticulos = true;
            } else {
                // Si el artículo no tiene el tag, ocultarlo
                article.style.display = 'none';
            }
        }
    });

    // Mostrar u ocultar el mensaje de "no hay artículos" según corresponda
    mensajeNoArticulos.style.display = hayArticulos ? 'none' : '';
}

/*
  Función para crear visualmente los tags en cada artículo
  Genera elementos span para cada tag dentro de un contenedor
*/
function crearTagsVisuales() {
    document.querySelectorAll('.article-card').forEach(article => {
        // Obtener los tags del atributo data-tags y crear el contenedor
        const tags = article.dataset.tags.split(',');
        const tagsContainer = document.createElement('div');
        tagsContainer.className = 'article-tags';
        
        // Crear un span para cada tag y añadirlo al contenedor
        tags.forEach(tag => {
            const tagSpan = document.createElement('span');
            tagSpan.className = 'tag';
            tagSpan.textContent = tag;
            tagsContainer.appendChild(tagSpan);
        });
        
        // Añadir el contenedor de tags al artículo
        article.appendChild(tagsContainer);
    });
}

// Modificar los enlaces del menú de categorías para incluir los parámetros en la URL
document.querySelectorAll('.categories a').forEach(link => {
    const filter = link.dataset.filter;
    // Actualizar el href del enlace para incluir el parámetro tag
    if (filter === 'todos') {
        link.href = window.location.pathname;
    } else {
        link.href = `?tag=${filter}`;
    }

    link.addEventListener('click', (e) => {
        // Prevenir el comportamiento por defecto del enlace
        e.preventDefault();
        
        // Actualizar la URL con el nuevo filtro
        if (filter === 'todos') {
            history.pushState({}, '', window.location.pathname);
        } else {
            history.pushState({}, '', `?tag=${filter}`);
        }
        
        // Aplicar el filtro
        filtrarArticulos(filter);
    });
});

// Inicialización cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Crear los tags visuales
    crearTagsVisuales();
    
    // Obtener el parámetro 'tag' de la URL
    const tagFromUrl = getUrlParameter('tag');
    
    // Si existe un tag en la URL y es válido, usarlo como filtro, si no, mostrar todos
    if (tagFromUrl && document.querySelector(`.categories a[data-filter="${tagFromUrl}"]`)) {
        filtrarArticulos(tagFromUrl);
    } else {
        filtrarArticulos('todos');
    }
});