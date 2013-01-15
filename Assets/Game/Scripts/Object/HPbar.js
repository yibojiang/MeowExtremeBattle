#pragma strict

var graphics:exSprite;



function Awake()
{
	graphics=this.GetComponent(exSprite) as exSprite;
}

function Start () {

}

function Update () {
	if (graphics.scale.x>=50)
	{
		graphics.color=Color.green;
	}
	if (graphics.scale.x<50)
	{
		graphics.color=Color.yellow;
	}
	
	if (graphics.scale.x<20)
	{
		graphics.color=Color.red;
	}
}