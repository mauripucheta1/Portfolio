//Capturamos los botones y las secciones
const buttonThemeLight = document.getElementById("buttonThemeLight");
const buttonThemeDark = document.getElementById("buttonThemeDark");
const sections = document.querySelectorAll(".sectionDark");
const gradient = document.querySelector('.sectionDarkGradient');
const cards = document.querySelectorAll('.contenedorTarjeta');
const body = document.body;

//Función para activar el modo oscuro
buttonThemeDark.addEventListener("click", () => {

    sections.forEach((section) => {
        section.classList.add('dark-theme');
    });

    gradient.classList.add('gradientDark');

    cards.forEach((card) => {
        card.classList.add('borderDark');
    })

    body.classList.add('dark-theme');
});

//Función para desactivar el modo oscuro
buttonThemeLight.addEventListener("click", () => {

    sections.forEach((section) => {
        section.classList.remove('dark-theme');
        section.classList.add('light-theme');
    });

    gradient.classList.remove('gradientDark');
    
    body.classList.remove('dark-theme');
});