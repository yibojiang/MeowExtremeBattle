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

var damageExplosion:GameObject;
var explosion:DamageExplosion;

var toDestroy:boolean;

function Awake()
{
	myTransform=transform;
	ent=GetComponent(Entity) as Entity;
	smoke=this.particleEmitter;
	
	var damageObj:GameObject=Instantiate(damageExplosion,myTransform.position,Quaternion.identity);
	explosion=damageObj.GetComponent(DamageExplosion) as DamageExplosion;
	explosion.flag=flag;
	damageObj.SetActiveRecursively(false);
}

function Start () {

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
	var angle2Target:float=Random.Range(0,360);
	targetPos.x=_targetPos.x+30*Mathf.Cos(Mathf.Deg2Rad*angle2Target);
	targetPos.y=_targetPos.y+30*Mathf.Sin(Mathf.Deg2Rad*angle2Target);
	
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
			ent.velocity=dir.normalized*100*life;
			
			if (dir.sqrMagnitude<=100)
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
	explosion.Reset(myTransform);
	explosion.damage=explosionDamage;
	//Generate Explosion
	
}