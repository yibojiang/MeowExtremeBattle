#pragma strict

var speed:float;

var start:Transform;
var end:Transform;
var loop:boolean;

var randomSpeed:boolean;
var randomRange:float;

var myTransform:Transform;

function Awake()
{
	myTransform=this.transform;
	if (randomSpeed)
	{
		speed+=Random.Range(-randomRange,randomRange);
	}
}

function Start () {

}

function Update () {
	myTransform.position.x+=speed*Time.deltaTime;
	
	
	if (myTransform.position.x<start.position.x)
	{
		if (loop)
		{
			myTransform.position.x=end.position.x;
		}
		else
		{
			//GameObject.Destroy(this.gameObject);
		}
	}
	
	
	if (myTransform.position.x>end.position.x)
	{
		if (loop)
		{
			myTransform.position.x=start.position.x;
		}
		else
		{
			GameObject.Destroy(this.gameObject);
		}
	}
}