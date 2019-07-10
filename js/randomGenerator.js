

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
	];
	let randomNum1 = randomInt(tagsArray.length);
	let randomNum2 = randomInt(tagsArray.length);
	while (randomNum1 === randomNum2) {
		randomNum2 = randomInt(tagsArray.length);
	}
	let tagsRandom = [tagsArray[randomNum1], tagsArray[randomNum2]];
	return tagsRandom;
}


// ON LOAD /////////////////////////////////////////////////////////////////////

//add 10 random articles to the database
// for (let i=0; i < 10; i++) {
// 	createArticle(title(), image(), content(), tagsRandom());
// }
