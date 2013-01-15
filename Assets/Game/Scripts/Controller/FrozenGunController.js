#pragma strict

var fireToggle:float;
var fireInterval:float=6;



var shellPool:FrozenShell[];
var shellPoolSize:int=2;

var myTransform:Transform;

var forzenShell:GameObject;

var flag:WeaponFlag;

var stage:int=0;

var target:Entity;


var damage:int;
var explosionDamage:int;


var explosionRange:int;


var graphics:exSprite;

var powerUp:boolean;


var baseDamage:int;
var baseExpDamage:int;
var baseInterval:float;
var baseRange:int;
var cat:CatController;

function Awake()
{

	
	myTransform=transform;
	shellPool=new FrozenShell[shellPoolSize];
	for (var i:int=0;i<shellPool.Length;i++)
	{
		var shellObj:GameObject=Instantiate(forzenShell,transform.position,transform.rotation);
		shellPool[i]=shellObj.GetComponent(FrozenShell);
		shellPool[i].flag=flag;
		shellObj.SetActiveRecursively(false);
		
	}
	
	if (cat!=null)
	{
		cat.levelUpFunc=LevelUp;
		cat.setTargetFunc=SetTarget;
	}
}

function Start () {
	
}

function Update () 
{
	
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
	if (fireToggle<fireInterval)
	{
		fireToggle+=Time.deltaTime;
	}
	else
	{
		LaunchShell();
	}
}

function OnTriggerStay (other : Collider)
{
	if (flag==WeaponFlag.Player)
	{
		if (other.collider.tag=="Enemy")
		{
			if (cat.target==null)
			{
				var e:Enemy=other.collider.GetComponent(Enemy) as Enemy;
				if (!e.freezing)
				{
					target=other.collider.GetComponent(Entity) as Entity;
				}
				
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


function SetTarget()
{
	target=cat.target;
	
}

function OnDestroy () 
{
	for (var i:int=0;i<shellPool.Length;i++)
	{
		if (!shellPool[i].ent.alive)
		{
			if (shellPool[i]!=null)
			{
				GameObject.Destroy(shellPool[i].gameObject);
			}
		}
		else
		{
			shellPool[i].toDestroy=true;
		}
	}

}



function LaunchShell()
{
	if  (fireToggle<fireInterval)
	{
		return;
	}
	
	if (target!=null)
	{
		fireToggle=0.0;
		var targetPos:Vector3=target.myTransform.position;
		for (var i:int=0;i<shellPool.Length;i++)
		{
			if (!shellPool[i].ent.alive)
			{
				this.audio.Play();
				shellPool[i].Reset(myTransform);
				shellPool[i].SetTargetPos(targetPos);
				shellPool[i].flag=flag;
				shellPool[i].damage=damage;
				shellPool[i].explosionRange=explosionRange;
				shellPool[i].explosionDamage=explosionDamage;
				//this.audio.PlayOneShot(this.audio.clip);
				return;
			}
		}
	}
}



function LevelUp()
{
	
	//level max 5
	
	damage=baseDamage*(1+cat.level*0.1);
	explosionDamage=baseExpDamage*(1+cat.level*0.1);
	explosionRange=baseRange*(1+cat.level*0.1);
	fireInterval=baseInterval*(1-0.04*cat.level);
	

}

