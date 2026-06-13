/**
 * Mafenda Creations - FAQ Interactive JS
 * Handles accordion expansion, search filtering, and category selection.
 * Integrates with Swup page transitions.
 */

(function () {
    "use strict";

    function initFaq() {
        // Check if we are on the FAQ page
        const faqList = document.querySelector('.ma-faq-list');
        if (!faqList) return;

        const cards = document.querySelectorAll('.ma-faq-card');
        const filterBtns = document.querySelectorAll('.ma-faq-filter-btn');
        const searchInput = document.getElementById('maFaqSearch');
        const noResults = document.querySelector('.ma-faq-no-results');

        let activeCategory = 'all';
        let searchQuery = '';

        const cleanString = str => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

        // --- 1. ACCORDION TOGGLE ---
        cards.forEach(card => {
            const btn = card.querySelector('.ma-faq-question-btn');
            const answerWrap = card.querySelector('.ma-faq-answer-wrap');

            // Reset inline styles on init
            answerWrap.style.maxHeight = null;
            answerWrap.style.opacity = null;
            card.classList.remove('active');

            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const isActive = card.classList.contains('active');

                // Close all other accordions
                cards.forEach(otherCard => {
                    if (otherCard !== card && otherCard.classList.contains('active')) {
                        otherCard.classList.remove('active');
                        const otherWrap = otherCard.querySelector('.ma-faq-answer-wrap');
                        otherWrap.style.maxHeight = '0px';
                        otherWrap.style.opacity = '0';
                    }
                });

                // Toggle current accordion
                if (isActive) {
                    card.classList.remove('active');
                    answerWrap.style.maxHeight = '0px';
                    answerWrap.style.opacity = '0';
                } else {
                    card.classList.add('active');
                    // Use scrollHeight for smooth auto height transition
                    answerWrap.style.maxHeight = answerWrap.scrollHeight + 'px';
                    answerWrap.style.opacity = '1';
                }
            });
        });

        // --- 2. FILTER & SEARCH LOGIC ---
        function filterFaqs() {
            let visibleCount = 0;

            cards.forEach(card => {
                const category = card.getAttribute('data-category');
                const title = cleanString(card.querySelector('.ma-faq-question-title').textContent);
                const content = cleanString(card.querySelector('.ma-faq-answer').textContent);

                const categoryMatches = (activeCategory === 'all' || category === activeCategory);
                const searchMatches = (title.includes(searchQuery) || content.includes(searchQuery));

                if (categoryMatches && searchMatches) {
                    card.style.display = 'block';
                    // Trigger a tiny fade-in animation
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    
                    // Close answer if hidden
                    card.classList.remove('active');
                    const answerWrap = card.querySelector('.ma-faq-answer-wrap');
                    answerWrap.style.maxHeight = '0px';
                    answerWrap.style.opacity = '0';
                }
            });

            // Show "no results" message if needed
            if (visibleCount === 0) {
                noResults.style.display = 'block';
                setTimeout(() => noResults.style.opacity = '1', 50);
            } else {
                noResults.style.display = 'none';
                noResults.style.opacity = '0';
            }
        }

        // --- 3. FILTER BUTTON EVENTS ---
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                activeCategory = btn.getAttribute('data-filter');
                filterFaqs();
            });
        });

        // --- 4. SEARCH INPUT EVENT ---
        if (searchInput) {
            searchInput.addEventListener('input', function (e) {
                searchQuery = cleanString(e.target.value.trim());
                filterFaqs();
            });
        }
    }

    // Initialize on page load and Swup content replaced
    $(document).ready(initFaq);
    document.addEventListener("swup:contentReplaced", initFaq);

})();
