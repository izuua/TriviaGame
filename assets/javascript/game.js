var trivQuestion = [
  quest1 = {
      question: "Who was not part of the original X-Men team?",
      answers: ["Wolverine", "Cyclops", "Iceman", "Jean Grey"],
      explanation: "Wolverine was not a part of the X-Men team until over 10 years after their debut as part of the All-New, All-Different X-Men.",
  },
  quest2 = {
      question: "Which character created Ultron?",
      answers: ["Hank Pym", "Tony Stark", "Bruce Banner", "Reed Richards"],
      explanation: "While Tony Stark and Bruce Banner created Ultron in the movies, Hank Pym (Ant-Man) was the original creator in the comics.",
  },
  quest3 = {
      question: "Who has not taken the mantle of Captain America?",
      answers: ["Hank Pym", "Bucky Barnes", "Sam Wilson", "Steve Rogers"],
      explanation: "Steve Rogers was the original Captain America. Bucky Barnes  (Winter Soldier) took over the mantle after the death of Steve Rogers. Sam Wilson (Falcon) became Captain America following Steve Roger's loss of his power. Meanwhile, Hank Pym has had a host of alias but has never been Captain America.",
  },
  quest4 = {
      question: "Which Thor killed Bill Foster (Goliath) during the events of Civil War?",
      answers: ["Ragnarok", "Eric Masterson", "Thor Odinson", "Jane Foster"],
      explanation: "Ragnarok is a cyborg clone of Thor created by Tony Stark, Reed Richards and Hank Pym who proved to be far too ruthless compared to Thor Odinson.",
  },
  quest5 = {
      question: "Who was not part of the All-New, All-Different X-Men?",
      answers: ["Psylocke", "Colossus", "Wolverine", "Nightcrawler"],
      explanation: "Psylocke was not associated with the X-Men until over 10 years after the All-New, All-Different X-Men when she was rescued by the New Mutants (not the same team as the All-New, All-Different X-Men.)",
  },
  quest6 = {
      question: "Who is Jessica Jones married to?",
      answers: ["Luke Cage", "Iron Fist", "Ghost Rider", "Punisher"],
      explanation: "Jessica Jones is married to fellow crime fighter, Luke Cage, and even have a daughter together!",
  },
  quest7 = {
      question: "Which character was not part of the original Avengers team?",
      answers: ["Captain America", "Ant-Man", "Thor", "The Hulk"],
      explanation: "While Captain America is part of the original movie team, he was not added to the comics version until issue #4.",
  },
]

var timerCount = 10;
var resetCount = 10;
var explanationCount = 10;
var questCount = 0;
var disArrayCount = 0;
var wins = 0;
var losses = 0;
var trivTimer
var countTimer
var gameResetTimer
var countResetTimer
var explanationTimer
// var explanationCounter
var clockRunning = false;
var explanationRunning = false;
var gameOver = false;
var displayArray = [0, 1, 2, 3]
var container
var containerResults

//Done defining variables

function shuffleArray(array) {  //used to shuffle the array of answers
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}

function questionDisplay(num) {
  $("#container-explanation").hide();
  $("#container").show();
  $("#question").text(trivQuestion[num].question);
  shuffleArray(displayArray);
  displayArray.forEach(function(str) {
      console.log(str);
  })
  displayArray.forEach(function(str) {
      $("#option-"+ str).text(trivQuestion[num].answers[disArrayCount])
      if (disArrayCount === 0) {
          $("#option-" + str).attr("data-value", true);
      } else {
          $("#option-"+ str).attr("data-value", false);
      }

      disArrayCount++;
  })
  disArrayCount = 0;

  timerStart();
}

function showExplanation() {
  // explanationCount = 10;
  $("#container").hide();
  $("#container-explanation").show();
  $("#explanation-wrong").text("WRONG!");
  $("#explanation").text(trivQuestion[questCount].explanation);
  $("#explanation-timer").text("Next question in 10 seconds.");
  explanationTimer = setTimeout(next, explanationCount*1000);
}


function counter() {
  timerCount--;
  // console.log(timerCount);
  $("#counter").text(timerCount);
}

function resetCounter() {
  resetCount--
  $("#results-timer").text("Time until next game: " + resetCount);
}

function timerStart() {
  if (clockRunning) {
      return;
  }

  trivTimer = setTimeout(timeUp, timerCount*1000);
  countTimer = setInterval(counter, 1000);
  $("#counter").text(timerCount);
  clockRunning = true;
}

function timerReset() {
  timerCount = 10;

  if (!clockRunning) {
      return;
  }

  clearInterval(countTimer);
  clearTimeout(trivTimer);
  clockRunning = false;
}

function next() {
  clearTimeout(explanationTimer);
  questCount++;
  timerReset();

  if (questCount >= trivQuestion.length) {
      results();
      gameOver = true;
      return;
  }

  questionDisplay(questCount);
  timerStart();

}

function timeUp() {
  losses++;
  showExplanation();
  //next();
}

function answer() {
  console.log($(this).attr("data-value"));

  if ($(this).attr("data-value") == "true") {
      wins++;
      next();
      // console.log("wins " + wins);
  } 
  
  else {
      losses++;
      showExplanation();
      // console.log("losses " + losses);
  }
}

function gameStart() {
  shuffleArray(trivQuestion);
  questionDisplay(questCount);
}

function results() {
  console.log("Results function ran");
  container = $("#container").detach();
  $("#header").append(containerResults);
  $("#right").text("Answers right: " + wins);
  $("#wrong").text("Answers wrong: " + losses);
  gameOver = true;

  gameResetTimer = setTimeout(reset, 10000);
  countResetTimer = setInterval(resetCounter, 1000);
  $("#results-timer").text("Time until next game: " + resetCount);
}

//Need to add reset function

function reset() {
  clearTimeout(gameResetTimer);
  clearTimeout(countResetTimer);
  containerResults = $("#container-results").detach();
  gameOver = false;
  wins = 0;
  losses = 0;
  timerCount = 10;
  questCount = 0;
  resetCount = 10;
  $("#header").append(container);
  gameStart();
}

function runHover() {
  $(this).attr("class", "answer enlarged-text");
}

function unhover() {
  $(this).attr("class", "answer normal-text");
}

//Done defining functions

window.onload = function() {
  $(".answer").on("click", answer);
  $(".answer").hover(runHover, unhover);
};

gameStart();
