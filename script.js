 $(document).ready(function() {
            // Date animation
            const datetxt = "27 August";
            const charArrDate = datetxt.split('');
            let currentIndex = 0;
            const dateElement = $(".date__of__birth span");

            setTimeout(function() {
                const timeDatetxt = setInterval(function() {
                    if (currentIndex < charArrDate.length) {
                        dateElement.text(dateElement.text() + charArrDate[currentIndex]);
                        currentIndex++;
                    } else {
                        const starIcon = $('<i class="fa-solid fa-star"></i>');
                        $(".date__of__birth").prepend(starIcon.clone());
                        $(".date__of__birth").append(starIcon.clone());
                        clearInterval(timeDatetxt);
                    }
                }, 100);
            }, 12000);

            // Popup functionality
            $("#btn__letter").on("click", function() {
                $("#popup").addClass("active");
            });

            $("#closePopup").on("click", function() {
                $("#popup").removeClass("active");
            });

            // Close popup when clicking outside
            $(document).on('click', function(e) {
                if ($(e.target).hasClass('boxMail')) {
                    $("#popup").removeClass("active");
                }
            });

            // Balloon animations
            setInterval(function() {
                $('.balloon_one').animate({
                    transform: 'rotate(5deg)'
                }, 1000).animate({
                    transform: 'rotate(-5deg)'
                }, 1000);
            }, 2000);

            setInterval(function() {
                $('.balloon_two').animate({
                    transform: 'rotate(8deg)'
                }, 1200).animate({
                    transform: 'rotate(12deg)'
                }, 1200);
            }, 2200);

            // NEW FEATURES

            // Music player functionality - IMPROVED
            const audio = document.getElementById('birthdayAudio');
            const playBtn = document.getElementById('playMusic');
            const pauseBtn = document.getElementById('pauseMusic');

            // Auto play music after page loads
            setTimeout(function() {
                audio.play().then(() => {
                    playBtn.style.display = 'none';
                    pauseBtn.style.display = 'block';
                }).catch(error => {
                    console.log('Auto-play was prevented:', error);
                    // Show play button if autoplay is blocked
                    playBtn.style.display = 'block';
                });
            }, 17000); // Start after 17 seconds

            playBtn.addEventListener('click', function() {
                audio.play().then(() => {
                    playBtn.style.display = 'none';
                    pauseBtn.style.display = 'block';
                }).catch(err => {
                    console.error("Playback failed:", err);
                    alert("Audio play failed! Please check the audio source.");
                });
            });

            pauseBtn.addEventListener('click', function() {
                audio.pause();
                pauseBtn.style.display = 'none';
                playBtn.style.display = 'block';
            });

            // Memories gallery functionality - IMPROVED
            $("#memoriesBtn").on("click", function() {
                $("#memoriesGallery").addClass("active");
            });

            $("#closeGallery").on("click", function() {
                $("#memoriesGallery").removeClass("active");
            });

            // Close gallery when clicking outside
            $(document).on('click', function(e) {
                if ($(e.target).hasClass('memories-gallery')) {
                    $("#memoriesGallery").removeClass("active");
                }
            });

            // Carousel functionality for memories gallery
            let currentSlide = 0;
            const slides = $('.gallery-slide');
            const carousel = $('#galleryCarousel');
            const indicatorsContainer = $('#galleryIndicators');
            
            // Create indicators
            slides.each(function(index) {
                const indicator = $('<div class="gallery-indicator"></div>');
                if (index === 0) indicator.addClass('active');
                indicatorsContainer.append(indicator);
            });
            
            const indicators = $('.gallery-indicator');
            
            // Update carousel position
            function updateCarousel() {
                carousel.css('transform', `translateX(-${currentSlide * 100}%)`);
                indicators.removeClass('active');
                indicators.eq(currentSlide).addClass('active');
            }
            
            // Next button
            $('#nextBtn').on('click', function() {
                currentSlide = (currentSlide + 1) % slides.length;
                updateCarousel();
            });
            
            // Previous button
            $('#prevBtn').on('click', function() {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                updateCarousel();
            });
            
            // Indicator click
            indicators.each(function(index) {
                $(this).on('click', function() {
                    currentSlide = index;
                    updateCarousel();
                });
            });
            
            // Keyboard navigation
            $(document).on('keydown', function(e) {
                if ($('#memoriesGallery').hasClass('active')) {
                    if (e.key === 'ArrowLeft') {
                        $('#prevBtn').click();
                    } else if (e.key === 'ArrowRight') {
                        $('#nextBtn').click();
                    } else if (e.key === 'Escape') {
                        $('#closeGallery').click();
                    }
                }
            });
            
            // Swipe support for touch devices
            let touchStartX = 0;
            let touchEndX = 0;
            
            carousel.on('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            });
            
            carousel.on('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });
            
            function handleSwipe() {
                const swipeThreshold = 50;
                if (touchEndX < touchStartX - swipeThreshold) {
                    // Swipe left - next
                    $('#nextBtn').click();
                } else if (touchEndX > touchStartX + swipeThreshold) {
                    // Swipe right - previous
                    $('#prevBtn').click();
                }
            }
        });