document.addEventListener('DOMContentLoaded', () => {
    // Premium Loading Transition
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease-in-out';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // Mistake Carousel Drag to Scroll Logic
    const carousels = document.querySelectorAll('.mistake-carousel');
    carousels.forEach(carousel => {
        let isDown = false;
        let startX;
        let scrollLeft;

        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            carousel.style.cursor = 'grabbing';
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });
        carousel.addEventListener('mouseleave', () => {
            isDown = false;
            carousel.style.cursor = 'grab';
        });
        carousel.addEventListener('mouseup', () => {
            isDown = false;
            carousel.style.cursor = 'grab';
        });
        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2; // Scroll-fast
            carousel.scrollLeft = scrollLeft - walk;
        });
    });

    // Unified WhatsApp Configuration & CTA Redirects
    const whatsappNumber = "917738096145"; // Real Contact: +91 7738096145
    const whatsappMessage = encodeURIComponent("Hello Gradeup! I want to inquire regarding IGCSE tutoring.");
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    // Redirect all CTA links & buttons to WhatsApp
    document.addEventListener('click', (e) => {
        const target = e.target.closest('a, button');
        if (!target) return;

        const href = target.getAttribute('href') || '';
        const classes = target.className || '';

        // Check if the link points to enrollment or is a WhatsApp CTA button/link
        const isEnrollCta = href.includes('#enroll');
        const isWhatsappLink = href.includes('wa.me');
        const isWhatsappClass = classes.includes('btn-whatsapp') || 
                                 classes.includes('whatsapp-float') || 
                                 classes.includes('btn-whatsapp-footer') || 
                                 classes.includes('btn-whatsapp-cta');

        if (isEnrollCta || isWhatsappLink || isWhatsappClass) {
            e.preventDefault();
            window.open(whatsappUrl, '_blank');
        }
    });

    // Premium Reveal System (Blur-to-Focus)
    const premiumObserverOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const premiumObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.classList.contains('reveal-blur')) {
                    entry.target.style.filter = 'blur(0)';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }
            }
        });
    }, premiumObserverOptions);

    document.querySelectorAll('.reveal, .reveal-blur').forEach(el => {
        premiumObserver.observe(el);
    });

    // Parallax Effect for Floating Orbs
    document.addEventListener('mousemove', (e) => {
        const orbs = document.querySelectorAll('.glow-orb');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 20;
            orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });

    // Hero Floating Cards Interaction
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        heroVisual.addEventListener('mousemove', (e) => {
            const cards = heroVisual.querySelectorAll('.floating-card');
            const rect = heroVisual.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            cards.forEach((card, index) => {
                const depth = (index + 1) * 30;
                card.style.transform = `translate(${x * depth}px, ${y * depth}px) rotate(${x * 5}deg)`;
            });
        });

        heroVisual.addEventListener('mouseleave', () => {
            const cards = heroVisual.querySelectorAll('.floating-card');
            cards.forEach(card => {
                card.style.transform = `translate(0, 0) rotate(0deg)`;
            });
        });
    }

    // All CTAs are unified and handled by the document click listener above

    // Mobile Menu
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }
});


