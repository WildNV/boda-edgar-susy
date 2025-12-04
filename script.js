document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('wedding-form');
    const statusDiv = document.getElementById('status-message');
    const submitBtn = form.querySelector('.submit-btn');

    // URL real de tu Web App
    const URL_WEB_APP = "https://script.google.com/macros/s/AKfycbwDeAzWuRD2ZgPULZuEoLaFtBr2C5xehBtpIBEM1vwYHluS8pJuUe6nmGpzflp7yphwPQ/exec";

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        // Desactivar botón mientras envía
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;

        // Limpiar mensaje anterior
        statusDiv.textContent = '';
        statusDiv.className = 'status';

        fetch(URL_WEB_APP, {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }

            // Mensaje debajo del botón
            statusDiv.textContent = '¡Gracias! Tu confirmación ha sido registrada.';
            statusDiv.classList.add('ok');

            // Ventana emergente
            alert('Asistencia registrada. ¡Gracias por confirmar!');

            // Limpiar formulario
            form.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            statusDiv.textContent = 'Ocurrió un error al registrar tu asistencia. Intenta nuevamente.';
            statusDiv.classList.add('error');
            alert('Ocurrió un error al registrar tu asistencia. Intenta nuevamente.');
        })
        .finally(() => {
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        });
    });
});



