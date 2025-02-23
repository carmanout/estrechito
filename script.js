document.addEventListener('DOMContentLoaded', function () {
    // Selecciona el contenedor del carrusel
    const slider = document.querySelector('.scrolling-wrapper');
    let isDown = false; // Variable para saber si el ratón está presionado
    let startX; // Coordenada X inicial cuando se presiona el ratón
    let scrollLeft; // Posición de desplazamiento inicial

    // Evento cuando se presiona el ratón
    slider.addEventListener('mousedown', (e) => {
        isDown = true; // Indica que el ratón está presionado
        slider.classList.add('active'); // Añade una clase para indicar que está activo
        startX = e.pageX - slider.offsetLeft; // Calcula la posición X inicial
        scrollLeft = slider.scrollLeft; // Guarda la posición de desplazamiento inicial
    });

    // Evento cuando el ratón sale del contenedor
    slider.addEventListener('mouseleave', () => {
        isDown = false; // Indica que el ratón ya no está presionado
        slider.classList.remove('active'); // Quita la clase activa
    });

    // Evento cuando se suelta el ratón
    slider.addEventListener('mouseup', () => {
        isDown = false; // Indica que el ratón ya no está presionado
        slider.classList.remove('active'); // Quita la clase activa
    });

    // Evento cuando se mueve el ratón
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return; // Si el ratón no está presionado, no hace nada
        e.preventDefault(); // Previene el comportamiento por defecto
        const x = e.pageX - slider.offsetLeft; // Calcula la nueva posición X
        const walk = (x - startX); // Calcula la distancia movida
        slider.scrollLeft = scrollLeft - walk; // Desplaza el contenedor
    });

    // Scroll infinito
    const items = document.querySelectorAll('.scrolling-wrapper .col-12'); // Selecciona todos los elementos del carrusel
    const cloneFirst = items[0].cloneNode(true); // Clona el primer elemento
    const cloneLast = items[items.length - 1].cloneNode(true); // Clona el último elemento
    slider.appendChild(cloneFirst); // Añade el clon del primer elemento al final
    slider.insertBefore(cloneLast, items[0]); // Añade el clon del último elemento al principio

    // Evento cuando se desplaza el contenedor
    slider.addEventListener('scroll', () => {
        // Si se llega al final del contenedor, vuelve al principio
        if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 1) {
            slider.scrollLeft = 2;
        // Si se llega al principio del contenedor, vuelve al final
        } else if (slider.scrollLeft <= 0) {
            slider.scrollLeft = slider.scrollWidth - slider.clientWidth - 4;
        }
    });

    // Ajusta la posición inicial de desplazamiento al primer elemento real
    slider.scrollLeft = items[0].offsetWidth;

    // Selecciona todos los enlaces del menú
    const menuLinks = document.querySelectorAll('.navbar-nav a');

    // Añade un evento de clic a cada enlace
    menuLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // Previene el comportamiento por defecto del enlace

            // Obtiene el ID de la sección a la que se debe desplazar
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            // Desplazamiento suave hacia la sección objetivo
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
