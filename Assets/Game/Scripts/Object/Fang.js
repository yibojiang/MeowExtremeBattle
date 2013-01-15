#pragma strict
var beam:Beam;
var target:Entity;
var home:Entity;

var myTransform:Transform;

var life:float=0.0;
var lifeTime:float=2.0;

var damage:int=1;

var ent:Entity;

var stage:int;

var smoke:ParticleEmitter;



var flag:WeaponFlag;

var toDestroy:boolean;

var beamAnimation:exSpriteAnimation;


var parentTrnasform:Transform;

var defaultAngle:float;
var targetPos:Vector3;
function Awake()
{
	myTransform=transform;
	ent=GetComponent(Entity) as Entity;
}

function Reset(t:Transform)
{
	
	this.gameObject.SetActiveRecursively(true);
	life=0;
	ent.alive=true;
	myTransform.position=t.position;
	myTransform.rotation=t.rotation;
	
	beam.flag=flag;
	
	stage=0;
}

function Start () {

}

function SetHome(_home:Transform)
{
	home=_home.GetComponent(Entity) as Entity;
}

function SetTarget(_target:Transform)
{
	target=_target.GetComponent(Entity) as Entity;
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
				stage=3;
			}
			
			if (target.alive && target!=null)
			{
				targetPos=target.myTransform.position+target.velocity*Time.deltaTime;
				
				var angle2Target:float=Random.Range(0,360);
				
				var targetPos2:Vector3;
				
				targetPos2.x=targetPos.x+100*Mathf.Cos(Mathf.Deg2Rad*angle2Target);
				targetPos2.y=targetPos.y+100*Mathf.Sin(Mathf.Deg2Rad*angle2Target);
				
				
				var dir:Vector3=targetPos-myTransform.position;
				var dir2:Vector3=targetPos2-myTransform.position;
				
				ent.velocity=dir2.normalized*500;
				
				if (dir.sqrMagnitude<=10000)
				{
					stage=1;
				}
			}
			else
			{
				stage=3;
			}
			
		}
		else if (stage==1)
		{
			ent.velocity=Vector3(0,0,0);
			//Rotate
			dir=target.myTransform.position+target.velocity*Time.deltaTime-myTransform.position;
			var angle:float=Vector3.Angle(dir,Vector3.up);
			if (dir.x>0)
			{
				myTransform.eulerAngles.z=-angle;
			}
			else
			{
				myTransform.eulerAngles.z=angle;
				
			}
			
			Fire();
			stage=2;
		}
		else if (stage==2)
		{
			if (!beam.gameObject.active)
			{
				stage=3;
			}
		}
		else if (stage==3)
		{
			if (home!=null)
			{
				targetPos=home.myTransform.position;
				
				//targetPos.x=parentTrnasform.position.x-30*Mathf.Cos(defaultAngle*Mathf.Deg2Rad);
				//targetPos.y=parentTrnasform.position.y+30*Mathf.Sin(defaultAngle*Mathf.Deg2Rad);
				//targetPos=homePos;
			}
			else
			{
				Explode();
			}
			dir=targetPos-myTransform.position;
			ent.velocity=dir.normalized*500;
			if (dir.sqrMagnitude<=100)
			{
				ent.alive=false;
				ent.velocity=Vector3.zero;
				/*
				stage=4;
				myTransform.parent=parentTrnasform;
				myTransform.position.x=parentTrnasform.position.x-30*Mathf.Cos(defaultAngle*Mathf.Deg2Rad);
				myTransform.position.y=parentTrnasform.position.y+30*Mathf.Sin(defaultAngle*Mathf.Deg2Rad);
				
				*/
			}
		}
		else if (stage==4)
		{
			
			
		}
			
	}
}

function Explode()
{
	Destroy(this.gameObject);
}

function Fire()
{
	if (!beam.gameObject.active)
	{
		beamAnimation.PlayDefault();
		this.audio.Play();
		beam.damage=damage;
		beam.Reset();
	}
}