(function handleBurger() {
	document.querySelector('.burger').addEventListener('click', () => {
		document.querySelector('.hero__burger').classList.toggle("active")
		document.querySelector('.hero__burger-line').classList.toggle('close')
	})
})()


// window.addEventListener("DOMContentLoaded", () => {
// 	handleBurger()
// })