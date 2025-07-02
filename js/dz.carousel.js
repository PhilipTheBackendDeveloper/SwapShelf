/* JavaScript Document */
jQuery(window).on('load', function() {
    'use strict';

	
	// service-silder-swiper
	if(jQuery('.main-swiper').length > 0){
		var swiper = new Swiper(".main-swiper-thumb", {
			loop: true,
			spaceBetween: 10,
			slidesPerView: "auto",
			//freeMode: true,
			watchSlidesProgress: true,
			autoplay: {
			   delay: 1500,
			},
		});
		var swiper2 = new Swiper(".main-swiper", {
			loop: true,
			effect: "fade",
			speed: 1000,
			parallax: true,
			autoplay: {
			   delay: 1500,
			},
			pagination: {
				el: ".swiper-pagination-five",
				clickable: true,
			},
			thumbs: {
			  swiper: swiper,
			},
		});
	}
	
	if(jQuery('.main-swiper-two').length > 0){
		var swiper = new Swiper(".main-swiper-thumb", {
			loop: true,
			spaceBetween: 10,
			slidesPerView: "auto",
			//freeMode: true,
			watchSlidesProgress: true,
			autoplay: {
			   delay: 1500,
			},
		});
		var swiper2 = new Swiper(".main-swiper-two", {
			loop: true,
			effect: "fade",
			speed: 1000,
			parallax: true,
			autoplay: {
			   delay: 1500,
			},
			pagination: {
				el: ".swiper-pagination-five",
				clickable: true,
			},
			thumbs: {
			  swiper: swiper,
			},
		});
	}
	
	
	// Testimonial Swiper
	if(jQuery('.testimonial-swiper').length > 0){
		var swiperTestimonial = new Swiper('.testimonial-swiper', {
			slidesPerView: 3,
			spaceBetween: 30,
			loop: true,
			autoplay: {
			   delay: 3000,
			},
			navigation: {
			  nextEl: ".testimonial-button-next",
			  prevEl: ".testimonial-button-prev",
			},
			breakpoints: {
				360: {
					slidesPerView: 1,
				},
				600: {
					slidesPerView: 1,
				},
				767: {
					slidesPerView: 2,
				},
				1200: {
					slidesPerView: 3,
				},
				
			}
		});
	}
	
	if(jQuery('.book-swiper').length > 0){
		var swiperBook = new Swiper('.book-swiper', {
			slidesPerView: 3,
			spaceBetween: 30,
			autoplay: {
				delay: 4000,
			  },
			navigation: {
				nextEl: ".book-button-next",
				prevEl: ".book-button-prev",
			},
			breakpoints: {
				360: {
					slidesPerView: 1,
				},
				600: {
					slidesPerView: 1,
				},
				767: {
					slidesPerView: 2,
				},
				991: {
					slidesPerView: 2,
				},
				1200: {
					slidesPerView: 3,
				},
				1680: {
					slidesPerView: 3,
				}
			}
		});
	}
	
	if(jQuery('.swiper-three').length > 0){
		var swiper = new Swiper( '.swiper-three', {
			slidesPerView: 1,
			centeredSlides: true,
			spaceBetween: 90,
			loop: true,
			pagination: {
			  el: ".swiper-pagination-three",
			  clickable: true,
			},
			autoplay: {
				delay: 4500,
			},
			navigation: {
			  nextEl: ".swiper-button-next",
			  prevEl: ".swiper-button-prev",
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
				},
				1200: {
					slidesPerView: 1,
				},
				1680: {
					slidesPerView: 1,
				},
			}
		});
	}
	if(jQuery('.testimonial-swiper-2').length > 0){
		var swiperTestimonial2 = new Swiper( '.testimonial-swiper-2', {
			slidesPerView: 1.5,
			centeredSlides: true,
			spaceBetween: 95,
			loop: true,
			autoplay: {
				delay: 4000,
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
				},
				1200: {
					slidesPerView: 1,
				},
				1680: {
					slidesPerView: 1,
				}
			}
		} );
	}
	
	if(jQuery('.client-swiper').length > 0){
		var swiper = new Swiper(".client-swiper", {
			slidesPerView: 5,
			autoplay: {
				delay: 2000,
			},
			pagination: {
			  el: ".swiper-pagination",
			  clickable: true,
			},
			breakpoints: {
				1600: {
					slidesPerView: 5,
				},
				1400: {
					slidesPerView: 4,
				},
				1200: {
					slidesPerView: 3,
				},
				991: {
					slidesPerView: 3,
				},
				591: {
					slidesPerView: 2,
				},
				320: {
					slidesPerView: 2,
				},
			}
		});
	}

	if(jQuery('.swiper-two').length > 0){
		var swiper = new Swiper( '.swiper-two', {
			slidesPerView: 5,
			spaceBetween: 30,
			loop: true,
			autoplay: {
				delay: 2500,
			},
			pagination: {
			  el: ".swiper-pagination",
			  clickable: true,
			},
			breakpoints: {
				1200: {
					slidesPerView: 5,
				},
				1024: {
					slidesPerView: 4,
				},
				991: {
					slidesPerView: 3,
				},
				767: {
					slidesPerView: 3,
					centeredSlides: true,
				},
				320: {
					slidesPerView: 2,
					spaceBetween: 15,
					centeredSlides: true,
				},
			}
		} );
	}

	if(jQuery('.swiper-four').length > 0){
		var swiper = new Swiper( '.swiper-four', {
			slidesPerView: 5,
			centeredSlides: false,
			spaceBetween: 30,
			loop: true,
				pagination: {
				el: ".swiper-pagination-two",
			},
			autoplay: {
				delay: 3000,
			},
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},	
			breakpoints: {
				1200: {
					slidesPerView: 5,
				},
				1191: {
					slidesPerView: 4,
				},
				767: {
					slidesPerView: 3,
				},
				591: {
					slidesPerView: 2,
					centeredSlides: true,
				},
				320: {
					slidesPerView: 2,
					spaceBetween: 15,
					centeredSlides: true,
				},
			}
		});
	}

	if(jQuery('.swiper-five').length > 0){
		var swiper = new Swiper( '.swiper-five', {
			slidesPerView: 2,
			spaceBetween: 20,
			loop: true,
			pagination: {
			  el: ".swiper-pagination-two",
			  clickable: true,
			},
			navigation: {
			  nextEl: ".swiper-button-next",
			  prevEl: ".swiper-button-prev",
			},
			breakpoints: {
				1600: {
					slidesPerView: 2,
				},
				1480: {
					slidesPerView: 2,
				},
				1191: {
					slidesPerView: 2,
				},
				1024: {
					slidesPerView: 1,
				},
				320: {
					slidesPerView: 1,
				},
			}
		} );
	}

	if(jQuery('.swiper-six').length > 0){
		var swiper = new Swiper( '.swiper-six', {
			slidesPerView: 8,
			spaceBetween: 20,
			loop: true,
			centeredSlides: true,
			breakpoints: {
				1600: {
					slidesPerView: 8,
				},
				1480: {
					slidesPerView: 7,
				},
				1280: {
					slidesPerView: 5,
				},
				1024: {
					slidesPerView: 4,
				},
				991: {
					slidesPerView: 4,
				},
				768: {
					slidesPerView: 3,
				},
				600: {
					slidesPerView: 2,
				} ,
				320: {
					slidesPerView: 1,
				},
			}
		} );
	}
	
	if(jQuery('.swiper-seven').length > 0){
		var swiper = new Swiper( '.swiper-seven', {
			slidesPerView: 6,
			spaceBetween: 20,
			loop: true,
			breakpoints: {
				1600: {
					slidesPerView: 6,
				},
				1200: {
					slidesPerView: 5,
				},
				1024: {
					slidesPerView: 4,
				},
				991: {
					slidesPerView: 3,
				},
				768: {
					slidesPerView: 3,
				},
				600: {
					slidesPerView: 2,
				} ,
				320: {
					slidesPerView: 1,
				},
			}
		} );
	}

	if(jQuery('.blog-swiper').length > 0){
		var swiper = new Swiper( '.blog-swiper', {
			slidesPerView: 4,
			spaceBetween: 30,
			loop: true,
			autoplay: {
				delay: 2500,
			},
			breakpoints: {
				1200: {
					slidesPerView: 4,
				},
				1024: {
					slidesPerView: 3,
				},
				991: {
					slidesPerView: 2,
				},
				600: {
					slidesPerView: 2,
				},
				320: {
					slidesPerView: 1,
				},
			}
		} ); 
	}

	// Blog slideshow Swiper ==
	if (jQuery('.blog-slideshow').length > 0) {
		var swiper = new Swiper('.blog-slideshow', {
			loop: true,
			spaceBetween: 0,
			slidesPerView: "auto",
			speed: 1500,
			autoplay: {
				delay: 2000,
			},
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
		});
	}
	

	// Galley-Thumb-Swiper ======
	if ($('.galley-thumb-swiper').length > 0 && $('.galley-swiper').length > 0) {
		var swiper = new Swiper(".galley-thumb-swiper", {
			loop: false,
			spaceBetween: 10,
			slidesPerView: 4,
			freeMode: true,
			watchSlidesProgress: true,
		});
	
		var swiper2 = new Swiper(".galley-swiper", {
			loop: true,
			spaceBetween: 10,
			thumbs: {
				swiper: swiper,
			},
		});
	}
	


	// StorySwiper
	if (jQuery('.status-swiper').length > 0) {
		var Statusswiper = new Swiper('.status-swiper', {
			loop: true,
			spaceBetween: 0,
			slidesPerView: "auto",
			speed: 1500,
			effect: "fade",

			autoplay: {
			    delay: 2000,
			},
			pagination: {
				el: ".status-pagination",
				clickable: true,
			},
		});

		// Attach click event to .post-status-btn using jQuery
		jQuery('.post-status-btn').on('click', function () {
			Statusswiper.slideTo(0); // Slide to the first slide
			Statusswiper.autoplay.start(); // Start autoplay
		});
	}

});
/* Document .ready END */
