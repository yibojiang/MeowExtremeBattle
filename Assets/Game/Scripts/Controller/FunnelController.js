#pragma strict

var flag:WeaponFlag;
var shootToggle:float=0.0;
var shootInterval:float=0.1;

var fangPool:Fang[];
var fangPoolSize:int=10;

var fang:GameObject;

var damage:int=50;

var myTransform:Transform;
var graphics:exSprite;
var powerUp:boolean;


var baseDamage:int;

var cat:CatController;

function Awake()
{
	myTransform=transform;
	fangPool=new Fang[fangPoolSize];
	
	
	var angle:float=360.0/fangPool.Length;
	for (var i:int=0;i<fangPool.Length;i++)
	{
		
		var fangObj:GameObject=Instantiate(fang,transform.position,transform.rotation);
		fangPool[i]=fangObj.GetComponent(Fang);
		fangPool[i].flag=flag;
		//fangPool[i].parentTrnasform=rotate;
		//fangPool[i].myTransform.parent=rotate;
		//fangPool[i].stage=4;
		
		fangPool[i].myTransform.localPosition.x=-30*Mathf.Cos(angle*i*Mathf.Deg2Rad);
		fangPool[i].myTransform.localPosition.y=30*Mathf.Sin(angle*i*Mathf.Deg2Rad);
		fangPool[i].defaultAngle=angle*i;
		
		//fangPool[i].ent.alive=true;
		fangObj.SetActiveRecursively(false);
		
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

function OnTriggerStay (other : Collider)
{
	if (flag==WeaponFlag.Player)
	{
		if (other.collider.tag=="Enemy")
		{
			if (cat.target!=null)
			{
				LaunchFang(cat.target.transform);
			}
			else
			{
				LaunchFang(other.collider.transform);
			}
		}
	}
	else if (flag==WeaponFlag.Enemy)
	{
		if (other.collider.tag=="Player")
		{
			LaunchFang(other.collider.transform);
		}
	}
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
	
	
}

function LaunchFang(_target:Transform)
{
	
	if  (shootToggle<shootInterval)
	{
		return;
	}
	
	shootToggle=0.0;
	
	

	for (var i:int=0;i<fangPool.Length;i++)
	{
		
		//if (fangPool[i].stage==4)
		if (!fangPool[i].ent.alive)
		{
			if (this.audio!=null)
			{
				
				this.audio.Play();
			}
			fangPool[i].damage=damage;
			fangPool[i].Reset(myTransform);
			fangPool[i].SetHome(myTransform);
			fangPool[i].SetTarget(_target);
			fangPool[i].flag=flag;
			fangPool[i].myTransform.parent=null;
			
			return;
		}
	}
	
}

function OnDestroy()
{
	for (var i:int=0;i<fangPool.Length;i++)
	{
		if (fangPool[i].ent.alive)
		{
			fangPool[i].toDestroy=true;
		}
		else
		{
			if (fangPool[i]!=null)
			{
				Destroy(fangPool[i].gameObject);
			}
		}
	}
}

function SetTarget()
{
	LaunchFang(cat.target.transform);
}

function LevelUp()
{
	damage=baseDamage*(1+cat.level*0.1);
}