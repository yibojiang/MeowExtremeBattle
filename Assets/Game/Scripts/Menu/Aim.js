#pragma strict

var circle:UICircle;

var myTransform:Transform;
var target:Transform;

function SetTarget(_target:Transform)
{
	target=_target;
	circle.Show();
}

function Start () {

}



function Update () {
	if (target!=null)
	{
		myTransform.position=target.position+Vector3(0,0,-1.1);
	}
	else
	{
		
		circle.Hide();
		
	}
}