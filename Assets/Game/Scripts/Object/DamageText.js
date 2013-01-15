#pragma strict

var life:float;
var lifeTime:float=1.0;
var myTransform:Transform;
var text:exSpriteFont;

var velocity:Vector3;
var acceleration:Vector3;
function Awake()
{
	myTransform=transform;
	text=this.GetComponent(exSpriteFont) as exSpriteFont;
	velocity=Vector3(Random.Range(-30,30),100,0);
	acceleration=Vector3(0,-10,0);
}
function Start () {

}

function SetText(_text:String)
{
	text.text=_text;
}


function Update () {
	velocity+=acceleration;
	myTransform.position+=velocity*Time.deltaTime;
	
	if (life<lifeTime)
	{
		life+=Time.deltaTime;
	}
	else
	{
		Destroy(this.gameObject);
	}
}