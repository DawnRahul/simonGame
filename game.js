
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var level = 1;
var started;
var gameOver = false;
var noOfTimesButtonClicked;

function nextSequence(){
    started = true;         // if this started is not assigned with true then in next statement started becomes false, i don't know the reason
   // alert("Started check 2 :" + started);
    
    $("h1").text("Level " + level); 
    level++;                       // Increasing the level by 1 evrytime when nextSequence is called 
    noOfTimesButtonClicked = -1;

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColours = buttonColours[randomNumber];

    gamePattern.push(randomChosenColours);                 // making array of random chosen colours
    console.log(randomChosenColours);

    $("#" + randomChosenColours).fadeOut(200).fadeIn(200);        // Flash effect on button
    
    playSound(randomChosenColours);  
}

/*
// another way to create array of user chosen colours 
// attr() is not used here

$(".btn").on("click", function(event) {
    console.log(event.target.id);

    var userChosenColour = event.target.id; // Selecting the colour clicked on web page

    userClickedPattern.push(userChosenColour); // Making array of user chosen colours
})

*/

$(".btn").on("click", function() {

    if(started && (userClickedPattern.length < gamePattern.length) && !gameOver ) {      // effects on button only visible after game is started
                                                                                        // and length of userClickedPattern is equal to or less then gamePattern
        console.log("color id: ");
         console.log($(this).attr("id"));                // "this" is the button that is clicked  
         var userChosenColour = $(this).attr("id"); // Selecting the colour clicked on web page
         // $("#" + $(this).attr("id")).addClass("pressed");            // one example of code to add class

         noOfTimesButtonClicked++;                                                                                                                                                                      
          // Checks answer and if yes userClickedPattern is updated
         checkAnswer(userChosenColour ,gamePattern , noOfTimesButtonClicked);
          
         if(userClickedPattern.length == gamePattern.length){
             userClickedPattern = [];
             setTimeout(nextSequence, 1500);
         }
        
        
    }
    
    
});


// function to play sound for colours with one input parameter
function playSound(name) {
    var colourSound = new Audio("/sounds/" + name + ".mp3");   // Playing sound 
    colourSound.play();
}


function animatePress (currentColour){
     $("." + currentColour).addClass("pressed");   // adding class "pressed to current colour class element"
    

    setTimeout(function(){
        $("." + currentColour).removeClass("pressed");   // removing class "pressed to current colour class element"
    }, 100);
}



// when a keyboard key has been pressed, call nextSequence()
// ************   STARTING POINT OF GAME ************************

 $(document).on("keydown", function(event){
     if(event.key === "a" || event.key === "A") {
         started = false;
         //console.log(event.key);
         if(started === false) {                //to only call nextSequence() on the first keypress
            started = true;
          //  alert("Started is true now" + started);
            setTimeout(nextSequence, 800);
            
            
         }
        
     } 
     
 });






// for checking answer after user clicks a colour button
function checkAnswer(userChosenColour, gamePattern, noOfTimesButtonClicked){
    
    if(userChosenColour == gamePattern[noOfTimesButtonClicked]){
        userClickedPattern.push(userChosenColour); // Making array of user chosen colours
        animatePress(userChosenColour);
        playSound(userChosenColour);
    }
    else{
        gameOver = true;
        var wrongSound = new Audio("/sounds/wrong.mp3");
        wrongSound.play();
        setTimeout(function(){
            $("body").addClass("game-over");
        }, 100);
       
        $("h1").text("GAME OVER, Press any key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 800);

        $(document).on("keydown", function(){
            startOver(); 
            $("h1").text("Press 'A' Key to Start"); 
        })
               
        
        
    } 
       
}



function startOver() {
    started = false;
    gameOver = false;
    gamePattern = [];
    userClickedPattern = [];
    level = 1;
}