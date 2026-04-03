document.addEventListener('DOMContentLoaded', () => {
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a, .cta-group a, .logo a');
    const sections = document.querySelectorAll('main section');
    const menuToggle = document.querySelector('.menu-toggle');
    const dropdowns = document.querySelectorAll('.dropdown');
    const submenus = document.querySelectorAll('.dropdown-submenu');

    function showSection(targetId) {
        sections.forEach(section => {
            section.style.opacity = '0';
            setTimeout(() => {
                if (section.id === targetId) {
                    section.classList.remove('hidden');
                    setTimeout(() => {
                        section.style.opacity = '1';
                    }, 50);
                } else {
                    section.classList.add('hidden');
                }
            }, 400);
        });
    }

    // Hamburger Menu Logic
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
        });
    }

    // Handle Dropdowns on Mobile
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                // Check if the click was on the parent link itself or its children
                const target = e.target.closest('a');
                if (target === link) {
                    // Only toggle if it's the parent link of a dropdown
                    if (dropdown.querySelector('.dropdown-content')) {
                        e.preventDefault();
                        e.stopPropagation();
                        dropdown.classList.toggle('active');
                    }
                }
            }
        });
    });

    submenus.forEach(submenu => {
        const link = submenu.querySelector('a');
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                const target = e.target.closest('a');
                if (target === link) {
                    if (submenu.querySelector('.submenu-content')) {
                        e.preventDefault();
                        e.stopPropagation();
                        submenu.classList.toggle('active');
                    }
                }
            }
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Internal links
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                // On mobile, if this link is a parent of a dropdown, don't navigate
                if (window.innerWidth <= 768) {
                    const isParent = link.parentElement.classList.contains('dropdown') || 
                                   link.parentElement.classList.contains('dropdown-submenu');
                    
                    // If it's a parent, the toggle logic above will handle it
                    if (isParent) return;
                }

                if (targetElement) {
                    e.preventDefault();
                    showSection(targetId);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    
                    // Close mobile menu
                    if (window.innerWidth <= 768) {
                        menuToggle.classList.remove('active');
                        navLinksContainer.classList.remove('active');
                    }
                }
            }
        });
    });

    // Initial setup for fade transitions
    sections.forEach(section => {
        section.style.transition = 'opacity 0.5s ease';
        if (section.id !== 'home') {
            section.classList.add('hidden');
            section.style.opacity = '0';
        } else {
            section.style.opacity = '1';
        }
    });
});