const tags = document.querySelector(".onboard-tags");
const login = document.querySelector(".onboard-login");



//check if username entered, then save it into a variable
password.addEventListener("keyup", function () {
	if (event.keyCode === 13) {
		// nextScreen();
		addUser(username.value, password.value);
	}
});

//add anon clickeventlistener
const anon = document.querySelector(".anon");
//otherwise check if anon
anon.addEventListener("click", nextScreen);
//move to next frame
function nextScreen() {
	login.classList.toggle("hide");
	tags.classList.toggle("hide");
}
//log what tags are selected. Store in variable for next page.
//navigate to next page on click
function addUser(username, password) {
	console.log(`username: ${username}`);
	console.log(`password: ${password}`);
	// FIREBASE ///////////////////////////////////////////////////////////////////
	auth.createUserWithEmailAndPassword(username, password).catch(function(error) {
		 // Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		console.error(errorMessage);
		// ...
	});
}
