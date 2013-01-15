#pragma strict
var myTransform:Transform;
var speed:int=100;

var ignoreTimeScale:boolean;
function Awake()
{
	myTransform=this.transform;
}

function Start () {

}

function Update () {
	if (ignoreTimeScale)
	{
		myTransform.eulerAngles.z+=speed*TimerController.realDeltaTime;
	}
	else
	{
		myTransform.eulerAngles.z+=speed*Time.deltaTime;
	}
}