#pragma strict

var stage:int;
var graphics:exSprite;
var length:float=180;

var width:float=16;

var widthRange:float=2;

var toggle:float=0.0;
var duration:float=3.0;

var cc:CameraController;
var damage:int=5;

var positronAnimation:exSpriteAnimation;

var ship:GameObject;

function Awake()
{
	graphics=GetComponent(exSprite) as exSprite;
	
	cc=Camera.main.GetComponent(CameraController) as CameraController;
}

function Start () {
	graphics.scale.x=0;
	graphics.scale.y=1;
	this.gameObject.SetActiveRecursively(false);
}

function Reset()
{
	this.gameObject.SetActiveRecursively(true);
	stage=0;
	toggle=0;
	graphics.scale.x=0;
	graphics.scale.y=1;
	positronAnimation.Play("PositronStart");
}

function OnTriggerStay (other : Collider)
{

	if (other.gameObject.tag=="Enemy")
	{
		var e:Enemy=other.gameObject.GetComponent(Enemy) as Enemy;
		e.Hurt(damage,HurtType.Beam);
	}
}

function Update () {
	if (stage==0)
	{
		if (graphics.scale.x<length )
		{
			graphics.scale.x+=length*10*Time.deltaTime;
		}
		else
		{
			stage=1;
		}
	}
	else if (stage==1)
	{
		
		if (graphics.scale.y<width)
		{
			graphics.scale.y+=width*2*Time.deltaTime;
		}
		else
		{
			
			iTween.MoveTo(ship,iTween.Hash("time",duration/2,"x",-duration*6,"islocal",true));
			positronAnimation.Play("Positron");
			stage=2;
			cc.ShakeCamera(5,duration);
		}
	}
	else if (stage==2)
	{
		
		if (toggle<duration)
		{
			graphics.scale.y=width+Random.Range(-widthRange,widthRange);
			toggle+=Time.deltaTime;
		}
		else
		{
			iTween.MoveTo(ship,iTween.Hash("time",duration/2,"x",0,"islocal",true));
			positronAnimation.Play("PositronEnd");
			toggle=0.0;
			stage=3;
		}
	}
	else if ( stage==3)
	{
		if (graphics.scale.y>0)
		{
			graphics.scale.y-=width*Time.deltaTime;
		}
		else
		{
			this.gameObject.SetActiveRecursively(false);
		}
	}
}

