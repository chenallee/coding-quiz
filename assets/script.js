/* ----- create variables to refrence all DOM elements: ------------------------------------------------------------------- */
//start game button
var startGameBtnEl = document.querySelector("#start-game-btn");
//start-screen element
var startScreenEl = document.querySelector("#start-screen");

//quiz-content (event delegation)
var quizScreenEl = document.querySelector("#quiz-content");

var headerEl = document.querySelector("header");
//time-left
var timeLeftEl = document.querySelector("#time-left");
//view-highscores
var viewHighscoresAEl = document.querySelector("#view-highscores");

//post-game-screen
var postGameScreenEl = document.querySelector("#post-game-screen");
//user-score
var userScoreEl = document.querySelector("#user-score");
//play-again-btn

var playAgainBtnEl = document.querySelector("#play-again-btn");
//add-highscore-btn
var addHighscoreBtnEl = document.querySelector("#add-highscore-btn");

//var highScoresListEl
var highScoresListEl = document.querySelector("#high-scores-list");

//answer-info
var answerInfoEl = document.querySelector("#answer-info");
//answer-info-text
var answerInfoTextEl = document.querySelector("#answer-info-text");

//highscore div
var gameEndFormEl = document.querySelector("#game-end-form");

var userInitials = document.querySelector("#user-initials");

var clearHighScoresBtnEl = document.querySelector("#clear-highscore");

/* ----- create variables for game logic: ---------------------------------------------------------------------------------- */
//timerIntervalId - set timer to variable so we can stop it
var timerIntervalId;
//score
var score;
//secondsLeft
var secondsLeft;

var highScoresDisplayEl = document.querySelector("#high-scores-display");

var highScoresList = [];
if (localStorage.getItem("highScoresList")){
  highScoresList = JSON.parse(localStorage.getItem("highScoresList"));
}


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// ----- function for rendering high scores: 

// ----- create function to start game: ---------------------------------------------------------------------------------------
function startGameHandler(event) {
  event.preventDefault();
  // set secondsLeft variable to starting time (300 seconds = 5 minutes)
  secondsLeft = (questions.length) * 15;
  // write secondsLeft to the page
  timeLeftEl.textContent = secondsLeft;

  // reset score to 0
  score = 0;
  // write score to the page (optional?)***

  // hide start-screen element && post-game-screen
  headerEl.classList.remove("invisible");
  startScreenEl.classList.add("hide");
  postGameScreenEl.classList.add("hide");
  highScoresDisplayEl.classList.add("hide");
  playAgainBtnEl.classList.add("hide");
  clearHighScoresBtnEl.classList.add("hide");
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
//console.log(questions[questionIndex]);
  quizScreenEl.textContent = "";

  //get questions[questionIndex]
  var currentQuestion = questions[questionIndex];
  //print questions to the page

  var questionToWrite = document.createElement("h2");
  questionToWrite.textContent = currentQuestion.question;

  //use data attribute to know which index the question is
  quizScreenEl.setAttribute("data-index", questionIndex);
  quizScreenEl.appendChild(questionToWrite);
  //loop through choices and print out choices to the page (make them buttons)
  for (var i = 0; i < currentQuestion.choices.length; i++) {
  
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
    //read data attribute of what questions we answered (index)
   
    var questionAnswered = elementClicked.parentElement.getAttribute("data-index");
    
    //check to see if choice picked is same as questions correct answer
    if (elementClicked.textContent == questions[questionAnswered].answer) {
      score++;
      //change info text to correct w/ class text-sucess
      answerInfoTextEl.textContent = "Correct!";
      answerInfoTextEl.classList.remove("text-danger");
      answerInfoTextEl.classList.add("text-success");
      //remove hide class from answer info
      answerInfoEl.classList.remove("hide");
      //on timeout add hide class to answer info
      setTimeout(function(){
        answerInfoTextEl.classList.remove("text-success");
        answerInfoEl.classList.add("hide");
      }, 1000);

    } else { 
      
      secondsLeft = secondsLeft - 15;

      //change info text to wrong w/ class text-danger
      answerInfoTextEl.textContent = "Wrong!";
      answerInfoTextEl.classList.remove("text-success");
      answerInfoTextEl.classList.add("text-danger");
      //remove hide class from answer info
      answerInfoEl.classList.remove("hide");
      //on timeout add hide class to answer info
      setTimeout(function(){
        answerInfoTextEl.classList.remove("text-danger");
        answerInfoEl.classList.add("hide");
      }, 1000);
    }

    //get index of next question (this question's index + 1)
    var nextQuestionIndex = parseInt(questionAnswered) +1;
    
      displayQuestion(nextQuestionIndex);
   
  }
}

// ----- create a function to stop the game: ----------------------------------------------------------------------------------
function stopGame(event) {
  
  clearInterval(timerIntervalId);
  //clearInterval() to stop the time
  //hide quiz-content element
  quizScreenEl.classList.add("hide");
  //show post-game-screen
  playAgainBtnEl.classList.remove("hide");
  postGameScreenEl.classList.remove("hide");
  
  //print out user score
  score = score + secondsLeft;
  userScoreEl.textContent = score;

}

function addHighscoreHandler(event){
  event.preventDefault();
  console.log("adding to highscores");
  
  var initialsToAdd = userInitials.value.trim();

  if (!initialsToAdd){
    return false;
  }
  //trims input to first 3 
  initialsToAdd = initialsToAdd.slice(0, 3);

  var hsObjectToAdd = {
    hsInitials: initialsToAdd.toUpperCase(),
    hsScore: parseInt(score)
  }
  
  highScoresList.push(hsObjectToAdd);

  showHighscores();

}

function showHighscores(){
  clearInterval(timerIntervalId);
  postGameScreenEl.classList.add("hide");
  startScreenEl.classList.add("hide");
  quizScreenEl.classList.add("hide");
  playAgainBtnEl.classList.remove("hide");
  clearHighScoresBtnEl.classList.remove("hide");
  //sort highscores by score
  highScoresList.sort(function (a, b) {
    return a.hsScore - b.hsScore
  })
  console.log(highScoresList);

  highScoresListEl.innerHTML = "";

  for (var i = 0; i < highScoresList.length; i ++){
    var highScore = highScoresList[i];

    var li = document.createElement("div");
    li.textContent = (i + 1) + ".     " + highScore.hsInitials + " - " + highScore.hsScore ;

    //i want to alternate bg of each li so i'll check if i is even
    if( i % 2 === 0){
      li.classList.add("list-group-item-light", "high-score-even");
    } else {
      li.classList.add("list-group-item-secondary", "high-score-odd");
    }


    highScoresListEl.appendChild(li);
  }

  highScoresDisplayEl.classList.remove("hide");

  localStorage.setItem("highScoresList", JSON.stringify(highScoresList));

}

function clearHighscoreHandler(){
  highScoresList = [];
  showHighscores();

}
/* add event listeners ----------------------------------------------------------------------------------------------------- */

//start game button
startGameBtnEl.addEventListener("click", startGameHandler);
//quiz content (for answring a question) --> use event delegation
quizScreenEl.addEventListener("click", userAnswerHandler);

//view highscores link
viewHighscoresAEl.addEventListener("click", showHighscores);

  //play again button
playAgainBtnEl.addEventListener("click", startGameHandler);
//add high score button
gameEndFormEl.addEventListener("submit", addHighscoreHandler);
//clear high scores

clearHighScoresBtnEl.addEventListener("click", clearHighscoreHandler);