// Capturamos los inputs y el botón
const inputName = document.getElementById('inputName');
const inputEmail = document.getElementById('inputEmail');
const inputNumber = document.getElementById('inputNumber');
const inputProject = document.getElementById('inputProject');
const textArea = document.getElementById('moreInformation'); // Opcional
const submitButton = document.getElementById('submitButton');

// Función para validar los campos
// Modificamos la función validateFields para que retorne un valor
function validateFields() {
    let incompleteFields = [];
    let isValid = true; // Asumimos que todos los campos son válidos inicialmente
  
    // Validamos cada campo obligatorio
    if (inputName.value.trim() === "") {
        incompleteFields.push("Name");
        inputName.style.border = "1px solid red"; // Borde rojo para incompleto
        isValid = false; // Marcamos como inválido
    } else {
        inputName.style.border = "1px solid green"; // Borde verde para completo
    }

    if (inputEmail.value.trim() === "") {
        incompleteFields.push("Email");
        inputEmail.style.border = "1px solid red";
        isValid = false;
    } else {
        inputEmail.style.border = "1px solid green";
    }

    if (inputNumber.value.trim() === "") {
        incompleteFields.push("Phone Number");
        inputNumber.style.border = "1px solid red";
        isValid = false;
    } else {
        inputNumber.style.border = "1px solid green";
    }

    if (inputProject.value.trim() === "") {
        incompleteFields.push("Project");
        inputProject.style.border = "1px solid red";
        isValid = false;
    } else {
        inputProject.style.border = "1px solid green";
    }

    // El text-area es opcional, pero se puede destacar si se completa
    if (textArea.value.trim() !== "") {
        textArea.style.border = "2px solid green";
    } else {
        textArea.style.border = ""; // Borde original
    }

    // Mostrar alertas si hay campos incompletos
    if (incompleteFields.length > 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            html: `Please complete the following fields:<br><strong>${incompleteFields.join(", ")}</strong>`,
            confirmButtonText: 'Accept',
            confirmButtonColor: '#D33'
        });
    }

    return isValid; // Retorna true si todo está completo, false si falta algo
}
  
// Evento en el botón de enviar
submitButton.addEventListener('click', (e) => {
    e.preventDefault(); // Prevenimos la acción por defecto del botón
  
    // Llamamos a la función de validación
    const isValid = validateFields();
  
    if (!isValid) {
        // Si los campos no son válidos, detenemos la ejecución
        return;
    }
  
    // Mostrar la alerta de éxito con confirmación para enviar el correo
    Swal.fire({
        icon: 'success',
        title: 'Contact made!',
        text: 'Your information is ready to be sent.',
        confirmButtonText: 'Send Email',
        confirmButtonColor: '#3085d6'
    }).then(() => {
        // Código para abrir el cliente de correo después de confirmar
        const name = inputName.value.trim();
        const email = inputEmail.value.trim();
        const phone = inputNumber.value.trim();
        const project = inputProject.value.trim();
        const additionalInfo = textArea.value.trim(); // Opcional
    
        // Creamos el enlace `mailto` dinámicamente
        const recipientEmail = 'mnp.softdev@gmail.com';
        const subject = `Formulario de contacto: Proyecto ${project}`;
        const body = `¡Hola, Mauricio! ¿Cómo estás? 😀 \n Este es mi mensaje para tí... ✍🏽 \n
          Nombre: ${name}
          Email: ${email}
          Teléfono: ${phone}
          Proyecto: ${project}
          Información adicional: ${additionalInfo}
        `;
    
        // Reemplazamos espacios por caracteres válidos en el enlace
        const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
        // Abrimos el cliente de correo
        window.location.href = mailtoLink;
    });
});