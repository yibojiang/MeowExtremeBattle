#pragma strict

var damage:int=1;

var stage:int;
var graphics:exSprite;
var length:float=100;

var toggle:float=0.0;
var duration:float=5.0;
var width:float;

var flag:WeaponFlag;

function Awake()
{
	graphics=GetComponent(exSprite) as exSprite;
}

function Start () {
	graphics.scale.x=0;
	graphics.scale.y=width;
	this.gameObject.SetActiveRecursively(false);
}

function OnTriggerEnter (other : Collider)
{
	if (flag==WeaponFlag.Player)
	{
	
		if (other.gameObject.tag=="Enemy")
		{
			if (stage!=2)
			{
				var e:Enemy=other.gameObject.GetComponent(Enemy) as Enemy;
				e.Hurt(damage,HurtType.Beam);
			}
		}
	}
	else if (flag==WeaponFlag.Enemy)
	{
		if (other.gameObject.tag=="Player")
		{
			
			if (stage!=2)
			{
				var p:PlayerController=other.gameObject.GetComponent(PlayerController) as PlayerController;
				p.Hurt(damage,HurtType.Beam);
				
			}
		
		}
	}
	
}

function Reset()
{
	this.gameObject.SetActiveRecursively(true);
	stage=0;
	toggle=0;
	graphics.scale.x=0;
	graphics.scale.y=width;
}

function Update () {
	if (stage==0)
	{
		if (graphics.scale.x<length)
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
		if (toggle<duration)
		{
			toggle+=Time.deltaTime;
		}
		else
		{
			toggle=0.0;
			stage=2;
		}
	}
	else if ( stage==2)
	{
		if (graphics.scale.y>0)
		{
			graphics.scale.y-=width*2*Time.deltaTime;
		}
		else
		{
			this.gameObject.SetActiveRecursively(false);
		}
	}
}