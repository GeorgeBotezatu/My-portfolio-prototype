// Contact
function animateForm() {
	const arrows = document.querySelectorAll(".fa-arrow-down");
	const texta = document.querySelector("#textarea");
	arrows.forEach((arrow) => {
		arrow.addEventListener("click", () => {
			const input = arrow.previousElementSibling; //imi ia tagul de dinainte la sageata in cazul asta input
			const parent = arrow.parentElement; //imi ia divul in care se afla ,parintele
			const nextForm = parent.nextElementSibling; //imi da urmatorul frate de la divadica divul cu email
			//chec for validation
			if (input.type === "text" && validateUser(input)) {
				nextSlide(parent, nextForm);
			} else if (input.type === "email" && validateEmail(input)) {
				nextSlide(parent, nextForm);
			} else if (validateTextarea(texta)) {
				nextSlide(parent, nextForm);
			} else {
				parent.style.animation = "shake 0.5s ease";
			}

			parent.addEventListener("animationend", () => {
				parent.style.animation = "";
			});
		});
	});
}

function validateUser(user) {
	if (user.value.length < 6) {
		error("rgb(193,200,228)");
	} else {
		error("rgb(193,200,228)");
		return true;
	}
}

function validateEmail(email) {
	const validation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (validation.test(email.value)) {
		error("rgb(193,200,228)");
		return true;
	} else {
		error("rgb(193,200,228)");
	}
}
function validateTextarea(textarea) {
	if (textarea.value.length < 1) {
		error("rgb(193,200,228)");
	} else {
		error("rgb(193,200,228)");
		return true;
	}
}

function nextSlide(parent, nextForm) {
	parent.classList.add("inactive");
	parent.classList.remove("active");

	nextForm.classList.add("active");
}

function error(color) {
	document.querySelector(".contact-container").style.backgroundColor = color;
}

animateForm();
