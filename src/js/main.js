function handleBurger() {
	document.querySelector('.burger').addEventListener('click', () => {
		document.querySelector('.hero__menu-list').classList.toggle('active')
		document.querySelector('.burger__line').classList.toggle('close')
	})
}

window.addEventListener("DOMContentLoaded", () => {
	handleBurger()
})