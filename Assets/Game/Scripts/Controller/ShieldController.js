#pragma strict


var shield:AlphaChange;



var toggle:float=0.0;

var stage:int;

var duartion:float=5.0;

var cost:int=1;

var fieldSound:AudioClip;

var skill:ShipSkill;

function Awake()
{
	skill.OpenFunc=OpenShield;
}

function Start () {
	
}


function OpenShield()
{
	if (stage==0)
	{
		if (skill.player.ReduceEnergy(cost))
		{
			skill.button.SetEnabled(false);
			stage=1;
			toggle=0;
			shield.FadeIn(1.0);
			shield.collider.enabled=true;
			
			
			this.audio.PlayOneShot(fieldSound);
		}
	}
}

function CloseShield()
{
	stage=0;
	shield.FadeOut(1.0);
	shield.collider.enabled=false;
	
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
		if (toggle<duartion)
		{
			toggle+=Time.deltaTime;
		}
		else
		{
			
			CloseShield();
		}
	}
}