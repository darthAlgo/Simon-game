//SIMON - GAME
var gamePattern = [];
var userClickedPattern = [];

var btnClrs = ["red", "blue", "green", "yellow", "violet", "lime", "cyan", "fuchsia", "coral"];

var level = 0;
var started = false;

var maxLevel = 0;

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

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        return true;
    }
    else{
        var lastmax = maxLevel;
        if(level-1 > maxLevel){
            maxLevel = level-1;
            console.log(maxLevel);
        }else{
            console.log(maxLevel);
        }
        
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        if(maxLevel > lastmax)
            $("#level-title").text("Game Over, Your New Best Score is "+maxLevel+" ! Press Any Key to Restart");
        else
            $("#level-title").text("Game Over, Your Score is! "+level+" ! Press Any Key to Restart");

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