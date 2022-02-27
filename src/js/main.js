// (function handleBurger() {
// 	document.querySelector('.burger').addEventListener('click', () => {
// 		document.querySelector('.burger__menu').classList.toggle("active")
// 		// document.querySelector('.burger__line').classList.toggle("close")
// 	})
// }())

// window.addEventListener("DOMContentLoaded", () => {
// 	handleBurger()
// })


const btnMenu = document.querySelector('.burger');
const burgerMenu = document.querySelector(".burger__menu");
const burgerLine = document.querySelector(".burger__line");

if (btnMenu) {
	btnMenu.addEventListener("click", (e) => {
		burgerMenu.classList.toggle("_active");
		burgerLine.classList.toggle("_close");
	})
}