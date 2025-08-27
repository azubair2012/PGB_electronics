(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 90) {
            $('.nav-bar').addClass('sticky-top shadow');
        } else {
            $('.nav-bar').removeClass('sticky-top shadow');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Date and time picker
    $('.date').datetimepicker({
        format: 'L'
    });
    $('.time').datetimepicker({
        format: 'LT'
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Service carousel
    $(".service-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 25,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:2
            },
            1200:{
                items:3
            }
        }
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });

    // Contact Form Handler
    $(document).ready(function() {
        const contactForm = $('#contactForm');
        const submitBtn = $('#submit-btn');
        const formMessages = $('#form-messages');
        
        if (contactForm.length > 0) {
            contactForm.on('submit', function(e) {
                e.preventDefault();
                handleFormSubmission();
            });
        }
        
        function handleFormSubmission() {
            // Show loading state
            toggleLoadingState(true);
            hideMessage();
            
            // Validate form before submission
            if (!validateContactForm()) {
                toggleLoadingState(false);
                return;
            }
            
            // Create FormData object
            const formData = new FormData(contactForm[0]);
            
            // Send AJAX request
            $.ajax({
                url: 'contact-handler.php',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                dataType: 'json',
                success: function(data) {
                    toggleLoadingState(false);
                    
                    if (data.success) {
                        showMessage(data.message, 'success');
                        contactForm[0].reset();
                    } else {
                        showMessage(data.message, 'error');
                    }
                },
                error: function(xhr, status, error) {
                    toggleLoadingState(false);
                    showMessage('Error de conexión. Por favor intente nuevamente.', 'error');
                    console.error('Form submission error:', error);
                }
            });
        }
        
        function validateContactForm() {
            const nombre = $('#nombre').val().trim();
            const email = $('#email').val().trim();
            const asunto = $('#asunto').val().trim();
            const mensaje = $('#mensaje').val().trim();
            
            // Clear previous error states
            $('.form-control').removeClass('is-invalid');
            
            let isValid = true;
            let errorMessage = '';
            
            // Validate nombre
            if (nombre.length < 2) {
                $('#nombre').addClass('is-invalid');
                errorMessage = 'El nombre debe tener al menos 2 caracteres';
                isValid = false;
            }
            
            // Validate email
            if (!isValidEmail(email)) {
                $('#email').addClass('is-invalid');
                errorMessage = 'Por favor ingrese un email válido';
                isValid = false;
            }
            
            // Validate asunto
            if (asunto.length < 5) {
                $('#asunto').addClass('is-invalid');
                errorMessage = 'El asunto debe tener al menos 5 caracteres';
                isValid = false;
            }
            
            // Validate mensaje
            if (mensaje.length < 20) {
                $('#mensaje').addClass('is-invalid');
                errorMessage = 'El mensaje debe tener al menos 20 caracteres';
                isValid = false;
            }
            
            if (!isValid) {
                showMessage(errorMessage, 'error');
            }
            
            return isValid;
        }
        
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        
        function toggleLoadingState(loading) {
            const btnText = submitBtn.find('.btn-text');
            const btnLoading = submitBtn.find('.btn-loading');
            
            if (loading) {
                btnText.addClass('d-none');
                btnLoading.removeClass('d-none');
                submitBtn.prop('disabled', true);
            } else {
                btnText.removeClass('d-none');
                btnLoading.addClass('d-none');
                submitBtn.prop('disabled', false);
            }
        }
        
        function showMessage(message, type) {
            formMessages.removeClass('alert-success alert-danger d-none');
            formMessages.addClass('alert-' + (type === 'success' ? 'success' : 'danger'));
            formMessages.text(message);
            
            // Auto-hide success messages after 5 seconds
            if (type === 'success') {
                setTimeout(function() {
                    hideMessage();
                }, 5000);
            }
        }
        
        function hideMessage() {
            formMessages.addClass('d-none');
        }
        
        // Real-time validation feedback
        $('#nombre, #email, #asunto, #mensaje').on('input blur', function() {
            $(this).removeClass('is-invalid');
        });
    });
    
})(jQuery);

