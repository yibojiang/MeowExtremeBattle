#pragma strict

var pe:ParticleEmitter;
var damage:int;

var fire:exSprite;

var flag:WeaponFlag;

var myTransform:Transform;
var rangeWidth:float=10;
var rangeLength:float=50;

var stage:int=0;

function Fire()
{
	pe.emit=true;
	stage=1;
	pe.localVelocity.y=rangeLength*2;
	pe.rndVelocity.x=rangeWidth*2;
}

function StopFire()
{
	pe.emit=false;
	stage=2;
}

function Start () {

}

function Update () {
	if (stage==1)
	{
		
		//pe.localVelocity.y=fire.scale.y*2;
		//pe.rndVelocity.x=fire.scale.x*2;
		if (fire.scale.x<rangeWidth)
		{
			fire.scale.x+=Time.deltaTime*rangeWidth;
		}
		
		if (fire.scale.y<rangeLength)
		{
			fire.scale.y+=Time.deltaTime*rangeLength;
		}
	}
	else if (stage==2)
	{
		if (fire.scale.x>0)
		{
			fire.scale.x-=Time.deltaTime*rangeWidth;
		}
		
		if (fire.scale.y>0)
		{
			fire.scale.y-=Time.deltaTime*rangeLength;
		}
	}
}

function OnTriggerStay(other : Collider)
{
	if (flag==WeaponFlag.Player)
	{
	
		if (other.gameObject.tag=="Enemy")
		{
			var e:Enemy=other.gameObject.GetComponent(Enemy) as Enemy;
			e.Hurt(damage,HurtType.Explosion);
			
		}
	}
	else if (flag==WeaponFlag.Enemy)
	{
		if (other.gameObject.tag=="Player")
		{
			var p:PlayerController=other.gameObject.GetComponent(PlayerController) as PlayerController;
			p.Hurt(damage,HurtType.Explosion);
		
		}
	}
	
}