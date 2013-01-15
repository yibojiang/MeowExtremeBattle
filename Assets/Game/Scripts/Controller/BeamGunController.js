#pragma strict

var beam:Beam;

var shootToggle:float=0.0;
var shootInterval:float=1;

var myTransform:Transform;


var damage:int=50;
var ent:Entity;


var flag:WeaponFlag;

var beamHalo:exSpriteAnimation;
var beamAnimation:exSpriteAnimation;

var graphics:exSprite;
var powerUp:boolean;

var baseDamage:int;
var baseInterval:float;


var cat:CatController;

var catAnimation:exSpriteAnimation;

function Awake()
{
	beam.flag=flag;
	beam.damage=damage;
	
	if (cat!=null)
	{
		cat.levelUpFunc=LevelUp;
		cat.setTargetFunc=SetTarget;
	}
}

function Start () 
{
	//LevelUp(ent.level);
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
	if (shootToggle<shootInterval)
	{
		
		shootToggle+=Time.deltaTime;
		
		if (!beam.gameObject.active)
		{
			if (catAnimation!=null)
			{
				
				catAnimation.SetFrame("NeoBeamCat",0);
				catAnimation.Pause();
				
				
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
			Fire();
		}
	}
	else if (flag==WeaponFlag.Enemy)
	{
		if (other.collider.tag=="Player")
		{
			Fire();
		}
	}
}

function Fire()
{
	if  (shootToggle<shootInterval)
	{
		return;
	}
	
	
	shootToggle=0.0;
	if (!beam.gameObject.active)
	{
		this.audio.Play();
		beamHalo.PlayDefault();
		beamAnimation.PlayDefault();
		beam.Reset();
		
		if (catAnimation!=null)
		{
			//catAnimation.SetFrame("BeamCat",1);
			catAnimation.Play("NeoBeamCat");
			
			//catAnimation.SetFrame("NeoBeamCat",2);
			//catAnimation.Pause();
			
			
		}
	}
}

function SetTarget()
{

}

function LevelUp()
{
	damage=baseDamage*(1+cat.level*0.1);
	shootInterval=baseInterval*(1-0.04*cat.level);
}