#pragma strict
var cameraFade:CameraFade;
var startButton:CustomButton;
function Awake()
{
	cameraFade=Camera.main.GetComponent("CameraFade") as CameraFade;
}
function Start () {
	startButton.tapFunc=FadeToGame;
}

function FadeToGame()
{
	this.audio.Play();
	cameraFade.FadeTo(this.gameObject,"GameStart",3);
}

function GameStart()
{
	Application.LoadLevel("Game");
}

function Update () {

}