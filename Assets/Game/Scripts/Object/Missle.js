#pragma strict

var target:Entity;
var myTransform:Transform;

var life:float=0.0;
var lifeTime:float=1.0;
var damage:int=50;
var ent:Entity;

var stage:int;

var smoke:ParticleEmitter;

var head:GameObject;

var flag:WeaponFlag;

var toDestroy:boolean;

var boom:GameObject;

var dir:Vector3;
var targetPos:Vector3;
function Awake()
{
	myTransform=transform;
	ent=GetComponent(Entity) as Entity;
	smoke=this.particleEmitter;
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
	
	dir=Vector3(1,0,0);
	smoke.emit=true;
	this.collider.enabled=true;
	stage=0;
}

function SetTarget(_target:Transform)
{
	target=_target.GetComponent(Entity) as Entity;
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
		
		if (other.gameObject.tag=="Shield")
		{
			Explode();
		}
	}
}


function Update () {
	if (!ent.alive)
	{
		if (toDestroy)
		{
			Destroy(this.gameObject);
		}
		else
		{
			this.gameObject.SetActiveRecursively(false);
		}
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
			
			if (target.alive && target!=null)
			{
				targetPos=target.myTransform.position+target.velocity*Time.deltaTime;
				dir=targetPos-myTransform.position;
				
				ent.velocity=dir.normalized*500*life;
				
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
			else
			{
				ent.velocity=dir.normalized*500*life;
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
				//Explode();
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

function Explode()
{
	this.audio.Play();
	head.SetActiveRecursively(false);
	stage=1;
	smoke.emit=false;
	this.collider.enabled=false;
	
	Instantiate(boom,myTransform.position,Quaternion.identity);
	
}