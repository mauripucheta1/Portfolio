//Animación de telón
document.addEventListener("DOMContentLoaded", () => {
  // Animación del telón (splash)
  gsap.to("#splash", {
    y: "-100%", 
    duration: 1.5, 
    ease: "power2.inOut", 
    onUpdate: function () {
      const progress = this.progress(); 
      const mainContent = document.getElementById("main-content");
      if (mainContent) {
        mainContent.style.opacity = progress; 
      }
    },
    onComplete: function () {
      // Oculta el telón y asegura que el contenido sea visible
      const splash = document.getElementById("splash");
      const mainContent = document.getElementById("main-content");

      if (splash && mainContent) {
        splash.style.display = "none"; 
        mainContent.classList.remove("hidden"); 
        mainContent.style.opacity = 1; 
      }
    }
  });
});

//Animación header
const links = document.querySelectorAll('.funtionalA');

links.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); 
        const sectionId = link.getAttribute('href'); 
        const section = document.querySelector(sectionId); 

        section.scrollIntoView({
            behavior: 'smooth', 
            block: 'start' 
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

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                spinContainer.classList.add("spin"); 

                setTimeout(() => {
                    spinContainer.classList.add("complete");
                }, 1000);
            } else {
                spinContainer.classList.remove("spin", "complete");
            }
        });
    }, {
        threshold: 0.5 
    });

    observer.observe(spinContainer.parentElement); 
});

//Animación para los SVG
document.addEventListener("DOMContentLoaded", () => {
    const svgs = document.querySelectorAll(".animated-svg");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            } else {
                entry.target.classList.remove("visible");
            }
        });
    }, {
        threshold: 0.5 
    });

    svgs.forEach((svg) => observer.observe(svg));
});

//Animación para la sideBar
const trigger = document.querySelector('.menu-trigger');
const sideContent = document.querySelector('.side-content');
const svgIcon = trigger.querySelector('svg');

trigger.addEventListener('click', () => {
  sideContent.classList.toggle('open'); 
  trigger.classList.toggle('move'); 
  svgIcon.classList.toggle('rotate-180'); 
});

//Animación carrrusel
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
}
  
//Función para animar los contadores
function animateCounters() {
    const counters = document.querySelectorAll('.contenedorCarrusel');
  
    counters.forEach(container => {
      const span = container.querySelector('.numero'); 
      const target = parseInt(span.getAttribute('data-target'), 6);
      let current = 0; // Valor inicial del contador
  
      if (isInViewport(container)) {
        if (!container.dataset.animated || container.dataset.animated === "false") {
          container.dataset.animated = "true"; 
  
          // Reiniciamos y comenzamos la animación del contador
          current = 0; 
          const interval = setInterval(() => {
            if (current < target) {
              current++;
              span.textContent = `+${current}`; 
            } else {
              clearInterval(interval); 
            }
          }, 100); 
        }
      } else {
        // Si sale del viewport, reinicia el estado y el contenido
        container.dataset.animated = "false";
        span.textContent = "+0"; 
      }
    });
}
  
// Evento scroll para activar la animación
window.addEventListener('scroll', animateCounters);