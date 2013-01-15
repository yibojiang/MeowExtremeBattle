#pragma strict

var laser:exSprite;
var flag:WeaponFlag;

var damage:int;
var maxDamage:int;
var ent:Entity;

var toggle:float;
var speed:float=1.0;

var cat:CatController;
var target:Enemy;
var target0:PlayerController;


var baseMaxDamage:int=1;
var baseSpeed:float=0.3;

var graphics:exSprite;
var powerUp:boolean=false;

var myTransform:Transform;

function Awake () {
	
	
	if (cat!=null)
	{
		cat.levelUpFunc=LevelUp;
		cat.setTargetFunc=SetTarget;
	}
}

function Update () {
	if (toggle<1.0)
	{
		toggle+=Time.deltaTime*speed;
		laser.color.a=toggle;
	}
	
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
	
	if (flag==WeaponFlag.Player)
	{
		if (target!=null)
		{
			LaserToTarget(target.myTransform);
			damage=maxDamage*toggle;
			target.Hurt(damage,HurtType.Beam);
		}
		else
		{
			toggle=0;
		}
	}
	else if (flag==WeaponFlag.Enemy)
	{
		if (target0!=null)
		{
			LaserToTarget(target0.myTransform);
			damage=maxDamage*toggle;
			target0.Hurt(damage,HurtType.Beam);
		}
		else
		{
			toggle=0;
		}
	}
}

function LaserToTarget(_target:Transform)
{
	var dir:Vector3=_target.position-myTransform.position;
	var angle:float=Vector3.Angle(dir,Vector3.up);	
		
	if (dir.x>0)
	{
		laser.transform.eulerAngles.z=-angle;
		
	}
	else
	{
		laser.transform.eulerAngles.z=angle;
		
	}
	
	laser.scale.y=dir.magnitude*0.48;
}

function LevelUp()
{
	maxDamage=baseMaxDamage*(1+cat.level*0.2);
	speed=baseSpeed*(1+cat.level*0.2);
}

function SetTarget()
{
	toggle=0;
	var ent:Entity=cat.target;
	target=ent.gameObject.GetComponent(Enemy) as Enemy;
}

function OnTriggerStay (other : Collider)
{
	if (flag==WeaponFlag.Player)
	{
		if (other.collider.tag=="Enemy")
		{
			if (cat.target==null)
			{
				if (target==null)
				{
					toggle=0;
					target=other.collider.GetComponent(Enemy) as Enemy;
				}
			}
		}
	}
	else if (flag==WeaponFlag.Enemy)
	{
		if (other.collider.tag=="Player")
		{
			toggle=0;
			target0=other.collider.GetComponent(PlayerController) as PlayerController;
		}
	}
}
