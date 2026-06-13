// js/main.js

document.addEventListener("DOMContentLoaded", function () {
    console.log("Moda ECCI Vlog - JavaScript local cargado correctamente.");

    // Botón flotante dinámico para simular la accesibilidad en escala de grises
    const botonAccesibilidad = document.createElement("button");
    botonAccesibilidad.innerHTML = "👁️ Conmutar Escala de Grises";
    botonAccesibilidad.className = "btn btn-danger position-fixed bottom-0 end-0 m-4 z-3 shadow-lg fw-bold";
    botonAccesibilidad.setAttribute("id", "btn-accesibilidad");
    document.body.appendChild(botonAccesibilidad);

    // Lógica interactiva para aplicar el filtro
    botonAccesibilidad.addEventListener("click", function () {
        document.body.classList.toggle("view-grayscale");
        
        const alertaExistente = document.getElementById("alerta-filtro");
        if (!alertaExistente) {
            const alerta = document.createElement("div");
            alerta.id = "alerta-filtro";
            alerta.className = "alert alert-warning alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3 z-3 shadow";
            alerta.setAttribute("role", "alert");
            alerta.innerHTML = `
                <strong>Prueba del Vlog:</strong> Se ha activado el filtro en escala de grises para evaluar el contraste visual del sitio.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;
            document.body.appendChild(alerta);
            
            setTimeout(() => {
                alerta.remove();
            }, 4000);
        }
    });

    // Reemplaza cualquier imagen faltante con un marcador local.
    const placeholderImg = "img/placeholder.svg";
    document.querySelectorAll("img").forEach((img) => {
        img.addEventListener("error", () => {
            if (!img.src.endsWith(placeholderImg)) {
                img.src = placeholderImg;
            }
        });
    });

    // Lightbox: abrir imagen en modal al hacer clic, con navegación y soporte de teclado
    const lightboxModalEl = document.getElementById('lightboxModal');
    if (lightboxModalEl) {
        const bsModal = new bootstrap.Modal(lightboxModalEl);
        const thumbs = Array.from(document.querySelectorAll('.gallery-img'));

        // habilitar carga perezosa y asignar índices
        thumbs.forEach((thumb, i) => {
            thumb.loading = 'lazy';
            thumb.dataset.index = i;
            thumb.style.cursor = 'pointer';
        });

        const lbImg = document.getElementById('lightboxImage');
        let currentIndex = 0;

        function showAt(index) {
            if (index < 0) index = thumbs.length - 1;
            if (index >= thumbs.length) index = 0;
            const src = thumbs[index].src;
            if (lbImg) lbImg.src = src;
            currentIndex = index;
        }

        thumbs.forEach((thumb, i) => {
            thumb.addEventListener('click', () => {
                showAt(i);
                bsModal.show();
            });
        });

        const prevBtn = document.getElementById('lightboxPrev');
        const nextBtn = document.getElementById('lightboxNext');
        if (prevBtn) prevBtn.addEventListener('click', () => showAt(currentIndex - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => showAt(currentIndex + 1));

        // keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!document.querySelector('.modal.show')) return;
            if (e.key === 'ArrowRight') showAt(currentIndex + 1);
            if (e.key === 'ArrowLeft') showAt(currentIndex - 1);
            if (e.key === 'Escape') bsModal.hide();
        });
    }
});