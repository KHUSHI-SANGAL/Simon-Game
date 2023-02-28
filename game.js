var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;
var level = 0;


//generates the random sequence for the game
function nextSequence() {

  userClickedPattern = [];  //empty the array for the next level so that user has to remember the pattern starting from the first level and press it accordingly

  level++;

  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //animate flash
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  //play sound
  playSound(randomChosenColour);
}

//detects the keyboard press
$(document).keydown(function (){
  if(!started){                 //user presses the key-A
    nextSequence();
    started = true;
  }

});



//detects when user clicks a button on screen
$(".btn").click(function (){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length - 1); //checks everytime when a button is clicked by the user
});


//function for checking the user's answer w.r.t. to the random pattern generated
function checkAnswer(currentLevel){

  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){

    if(userClickedPattern.length === gamePattern.length){

      setTimeout(function (){
        nextSequence();
      }, 1000);
    }

  }
  else {
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function(){
          $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Key-A to Start");
        startOver();
      }
}


//function to start the game afresh
function startOver(){
  level =0;
  gamePattern = [];
  started = false;
}



//function for playing sound when nextSequence is generated and when the user clicks a button
function playSound(name){

  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}



//function to animate the button when nextSequence is generated and when the user clicks a button
function animatePress(currentColour){
  $("." + currentColour).addClass("pressed");

  setTimeout(function (){
    $("." + currentColour).removeClass("pressed");
  },100);
}
