/**
 * INFLUNEX PREMIUM AGENCY PORTAL SYSTEM CORE
 * ENGINE ARCHITECTURE: LENIS SMOOTH SCROLL • GSAP ANIMATION INTERACTIVES
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // Force direct alignment to absolute zero on dynamic reloads
    window.scrollTo(0, 0);

    // ==========================================
    // 1. MOTRIC SMOOTH SCROLLER CONFIGURATION
    // ==========================================
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync structural triggers directly to framework configurations
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);


    // ==========================================
    // 2. TIMED APPLICATION LIFECYCLE LOADER
    // ==========================================
    const loaderTimeline = gsap.timeline({
        onComplete: () => {
            document.body.style.overflow = "auto";
            lenis.start();
            initHeroAnimations();
        }
    });

    lenis.stop();
    document.body.style.overflow = "hidden";

    loaderTimeline.to(".loader-logo img", {
        scale: 1.1,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
    })
    .to(".loader-logo h2", {
        letterSpacing: "8px",
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.4")
    .to(".loader", {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
        delay: 0.4
    });


    // ==========================================
    // 3. PRECISION CURSOR INTERACTION
    // ==========================================
    const dotCursor = document.querySelector(".cursor-dot");
    const glowCursor = document.querySelector(".cursor-glow");

    if (dotCursor && glowCursor) {
        gsap.set([dotCursor, glowCursor], { xPercent: -50, yPercent: -50 });

        window.addEventListener("mousemove", (e) => {
            gsap.to(dotCursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
            gsap.to(glowCursor, { x: e.clientX, y: e.clientY, duration: 0.35, ease: "power2.out" });
        });

        // Interactive scales on hover
        const interactionTargets = document.querySelectorAll("a, button, .service-card, .portfolio-card, .faq-question");
        interactionTargets.forEach(target => {
            target.addEventListener("mouseenter", () => {
                gsap.to(dotCursor, { scale: 1.5, backgroundColor: "#ffffff" });
                gsap.to(glowCursor, { scale: 1.4, borderColor: "#ffffff", width: 50, height: 50 });
            });
            target.addEventListener("mouseleave", () => {
                gsap.to(dotCursor, { scale: 1, backgroundColor: "#D4AF37" });
                gsap.to(glowCursor, { scale: 1, borderColor: "rgba(212,175,55,0.4)", width: 44, height: 44 });
            });
        });
    }


    // ==========================================
    // 4. NAVIGATION ARCHITECTURE INTERACTIVES
    // ==========================================
    const navigationBar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navigationBar.classList.add("scrolled");
        } else {
            navigationBar.classList.remove("scrolled");
        }
    });

    // Mobile Panel Menu Toggle
    const menuToggleBtn = document.querySelector(".menu-btn");
    const mobilePanelOverlay = document.querySelector(".mobile-menu");
    const structuralPanelLinks = document.querySelectorAll(".mobile-menu a");

    function structuralMenuTeardown() {
        menuToggleBtn.classList.remove("active");
        mobilePanelOverlay.classList.remove("active");
        lenis.start();
    }

    if (menuToggleBtn && mobilePanelOverlay) {
        menuToggleBtn.addEventListener("click", () => {
            menuToggleBtn.classList.toggle("active");
            mobilePanelOverlay.classList.toggle("active");
            if (mobilePanelOverlay.classList.contains("active")) {
                lenis.stop();
            } else {
                lenis.start();
            }
        });

        structuralPanelLinks.forEach(link => {
            link.addEventListener("click", () => {
                structuralMenuTeardown();
            });
        });
    }


    // ==========================================
    // 5. MAGNETIC UI COMPONENT SYSTEM
    // ==========================================
    const magneticInteractiveNodes = document.querySelectorAll(".magnetic-target");
    if (window.innerWidth > 992) {
        magneticInteractiveNodes.forEach(node => {
            node.addEventListener("mousemove", (e) => {
                const innerBounds = node.getBoundingClientRect();
                const relativeDeltaX = e.clientX - innerBounds.left - (innerBounds.width / 2);
                const relativeDeltaY = e.clientY - innerBounds.top - (innerBounds.height / 2);
                
                gsap.to(node, {
                    x: relativeDeltaX * 0.35,
                    y: relativeDeltaY * 0.35,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            node.addEventListener("mouseleave", () => {
                gsap.to(node, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
            });
        });
    }


    // ==========================================
    // 6. SCROLL ANIMATIONS ENGINE
    // ==========================================
    
    // Core Entrance Track Sequencer
    function initHeroAnimations() {
        const heroEntranceTimeline = gsap.timeline();
        
        heroEntranceTimeline.from(".hero-badge", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        })
        .from(".hero h1", {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        }, "-=0.6")
        .from(".hero p", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.6")
        .from(".hero-buttons", {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out"
        }, "-=0.5")
        .from(".hero-stats .stat-card", {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            onComplete: () => {
                initMetricCounters();
            }
        }, "-=0.4");
    }

    // Performance Metric Metric Counter Interpolations
    function initMetricCounters() {
        const structuralCounters = document.querySelectorAll(".counter-val");
        structuralCounters.forEach(counter => {
            const structuralLimitValue = parseInt(counter.getAttribute("data-target"), 10);
            gsap.to(counter, {
                innerText: structuralLimitValue,
                duration: 2.5,
                snap: { innerText: 1 },
                ease: "power3.out",
                modifiers: {
                    innerText: function(value) {
                        return Math.floor(value) + (structuralLimitValue === 3 ? "X" : "+");
                    }
                }
            });
        });
    }

    // Content Heading Splits & Intros
    const dynamicRevealTitles = document.querySelectorAll(".reveal-text");
    dynamicRevealTitles.forEach(titleElement => {
        const textSplitInstance = new SplitType(titleElement, { types: 'lines, words' });
        
        gsap.from(textSplitInstance.words, {
            scrollTrigger: {
                trigger: titleElement,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            yPercent: 100,
            opacity: 0,
            duration: 0.85,
            stagger: 0.03,
            ease: "power3.out"
        });
    });

    // Content Block Element Reveals
    const generalSectionElements = document.querySelectorAll(".about-text p, .about-highlights .highlight, .glass-card, .service-card, .why-card, .portfolio-card, .step, .testimonial-card, .contact-card, .contact-form");
    generalSectionElements.forEach(elementNode => {
        gsap.from(elementNode, {
            scrollTrigger: {
                trigger: elementNode,
                start: "top 88%",
                toggleActions: "play none none none"
            },
            y: 45,
            opacity: 0,
            duration: 0.85,
            ease: "power3.out"
        });
    });


    // ==========================================
    // 7. COMPONENT CONTROLS: ACCORDIONS
    // ==========================================
    const faqInteractiveItems = document.querySelectorAll(".faq-item");
    faqInteractiveItems.forEach(item => {
        const actionButton = item.querySelector(".faq-question");
        const interiorPanel = item.querySelector(".faq-answer");

        actionButton.addEventListener("click", () => {
            const overlayStateActive = item.classList.contains("active");

            // Structural Reset
            faqInteractiveItems.forEach(innerItem => {
                innerItem.classList.remove("active");
                innerItem.querySelector(".faq-answer").style.maxHeight = null;
            });

            if (!overlayStateActive) {
                item.classList.add("active");
                interiorPanel.style.maxHeight = interiorPanel.scrollHeight + "px";
                setTimeout(() => {
                    ScrollTrigger.refresh();
                }, 450);
            }
        });
    });
});
