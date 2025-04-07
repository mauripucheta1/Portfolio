//Animación de telón
document.addEventListener("DOMContentLoaded", () => {
  // Animación del telón (splash)
  gsap.to("#splash", {
    y: "-100%", // Mueve el telón hacia arriba fuera de la pantalla
    duration: 1.5, // Duración de la animación en segundos
    ease: "power2.inOut", // Efecto de suavizado
    onUpdate: function () {
      // Obtén progreso de la animación y ajusta opacidad del contenido principal
      const progress = this.progress(); // Progreso de la animación (entre 0 y 1)
      const mainContent = document.getElementById("main-content");
      if (mainContent) {
        mainContent.style.opacity = progress; // Gradualmente aumenta la opacidad
      }
    },
    onComplete: function () {
      // Oculta el telón y asegura que el contenido sea visible
      const splash = document.getElementById("splash");
      const mainContent = document.getElementById("main-content");

      if (splash && mainContent) {
        splash.style.display = "none"; // Oculta el telón completamente
        mainContent.classList.remove("hidden"); // Muestra el contenido principal
        mainContent.style.opacity = 1; // Garantiza opacidad total
      }
    }
  });
});

//Animación header
//Seleccionamos todos los enlaces dentro del header
const links = document.querySelectorAll('.funtionalA');

links.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); //Evitamos el comportamiento predeterminado del enlace
        const sectionId = link.getAttribute('href'); //Obtenemos el ID de la sección
        const section = document.querySelector(sectionId); //Seleccionamos la sección

        section.scrollIntoView({
            behavior: 'smooth', //Desplazamiento suave
            block: 'start' //Alinea al inicio de la sección
        });
    });
});

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