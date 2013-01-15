#pragma strict

enum WeaponFlag
{
	Player,
	Enemy
}

var MGshootToggle:float=0.0;
var MGshootInterval:float=0.2;

var bullet:GameObject;

var bulletPool:Bullet[];
var bulletPoolSize:int=30;
var myTransform:Transform;

var randomRange:float;

var flag:WeaponFlag;

var damage:int=10;

var target:Entity;

var gun:Transform;

private var originRotation:float;


var graphics:exSprite;
var powerUp:boolean;

var baseDamage:int;
var baseInterval:float;
var cat:CatController;

function Awake()
{
	myTransform=this.transform;
	bulletPool=new Bullet[bulletPoolSize];
	for (var i:int=0;i<bulletPool.Length;i++)
	{
		var bulletObj:GameObject=Instantiate(bullet,transform.position,transform.rotation);
		bulletPool[i]=bulletObj.GetComponent(Bullet) as Bullet;
		bulletObj.SetActiveRecursively(false);
		
	}
	
	if (gun==null)
	{
		gun=myTransform;
	}
	
	
	if (cat!=null)
	{
		cat.levelUpFunc=LevelUp;
		cat.setTargetFunc=SetTarget0;
	}
	//originRotation=myTransform.eulerAngles.z;
}

function Start()
{
	//LevelUp(ent.level);
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
	if (MGshootToggle<MGshootInterval)
	{
		MGshootToggle+=Time.deltaTime;
	}
	else
	{
		if (target!=null)
		{
			if (target.alive)
			{
				
				var dir:Vector3=target.myTransform.position-myTransform.position;
				var angle:float=Vector3.Angle(dir,Vector3.up);
				
				if (dir.x>0)
				{
					
					originRotation=-angle;
					
				}
				else
				{
					originRotation=angle;
					
				}
				gun.eulerAngles.z=originRotation+Random.Range(-randomRange,randomRange);
				Shoot();
			}
			else
			{
				target=null;
				
				
					
				
			}
		}
		else
		{
			this.audio.Stop();
		}
		
	}
	
}

function SetTarget(_target:Entity)
{
	target=_target;
}

function OnTriggerStay (other : Collider)
{
	if (target!=null)
	{
		if (!this.audio.isPlaying)
		{
			this.audio.Play();
		}
		
		return;
	}
	
	
	
	if (flag==WeaponFlag.Player)
	{
		if (other.collider.tag=="Enemy")
		{
			SetTarget(other.collider.GetComponent(Entity) as Entity);
			//Shoot();
			
		}
	}
	else if (flag==WeaponFlag.Enemy)
	{
		if (other.collider.tag=="Player")
		{
			SetTarget(other.collider.GetComponent(Entity) as Entity);
			//Shoot();
			
		}
	}
}

function Shoot()
{
	
	if  (MGshootToggle<MGshootInterval)
	{
		return;
	}
	
	MGshootToggle=0.0;
	for (var i:int=0;i<bulletPool.Length;i++)
	{
		if (!bulletPool[i].alive)
		{
			bulletPool[i].Reset(gun);
			bulletPool[i].flag=flag;
			bulletPool[i].damage=damage;
			
			
			
			return;
		}
	}
}

function OnDestroy()
{
	for (var i:int=0;i<bulletPool.Length;i++)
	{
		if (bulletPool[i].alive)
		{
			bulletPool[i].toDestroy=true;
		}
		else
		{
			if (bulletPool[i]!=null)
			{
				GameObject.Destroy(bulletPool[i].gameObject);
			}
		}
		
	}
	
}

function SetTarget0()
{
	target=cat.target;
}

function LevelUp()
{
	
	damage=baseDamage*(1+cat.level*0.1);
	MGshootInterval=baseInterval*(1-0.04*cat.level);
	
}