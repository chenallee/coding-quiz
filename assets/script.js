/* ----- create variables to refrence all DOM elements: ------------------------------------------------------------------- */
//start game button
//start-screen element

//quiz-content (event delegation)

//post-game-screen
//user-score
//play-again-btn

/* ----- create variables for game logic: ---------------------------------------------------------------------------------- */
//timerIntervalId - set timer to variable so we can stop it
//score
//secondsLeft

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// ----- create function to start game: ---------------------------------------------------------------------------------------
// set secondsLeft variable to starting time (300 seconds = 5 minutes)
// write secondsLeft to the page

// reset score to 0
// write score to the page (optional?)***

// hide start-screen element && post-game-screen
// show quiz-content element

displayQuestion(0);         // display first question

// set TimerIntervalId to setInterval function that decrements secondsLeft every second
timerIntervalId = setInterval(function () {
  secondsLeft--;
  if (secondsLeft <= 0) {
    stopGame();
  }
}, 1000);

// ----- create function to display a question and possible choices: ----------------------------------------------------------
function displayQuestion(questionIndex) {
  if (!questions[questionIndex]) {          //checkif questionIndex in questions array doesnt exist
    return stopGame();            //stop game
  }
  //get questions[questionIndex]
  //print questions to the page
  //use data attribute to know which index the question is
  //loop through choices and print out choices to the page (make them buttons)

}
// ----- create function to handle users answering: ---------------------------------------------------------------------------
  //use event delegation to make sure button was clicked
  //read data attribbute of what questions we answered (index)
  //check to see if choice picked is same as questions correct answer
  //if yes, increase score++
  //if no, subtract time from secondsLeft

  //get index of next question (this question's index + 1)
  //run displayQuestion(nextQuestionIndex)

// ----- create a function to stop the game: ----------------------------------------------------------------------------------
  //clearInterval() to stop the time
  //hide quiz-content element
  //show post-game-screen
  //print out user score

/* add event listeners ----------------------------------------------------------------------------------------------------- */
  //start game button
  //quiz content (for answring a question) --> use event delegation
  //play again button



/* ***** BONUS : **************************************************************************************************************
- high score list
-
--------------------------------------------------------------------------------------------------------------------------- */