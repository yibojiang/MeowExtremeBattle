#pragma strict
var selected:boolean;



var selectedColor:Color=Color.green;
var color:Color=Color.white;


var outsprite:exSprite;
var insprite:exSprite;

var alphaAdd:float=0;

var hide:boolean;

function Start () {
	if (hide)
	{
		outsprite.color.a=0;
		insprite.color.a=0;
	}
}

function Show()
{
	//Debug.Log("Show");
	alphaAdd=10;
}

function Hide()
{
	//Debug.Log("Hide");
	alphaAdd=-10;
}

function Update () {
	
	outsprite.color.a+=alphaAdd*Time.deltaTime;
	outsprite.color.a=Mathf.Clamp(outsprite.color.a,0,1);
	insprite.color.a=outsprite.color.a;
	
	if (selected)
	{
		selectedColor.a=outsprite.color.a;
		outsprite.color=selectedColor;
		insprite.color=selectedColor;
	}
	else
	{
		color.a=outsprite.color.a;
		outsprite.color=color;
		insprite.color=color;
	}
}