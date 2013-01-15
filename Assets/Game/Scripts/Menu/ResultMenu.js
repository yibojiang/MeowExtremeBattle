#pragma strict

var scoreText:exSpriteFont;
var distanceText:exSpriteFont;

var sm:ScoreManager;

var expText:exSpriteFont;
var fish:exSpriteFont;

function Start () {

}

function Show()
{
	scoreText.text=sm.totalScore.ToString("n0");
	distanceText.text=sm.distance.ToString("n0")+" km";
	expText.text=sm.totalExp.ToString("n0")+" XP";
	fish.text=sm.totalFish.ToString();
}

function Update () {

}