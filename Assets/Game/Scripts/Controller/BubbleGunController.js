#pragma strict

var stage:int;//0:charge 1:ready 2:firing
var fireVoice:AudioClip;

var glow:AlphaChange;

var toggle:float;

var cost:int=2;

var skill:ShipSkill;

var duration:float=3.0;

var chargeInterval:float=2.0;

var bulletPoolSize:int=10;

var bulletPool:BubbleBall[];

var bullet:GameObject;

var damage:int=10;
var flag:WeaponFlag;

var gun:Transform;


var fireToggle:float;
var fireInterval:float=0.3;



function Awake()
{

	bulletPool=new BubbleBall[bulletPoolSize];	
	
	for (var i:int=0;i<bulletPool.Length;i++)
	{
		var bulletObj:GameObject=Instantiate(bullet,transform.position,transform.rotation);
		bulletPool[i]=bulletObj.GetComponent(BubbleBall) as BubbleBall;
		bulletObj.SetActiveRecursively(false);
		
	}
}

function Start () {
	skill.OpenFunc=Open;
}

function Update () {
	if (stage==0)
	{
		if (skill.player.energy<cost)
		{
			if (skill.button.alive)
			{
				skill.button.SetEnabled(false);
			}
		}
		else
		{
			if (!skill.button.alive)
			{
				skill.button.SetEnabled(true);
			}
		}
	}
	else if (stage==1)
	{
		if (toggle<chargeInterval)
		{
			toggle+=Time.deltaTime;
		}
		else
		{
			this.audio.PlayOneShot(fireVoice);
			toggle=0;
			stage=2;
			//Fire();
		}
	}
	else if (stage==2)
	{
		
		if (toggle<duration)
		{
			toggle+=Time.deltaTime;
		}
		else
		{
			toggle=0;
			stage=3;
		}
		
		
		if (fireToggle<fireInterval)
		{
			fireToggle+=Time.deltaTime;
		}
		else
		{
			fireToggle=0.0;
			Fire();
		}
	}
	else if (stage==3)
	{
		if (CheckClose())
		{
			Finish();
		}
	}
	
}

function Open()
{
	
	if (stage==0)
	{
		if (skill.player.ReduceEnergy(cost))
		{
			skill.button.SetEnabled(false);
			toggle=0;
			stage=1;
			glow.FadeIn(chargeInterval);
			//iTween.Stop(up);
			//iTween.Stop(down);
			//iTween.MoveTo(up,iTween.Hash("islocal",true,"y",34,"time",1));	
			//iTween.MoveTo(down,iTween.Hash("islocal",true,"y",-6,"time",1,"oncompletetarget",this.gameObject,"oncomplete","Fire"));	
		}
	}
}

function CheckClose():boolean
{
	for (var i:int=0;i<bulletPool.Length;i++)
	{
		if (bulletPool[i].alive)
		{
			return false;
		}
	}
	return true;
}

function Close()
{
	stage=0;
	if (skill.player.energy<cost)
	{
		if (skill.button.alive)
		{
			skill.button.SetEnabled(false);
		}
	}
	else
	{
		if (!skill.button.alive)
		{
			skill.button.SetEnabled(true);
		}
	}
}

function Finish()
{
	glow.FadeOut(1);
	Close();
	//iTween.MoveTo(up,iTween.Hash("islocal",true,"y",6,"time",1,"delay",1));	
	//iTween.MoveTo(down,iTween.Hash("islocal",true,"y",0,"time",1,"oncompletetarget",this.gameObject,"oncomplete","Close","delay",1));	
}



function Fire()
{
	
	
	
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