#pragma strict

var missle:GameObject;

var shootToggle:float=0.0;
var shootInterval:float=1.0;

var misslePool:Missle[];
var misslePoolSize:int=10;

var myTransform:Transform;

var flag:WeaponFlag;


var damage:int;
var graphics:exSprite;
var powerUp:boolean;

var baseDamage:int;
var baseInterval:float;

var cat:CatController;

function Awake()
{
	myTransform=transform;
	misslePool=new Missle[misslePoolSize];
	for (var i:int=0;i<misslePool.Length;i++)
	{
		var missleObj:GameObject=Instantiate(missle,transform.position,transform.rotation);
		misslePool[i]=missleObj.GetComponent(Missle);
		misslePool[i].flag=flag;
		missleObj.SetActiveRecursively(false);
		
	}
	if (cat!=null)
	{
		cat.levelUpFunc=LevelUp;
		cat.setTargetFunc=SetTarget;
	}
}

function Start () {
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
	if (shootToggle<shootInterval)
	{
		shootToggle+=Time.deltaTime;
	}
	else
	{
		//LaunchMissle();
		//shootToggle=0;
	}
}

function OnTriggerStay (other : Collider)
{
	if (flag==WeaponFlag.Player)
	{
		if (other.collider.tag=="Enemy")
		{
			if (cat.target!=null)
			{
				LaunchMissle(cat.target.transform);
			}
			else
			{
				LaunchMissle(other.collider.transform);
			}
		}
	}
	else if (flag==WeaponFlag.Enemy)
	{
		if (other.collider.tag=="Player")
		{
			
			LaunchMissle(other.collider.transform);
		}
	}
}


function LaunchMissle(_target:Transform)
{
	
	if  (shootToggle<shootInterval)
	{
		return;
	}
	
	shootToggle=0.0;

	for (var i:int=0;i<misslePool.Length;i++)
	{
		if (!misslePool[i].ent.alive)
		{
			this.audio.Play();
			misslePool[i].Reset(myTransform);
			misslePool[i].SetTarget(_target);
			misslePool[i].flag=flag;
			misslePool[i].damage=damage;
			//this.audio.PlayOneShot(this.audio.clip);
			return;
		}
	}
}

function SetTarget()
{
	LaunchMissle(cat.target.transform);
}

function OnDestroy()
{
	
	for (var i:int=0;i<misslePool.Length;i++)
	{
		if (!misslePool[i].ent.alive)
		{
			if (misslePool[i]!=null)
			{
				Destroy(misslePool[i].gameObject);
			}
			
		}
		else
		{
			misslePool[i].toDestroy=true;
		}
	}
}

function LevelUp()
{
	
	damage=baseDamage*(1+cat.level*0.1);
	shootInterval=baseInterval*(1-0.04*cat.level);
	
}