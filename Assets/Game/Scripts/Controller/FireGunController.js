#pragma strict

var fire:Fire;
var flag:WeaponFlag;
var damage:int;

var cat:CatController;
var target:Entity;



var ent:Entity;

var graphics:exSprite;
var powerUp:boolean=false;

var myTransform:Transform;

var stage:int=0;

var rangeWidth:float=10;
var rangeLength:float=50;

var baseDamage:int=2;
var baseWidth:float=10;
var baseLength:float=50;

var fireGun:Transform;

function Awake()
{
	if (cat!=null)
	{
		cat.levelUpFunc=LevelUp;
		cat.setTargetFunc=SetTarget;
	}
}

function SetTarget()
{
	target=cat.target;
}

function Update () {
	if (powerUp)
	{
		/*
		if (graphics!=null)
		{
			graphics.color=Color.Lerp(Color.white,Color.red,Mathf.PingPong(Time.time*3,1));
		}
		*/
		if (cat!=null)
		{
			cat.PowerUp();
		}
	}
	else
	{
		if (cat!=null)
		{
			cat.PowerDown();
		}
	}
	
	if (stage==0)
	{
		if (target!=null)
		{
			stage=1;
			fire.Fire();
		}
	}
	else if (stage==1)
	{
	
		if (target==null)
		{
			stage=0;
			fire.StopFire();
		}
		else
		{
			var dir:Vector3=target.myTransform.position-myTransform.position;
			var angle:float=Vector3.Angle(dir,Vector3.up);	
			
			fire.damage=damage;
			fire.rangeWidth=rangeWidth;
			fire.rangeLength=rangeLength;
			
			if (dir.x>0)
			{
				fireGun.eulerAngles.z=-angle;
				
			}
			else
			{
				
				fireGun.eulerAngles.z=angle;
				
			}
		}
	}
}


function LevelUp()
{
	var scollider:SphereCollider=this.GetComponent(SphereCollider) as SphereCollider;
	scollider.radius=115*(1+cat.level*0.2);
	damage=baseDamage*(1+cat.level*0.2);
	rangeWidth=baseWidth*(1+cat.level*0.2);
	rangeLength=baseLength*(1+cat.level*0.2);
	
}

function OnTriggerStay (other : Collider)
{
	if (flag==WeaponFlag.Player)
	{
		if (other.collider.tag=="Enemy")
		{
			if (cat.target==null)
			{
				target=other.collider.GetComponent(Entity) as Entity;
			}
		}
	}
	else if (flag==WeaponFlag.Enemy)
	{
		if (other.collider.tag=="Player")
		{
			target=other.collider.GetComponent(Entity) as Entity;
		}
	}
}