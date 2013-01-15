#pragma strict
var loop:boolean;
var start:Transform;
var end:Transform;
var myTransform:Transform;

var initPos:Vector3;

function Awake()
{
	
	myTransform=this.transform;
	initPos=myTransform.position;
}


function Start () 
{
	
}

function Reset()
{
	myTransform.position.x=initPos.x;
}

function Update () {
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
}