/* ----- create variables to refrence all DOM elements: ------------------------------------------------------------------- */
//start game button
var startGameBtnEl = document.querySelector("#start-game-btn");
//start-screen element
var startScreenEl = document.querySelector("#start-screen");

//quiz-content (event delegation)
var quizScreenEl = document.querySelector("#quiz-content");
//
//var questionTitleEl = document.querySelector("#question-title");
//time-left
var timeLeftEl = document.querySelector("#time-left");

//post-game-screen
var postGameScreenEl = document.querySelector("#post-game-screen");
//user-score
var userScoreEl = document.querySelector("#user-score");
//play-again-btn
var playAgainBtnEl = document.querySelector("#play-again-btn");

/* ----- create variables for game logic: ---------------------------------------------------------------------------------- */
//timerIntervalId - set timer to variable so we can stop it
var timerIntervalId;
//score
var score;
//secondsLeft
var secondsLeft;

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// ----- create function to start game: ---------------------------------------------------------------------------------------
function startGameHandler(event) {
  event.preventDefault();
  // set secondsLeft variable to starting time (300 seconds = 5 minutes)
  secondsLeft = 10;
  // write secondsLeft to the page
  timeLeftEl.textContent = secondsLeft;

  // reset score to 0
  score = 0;
  // write score to the page (optional?)***

  // hide start-screen element && post-game-screen
  startScreenEl.classList.add("hide");
  postGameScreenEl.classList.add("hide");
  // show quiz-content element
  quizScreenEl.classList.remove("hide");

  displayQuestion(0);         // display first question

  // set TimerIntervalId to setInterval function that decrements secondsLeft every second
  timerIntervalId = setInterval(function () {
    
    secondsLeft--;
    timeLeftEl.textContent = secondsLeft;
    if (secondsLeft <= 0) {
      stopGame();
    }
  }, 1000);
}

// ----- create function to display a question and possible choices: ----------------------------------------------------------
function displayQuestion(questionIndex) {
  //event.preventDefault();
  if (!questions[questionIndex]) {          //checkif questionIndex in questions array doesnt exist
    stopGame();            //stop game
  } else {
console.log(questions[questionIndex]);
  quizScreenEl.textContent = "";

  //get questions[questionIndex]
  var currentQuestion = questions[questionIndex];
  //print questions to the page
  //quizScreenEl.textContent = '';

  var questionToWrite = document.createElement("h2");
  questionToWrite.textContent = currentQuestion.question;
  //console.log(currentQuestion.choices.length);
  //use data attribute to know which index the question is
  quizScreenEl.setAttribute("data-index", questionIndex);
  quizScreenEl.appendChild(questionToWrite);
  //loop through choices and print out choices to the page (make them buttons)
  for (var i = 0; i < currentQuestion.choices.length; i++) {
    //var pageBreak = document.createElement("br");
    //questionToWrite.appendChild(pageBreak);
    //var answerDiv = document.createElement("div");
    var answerButton = document.createElement("button");
    answerButton.textContent = currentQuestion.choices[i];

    answerButton.classList.add("btn");
    answerButton.classList.add("btn-primary");
    quizScreenEl.appendChild(answerButton);
  }
}
}
// ----- create function to handle users answering: ---------------------------------------------------------------------------
function userAnswerHandler(event) {
  event.preventDefault();
  //use event delegation to make sure button was clicked
  var elementClicked = event.target;
  if (elementClicked.matches("button") == true) {
    //read data attribbute of what questions we answered (index)
    //console.log("clicked");
    var questionAnswered = elementClicked.parentElement.getAttribute("data-index");
    //console.log(questionAnswered);
    //check to see if choice picked is same as questions correct answer
    if (elementClicked.textContent == questions[questionAnswered].answer) {
      score++;
    } else { 
      console.log("wrong!");
    }
    //if yes, increase score++
    //if no, subtract time from secondsLeft

    //get index of next question (this question's index + 1)
    var nextQuestionIndex = parseInt(questionAnswered) +1;
    //console.log(questionAnswered);
   // console.log(nextQuestionIndex);
    //run displayQuestion(nextQuestionIndex)
    //if(questions[nextQuestionIndex]){
      displayQuestion(nextQuestionIndex);
   // } else {
   //   stopGame();    
  //  }*/
  }
}

// ----- create a function to stop the game: ----------------------------------------------------------------------------------
function stopGame(event) {
  
  clearInterval(timerIntervalId);
  //clearInterval() to stop the time
  //hide quiz-content element
  quizScreenEl.classList.add("hide");
  //show post-game-screen
  postGameScreenEl.classList.remove("hide");
  //print out user score
  userScoreEl.textContent = score;

}
/* add event listeners ----------------------------------------------------------------------------------------------------- */


//start game button
startGameBtnEl.addEventListener("click", startGameHandler);
//quiz content (for answring a question) --> use event delegation
quizScreenEl.addEventListener("click", userAnswerHandler);
  //play again button
playAgainBtnEl.addEventListener("click", startGameHandler);


/* ***** BONUS : **************************************************************************************************************
- high score list
-
--------------------------------------------------------------------------------------------------------------------------- */