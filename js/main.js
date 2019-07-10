// HANDLES DOM STATE ///////////////////////////////////////////////////////////

// STATES
function stateOnboard () {
	document.querySelector(".onboardState").style.display="block";
	document.querySelector(".mainState").style.display="none";
	document.querySelector(".newEntryState").style.display="none";
	document.querySelector(".headerState").style.display="none";
	document.querySelector(".footerState").style.display="none";
}

function stateMain () {
	document.querySelector(".onboardState").style.display="none";
	document.querySelector(".mainState").style.display="block";
	document.querySelector(".newEntryState").style.display="none";
	document.querySelector(".headerState").style.display="block";
	document.querySelector(".footerState").style.display="block";
	clearAddArticleInput();
}

function stateNewEntry () {
	document.querySelector(".onboardState").style.display="none";
	document.querySelector(".mainState").style.display="none";
	document.querySelector(".newEntryState").style.display="block";
	document.querySelector(".headerState").style.display="block";
	document.querySelector(".footerState").style.display="block";
}

const logoButton = document.querySelector("#logo");
logoButton.addEventListener("click", function () {
	stateMain();
});

// ANON
document.getElementById("anonLogin").addEventListener("click", function () {
	stateMain();
});

// TAGS ////////////////////////////////////////////////////////////////////////

const globalTagNames = [
	{ name: "beauty",
		className: "tagOne"},
	{ name: "food",
		className: "tagTwo"},
	{ name: "fashion",
		className: "tagThree"},
	{ name: "tech",
		className: "tagFour"},
	{ name: "cats",
		className: "tagFive"},
	{ name: "dogs",
		className: "tagSix"},
	{ name: "rant",
		className: "tagSeven"},
];

//create tag list in main section of document
for (let i=0; i < globalTagNames.length; i++) {
	const tagMainUl = document.querySelector(".mainState .tags ul");
	const newTag = document.createElement("li");
	newTag.setAttribute("id", globalTagNames[i].className);
	newTag.setAttribute("class", globalTagNames[i].className);
	newTag.classList.add("tag");
	newTag.innerHTML = globalTagNames[i].name;
	newTag.addEventListener("click", tagSelect);
	// automatically select all tags on load
	newTag.classList.add("selectTag");
	tagMainUl.appendChild(newTag);
}

let tagList = [
	"tagOne",
	"tagTwo",
	"tagThree",
	"tagFour",
	"tagFive",
	"tagSix",
	"tagSeven"
];
let tags = document.querySelectorAll(".mainState .tag");
// for (let i=0; i < tags.length; i++) {
// 	tags[i].addEventListener("click", tagSelect);
// 	// automatically select all tags on load
// 	tags[i].classList.add("selectTag");
// }

function tagSelect () {
	// change tag button styling
	event.target.classList.toggle("selectTag");

	// check if the tag has been changed to selects, and if so add it to the array
	if (event.target.classList.contains("selectTag") === true) {
		// if the tag has just been selected, then add it to the array
		tagList.push(event.target.getAttribute("id"));
	}
	// if it has just been deselected, then remove it from the array
	else {
		let id = event.target.getAttribute('id');
		let index = tagList.indexOf(id);
		if (index > -1) {
			tagList.splice(index, 1);
		}
	}
	console.log("taglist length: " + tagList);
}

// ADD ARTICLES ////////////////////////////////////////////////////////////////
//create an article on the page
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

	const newTags = document.createElement("div");
	newTags.setAttribute("class", "tags");
	const ul = document.createElement("ul");
	newTags.appendChild(ul);

		for (let i=0; i < ts.length; i++) {
			const tag = document.createElement("li");
			tag.setAttribute("class", "selectTag");
			tag.classList.add(ts[i]);
			//change the text of the tag to match the tag objects set in globalTagNames
			for (let j=0; j < globalTagNames.length; j++) {
				if (globalTagNames[j].className === ts[i]) {
					tag.innerHTML = globalTagNames[j].name;
					break;
				}
			}

			ul.appendChild(tag);
		}

	article.appendChild(newTags);
	article.appendChild(title);
	article.appendChild(img);
	article.appendChild(caption);
	article.appendChild(end);
	end.appendChild(likes);
	end.appendChild(comments);
	end.appendChild(share);
	const main = document.querySelector("#articleHolder");
	main.appendChild(article);
}

// array full of articles for the current user, populated in firebasectrl using createArticle
let articleDatabase = [];
const createArticle = function (t, i, c, ts) {
	let article = {
		title: t,
		img: i,
		content: c,
		tags: ts
	};
	articleDatabase.push(article);
}

function clearArticlesOnPage () {
	const articleHolder = document.querySelector("#articleHolder");
	while (articleHolder.firstChild) {
		articleHolder.removeChild(articleHolder.firstChild);
	}
}

function clearArticleDatabase () {
	articleDatabase = [];
}

const makeArticlesBtn = document.getElementById("makeArticles");
makeArticlesBtn.addEventListener("click", articleFilter);
// loop through articleDatabase, adding any article whose tags match the tags in tagList to the page
function articleFilter () {
	clearArticlesOnPage()
	console.log("article database " + articleDatabase);
	for (let i = 0; i < articleDatabase.length; i++) {
		const ts = articleDatabase[i].tags;

		for (let j=0; j < tagList.length; j++) {
			if (ts && ts.includes(tagList[j])) {
				let articledb = articleDatabase[i];
				addArticle(articledb.title, articledb.img, articledb.content, articledb.tags);
				// break out of this loop if tag found, to avoid articles with more than one matching tag to be added multiple times
				break;
			}
		}
	}
}

function image () {
	let randomNumW = Math.floor(Math.random() * 200)+100;
	let randomNumH = Math.floor(Math.random() * 150)+100;
	let image = `https://placedog.net/${randomNumW}/${randomNumH}?random`;
	return image;
}

// NEW ENTRY /////////////////////////////////////////////////////////////////////

let newEntryTags = document.querySelectorAll(".newEntryState .tag");
let newEntryTagList = [];
// for (let i=0; i < newEntryTags.length; i++) {
// 	newEntryTags[i].addEventListener("click", newEntryTagSelect);
// }

//create tag list in main section of document
for (let i=0; i < globalTagNames.length; i++) {
	const tagMainUl = document.querySelector(".newEntryState .tags ul");
	const newTag = document.createElement("li");
	newTag.setAttribute("class", globalTagNames[i].className);
	newTag.classList.add("tag");
	newTag.innerHTML = globalTagNames[i].name;
	newTag.addEventListener("click", newEntryTagSelect);
	// automatically select all tags on load
	newTag.classList.add("selectTag");
	tagMainUl.appendChild(newTag);
}

function newEntryTagSelect () {
	// change styling of button
	event.target.classList.toggle("selectTag");

	// get the type of tag, without using id as it is used in the main section.
	const thisClassList = event.target.classList;
	let thisClass = "";
	thisClassList.forEach(function (val) {
		if (val != "tag" && val != "selectTag") {
			thisClass = val;
		}
	});

	// check if the tag has been changed to selects, and if so add it to the array
	if (event.target.classList.contains("selectTag") === true) {
		newEntryTagList.push(thisClass);
	}
	// or if it has just been deselected, then remove it from the array
	else {
		let index = newEntryTagList.indexOf(thisClass);
		if (index > -1) {
			newEntryTagList.splice(index, 1);
		}
	}
	console.log("newEntryTagList length: " + newEntryTagList);
}

const newEntryButton = document.querySelector("#newentry");
newEntryButton.addEventListener("click", function () {
	stateNewEntry();
});

function clearAddArticleInput () {
	const t = document.getElementById("title").value = "";;
	const c = document.getElementById("content").value = "";;
	const tag = document.querySelectorAll(".newEntryState .tag");
	tag.forEach(function(t) {
		t.classList.remove("selectTag");
		newEntryTagList = [];
	});
}
