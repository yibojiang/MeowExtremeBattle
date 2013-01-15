#pragma strict

var dropSpeed:float;
var myTransform:Transform;
var drag:boolean;

function Awake()
{
	myTransform=this.transform;
}

function Start () {

}

function Update () {
	if (!drag)
	{
		dropSpeed-=5;
		
		if (myTransform.position.y>-200)
		{
			myTransform.position.y+=dropSpeed*Time.deltaTime;
		}
		else
		{
			Destroy(this.gameObject);
		}
	}
	
	
}