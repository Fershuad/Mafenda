document.addEventListener('DOMContentLoaded', function() {
    // --- FILTER LOGIC ---
    const mainFilterBtns = document.querySelectorAll('.ma-filter-bar .ma-filter-btn');
    const subFilterBtns = document.querySelectorAll('.ma-subfilter-btn');
    const subFilterBars = document.querySelectorAll('.ma-subfilter-bar');
    const galleryItems = document.querySelectorAll('.ma-gallery-item');

    // Function to filter gallery
    const filterGallery = (filterValue) => {
        galleryItems.forEach(item => {
            if (filterValue === 'all') {
                item.classList.remove('hidden');
            } else {
                if (item.classList.contains(filterValue)) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            }
        });
    };

    // Main categories click
    if (mainFilterBtns) {
        mainFilterBtns.forEach(button => {
            button.addEventListener('click', function() {
                const filterValue = this.getAttribute('data-filter');
                const targetSubmenuId = this.getAttribute('data-target');

                // Active state for main buttons
                mainFilterBtns.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Hide all submenus
                subFilterBars.forEach(bar => bar.classList.remove('active'));

                // Show target submenu if exists
                if (targetSubmenuId) {
                    const targetSubmenu = document.getElementById(targetSubmenuId);
                    if(targetSubmenu) {
                        targetSubmenu.classList.add('active');
                        // Reset active state of submenus to the first 'all' button
                        const subBtns = targetSubmenu.querySelectorAll('.ma-subfilter-btn');
                        subBtns.forEach(btn => btn.classList.remove('active'));
                        if(subBtns.length > 0) {
                            subBtns[0].classList.add('active');
                        }
                    }
                }

                // Apply filter
                filterGallery(filterValue);
            });
        });
    }

    // Subcategories click
    if (subFilterBtns) {
        subFilterBtns.forEach(button => {
            button.addEventListener('click', function() {
                const filterValue = this.getAttribute('data-filter');
                
                // Active state for sub buttons within the same bar
                const siblingBtns = this.parentElement.querySelectorAll('.ma-subfilter-btn');
                siblingBtns.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Apply filter
                filterGallery(filterValue);
            });
        });
    }

    // --- MODAL LOGIC ---
    const modal = document.getElementById('customModal');
    if (modal) {
        const closeModalBtn = document.getElementById('closeModal');
        const modalImg = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const modalCategory = document.getElementById('modalCategory');
        const modalDesc = document.getElementById('modalDesc');

        // Open Modal
        galleryItems.forEach(item => {
            item.addEventListener('click', function(e) {
                // Prevenir comportamiento de link real si hubiera
                e.preventDefault();

                // Obtener datos
                const imgSrc = this.getAttribute('data-image');
                const title = this.querySelector('.ma-gallery-title').innerText;
                const category = this.querySelector('.ma-gallery-meta').innerHTML;
                const desc = this.getAttribute('data-description');

                // Llenar modal
                modalImg.src = imgSrc;
                modalTitle.innerText = title;
                modalCategory.innerHTML = category;
                modalDesc.innerText = desc || "Figura personalizada detallada, modelada a mano en porcelana fría con acabados de alta calidad.";

                // Mostrar modal
                modal.classList.add('active');
            });
        });

        // Close Modal via Button
        closeModalBtn.addEventListener('click', function() {
            modal.classList.remove('active');
        });

        // Close Modal via Background Click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
});
