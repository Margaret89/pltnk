import {$} from './common';

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
