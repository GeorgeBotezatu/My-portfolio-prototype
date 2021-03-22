let controller;
let slideScene;
let pageScene;

function animateSlides() {
	//initializare controller
	controller = new ScrollMagic.Controller();

	//selectam slide-urile din main si meniul
	const sliders = document.querySelectorAll(".slide");
	const nav = document.querySelector(".nav-header");

	//parcurgerm slider-urile
	sliders.forEach((slide, index, slides) => {
		//Selectare element din slide
		const revealImg = slide.querySelector(".reveal-img");
		const img = slide.querySelector("img");
		const revealTxt = slide.querySelector(".reveal-text");

		//Initializare Gsap timeline
		const slideTimeLine = gsap.timeline({
			defaults: {
				duration: 1,
				ease: "power2.inOut",
			},
		});
		//sliderul creat.tipul de animatie(fromTo)(componenta animata, de unde incepe,unde ajunge,cand incepe)
		slideTimeLine.fromTo(revealImg, { x: "0%" }, { x: "100%" });
		slideTimeLine.fromTo(img, { scale: 2 }, { scale: 1 }, "-=1");
		slideTimeLine.fromTo(revealTxt, { x: "0%" }, { x: "100%" }, "-=0.75");
		slideTimeLine.fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=0.5");

		//creare ScrollScene pentru slide
		slideScene = new ScrollMagic.Scene({
			triggerElment: slide,
			triggerHook: 0.25,
			reverse: false,
		})
			.setTween(slideTimeLine)
			.addTo(controller);

		//animatie pagina
		const pageTl = gsap.timeline();
		let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
		pageTl.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
		pageTl.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 });
		pageTl.fromTo(nextSlide, { y: "50%" }, { y: "0%" });
		//create new scene
		pageScene = new ScrollMagic.Scene({
			triggerElement: slide,
			duration: "100%",
			triggerHook: 0,
		})

			.setPin(slide, { pushFollowers: false }) //control pe baza la scroll//push pt a crea  efect de suprapunere
			.setTween(pageTl) //adaugam timeline-ul creat la scena
			.addTo(controller);
	});
}
//Cursor
const mouse = document.querySelector(".cursor");
const mouseTxt = mouse.querySelector("span");
const burger = document.querySelector(".burger");

function cursor(e) {
	mouse.style.top = e.pageY + "px";
	mouse.style.left = e.pageX + "px";
}
function activeCursor(e) {
	const item = e.target;
	if (item.id === "logo" || item.classList.contains("burger")) {
		mouse.classList.add("nav-active");
	} else {
		mouse.classList.remove("nav-active");
	}
}
function navToggle(e) {
	if (!e.target.classList.contains("active")) {
		e.target.classList.add("active");
		gsap.to(".line1", 0.5, { rotate: "45", y: 6, background: "black" });
		gsap.to(".line2", 0.5, { rotate: "-45", y: -6, background: "black" });
		gsap.to(".line3", 0.5, { y: -18, background: "black" });
		gsap.to(".nav-bar", 1, { clipPath: "circle(2500px at 100% -10%)" });
		gsap.to(".burger", 1, { rotate: "360" });
		gsap.to("#logo", 1, { color: "black" });
		document.body.classList.add("hide");
	} else {
		e.target.classList.remove("active");
		gsap.to(".line1", 0.5, { rotate: "0", y: 0, background: "white" });
		gsap.to(".line2", 0.5, { rotate: "0", y: 0, background: "white" });
		gsap.to(".line3", 0.5, { y: 0, background: "white" });
		gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%)" });
		gsap.to(".burger", 1, { rotate: "0" });
		gsap.to("#logo", 1, { color: "white" });
		document.body.classList.remove("hide");
	}
}

//Event Listeners
burger.addEventListener("click", navToggle);
window.addEventListener("mousemove", cursor);
window.addEventListener("mouseover", activeCursor);
animateSlides();
