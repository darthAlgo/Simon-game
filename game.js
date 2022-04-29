//SIMON - GAME
var gamePattern = [];
var userClickedPattern = [];

var btnClrs = ["red", "blue", "green", "yellow", "violet", "lime", "cyan", "fuchsia", "coral"];

var level = 0;
var started = false;

function nextSeq() {
    
    var randNum = Math.floor(Math.random() * 9);
    var randChosenClr = btnClrs[randNum];

    gamePattern.push(randChosenClr);

    $("#" + randChosenClr).fadeOut(300).fadeIn(300);
    playSound(randChosenClr);

    level++;
    $("#level-title").text("Level " + level);
}

$(".btn").click(function() {

    var userChosenClr = $(this).attr("id");
    playSound(userChosenClr);

    if(started == false){
        $("#level-title").text("Level " + level);
        setTimeout(function() {
            nextSeq();
        }, 500);

        started = true;
    }
    else{
        userClickedPattern.push(userChosenClr);

        if(checkAnswer(userClickedPattern.length - 1) && userClickedPattern.length == level){
            setTimeout(function() {
                userClickedPattern = [];
                nextSeq();
            }, 500);
        }
    }
});

function playSound(name) {
    var audioFile = "sounds/" + name + ".mp3";
    var audio = new Audio(audioFile);
    audio.play();
}

function animatePress(currClr) {
    $(currClr).addClass("pressed");

    setTimeout(function() {
        $(currClr).removeClass("pressed");
    }, 500);
}

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        return true;
    }
    else{
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
        return false;
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}

//End of code