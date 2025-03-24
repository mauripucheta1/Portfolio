//Selecciono el div que quiero que sea dinámico
const divHeroSection = document.getElementById('contenidoDinamico');

//Creo la función de cambiar contenido junto con la animación CSS
function cambiarContenidoAnimico() {
    //Selecciono los parrafos
    const mensajePrincipal = document.getElementById('mensajePrincipal');
    const mensajeComplemento = document.getElementById('mensajeComplemento');

    //Establezco un array de mensajes
    const mensajesDiv = [
        {principal: "I'm", complemento: 'Front and Backend Dev'},
        {principal: 'And', complemento: 'i love UX/UI Design'}
    ];

    //Defino un indice
    let indiceActual = 0;

    function cambiarContenido () {
    
        //Añado la animación
        mensajePrincipal.classList.add('rotate-animation');
        mensajeComplemento.classList.add('rotate-animation');

        //Cambiar el contenido después de un ciclo de animación
        setTimeout(() => {

            //Defino el contenido
            mensajePrincipal.textContent = mensajesDiv[indiceActual].principal;
            mensajeComplemento.textContent = mensajesDiv[indiceActual].complemento;

            //Elimino la clase para reanudar la animación
            mensajePrincipal.classList.remove('rotate-animation');
            mensajeComplemento.classList.remove('rotate-animation');

            //Muevo hacia el próximo contenido o vuelvo atrás para iniciarlo nuevamente
            indiceActual = (indiceActual + 1) % mensajesDiv.length;
        },500);
    }
    
    //Determino el intervalo para cambiar el contenido cada 3.5 segundos
    setInterval(cambiarContenido, 3500);

};    

//Iniciamos la animación apenas cargue la página
cambiarContenidoAnimico();

//Animación para el "About Me"
document.addEventListener("DOMContentLoaded", () => {
    const aboutMe = document.getElementById("about-me");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                aboutMe.classList.add("opacity-100");
                aboutMe.classList.remove("opacity-0");
            } else {
                aboutMe.classList.add("opacity-0");
                aboutMe.classList.remove("opacity-100");
            }
        });
    }, {
        threshold: 0.5 
    });

    observer.observe(aboutMe);
});

//Animación para el "Borde de perfíl"
document.addEventListener("DOMContentLoaded", () => {
    const spinContainer = document.querySelector(".spin-container");

    // Observador para detectar visibilidad
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                spinContainer.classList.add("spin"); // Activa el giro

                // Completa el borde tras 1s (duración del giro)
                setTimeout(() => {
                    spinContainer.classList.add("complete");
                }, 1000);
            } else {
                // Reinicia el borde al salir del viewport
                spinContainer.classList.remove("spin", "complete");
            }
        });
    }, {
        threshold: 0.5 // Activa la animación cuando el 50% del elemento es visible
    });

    observer.observe(spinContainer.parentElement); // Observa el contenedor padre
});

//Animación para los SVG
document.addEventListener("DOMContentLoaded", () => {
    const svgs = document.querySelectorAll(".animated-svg");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Añade la clase 'visible' para activar la animación
                entry.target.classList.add("visible");
            } else {
                // Elimina la clase 'visible' para reiniciar el estado
                entry.target.classList.remove("visible");
            }
        });
    }, {
        threshold: 0.5 // Activa la animación cuando el 50% del SVG sea visible
    });

    svgs.forEach((svg) => observer.observe(svg));
});

//Animación para la sideBar
const trigger = document.querySelector('.menu-trigger');
const sideContent = document.querySelector('.side-content');
const svgIcon = trigger.querySelector('svg'); // Seleccionamos el SVG

trigger.addEventListener('click', () => {
  sideContent.classList.toggle('open'); // Mostrar/ocultar el sidebar
  trigger.classList.toggle('move'); // Mueve el trigger
  svgIcon.classList.toggle('rotate-180'); // Aplica rotación de 180°
});

//Animación carrrusel
//Detecta si un elemento está en el viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
}
  
//Función para animar los contadores
function animateCounters() {
    const counters = document.querySelectorAll('.contenedorCarrusel');
  
    counters.forEach(container => {
      const span = container.querySelector('.numero'); // Número a incrementar
      const target = parseInt(span.getAttribute('data-target'), 10); // Valor objetivo
      let current = 0; // Valor inicial del contador
  
      if (isInViewport(container)) {
        if (!container.dataset.animated || container.dataset.animated === "false") {
          container.dataset.animated = "true"; // Marcamos como animado
  
          // Reiniciamos y comenzamos la animación del contador
          current = 0; // Reinicia el valor inicial
          const interval = setInterval(() => {
            if (current < target) {
              current++;
              span.textContent = `+${current}`; // Agregamos el "+" antes del número
            } else {
              clearInterval(interval); // Detenemos el contador al llegar al objetivo
            }
          }, 100); // Intervalo de tiempo entre cada incremento
        }
      } else {
        // Si sale del viewport, reinicia el estado y el contenido
        container.dataset.animated = "false";
        span.textContent = "+0"; // Reinicia con el "+" incluido
      }
    });
}
  
// Evento scroll para activar la animación
window.addEventListener('scroll', animateCounters);