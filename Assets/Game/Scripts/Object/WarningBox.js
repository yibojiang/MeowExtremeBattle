#pragma strict

var enemyGraphics:exSprite[];
var enemyType:EnemyType;
var alertbox:exSprite;
var alertText:exSpriteFont;
var toggle:float;
var interval:float=5;
var stage:int=0;
var flashToggle:float;
var flashInterval:float;
function Awake()
{
	HideAll();
	alertbox.renderer.enabled=false;
	alertText.renderer.enabled=false;
}

function Start () {

}

function Show(_type:EnemyType)
{
	enemyType=_type;
	this.audio.PlayOneShot(this.audio.clip);
	alertbox.renderer.enabled=true;
	alertbox.scale.x=0;
	alertbox.scale.y=0.5;
	
	stage=1;
}

function HideAll()
{
	for (var i:int=0;i<enemyGraphics.Length;i++)
	{
		enemyGraphics[i].renderer.enabled=false;
	}
	
}

function Reset()
{	
	HideAll();
	alertbox.scale.y=0;
	alertText.renderer.enabled=false;
	alertbox.renderer.enabled=false;
	stage=0;
}

function ShowGraphics()
{
	for (var i:int=0;i<enemyGraphics.Length;i++)
	{
		if (i==enemyType)
		{
			enemyGraphics[i].renderer.enabled=true;
		}
		
	}
	
}

function Update () {
	/*
	if (Input.GetKeyDown(KeyCode.S))
	{
		Show(EnemyType.EnemyBoss);
	}
	*/
	if (stage==1)
	{
		if (alertbox.scale.x<32)
		{
			alertbox.scale.x+=128*Time.deltaTime;
		}
		else
		{
			stage=2;
		}
	}
	else if (stage==2)
	{
		if (alertbox.scale.y<32)
		{
			alertbox.scale.y+=128*Time.deltaTime;
		}
		else
		{
			stage=3;
			ShowGraphics();
		}
	}
	else if (stage==3)
	{
		if (flashToggle<flashInterval)
		{
			flashToggle+=Time.deltaTime;
		}
		else
		{
			flashToggle=0;
			alertText.renderer.enabled=!alertText.renderer.enabled;
		}
		
		if (toggle<interval)
		{
			toggle+=Time.deltaTime;
		}
		else
		{
			toggle=0;
			stage=4;
			HideAll();
			alertText.renderer.enabled=false;
		}
	}
	else if (stage==4)
	{
		if (alertbox.scale.y>0)
		{
			alertbox.scale.y-=128*Time.deltaTime;
		}
		else
		{
			alertbox.scale.y=0;
			alertbox.renderer.enabled=false;
			stage=0;
			
		}
	}
	
	
	//alertbox.color.a=Mathf.Abs(Mathf.Sin(10*Time.time));
}

