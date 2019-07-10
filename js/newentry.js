// TODO make input boxes draggable
// TODO add a feature image
// TODO autocomplete/spell check

const save = document.querySelector("#save");
save.addEventListener("click", function () {
	const title = document.querySelector("#title").value;
	const content = document.querySelector("#content").value;

	newUser("1", title, content);
});


// FIREBASE ///////////////////////////////////////////////////////////////////
function newUser (ref, title, content) {

	db.collection("users").doc(ref).collection("posts").doc("post1").set({
		title: title,
		content: content
	}).
	then(function() {
		console.log("Document written");
	}).
	catch(function(error) {
		console.error("Error writing document: ", error);
	});
}
