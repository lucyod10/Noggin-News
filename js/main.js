//TODO make the 150 character collapse after 2 lines, and you can uncollapse it

//Select tags, and add them to the tag list
let tagList = [];
let tags = document.querySelectorAll(".tag");
for (let i=0; i < tags.length; i++) {
	tags[i].addEventListener("click", tagSelect);
}

function tagSelect () {
	//alternate the tags, to either select or deselect the tag
	//event.target.classList.toggle("deselectTag");
	event.target.classList.toggle("selectTag");

	//check if the tag has been changed to selects, and if so add it to the array
	if (event.target.classList.contains("selectTag") === true) {
		//if the tag has just been selected, then add it to the array
		tagList.push(event.target.getAttribute("id"));
	}
	//if it has just been deselected, then remove it from the array
	else {
		let id = event.target.getAttribute('id');
		let index = tagList.indexOf(id);
		if (index > -1) {
			tagList.splice(index, 1);
		}
	}
	console.log("taglist length: " + tagList);
}

//create an article
function addArticle (t, i, c, ts) {
	const article = document.createElement("article");
	article.setAttribute("class", "article");
	const title = document.createElement("span");
	title.textContent = t;
	title.setAttribute("class", "title");
	const img = document.createElement("img");
	img.setAttribute("src", i);
	img.setAttribute("class", "featureimg");
	const caption = document.createElement("p");
	caption.textContent = c;

	const end = document.createElement("span");
	end.setAttribute("class", "end");

	const likes = document.createElement("span");
	likes.innerHTML = "<i class='far fa-heart'></i>300";
	likes.setAttribute("class", "likes");

	const comments = document.createElement("span");
	comments.innerHTML = "<i class='far fa-comment'></i>300";
	comments.setAttribute("class", "comments");

	const share = document.createElement("span");
	share.innerHTML = "<i class='far fa-share-square'></i>";
	share.setAttribute("class", "share");

	const tags = document.createElement("div");
	tags.setAttribute("class", "tags");
	const ul = document.createElement("ul");
	tags.appendChild(ul);

		for (let i=0; i < ts.length; i++) {
			const tag = document.createElement("li");
			tag.setAttribute("class", "selectTag");
			tag.classList.add(ts[i]);
			tag.innerHTML = ts[i];
			ul.appendChild(tag);
	}

	article.appendChild(tags);
	article.appendChild(title);
	article.appendChild(img);
	article.appendChild(caption);
	article.appendChild(end);
	end.appendChild(likes);
	end.appendChild(comments);
	end.appendChild(share);
	const main = document.querySelector("main");
	main.appendChild(article);
}

//have a database full of article objects.
const articleDatabase = [];
const createArticle = function (t, i, c, ts) {
	let article = {
		title: t,
		img: i,
		content: c,
		tags: ts
	}
articleDatabase.push(article);
}
//loop through articledatabase, finding tags for each article inside
//if tag contains one of the selected tags from tagList
//addArticle
//filter the articles to only show articles with matching tags
function articleFilter () {
	//TODO make an article object that randomly generates articles and tags
	//filter through article object to find articles with tags matching tagList
	for (let i = 0; i < articleDatabase.length; i++) {
		const tags = articleDatabase[i].tags;
		let add = false;
		//TODO optiimisation: use a for loop so you can break out of it as soon as a tag is found
		//you dont to use a bool in this case
		tagList.forEach(function(tag) {
  			if (tags.includes(tag)) {
  				//add these articles using addArticle()
  				//to check youre not adding the article twice
  				//dont add here, just change bool
				add = true;
			}
		});

		if (add === true) {
			let db = articleDatabase[i];
			addArticle(db.title, db.img, db.content, db.tags);

		}
	}

	//TODO Remove articles on the page that are not in the tag list
}

function randomInt (max) {
	let randomNum = Math.floor(Math.random() * max);
	return randomNum;
}

function title () {
	const titles = [
		"Cupcake dragée tiramisu croissant ice cream.",
		"Liquorice pastry tart I love sugar plum bonbon.",
		"Tootsie roll pastry liquorice candy canes jelly beans.",
		"Jelly beans biscuit marzipan tiramisu dessert I love candy canes",
		"Icing I love I love dessert sugar plum topping.",
		"Brownie brownie jelly beans pudding cupcake donut",
		"Apple pie sweet roll cheesecake cupcake sweet pastry.",
		"Chocolate gummi bears gummi bears sweet gummies macaroon gingerbread",
		"Apple pie sweet roll cheesecake cupcake sweet pastry.",
		"Marzipan liquorice carrot cake bear claw.",
		"Lollipop fruitcake I love tart sweet roll sugar plum marzipan jelly."
	]

	let randomNum = randomInt(titles.length);
	let title = titles[randomNum];
	return title;
}

function image () {
	let randomNumW = Math.floor(Math.random() * 200)+100;
	let randomNumH = Math.floor(Math.random() * 150)+100;
	let image = `https://placedog.net/${randomNumW}/${randomNumH}?random`;
	return image;
}

function content () {
	const contents = [
		"Macaroon jelly beans fruitcake danish cake tiramisu donut caramels. Cheesecake I love macaroon apple pie cotton candy soufflé tiramisu lemon drops. Cake pie oat cake pudding muffin. Marzipan macaroon lollipop jelly beans caramels apple pie powder.",
		"Caramels I love tiramisu danish I love jelly pudding. Danish biscuit cupcake I love cotton candy powder tootsie roll. Danish caramels dessert tootsie roll.",
		"Pie donut donut donut. Cotton candy gummies gingerbread icing ice cream I love pastry. Soufflé toffee danish I love caramels jelly beans jelly beans dessert cupcake. Soufflé I love lollipop ice cream cotton candy tart sweet.",
		"Pastry lemon drops tart chocolate cake. Cupcake topping I love macaroon sugar plum. Marshmallow tart toffee carrot cake tart jelly macaroon halvah. Chupa chups I love caramels icing.",
		"Soufflé macaroon I love I love. Apple pie brownie gummi bears tiramisu sweet roll soufflé fruitcake macaroon. Lollipop gummi bears sweet roll I love sweet roll I love donut marshmallow. Sugar plum jujubes powder pie liquorice chocolate icing.",
		"Sesame snaps pastry tart. Brownie sugar plum toffee dessert ice cream. Cookie jujubes lollipop pudding wafer biscuit gingerbread bear claw. Toffee tiramisu gummies sesame snaps.",
		"I love jujubes cookie ice cream ice cream danish macaroon dessert dragée. Croissant pudding sesame snaps wafer I love. Cupcake candy chocolate bar powder dragée sweet. Bear claw chocolate cake jelly sesame snaps."
		]

	let randomNum = randomInt(contents.length);
	let content = contents[randomNum];
	return content;
}

function tagsRandom () {
	const tagsArray = [
		"global",
		"happy",
		"pop",
		"tech",
		"finance"
		]

	let randomNum1 = randomInt(tagsArray.length);
	let randomNum2 = randomInt(tagsArray.length);
	while (randomNum1 === randomNum2) {
		randomNum2 = randomInt(tagsArray.length);
	}

	let tagsRandom = [tagsArray[randomNum1], tagsArray[randomNum2]];
	return tagsRandom;
}

const makeArticlesBtn = document.getElementById("makeArticles");
makeArticlesBtn.addEventListener("click", articleFilter);

//add 10 random articles to the database
for (let i=0; i < 10; i++) {
	createArticle(title(), image(), content(), tagsRandom());
}

// FIREBASE ///////////////////////////////////////////////////////////////////
function newUser (ref, name, pw) {
	db.collection("users").doc(ref).set({
		name: name,
		password: pw
	}).
	then(function() {
		console.log("Document written");
	}).
	catch(function(error) {
		console.error("Error writing document: ", error);
	});



	db.collection("users").doc(ref).collection("posts").doc("post1").set({
		title: title(),
		content: content()
	}).
	then(function() {
		console.log("Document written");
	}).
	catch(function(error) {
		console.error("Error writing document: ", error);
	});
}




// db.collection("users").add({
//     first: "Lucy",
//     last: "Lovelace",
//     born: 1815
// })
// .then(function(docRef) {
//     console.log("Document written with ID: ", docRef.id);
// })
// .catch(function(error) {
//     console.error("Error adding document: ", error);
// });
