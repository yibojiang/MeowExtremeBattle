#pragma strict
var targetPos:Vector3;
var myTransform:Transform;

var life:float=0.0;
var lifeTime:float=1.0;
var damage:int=10;
var explosionDamage:int;
var ent:Entity;

var stage:int;

var smoke:ParticleEmitter;

var head:GameObject;

var flag:WeaponFlag;

var freezeExplosion:GameObject;
var explosion:FrozenExplosion;

var toDestroy:boolean;

var explosionRange:int;

function Awake()
{
	
	
	smoke=this.particleEmitter;
	
	var frozenObj:GameObject=Instantiate(freezeExplosion,myTransform.position,Quaternion.identity);
	explosion=frozenObj.GetComponent(FrozenExplosion) as FrozenExplosion;
	explosion.flag=flag;
	frozenObj.SetActiveRecursively(false);
}

function Reset(t:Transform)
{
	this.gameObject.SetActiveRecursively(true);
	life=0;
	ent.alive=true;
	myTransform.position=t.position;
	myTransform.rotation=t.rotation;
	
	smoke.emit=true;
	this.collider.enabled=true;
	stage=0;
}

function SetTargetPos(_targetPos:Vector3)
{
	targetPos=_targetPos;
	
}

function OnDestroy()
{
	if (explosion!=null)
	{
		if (explosion.gameObject.active)
		{
			explosion.toDestroy=true;
		}
		else
		{
			GameObject.Destroy(explosion.gameObject);
		}
	}
	
}

function Start () {

}

function Update () {
	if (!ent.alive)
	{
		if (toDestroy)
		{
			GameObject.Destroy(this.gameObject);
		}
		this.gameObject.SetActiveRecursively(false);
	}
	else
	{
		if (stage==0)
		{
			if (life<lifeTime)
			{
				life+=Time.deltaTime;
			}
			else
			{
				//ent.alive=false;
				Explode();
			}
			
			var dir:Vector3=targetPos-myTransform.position;
			ent.velocity=dir.normalized*300*life;
			
			if (dir.sqrMagnitude<=1800)
			{
				Explode();
			}
			
			
			if (Mathf.Abs(ent.velocity.x) + Mathf.Abs(ent.velocity.y)>0.1)
			{
				if (ent.velocity.x>0)
				{
					myTransform.eulerAngles.z= -Vector3.Angle(ent.velocity,Vector3.up);
				}
				else
				{
					myTransform.eulerAngles.z= Vector3.Angle(ent.velocity,Vector3.up);
				}
			}
			
		}
		else if (stage==1)
		{
			ent.velocity=Vector3(0,0,0);
			if (smoke.particleCount==0)
			{
				ent.alive=false;
			}
		}
	}
}

function OnTriggerEnter (other : Collider)
{
	if (flag==WeaponFlag.Player)
	{
		if (other.gameObject.tag=="Enemy")
		{
			var e:Enemy=other.gameObject.GetComponent(Enemy) as Enemy;
			e.Hurt(damage,HurtType.Shell);
			
			Explode();
		}
	}
	else if (flag==WeaponFlag.Enemy)
	{
		if (other.gameObject.tag=="Player")
		{
			
			var p:PlayerController=other.gameObject.GetComponent(PlayerController) as PlayerController;
			p.Hurt(damage,HurtType.Shell);
			Explode();
		
		}
	}
}

function Explode()
{
	this.audio.Play();
	head.SetActiveRecursively(false);
	stage=1;
	smoke.emit=false;
	this.collider.enabled=false;
	explosion.damage=explosionDamage;
	explosion.explosionRange=explosionRange;
	explosion.Reset(myTransform);
	
	//Generate Explosion
	
}