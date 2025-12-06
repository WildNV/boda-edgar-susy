document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('wedding-form');
    const statusDiv = document.getElementById('status-message');
    const submitBtn = form.querySelector('.submit-btn');

    // Popup elements
    const popup = document.getElementById('success-popup');
    const closePopupBtn = document.getElementById('close-popup-btn');

    // URL del Google Apps Script
    const URL_WEB_APP = "https://script.google.com/macros/s/AKfycbwDeAzWuRD2ZgPULZuEoLaFtBr2C5xehBtpIBEM1vwYHluS8pJuUe6nmGpzflp7yphwPQ/exec";

    // Close popup function
    const closePopup = () => {
        popup.classList.remove('show');
    };

    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', closePopup);
    }

    // Close on click outside
    if (popup) {
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                closePopup();
            }
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        // UI Updates: Disable button, show loading
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;

        // Clear previous status
        statusDiv.textContent = '';
        statusDiv.className = 'status';

        fetch(URL_WEB_APP, {
            method: "POST",
            body: formData
        })
            .then(response => {
                if (response.ok) {
                    // Éxito
                    console.log('Solicitud enviada correctamente');

                    // 1. Limpiar formulario
                    form.reset();

                    // 2. Mensaje elegante en página
                    statusDiv.textContent = '¡Gracias! Tu confirmación ha sido registrada.';
                    statusDiv.classList.add('ok');

                    // 3. Mostrar Popup personalizado
                    if (popup) {
                        popup.classList.add('show');
                    } else {
                        // Fallback si no existe el popup por alguna razón
                        alert('Asistencia registrada. ¡Gracias por confirmar!');
                    }
                } else {
                    // Error en respuesta del servidor
                    throw new Error('Error en la respuesta del servidor');
                }
            })
            .catch(error => {
                console.error('Error:', error);

                // Mensaje de error en página
                statusDiv.textContent = 'Ocurrió un error al registrar tu asistencia. Intenta nuevamente.';
                statusDiv.classList.add('error');

                // Ventana emergente de error
                alert('Ocurrió un error al registrar tu asistencia. Intenta nuevamente.');
            })
            .finally(() => {
                // Restaurar botón
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            });
    });
});





