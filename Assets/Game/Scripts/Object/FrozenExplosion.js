#pragma strict

var myTransform:Transform;
var stage:int;
var exsprite:exSprite;
var flag:WeaponFlag;

var damage:int=1;

var toDestroy:boolean;

var explosionRange:int;

var expCollider:SphereCollider;

function Awake()
{
	
	exsprite.color.a=0;
	myTransform.localScale.x=0;
	myTransform.localScale.y=0;
}

function Reset(_t:Transform)
{
	this.gameObject.SetActiveRecursively(true);
	myTransform.position=_t.position;
	stage=0;
	exsprite.color.a=0;
	exsprite.scale.x=explosionRange*1.0/40;
	exsprite.scale.y=exsprite.scale.x;
	expCollider.radius=explosionRange;
	
	myTransform.localScale.x=0;
	myTransform.localScale.y=0;
}

function Start () {

}

function Update () {
	myTransform.localScale.x+=3*Time.deltaTime;
	myTransform.localScale.y+=3*Time.deltaTime;
	if (stage==0)
	{
		if (myTransform.localScale.x<1)
		{
			exsprite.color.a+=3*Time.deltaTime;
		}
		else
		{
			stage=1;
		}
		
	}
	else if (stage==1)
	{
		if (exsprite.color.a>0)
		{
			exsprite.color.a-=3*Time.deltaTime;
		}
		else
		{
			if (toDestroy)
			{
				GameObject.Destroy(this.gameObject);
			}
			else
			{
				this.gameObject.SetActiveRecursively(false);
			}
			
		}
	}
}

function OnTriggerStay (other : Collider)
{
	if (stage!=0)
	{
		return;
	}
	
	if (flag==WeaponFlag.Player)
	{
		if (other.gameObject.tag=="Enemy")
		{
			var e:Enemy=other.gameObject.GetComponent(Enemy) as Enemy;
			e.Hurt(damage,HurtType.Freeze);
		}
	}
	else if (flag==WeaponFlag.Enemy)
	{
		if (other.gameObject.tag=="Player")
		{
			var p:PlayerController=other.gameObject.GetComponent(PlayerController) as PlayerController;
			p.Hurt(damage,HurtType.Freeze);
		}
	}
}