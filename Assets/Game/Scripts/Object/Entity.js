#pragma strict

var velocity:Vector3;

var myTransform:Transform;
var alive:boolean;

var lifeTimeOn:boolean;
var lifeTimer:float;
var lifeTime:float=30.0;

var HPgraphics:exSprite;

var acceleration:Vector3=Vector3.zero;
var deadBody:GameObject;
var dieFunc:Function;

var HPCircle:exSprite;

var isLocal:boolean=false;
function Start () {
	myTransform=transform;
	
}

function Update () {
	if (lifeTimeOn)
	{
		if (lifeTimer<lifeTime)
		{
			lifeTimer+=Time.deltaTime;
		}
		else
		{
			Die();
		}
		
		if (HPgraphics!=null)
		{
			HPgraphics.scale.x=100-(lifeTimer/lifeTime)*100;
		}
		
		if (HPCircle!=null)
		{	
			/*
			var rate:float=0.25+0.75*Mathf.InverseLerp( 0,lifeTime, lifeTimer);
			if (rate<0.5)
			{
				HPCircle.renderer.material.SetColor("_EmissiveColor",Color.yellow);
			}
			
			if (rate<0.1)
			{
				HPCircle.renderer.material.SetColor("_EmissiveColor",Color.red);
			}
			HPCircle.renderer.material.SetFloat("_Cutoff", rate);
			*/
			
		}
	}
	velocity+=acceleration;
	
	
	if (isLocal)
	{
		myTransform.localPosition+=velocity*Time.deltaTime;
	}
	else
	{
		myTransform.position+=velocity*Time.deltaTime;
	}
}

function Die()
{
	if (deadBody!=null)
	{
		Instantiate(deadBody,myTransform.position,Quaternion.identity);
	}
	
	if (dieFunc!=null)
	{
		dieFunc();
	}
	else
	{
		Destroy(this.gameObject);
	}
}