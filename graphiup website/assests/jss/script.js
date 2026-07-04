/*==================================================
    INFLUNEX
    PREMIUM AGENCY WEBSITE
    SCRIPT.JS
    PART 1A
==================================================*/

"use strict";

/*==================================================
    DOM READY
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==============================================
        SELECTORS
    ==============================================*/

    const body = document.body;

    const header = document.querySelector(".header");

    const navbar = document.querySelector(".navbar");

    const menuToggle =
        document.querySelector(".menu-toggle");

    const navLinks =
        document.querySelectorAll(".nav-link");

    const sections =
        document.querySelectorAll("section[id]");

    const loader =
        document.querySelector(".loader");

    const scrollTop =
        document.querySelector(".scroll-top");

    const prefersReducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)");

    /*==============================================
        UTILITIES
    ==============================================*/

    const $ = (selector) =>
        document.querySelector(selector);

    const $$ = (selector) =>
        document.querySelectorAll(selector);

    function debounce(fn, delay = 100) {

        let timer;

        return (...args) => {

            clearTimeout(timer);

            timer = setTimeout(() => {

                fn(...args);

            }, delay);

        };

    }

    function throttle(fn, delay = 100) {

        let waiting = false;

        return (...args) => {

            if (waiting) return;

            fn(...args);

            waiting = true;

            setTimeout(() => {

                waiting = false;

            }, delay);

        };

    }

    /*==============================================
        LENIS SMOOTH SCROLL
    ==============================================*/

    let lenis = null;

    if (
        typeof Lenis !== "undefined" &&
        !prefersReducedMotion.matches
    ) {

        lenis = new Lenis({

            duration: 1.2,

            smoothWheel: true,

            smoothTouch: false,

            wheelMultiplier: 1,

            touchMultiplier: 2

        });

        function raf(time) {

            lenis.raf(time);

            requestAnimationFrame(raf);

        }

        requestAnimationFrame(raf);

    }

    /*==============================================
        PAGE LOADER
    ==============================================*/

    if (loader) {

        body.style.overflow = "hidden";

        window.addEventListener("load", () => {

            setTimeout(() => {

                loader.classList.add("loader-hide");

                body.classList.add("loaded");

                body.style.overflow = "";

                setTimeout(() => {

                    loader.remove();

                }, 700);

            }, 900);

        });

    } else {

        body.classList.add("loaded");

    }

    /*==============================================
        GLOBAL HELPERS
    ==============================================*/

    function scrollToTarget(target) {

        if (!target) return;

        const offset = 90;

        const top =
            target.getBoundingClientRect().top +
            window.pageYOffset -
            offset;

        if (lenis) {

            lenis.scrollTo(top);

        } else {

            window.scrollTo({

                top,

                behavior: "smooth"

            });

        }

    }

    function isDesktop() {

        return window.innerWidth > 991;

    }

    /*==============================================
        PART 1B CONTINUES BELOW
    ==============================================*/
    /*==================================================
    PART 1B
    NAVIGATION + HEADER + SCROLL
==================================================*/

    /*==============================================
        STICKY HEADER
    ==============================================*/

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 80) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    window.addEventListener(
        "scroll",
        throttle(updateHeader, 20)
    );

    updateHeader();

    /*==============================================
        MOBILE MENU
    ==============================================*/

    function openMenu() {

        if (!navbar || !menuToggle) return;

        navbar.classList.add("active");

        menuToggle.classList.add("active");

        body.classList.add("menu-open");

    }

    function closeMenu() {

        if (!navbar || !menuToggle) return;

        navbar.classList.remove("active");

        menuToggle.classList.remove("active");

        body.classList.remove("menu-open");

    }

    menuToggle?.addEventListener("click", () => {

        if (navbar.classList.contains("active")) {

            closeMenu();

        } else {

            openMenu();

        }

    });

    /*==============================================
        CLOSE MENU
    ==============================================*/

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            closeMenu();

        });

    });

    document.addEventListener("click", (e) => {

        if (!navbar || !menuToggle) return;

        if (
            !navbar.contains(e.target) &&
            !menuToggle.contains(e.target)
        ) {

            closeMenu();

        }

    });

    /*==============================================
        SMOOTH SCROLL
    ==============================================*/

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", (e) => {

            const target =
                document.querySelector(
                    link.getAttribute("href")
                );

            if (!target) return;

            e.preventDefault();

            scrollToTarget(target);

        });

    });

    /*==============================================
        ACTIVE NAVIGATION
    ==============================================*/

    function updateActiveNav() {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 180;

            const bottom = top + section.offsetHeight;

            if (
                window.scrollY >= top &&
                window.scrollY < bottom
            ) {

                current = section.id;

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                "#" + current
            ) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener(
        "scroll",
        throttle(updateActiveNav, 20)
    );

    updateActiveNav();

    /*==============================================
        SCROLL TO TOP
    ==============================================*/

    function updateScrollButton() {

        if (!scrollTop) return;

        if (window.scrollY > 500) {

            scrollTop.classList.add("show");

        } else {

            scrollTop.classList.remove("show");

        }

    }

    window.addEventListener(
        "scroll",
        throttle(updateScrollButton, 20)
    );

    updateScrollButton();

    scrollTop?.addEventListener("click", () => {

        if (lenis) {

            lenis.scrollTo(0);

        } else {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }

    });

    /*==============================================
        WINDOW RESIZE
    ==============================================*/

    window.addEventListener(
        "resize",
        debounce(() => {

            if (isDesktop()) {

                closeMenu();

            }

        }, 150)
    );

    /*==============================================
        PART 2 STARTS BELOW
    ==============================================*/


/*==================================================
    PART 2A
    FAQ + SCROLL REVEAL
==================================================*/

    /*==============================================
        FAQ ACCORDION
    ==============================================*/

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        if (!question || !answer) return;

        question.addEventListener("click", () => {

            const isOpen = item.classList.contains("active");

            // Close all
            faqItems.forEach(faq => {

                faq.classList.remove("active");

                const content = faq.querySelector(".faq-answer");

                if (content) {

                    content.style.maxHeight = null;

                }

            });

            if (!isOpen) {

                item.classList.add("active");

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

            }

        });

    });

    /*==============================================
        INTERSECTION OBSERVER
    ==============================================*/

    const revealElements = document.querySelectorAll(

        ".service-card,\
        .portfolio-card,\
        .why-card,\
        .testimonial-card,\
        .step,\
        .highlight-card,\
        .mission-card,\
        .vision-card,\
        .contact-info,\
        .contact-form"

    );

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },

        {

            threshold: 0.15,

            rootMargin: "0px 0px -80px 0px"

        }

    );

    revealElements.forEach(el => {

        el.classList.add("reveal");

        observer.observe(el);

    });

    /*==============================================
        IMAGE PARALLAX
    ==============================================*/

    const images = document.querySelectorAll(

        ".portfolio-image img"

    );

    window.addEventListener(

        "scroll",

        throttle(() => {

            const scroll = window.pageYOffset;

            images.forEach(img => {

                const card = img.closest(".portfolio-card");

                if (!card) return;

                const rect = card.getBoundingClientRect();

                if (

                    rect.top < window.innerHeight &&
                    rect.bottom > 0

                ) {

                    const speed = scroll * 0.04;

                    img.style.transform =
                        `translateY(${speed}px) scale(1.05)`;

                }

            });

        }, 20)

    );

    /*==============================================
        BUTTON RIPPLE EFFECT
    ==============================================*/

    document.querySelectorAll(".btn").forEach(button => {

        button.addEventListener("click", function(e){

            const ripple = document.createElement("span");

            const rect = this.getBoundingClientRect();

            const size = Math.max(rect.width, rect.height);

            ripple.style.width = size + "px";
            ripple.style.height = size + "px";

            ripple.style.left =
                e.clientX - rect.left - size / 2 + "px";

            ripple.style.top =
                e.clientY - rect.top - size / 2 + "px";

            ripple.className = "ripple";

            this.appendChild(ripple);

            setTimeout(() => {

                ripple.remove();

            }, 600);

        });

    });

    /*==============================================
        PART 2B CONTINUES BELOW
    ==============================================*/
    /*==================================================
    PART 2B
    COUNTERS • CONTACT • PORTFOLIO • PERFORMANCE
==================================================*/

    /*==============================================
        ANIMATED COUNTERS
    ==============================================*/

    const counters = document.querySelectorAll("[data-count]");

    function animateCounter(counter){

        const target = Number(counter.dataset.count);

        const duration = 1800;

        let start = null;

        function step(timestamp){

            if(!start) start = timestamp;

            const progress = Math.min((timestamp-start)/duration,1);

            counter.textContent =
                Math.floor(progress*target).toLocaleString();

            if(progress<1){

                requestAnimationFrame(step);

            }else{

                counter.textContent =
                target.toLocaleString();

            }

        }

        requestAnimationFrame(step);

    }

    if(counters.length){

        const counterObserver =
        new IntersectionObserver(entries=>{

            entries.forEach(entry=>{

                if(entry.isIntersecting){

                    animateCounter(entry.target);

                    counterObserver.unobserve(entry.target);

                }

            });

        },{

            threshold:.5

        });

        counters.forEach(counter=>{

            counterObserver.observe(counter);

        });

    }

    /*==============================================
        CONTACT FORM
    ==============================================*/

    const contactForm =
        document.querySelector(".contact-form");

    if(contactForm){

        contactForm.addEventListener("submit",e=>{

            e.preventDefault();

            const inputs =
                contactForm.querySelectorAll(

                    "input, textarea"

                );

            let valid = true;

            inputs.forEach(input=>{

                if(!input.value.trim()){

                    valid=false;

                    input.style.borderColor="#ff4d4d";

                }else{

                    input.style.borderColor="";

                }

            });

            if(!valid){

                alert("Please fill all required fields.");

                return;

            }

            alert("Thank you! We'll contact you soon.");

            contactForm.reset();

        });

    }

    /*==============================================
        PORTFOLIO HOVER
    ==============================================*/

    document.querySelectorAll(".portfolio-card")

    .forEach(card=>{

        card.addEventListener("mousemove",e=>{

            const rect=card.getBoundingClientRect();

            const x=e.clientX-rect.left;

            const y=e.clientY-rect.top;

            card.style.setProperty("--x",x+"px");

            card.style.setProperty("--y",y+"px");

        });

    });

    /*==============================================
        MOUSE GLOW
    ==============================================*/

    document.querySelectorAll(

        ".glass-card,.service-card,.portfolio-card"

    ).forEach(card=>{

        card.addEventListener("mousemove",e=>{

            const rect=card.getBoundingClientRect();

            card.style.setProperty(

                "--mouse-x",

                e.clientX-rect.left+"px"

            );

            card.style.setProperty(

                "--mouse-y",

                e.clientY-rect.top+"px"

            );

        });

    });

    /*==============================================
        LAZY IMAGE LOADING
    ==============================================*/

    document.querySelectorAll("img")

    .forEach(img=>{

        img.loading="lazy";

        img.decoding="async";

    });

    /*==============================================
        PERFORMANCE
    ==============================================*/

    let ticking=false;

    window.addEventListener("scroll",()=>{

        if(!ticking){

            requestAnimationFrame(()=>{

                updateHeader();

                updateActiveNav();

                updateScrollButton();

                ticking=false;

            });

            ticking=true;

        }

    });

    /*==============================================
        END OF PART 2
        PART 3 STARTS BELOW
    ==============================================*/
    /*==================================================
    PART 3
    GSAP • PARALLAX • ACCESSIBILITY • FINAL INIT
==================================================*/

    /*==============================================
        GSAP ANIMATIONS
    ==============================================*/

    if (typeof gsap !== "undefined") {

        gsap.registerPlugin(ScrollTrigger);

        // Hero Animation
        gsap.timeline()

        .from(".hero-subtitle", {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        })

        .from(".hero-title", {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        }, "-=.4")

        .from(".hero-description", {
            y: 40,
            opacity: 0,
            duration: .8
        }, "-=.5")

        .from(".hero-buttons .btn", {
            y: 25,
            opacity: 0,
            duration: .6,
            stagger: .15
        }, "-=.4");

        // Sections
        gsap.utils.toArray("section").forEach(section => {

            gsap.from(section.querySelectorAll(
                ".section-title,.section-subtitle"
            ), {

                scrollTrigger: {
                    trigger: section,
                    start: "top 80%"
                },

                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: .15

            });

        });

    }

    /*==============================================
        SIMPLE PARALLAX
    ==============================================*/

    const hero = document.querySelector(".hero");

    if(hero){

        window.addEventListener("scroll",

        throttle(()=>{

            const y = window.pageYOffset;

            hero.style.backgroundPositionY =
                `${y * 0.35}px`;

        },20));

    }

    /*==============================================
        CARD HOVER LIFT
    ==============================================*/

    document.querySelectorAll(

        ".service-card,.portfolio-card,.testimonial-card"

    ).forEach(card=>{

        card.addEventListener("mouseenter",()=>{

            card.style.transition="all .35s ease";

        });

        card.addEventListener("mouseleave",()=>{

            card.style.transform="";

        });

    });

    /*==============================================
        KEYBOARD ACCESSIBILITY
    ==============================================*/

    document.addEventListener("keydown",e=>{

        if(e.key==="Escape"){

            closeMenu();

        }

    });

    /*==============================================
        EXTERNAL LINKS
    ==============================================*/

    document.querySelectorAll(

        'a[target="_blank"]'

    ).forEach(link=>{

        link.setAttribute(

            "rel",

            "noopener noreferrer"

        );

    });

    /*==============================================
        CONSOLE BRANDING
    ==============================================*/

    console.log(

`%cInfluNex

Premium Digital Agency Website

Designed & Developed with ❤️`,

"color:#D4AF37;font-size:16px;font-weight:bold;"

    );

    /*==============================================
        FINAL INITIALIZATION
    ==============================================*/

    updateHeader();

    updateActiveNav();

    updateScrollButton();

    window.dispatchEvent(new Event("scroll"));

    console.log("InfluNex initialized successfully.");

}); // END DOMContentLoaded
