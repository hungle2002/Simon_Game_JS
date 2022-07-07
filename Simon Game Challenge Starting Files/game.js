var color = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var playerClick =[];
var level = 0;
var started = false;
$(document).keypress(function(event){
  if(!started){
    nextSequence();
    $("#level-title").text("Level "+level);
    started = true;
  }
});
function nextSequence(){
  level++;
  $("#level-title").text("Level "+level);
  var num = Math.floor(Math.random()*4);
  var currentColor = color[num];
  gamePattern.push(currentColor);
  playerClick = [];
  $("#"+currentColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(currentColor);
}
function playSound(curColor){
  var audio = new Audio("sounds/"+curColor+".mp3");
  audio.play();
}
function animatePress(curColor){
  $("#"+curColor).addClass("pressed");
  setTimeout( function(){$("#"+curColor).removeClass("pressed");}, 100);
  playSound(curColor);
}
function restart(){
  started = false;
  gamePattern=[];
  level=0;
}
function checkAns(num){
  if(gamePattern[num] === playerClick[num]){
    console.log("true");
    if(playerClick.length == gamePattern.length){
      setTimeout(function(){alert("Xin chao");}, 2000);
      setTimeout(nextSequence, 1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over")}, 200);
      restart();
  }
}
$(".btn").click(function(){
  var curColor = $(this).attr("id");
  playerClick.push(curColor);
  animatePress(curColor);
  checkAns(playerClick.length-1);
  playSound(curColor);
});

