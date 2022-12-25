import {$, Fancybox, Inputmask} from './common';

// Плавный переход к ссылке
if ($('.js-link-move').length) {
	$('body').on('click','.js-link-move', function (event) {
		event.preventDefault();
		const thisPos=event.target.getBoundingClientRect().top+window.scrollY;
		const id  = $(this).attr('href');
		const top =document.getElementById(id.substr(1)).getBoundingClientRect().top+window.scrollY-80;
		const speed = Math.round((top-thisPos)/15)+400;
		$('body,html').animate({scrollTop: top}, speed);
	});
}

// Стрелка наверх
$(window).on('scroll', function(){
	if($(this).scrollTop()>300){
		$('.js-move-up').addClass('visible');
	}else{
		$('.js-move-up').removeClass('visible');
	}
});
$('.js-move-up').on('click', function(){$('body,html').animate({scrollTop:0},500);return false;});

// Валидация форм
function errorField(form, event) {
	form.find('.js-form-site-item').removeClass('error');
	form.find('.form-site-msg-error').remove();
	
	form.find('input[type=email]').each(function(){
		mailValid($(this));
	});

	form.find('.js-input-mail').each(function(){
		mailValid($(this));
	});

	function mailValid(elem) {
		var email = $(elem).val().trim();
		var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,6}\.)?[a-z]{2,6}$/i;

		if (!pattern.test(email) && (email.length > 1)) {
			$(elem).closest('.js-form-site-item').addClass('error');
			$(elem).attr('placeholder','Укажите корректный E-mail');
		}
	}

	form.find('input,textarea,select').filter('[required]').each(function(){
		if($(this).val().length < 1){
			$(this).closest('.js-form-site-item').addClass('error');

			if($(this).hasClass('js-phone')){
				$(this).attr('placeholder','Укажите телефон');
			} else {
				$(this).attr('placeholder','Заполните поле');
			}
		}

		if($(this).attr('type') == 'checkbox' && !$(this).prop('checked')){
			$(this).closest('.js-form-site-polit').append('<div class="form-site-msg-error">Подтвердите обработку персональных данных</div>')
		}
		if($(this).attr('type') == 'radio' && !$('input[name="'+$(this).attr("name")+'"]').is(':checked')){
			$(this).closest('.js-form-site-item').addClass('error');
			$(this).closest('.js-form-site-item').append('<div class="form-site-msg-error">Заполните поле</div>')
		}
	});

	if(form.find('.js-form-site-item.error').length){
		event.preventDefault();
	}
}

if($('.js-valid-form').length){
	$('.js-valid-form').on('click', '.js-btn-submit', function(e){
		var $form = $(this).closest('form');
		errorField($form, e);
	});

	$('.js-valid-form').on('submit', 'form', function(e){
		var successTitle = $(this).closest('.js-valid-form').data('success');
		var successText = $(this).closest('.js-valid-form').data('text');
		var tempSuccessTitle = $('.js-success-alert-title').text();

		if(successTitle){
			$('.js-success-alert-title').text(successTitle);
		} else {
			$('.js-success-alert-title').text(tempSuccessTitle);
		}

		if(successText == 'none'){
			$('.js-success-alert-text').css('display', 'none');
		} else {
			$('.js-success-alert-text').text(successText);
		}

		Fancybox.close();
		Fancybox.show([{ src: "#msg-success", type: "inline" }]);

		$(this)[0].reset();
		$(this).find('input').attr('placeholder','');
		e.preventDefault();
	});
}

// Маска для телефона
Inputmask('+7 (999) 999-9999').mask('.js-phone');

// Слайдер работ
if($('.js-slider-works').length){
	$('.js-slider-works').slick({
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		prevArrow: '<button id="prev" type="button" class="btn-arr btn-arr_left"><svg class="icon ic-arrow-left" width="8" height="14"><use xlink:href="/assets/sprites/sprite.svg#ic-arrow-left"></use></svg></button>',
		nextArrow: '<button id="next" type="button" class="btn-arr btn-arr_right"><svg class="icon ic-arrow-right" width="8" height="14"><use xlink:href="/assets/sprites/sprite.svg#ic-arrow-right"></use></svg></button>',
	});
}

// Слайдер отзывов
if($('.js-reviews-slider').length){
	$('.js-reviews-slider').slick({
		infinite: true,
		slidesToShow: 2,
		slidesToScroll: 1,
		dots: true,
		prevArrow: '<button id="prev" type="button" class="btn-arr btn-arr_left"><svg class="icon ic-arrow-left" width="8" height="14"><use xlink:href="/assets/sprites/sprite.svg#ic-arrow-left"></use></svg></button>',
		nextArrow: '<button id="next" type="button" class="btn-arr btn-arr_right"><svg class="icon ic-arrow-right" width="8" height="14"><use xlink:href="/assets/sprites/sprite.svg#ic-arrow-right"></use></svg></button>',
	});
}

// Слайдер сертификатов
if($('.js-certificate-slider').length){
	$('.js-certificate-slider').slick({
		infinite: true,
		slidesToShow: 6,
		slidesToScroll: 1,
		prevArrow: '<button id="prev" type="button" class="btn-arr btn-arr_left"><svg class="icon ic-arrow-left" width="8" height="14"><use xlink:href="/assets/sprites/sprite.svg#ic-arrow-left"></use></svg></button>',
		nextArrow: '<button id="next" type="button" class="btn-arr btn-arr_right"><svg class="icon ic-arrow-right" width="8" height="14"><use xlink:href="/assets/sprites/sprite.svg#ic-arrow-right"></use></svg></button>',
	});
}

// Обрезание текста в отзывах
if ($('.js-more-text').length) {
	$('.js-more-text').each(function() {
		let lineH = $(this).css('line-height');
		let heightBox = lineH.substring(0,lineH.length - 2) * 4;
		let curHeight = $(this).find('.js-more-text-content').height();

		if(curHeight >= heightBox){
			$(this).append('<span class="more-text__link js-more-text-link"><span class="js-more-text-change" data-text="Свернуть">Читать полностью</span><svg class="icon ic-arrow-down" width="8" height="4"><use xlink:href="assets/sprites/sprite.svg#ic-arrow-down"></use></svg></span>')
		}
	});

	$('.js-more-text-link').on('click', function(){
		let $text = $(this).find('.js-more-text-change');
		let tempText = $text.text();

		$(this).closest('.js-more-text').toggleClass('open');
		$text.text($text.data('text'));
		$text.data('text', tempText);
	});
}