//TODO make the 150 character collapse after 2 lines, and you can uncollapse it

//Select tags, and add them to the tag list
let tagList = [];
let tags = document.querySelectorAll(".tags");
for (let i=0; i < tags.length; i++) {
	tags[i].addEventListener("click", tagSelect);
}

function tagSelect () {
	//alternate the tags, to either select or deselect the tag
	event.target.classList.toggle("deselectTag");
	event.target.classList.toggle("selectTag");

	//check if the tag has been changed to selects, and if so add it to the array
	if (event.target.classList.contains("selectTag") === true) {
		//if the tag has just been selected, then add it to the array
		tagList.push(event.target);
	}
	//if it has just been deselected, then remove it from the array
	else {
		let id = event.target.getAttribute('id');
		for (let i=0; i < tagList.length; i++) {
			if (id === tagList[i].getAttribute("id")){
				tagList.splice(i, 1);
			}
		}
	}
	console.log("taglist length: " + tagList.length);
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
			tag.setAttribute("class", "deselectTag");
			tag.setAttribute("id", ts[i]);
			tag.innerHTML = ts[i];
			tag.addEventListener("click", tagSelect);

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

//filter the articles to only show articles with matching tags
function articleFilter () {
	//TODO make an article object that randomly generates articles and tags
	//filter through article object to find articles with tags matching tagList
	//add these articles using addArticle()
}

const makeArticlesBtn = document.getElementById("makeArticles");
makeArticlesBtn.addEventListener("click", articleFilter);

addArticle("wow", "https://placedog.net/170/100?random", "wowie", ["global", "happy"]);
addArticle("wow", "https://placedog.net/170/100?random", "wowie", ["global", "happy", "tech"]);
addArticle("wow", "https://placedog.net/170/100?random", "wowie", ["tech", "finance"]);
addArticle("wow", "https://placedog.net/170/100?random", "wowie", ["pop", "happy"]);
addArticle("wow", "https://placedog.net/170/100?random", "wowie", ["pop", "happy", "tech"]);
addArticle("wow", "https://placedog.net/170/100?random", "wowie", ["happy"]);


