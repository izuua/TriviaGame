// JAVASCRIPT 
console.log("JS File Linked");
var win = 0;
var lose = 0;
// var restart = false;
var targetNumber;
var numberOptions = [0, 0, 0, 0];

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setNumber() {
  targetNumber = getRandomInt(19, 120);
  $("#number-to-guess").text(targetNumber);
  numberOptions.forEach(function(part, index) {
    this[index] = getRandomInt(1, 12);
    console.log(numberOptions[index]);
  }, numberOptions)

}

function update() {
    counterDis.text("Score: " + counter);
    $("#crystals").append(counterDis);
    winDis.text("Wins: " + win);
    $("#crystals").append(winDis);
    loseDis.text("Losses: " + lose);
    $("#crystals").append(loseDis);
    winLossDis.text("");
    $("#crystals").append(winLossDis);
}

function imageReset() { //code to remove images
  $("#win-image").detach();
  $("#lose-image").detach();
}

function crystalUpdate() { //updates crystal values
  for (var j = 0; j < numberOptions.length; j++) {
    $("#crystal" + j).attr("data-crystalvalue", numberOptions[j]);
  }
}

function reset() {
    // restart = true;
    counter = 0;
    setNumber();
    update();
    crystalUpdate();    
}


setNumber();

var counter = 0;

// Now for the hard part. Creating multiple crystals each with their own unique number value.

// We begin by expanding our array to include four options.

var imgArray = ["assets/images/ruby.png", "assets/images/amethyst.png", "assets/images/sapphire.png", "assets/images/diamond.png"];


// Next we create a for loop to create crystals for every numberOption.

for (var i = 0; i < numberOptions.length; i++) {

  // For each iteration, we will create an imageCrystal
  var imageCrystal = $("<img>");

  // First each crystal will be given the class ".crystal-image".
  // This will allow the CSS to take effect.
  imageCrystal.addClass("crystal-image");

  // Each imageCrystal will be given a src link to the crystal image
  imageCrystal.attr("src", imgArray[i]);
  imageCrystal.attr("id", "crystal" + i);

  // Each imageCrystal will be given a data attribute called data-crystalValue.
  // This data attribute will be set equal to the array value.
  imageCrystal.attr("data-crystalvalue", numberOptions[i]);

  // Lastly, each crystal image (with all it classes and attributes) will get added to the page.
  $("#crystals").append(imageCrystal);
}

  var counterDis = $("<div>");
  counterDis.addClass("counter");
  counterDis.text("Score: " + counter);
  $("#crystals").append(counterDis);

  var winDis = $("<div>");
  winDis.addClass("counter");
  winDis.text("Wins: " + win);
  $("#crystals").append(winDis);

  var loseDis = $("<div>");
  loseDis.addClass("counter");
  loseDis.text("Losses: " + lose);
  $("#crystals").append(loseDis);

  var winLossDis = $("<div>");
  winLossDis.addClass("win-loss-display");

  var winImage = $("<img>");
  winImage.addClass("image");
  winImage.attr("id", "win-image");

  var loseImage = $("<img>");
  loseImage.addClass("image");
  loseImage.attr("id", "lose-image");



// This time, our click event applies to every single crystal on the page. Not just one.
$(".crystal-image").on("click", function() {
  imageReset();

  // Determining the crystal's value requires us to extract the value from the data attribute.
  // Using the $(this) keyword specifies that we should be extracting the crystal value of the clicked crystal.
  // Using the .attr("data-crystalvalue") allows us to grab the value out of the "data-crystalvalue" attribute.
  // Since attributes on HTML elements are strings, we must convert it to an integer before adding to the counter

  var crystalValue = ($(this).attr("data-crystalvalue"));
  crystalValue = parseInt(crystalValue);
  // We then add the crystalValue to the user's "counter" which is a global variable.
  // Every click, from every crystal adds to the global counter.
  counter += crystalValue;
  update();

  // All of the same game win-lose logic applies. So the rest remains unchanged.
  // alert("New score: " + counter);

  if (counter === targetNumber) {
    win++;
    reset();
    console.log("You win!");
    //alert("You win!");
    winLossDis.text("You win!");
    $("#crystals").append(winLossDis);
    winImage.attr("src", "assets/images/winner.gif");
    $("#crystals").append(winImage);
  }

  else if (counter >= targetNumber) {
    lose++;
    reset();
    console.log("You lose!");
    //alert("You lose!!");
    winLossDis.text("You lose!!");
    $("#crystals").append(winLossDis);
    loseImage.attr("src", "assets/images/loser.gif");
    $("#crystals").append(loseImage);
  }

})