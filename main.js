document.addEventListener('DOMContentLoaded', () => {
    // WhatsApp Configuration
    const whatsappNumber = "917738096145"; // Real Contact: +91 7738096145
    const whatsappMessage = encodeURIComponent("Hello Gradeup! I would like to inquire about coaching for my child.");

    // Update all WhatsApp buttons
    const whatsappBtns = document.querySelectorAll('.btn-whatsapp, .whatsapp-float, .btn-whatsapp-footer');
    whatsappBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
        });
    });

    // Enrollment Form Submission
    const enrollmentForm = document.getElementById('enrollmentForm');
    const formStatus = document.getElementById('formStatus');

    if (enrollmentForm) {
        enrollmentForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = enrollmentForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            const formData = new FormData(enrollmentForm);
            
            // Premium Loading State
            submitBtn.innerText = "Sending...";
            submitBtn.disabled = true;
            submitBtn.style.opacity = "0.7";

            try {
                const response = await fetch(enrollmentForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success State
                    submitBtn.innerText = "Request Sent!";
                    submitBtn.style.background = "#059669";
                    submitBtn.style.opacity = "1";
                    
                    if (formStatus) {
                        formStatus.innerText = "Thank you! We have received your request and will contact you shortly.";
                        formStatus.style.display = "block";
                        formStatus.style.color = "#059669";
                    }

                    enrollmentForm.reset();
                    
                    // Reset button after 5 seconds
                    setTimeout(() => {
                        submitBtn.innerText = originalText;
                        submitBtn.style.background = "";
                        submitBtn.disabled = false;
                        submitBtn.style.opacity = "1";
                        if (formStatus) formStatus.style.display = "none";
                    }, 5000);

                } else {
                    throw new Error("Form submission failed");
                }
            } catch (error) {
                // Error State
                submitBtn.innerText = "Error!";
                submitBtn.style.background = "#dc2626";
                
                if (formStatus) {
                    formStatus.innerText = "Oops! Something went wrong. Please try again or chat on WhatsApp.";
                    formStatus.style.display = "block";
                    formStatus.style.color = "#dc2626";
                }

                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.style.background = "";
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = "1";
                }, 3000);
            }
        });
    }

    // Intersection Observer for scroll animations (Refined)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, observerOptions);

    // Observe all elements with the 'reveal' class
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // Also observe existing sections for backward compatibility or general scroll feel
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('reveal');
        observer.observe(section);
    });

    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close other items
                faqItems.forEach(i => i.classList.remove('active'));
                
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // Blog Filtering Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');

    if (filterBtns.length > 0 && blogCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const category = btn.getAttribute('data-category');

                blogCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                body.style.overflow = '';
            }
        });

        // Close menu when a link is clicked
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                body.style.overflow = '';
            });
        });
    }
});

