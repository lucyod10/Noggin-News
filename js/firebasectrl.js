// HANDLES AUTHENTICATION AND ONBOARDING ///////////////////////////////////////

// AUTHENTICATION //////////////////////////////////////////////////////////////
const username = document.querySelector("#username");
const password = document.querySelector("#password");
// Account Details
const accountDetails = document.getElementById("accountDetails");
// USER
//log what tags are selected. Store in variable for next page.
//navigate to next page on click
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

	password.addEventListener("keyup", function () {
		if (event.keyCode === 13) {
			addUser();
		}
	});

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

// TODO input box width max
// TODO add a feature image

//filters through each document above, and handles what to do with the data within.
const loadDatabase = (data) => {
	//clear database
	clearArticleDatabase();
	// check that that data has length, otherwise there are no posts
	if (data.length) {
		data.forEach(doc => {
			const post = doc.data();
			const title = post.title;
			const content = post.content;
			const i = image();
			const t = tagsRandom();
			createArticle(title, i, content, t);
		});
	}
	else {
		console.error("no posts");
	}
};

const addToDatabase = (userid, title, content) => {
		db.collection("posts").doc(userid).collection("posts").add({
			title: title,
			content: content
		}).
		then(function() {
			console.log("Document written");
		}).
		catch(function(error) {
			console.error("Error writing document: ", error);
		});
};

// Add functionality to save button
const saveNewEntryButton = document.querySelector("#save");
saveNewEntryButton.addEventListener("click", saveNewEntry);

function saveNewEntry() {
	const title = document.querySelector("#title").value;
	const content = document.querySelector("#content").value;
	auth.onAuthStateChanged(user => {
		if (user) {
			console.log("user logged in: " + user);
			const userid = user.uid;
			addToDatabase(userid, title, content);
			stateMain();
		}
		else {
			console.log("Insufficient permissions.");
		}
	});
}

// listen for on auth state changes
auth.onAuthStateChanged(user => {
	if (user) {
		//Logout Control
		document.getElementById("logout").addEventListener("click", logout);
		document.getElementById("logout").innerHTML = "Log Out";

		console.log(user);
		stateMain();
		accountDetails.style.display = "block";
		document.getElementById("accountUsername").innerHTML = user.email;
		document.getElementById("accountUserId").innerHTML = user.uid;
		//get data
		//onsnapshot pushes every live change of database in real time
		db.collection("posts").doc(user.uid).collection("posts").onSnapshot(snapshot => {
			//filter snapshot through to get values from that collection
			//to retrieve an array of each document:
			loadDatabase(snapshot.docs);
		});
	}
	else {
		//Logout Control
		document.getElementById("logout").addEventListener("click", function() {
			stateOnboard();
		});
		document.getElementById("logout").innerHTML = "Log In";

		accountDetails.style.display = "none";
		console.log("User not logged in.");
	}
});

// ON LOAD /////////////////////////////////////////////////////////////////////
login();
