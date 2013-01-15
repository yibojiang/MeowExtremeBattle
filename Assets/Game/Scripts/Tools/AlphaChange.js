#pragma strict

var speed:float;
var exsprite:exSprite;

var max:float=1.0;

function Awake()
{
	exsprite=this.GetComponent(exSprite) as exSprite;
}

function Start () {

}

function FadeIn(_time:float)
{
	speed=1/_time;
}

function FadeOut(_time:float)
{
	speed=-1/_time;
}

function Update () {
	
	exsprite.color.a+=speed*Time.deltaTime;
	exsprite.color.a=Mathf.Clamp01(exsprite.color.a);
}