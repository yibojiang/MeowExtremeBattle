#pragma strict
var positron:Positron;
var stage:int;//0:charge 1:ready 2:firing
var fireVoice:AudioClip;

var up:GameObject;
var down:GameObject;


var glow:AlphaChange;

var toggle:float;

var cost:int=2;

var skill:ShipSkill;

function Awake()
{
	skill.OpenFunc=Open;
}

function Start () {
	
	
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
		
	}
	else if (stage==2)
	{
		
		if (toggle<positron.duration)
		{
			toggle+=Time.deltaTime;
		}
		else
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
			glow.FadeIn(1);
			iTween.Stop(up);
			iTween.Stop(down);
			iTween.MoveTo(up,iTween.Hash("islocal",true,"y",34,"time",1));	
			iTween.MoveTo(down,iTween.Hash("islocal",true,"y",-6,"time",1,"oncompletetarget",this.gameObject,"oncomplete","Fire"));	
		}
	}
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
	iTween.MoveTo(up,iTween.Hash("islocal",true,"y",6,"time",1,"delay",1));	
	iTween.MoveTo(down,iTween.Hash("islocal",true,"y",0,"time",1,"oncompletetarget",this.gameObject,"oncomplete","Close","delay",1));	
}



function Fire()
{
	this.audio.PlayOneShot(fireVoice);
	stage=2;
	
	
	if (!positron.gameObject.active)
	{
		this.audio.Play();
		positron.Reset();
		positron.duration=5;
	}
}