#pragma strict

var fade:exSprite;
var maxAlpha:float=0.6;
var speed:float=1.0;
var fading:boolean;
function Start () {

}

function Update () {
	
	if (fading)
	{
		fade.color.a+=speed*Time.deltaTime;
	}
	
	if (fade.color.a>=maxAlpha && speed>0)
	{
		speed=0;
		fading=false;
		fade.color.a=Mathf.Clamp(fade.color.a,0,maxAlpha);
	}
	
	if (fade.color.a<=0.0 && speed<0)
	{
		speed=0;
		fading=false;
		fade.color.a=Mathf.Clamp(fade.color.a,0,maxAlpha);
		Destroy(this.gameObject);
	}
}


function Show(_z:float)
{
	fade.color.a=0;
	speed=1.0;
	fading=true;
	transform.position.z=_z;
	this.collider.enabled=true;
}


function Hide()
{
	speed=-1.0;
	fading=true;
	this.collider.enabled=false;
}