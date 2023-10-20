const header = document.querySelector('.header');
const main = document.querySelector('.main');
const togglemenu = document.querySelector('#toggle-menu');
const menu = document.querySelector('.menu');
const overlay = document.querySelector('.overlay');
var scrollPrev = 0;
togglemenu.addEventListener('click',()=>{
	togglemenu.classList.toggle("on");
	menu.classList.toggle("on");
	overlay.classList.toggle("active");
	let scrolled = window.pageYOffset;

	document.body.classList.toggle("noscroll");
});


window.addEventListener('resize',()=>{
	if (window.outerWidth >= 1200){
		togglemenu.classList.remove("on");
		menu.classList.remove("on");
		overlay.classList.remove("active");
		document.body.classList.remove("noscroll");
	}
});


document.addEventListener("DOMContentLoaded", function() {

	// Custom JS

});

var mainSliders = document.getElementsByClassName("main-slider");

if(mainSliders){
	for(let i = 0; i < mainSliders.length; i++){
		let slider = mainSliders[i];
		slider = tns({
			controls: false,
			autoHeight: true,
			loop: false,
			rewind: true,
			mouseDrag: true,
			container: slider,
			nav: false,
			navPosition: 'bottom',
			items: 1,
			gutter: 10,
			controls: true,
			controlsContainer: slider.nextElementSibling,
			autoplay: true,
			autoplayButtonOutput: false
		});
	}
}

var galleries = document.querySelectorAll('.lg');
for (let i = 0; i < galleries.length; i++) {
	lightGallery(galleries[i],{
		thumbnail: false,
		selector: '.lg-item',
		download: false
	})
}

function openMenu(e){
	if(e.parentElement.classList.contains("open")){
		e.nextElementSibling.style.maxHeight = "0";
		e.parentElement.classList.remove("open");
	}else{
		e.nextElementSibling.style.maxHeight = e.nextElementSibling.scrollHeight + "px";
		e.parentElement.classList.add("open");
	}
}

const modalSearch = document.querySelector('#modal-search');
function openSearch(e){
	// overlay.classList.add('active');
	modalSearch.classList.add('opacity');
	// document.body.classList.add("noscroll");
	let close = modalSearch.querySelector('.modal__close');
	close.addEventListener("click", ()=>{
		// overlay.classList.remove('active');
		modalSearch.classList.remove('opacity');
		// document.body.classList.remove("noscroll");
	});
}

modalSearch.addEventListener("click", closeModal);
function closeModal(e){
	if (e.target == modalSearch) {
		modalSearch.classList.remove('opacity');
		// document.body.classList.remove("noscroll");
	}
}

var picker = new Lightpick({
	field: document.querySelector('input[name="from"]'),
	secondField: document.querySelector('input[name="to"]'),
	singleDate: false,
	format: 'DD.MM.YYYY',
});