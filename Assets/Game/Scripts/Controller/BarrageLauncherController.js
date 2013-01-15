#pragma strict

var fireToggle:float;
var fireInterval:float=0.1;

var loadToggle:float;
var loadInterval:float=3.0;

var barragePool:Barrage[];
var barragePoolSize:int=20;

var myTransform:Transform;

var barrage:GameObject;

var flag:WeaponFlag;

var stage:int=0;

var target:Entity;

var barrageCount:int;
var barrageCountMax:int=5;

var damage:int;
var explosionDamage:int;

var graphics:exSprite;

var powerUp:boolean;


var baseDamage:int;
var baseExpDamage:int;
var baseCount:int;
var baseInterval:float;

var cat:CatController;

function Awake()
{

	
	myTransform=transform;
	barragePool=new Barrage[barragePoolSize];
	for (var i:int=0;i<barragePool.Length;i++)
	{
		var barrageObj:GameObject=Instantiate(barrage,transform.position,transform.rotation);
		barragePool[i]=barrageObj.GetComponent(Barrage);
		barragePool[i].flag=flag;
		barrageObj.SetActiveRecursively(false);
		
	}
	
	if (cat!=null)
	{
		cat.levelUpFunc=LevelUp;
		cat.setTargetFunc=SetTarget;
	}
}

function Start () {
	
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
	
	if (stage==0)
	{
		if (loadToggle<loadInterval)
		{
			loadToggle+=Time.deltaTime;
		}
		else
		{
			barrageCount=barrageCountMax;
			loadToggle=0;
			stage=1;
		}
	}
	else if (stage==1)
	{
	
	}
	else if (stage==2)
	{
		
		if (fireToggle<fireInterval)
		{
			fireToggle+=Time.deltaTime;
		}
		else
		{
			fireToggle=0;
			if (barrageCount>0)
			{
				barrageCount--;
				LaunchBarrage();
			}
			else
			{
				stage=0;
			}
		}
	}
}

function OnTriggerStay (other : Collider)
{
	if (flag==WeaponFlag.Player)
	{
		if (other.collider.tag=="Enemy")
		{
			if (stage==1)
			{
				if (cat.target==null)
				{
					stage=2;
					target=other.collider.GetComponent(Entity) as Entity;
				}
			}
		}
	}
	else if (flag==WeaponFlag.Enemy)
	{
		if (other.collider.tag=="Player")
		{
			if (stage==1)
			{
				stage=2;
				target=other.collider.GetComponent(Entity) as Entity;
			}
		}
	}
}


function SetTarget()
{
	target=cat.target;
	stage=2;
}

function OnDestroy () 
{
	for (var i:int=0;i<barragePool.Length;i++)
	{
		if (!barragePool[i].ent.alive)
		{
			if (barragePool[i]!=null)
			{
				GameObject.Destroy(barragePool[i].gameObject);
			}
		}
		else
		{
			barragePool[i].toDestroy=true;
		}
	}

}
function LaunchBarrage()
{
	if (target!=null)
	{
		var targetPos:Vector3=target.myTransform.position;
		for (var i:int=0;i<barragePool.Length;i++)
		{
			if (!barragePool[i].ent.alive)
			{
				this.audio.PlayOneShot(this.audio.clip);
				barragePool[i].Reset(myTransform);
				barragePool[i].flag=flag;
				barragePool[i].SetTargetPos(targetPos);
				barragePool[i].damage=damage;
				barragePool[i].explosionDamage=explosionDamage;
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
	barrageCountMax=baseCount*(1+cat.level*0.1);
	
	loadInterval=baseInterval*(1-0.04*cat.level);

}

