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
