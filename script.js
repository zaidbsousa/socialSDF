        // Elite ripple effect
        function addRippleEffect() {
            const elements = document.querySelectorAll(".link-item, .social-link");
            
            elements.forEach(element => {
                element.addEventListener("click", function(e) {
                    const ripple = document.createElement("span");
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;
                    
                    ripple.style.cssText = `
                        position: absolute;
                        width: ${size}px;
                        height: ${size}px;
                        left: ${x}px;
                        top: ${y}px;
                        background: rgba(255, 215, 0, 0.4);
                        border-radius: 50%;
                        transform: scale(0);
                        animation: ripple 0.6s ease-out;
                        pointer-events: none;
                        z-index: 1;
                    `;
                    
                    this.style.position = "relative";
                    this.style.overflow = "hidden";
                    this.appendChild(ripple);
                    
                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                });
            });
        }

        // Add ripple animation CSS
        const style = document.createElement("style");
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // Subtle mouse parallax effect
        function addParallaxEffect() {
            document.addEventListener("mousemove", (e) => {
                const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
                const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
                
                const circles = document.querySelectorAll(".floating-circle");
                circles.forEach((circle, index) => {
                    const speed = (index + 1) * 0.5;
                    const x = mouseX * speed;
                    const y = mouseY * speed;
                    
                    circle.style.transform = `translate(${x}px, ${y}px)`;
                });

                const patterns = document.querySelectorAll(".pattern-shape");
                patterns.forEach((pattern, index) => {
                    const speed = (index + 1) * 0.3;
                    const x = mouseX * speed;
                    const y = mouseY * speed;
                    
                    pattern.style.transform += ` translate(${x}px, ${y}px)`;
                });
            });
        }

        // Counting animation for stats numbers
        function animateCountUp(element, target, duration = 1800) {
            let start = 0;
            let startTimestamp = null;
            const isComma = /,/g.test(target);
            const isPlus = /\+/g.test(target);
            const cleanTarget = parseInt(target.replace(/[^\d]/g, ''));
            function step(timestamp) {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const value = Math.floor(progress * (cleanTarget - start) + start);
                let display = value.toLocaleString();
                if (isComma && value === cleanTarget) display = cleanTarget.toLocaleString();
                if (isPlus) display += '+';
                element.textContent = display;
                if (progress < 1) {
                    requestAnimationFrame(step);
                }
            }
            requestAnimationFrame(step);
        }

        // Initialize effects
        document.addEventListener("DOMContentLoaded", () => {
            addRippleEffect();
            addParallaxEffect();
            document.querySelectorAll('.sdf-stat-number .count').forEach(el => {
                animateCountUp(el, el.textContent.trim());
            });
        });

        // Swiper functionality
        (function() {
            const track = document.querySelector('.swiper-track');
            const slides = document.querySelectorAll('.swiper-slide');
            const indicators = document.querySelectorAll('.swiper-indicator');
            let current = 0;
            let interval;

            // No need to set widths in JS for flexbox swiper

            function goToSlide(idx) {
                current = idx;
                track.style.transform = `translateX(-${idx * 100}%)`;
                indicators.forEach((ind, i) => {
                    ind.classList.toggle('active', i === idx);
                });
            }

            function nextSlide() {
                goToSlide((current + 1) % slides.length);
            }

            function startAutoSlide() {
                interval = setInterval(nextSlide, 4000);
            }

            function stopAutoSlide() {
                clearInterval(interval);
            }

            indicators.forEach((ind, i) => {
                ind.addEventListener('click', () => {
                    stopAutoSlide();
                    goToSlide(i);
                    startAutoSlide();
                });
            });

            // Pause on hover
            const swiper = document.querySelector('.swiper-container');
            if (swiper) {
                swiper.addEventListener('mouseenter', stopAutoSlide);
                swiper.addEventListener('mouseleave', startAutoSlide);
            }

            goToSlide(0);
            startAutoSlide();
        })();

        // Language switch for logo only
        const langSwitch = document.getElementById('lang-switch');
        const logoAr = document.querySelector('.logo-ar');
        const logoEn = document.querySelector('.logo-en');
        const titleAr = document.querySelector('.title-ar');
        const titleEn = document.querySelector('.title-en');
        const subtitleAr = document.querySelector('.subtitle-ar');
        const subtitleEn = document.querySelector('.subtitle-en');

        if (langSwitch && logoAr && logoEn && titleAr && titleEn && subtitleAr && subtitleEn) {
          langSwitch.addEventListener('change', function() {
            if (this.value === 'en') {
              logoAr.style.display = 'none';
              logoEn.style.display = 'block';
              titleAr.style.display = 'none';
              titleEn.style.display = 'block';
              subtitleAr.style.display = 'none';
              subtitleEn.style.display = 'block';
              document.querySelectorAll('.link-text-ar').forEach(e => e.style.display = 'none');
              document.querySelectorAll('.link-text-en').forEach(e => e.style.display = 'inline');
              document.querySelectorAll('.swiper-title-ar').forEach(e => e.style.display = 'none');
              document.querySelectorAll('.swiper-title-en').forEach(e => e.style.display = 'block');
              document.querySelectorAll('.swiper-slide-title-ar').forEach(e => e.style.display = 'none');
              document.querySelectorAll('.swiper-slide-title-en').forEach(e => e.style.display = 'block');
              document.querySelectorAll('.swiper-slide-date-ar').forEach(e => e.style.display = 'none');
              document.querySelectorAll('.swiper-slide-date-en').forEach(e => e.style.display = 'block');
              document.body.classList.add('en-active');
              document.querySelectorAll('.social-title-ar').forEach(e => e.style.display = 'none');
              document.querySelectorAll('.social-title-en').forEach(e => e.style.display = 'block');
              document.querySelectorAll('.sdf-stat-label-ar').forEach(e => e.style.display = 'none');
              document.querySelectorAll('.sdf-stat-label-en').forEach(e => e.style.display = 'block');
            } else {
              logoAr.style.display = 'block';
              logoEn.style.display = 'none';
              titleAr.style.display = 'block';
              titleEn.style.display = 'none';
              subtitleAr.style.display = 'block';
              subtitleEn.style.display = 'none';
              document.querySelectorAll('.link-text-ar').forEach(e => e.style.display = 'inline');
              document.querySelectorAll('.link-text-en').forEach(e => e.style.display = 'none');
              document.querySelectorAll('.swiper-title-ar').forEach(e => e.style.display = 'block');
              document.querySelectorAll('.swiper-title-en').forEach(e => e.style.display = 'none');
              document.querySelectorAll('.swiper-slide-title-ar').forEach(e => e.style.display = 'block');
              document.querySelectorAll('.swiper-slide-title-en').forEach(e => e.style.display = 'none');
              document.querySelectorAll('.swiper-slide-date-ar').forEach(e => e.style.display = 'block');
              document.querySelectorAll('.swiper-slide-date-en').forEach(e => e.style.display = 'none');
              document.body.classList.remove('en-active');
              document.querySelectorAll('.social-title-ar').forEach(e => e.style.display = 'block');
              document.querySelectorAll('.social-title-en').forEach(e => e.style.display = 'none');
              document.querySelectorAll('.sdf-stat-label-ar').forEach(e => e.style.display = 'block');
              document.querySelectorAll('.sdf-stat-label-en').forEach(e => e.style.display = 'none');
            }
          });
        }


