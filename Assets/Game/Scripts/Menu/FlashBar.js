#pragma strict

var basicColor:Color;
var exsprite:exSprite;

var toggle:float;
var flash:boolean=false;
function Awake()
{
	exsprite=this.GetComponent(exSprite) as exSprite;
	basicColor=exsprite.color;
}

function Start () {

}

function Flash()
{
	flash=true;
	exsprite.color=Color.white;
}

function Update () {
	if (flash)
	{
		toggle+=Time.deltaTime;
		exsprite.color=Color.Lerp(Color.white,basicColor,toggle);
	}
	
	if (toggle>=1)
	{
		flash=false;
		toggle=0;
	}
}