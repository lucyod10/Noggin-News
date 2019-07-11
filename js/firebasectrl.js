// HANDLES AUTHENTICATION AND ONBOARDING ///////////////////////////////////////

// AUTHENTICATION //////////////////////////////////////////////////////////////
const username = document.querySelector("#username");
const password = document.querySelector("#password");
// Account Details
const accountDetails = document.getElementById("accountDetails");

// USER
function addUser() {
	hideError();
	hideSuccess();
	const u = username.value;
	const p = password.value;

	auth.createUserWithEmailAndPassword(u, p)
			.then(function() {
				showSuccess("User Created");
				clearInput();
			})
			.catch(function(error) {
				 // Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				showError(errorMessage);
			});
}

function signIn () {
	hideError();
	hideSuccess();
	const u = username.value;
	const p = password.value;

	auth.signInWithEmailAndPassword(u, p)
			.then(function(cred) {
				console.log(cred.user);
				showSuccess("Signed In");
				clearInput();
			})
			.catch(function(error) {
		  // Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			showError(errorMessage);
			});
}

function logout () {
	hideError();
	hideSuccess();
	clearArticlesOnPage();
	clearArticleDatabase();
	auth.signOut();
	stateOnboard();
}

function signUp () {
	hideError();
	hideSuccess();
	const switchScreen = document.querySelector("#onboardSwitch");
	switchScreen.removeEventListener("click", signUp);
	switchScreen.addEventListener("click", login);
	switchScreen.innerHTML = "Log In";

	const button = document.querySelector("#onboardButton");
	button.innerHTML = "Sign Up";
	button.addEventListener("click", addUser);
	button.removeEventListener("click", signIn);

	password.addEventListener("keyup", onEnterKeyAddUser);
	password.removeEventListener("keyup", onEnterKeyLogin);
}

function login () {
	hideError();
	hideSuccess();
	const switchScreen = document.querySelector("#onboardSwitch");
	switchScreen.removeEventListener("click", login);
	switchScreen.addEventListener("click", signUp);
	switchScreen.innerHTML = "Sign Up";

	const button = document.querySelector("#onboardButton");
	button.innerHTML = "Login";
	button.removeEventListener("click", addUser);
	button.addEventListener("click", signIn);

	password.addEventListener("keyup", onEnterKeyLogin);
	password.removeEventListener("keyup", onEnterKeyAddUser);
}

function onEnterKeyAddUser () {
		if (event.keyCode === 13) {
			addUser();
		}
}

function onEnterKeyLogin () {
		if (event.keyCode === 13) {
			signIn();
		}
}

function clearInput () {
	username.value = "";
	password.value = "";
}

function showError (txt) {
	const error = document.getElementById("error");
	error.innerHTML = txt;
	error.style.display = "block";
}

function hideError () {
	const error = document.getElementById("error");
	error.style.display = "none";
}

function showSuccess (txt) {
	const success = document.getElementById("success");
	success.innerHTML = txt;
	success.style.display = "block";
}

function hideSuccess () {
	const success = document.getElementById("success");
	success.style.display = "none";
}

// DATABASE ////////////////////////////////////////////////////////////////////
// HANDLES NEW ENTRIES, LOADS ENTRIES /////////////////////////////////////////

//filters through each document above, and handles what to do with the data within.
const loadDatabase = (data) => {
	clearArticleDatabase();
	// check that that data has length, otherwise there are no posts
	if (data.length) {
		data.forEach(doc => {
			const post = doc.data();
			const title = post.title;
			const content = post.content;
			const i = image();
			const t = post.tags;
			createArticle(title, i, content, t);
		});
	}
	else {
		console.error("no posts");
	}
	//populate page on load
	console.log("populated page");
	articleFilter();
};

const addToDatabase = (userid, title, content, tags) => {
		db.collection("posts").doc(userid).collection("posts").add({
				title: title,
				content: content,
				tags: tags
			})
			.catch(function(error) {
				console.error("Error writing document: ", error);
			});
};

const saveNewEntryButton = document.querySelector("#save");
saveNewEntryButton.addEventListener("click", function () {
	//check that the user is logged in in order to save a new article
	auth.onAuthStateChanged(user => {
		if (user) {
			saveNewEntry();
		}
		else {
			errorMessageShow("User is not logged in, you cannot save an article.");
			console.error("User is not logged in, you cannot save an article.");
		}
	});
});
function saveNewEntry() {
	const title = document.querySelector("#title").value;
	const content = document.querySelector("#content").value;
	// TODO check that there is content in all
	auth.onAuthStateChanged(user => {
		if (user) {
			if (title != "" && content != "" && newEntryTagList.length) {
				console.log("user logged in: " + user);
				const userid = user.uid;
				addToDatabase(userid, title, content, newEntryTagList);
				errorMessageHide();
				stateMain();
			}
			else {
				console.log(title);
				let errorType = [];
				if (title === "") {
					errorType.push("a title");
				}
				if (content === "") {
					errorType.push("some content");
				}
				if (newEntryTagList.length <= 0) {
					errorType.push("some tags");
				}

				if (errorType.length === 2) {
					errorType.join(", and ")
				}
				else if (errorType.length === 3) {
					errorType = `${errorType[0]}, ${errorType[1]} and ${errorType[2]}`
				}
				errorMessageShow(`Input invalid. You need to add ${errorType}`);
				console.error(`Input invalid. You need to add ${errorType}`);
			}
		}
	});
}

// listen for on auth state changes
auth.onAuthStateChanged(user => {
	if (user) {
		document.getElementById("logout").addEventListener("click", logout);
		document.getElementById("logout").setAttribute("class", "fas fa-sign-out-alt");
		document.getElementById("logout").setAttribute("alt", "Sign Out");

		console.log(user);
		stateMain();
		accountDetails.style.display = "block";
		document.getElementById("accountUsername").innerHTML = user.email;

		// onSnapshot pushes every change of database in real time
		db.collection("posts").doc(user.uid).collection("posts").onSnapshot(snapshot => {
			loadDatabase(snapshot.docs);
		});


	}
	else {
		document.getElementById("logout").addEventListener("click", stateOnboard);
		document.getElementById("logout").setAttribute("class", "fas fa-sign-in-alt");
		document.getElementById("logout").setAttribute("alt", "Sign In");

		accountDetails.style.display = "none";
		console.log("User not logged in.");
	}
});

// ON LOAD /////////////////////////////////////////////////////////////////////
login();
