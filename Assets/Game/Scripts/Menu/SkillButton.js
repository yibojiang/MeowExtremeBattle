#pragma strict

var icon:exSprite;
var bg:exSprite;
var btn:CustomButton;

function EnableButton()
{
	icon.color=Color.white;
	bg.color=Color.white;
}


function DisableButton()
{
	icon.color=Color.red;
	bg.color=Color.red;

}

function Start () {
	btn.disableFunc=DisableButton;
	btn.enableFunc=EnableButton;
}

function Update () {

}