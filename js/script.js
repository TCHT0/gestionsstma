document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA MODO OSCURO / CLARO ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Verificar si el usuario ya tenía una preferencia guardada
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun'); // Cambiar icono a sol
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Cambiar icono y guardar preferencia
        if (body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // --- LÓGICA MENÚ HAMBURGUESA (CELULAR) ---
    const hamburger = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Animación simple del icono (opcional: cambia de barras a X)
        const hamIcon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            hamIcon.classList.remove('fa-bars');
            hamIcon.classList.add('fa-times');
        } else {
            hamIcon.classList.remove('fa-times');
            hamIcon.classList.add('fa-bars');
        }
    });

    // Cerrar menú al hacer clic en un enlace (para mejor experiencia en celular)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) { // Solo en móvil
                navLinks.classList.remove('active');
                const hamIcon = hamburger.querySelector('i');
                hamIcon.classList.remove('fa-times');
                hamIcon.classList.add('fa-bars');
            }
        });
    });
});
// --- LÓGICA DE FILTRADO DE ARTÍCULOS ---
const categoryBtns = document.querySelectorAll('.cat-btn');
const articles = document.querySelectorAll('.blog-card');

categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // 1. Quitar la clase 'active' de todos los botones
        categoryBtns.forEach(b => b.classList.remove('active'));
        // 2. Poner la clase 'active' al botón que se presionó
        btn.classList.add('active');

        // 3. Obtener el texto del botón presionado (Ej: "Normativa")
        const filterValue = btn.textContent;

        // 4. Recorrer todos los artículos y decidir cuál mostrar
        articles.forEach(article => {
            // Buscamos la etiqueta dentro de la tarjeta
            const tag = article.querySelector('.blog-tag').textContent;

            if (filterValue === 'Todos') {
                article.style.display = 'flex'; // Mostrar todos
            } else if (tag === filterValue) {
                article.style.display = 'flex'; // Mostrar si coincide
            } else {
                article.style.display = 'none'; // Ocultar si no coincide
            }
        });
    });
});