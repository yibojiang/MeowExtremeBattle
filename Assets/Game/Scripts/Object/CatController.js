#pragma strict

var levelUpFunc:Function;

var setTargetFunc:Function;

var level:int;
var target:Entity;

var speechBubble:GameObject;
var text:exSpriteFont;


var ent:Entity;


var happyWords:String[];
var sadWords:String[];
var angryWords:String[];
var normalWords:String[];


var happy:int;
var sad:int;
var angry:int;
var normal:int;

var fire:exSpriteAnimation;

function LevelUp(_level:int)
{
	level=_level;
	levelUpFunc();
}

function SetTarget(_target:Entity)
{
	if (_target!=null)
	{
		target=_target;
		setTargetFunc();
	}
}


function Awake()
{
	
	if (speechBubble!=null)
	{
		speechBubble.SetActiveRecursively(false);
	}
	
	if (fire!=null)
	{
		fire.gameObject.SetActiveRecursively(false);
	}
}

function Start()
{
	happy=Random.Range(0,happyWords.Length);
	sad=Random.Range(0,sadWords.Length);
	angry=Random.Range(0,angryWords.Length);
	normal=Random.Range(0,normalWords.Length);
	
}

function Update()
{
	if (speechBubble!=null)
	{
		
		if (ent.lifeTimer>ent.lifeTime*0.05 && ent.lifeTimer<ent.lifeTime*0.1)
		{
			speechBubble.SetActiveRecursively(true);
			
			text.text=happyWords[happy];
		}
		else if (ent.lifeTimer>ent.lifeTime*0.5 && ent.lifeTimer<ent.lifeTime*0.6)
		{
			speechBubble.SetActiveRecursively(true);
			
			text.text=normalWords[normal];
		}
		else if (ent.lifeTimer>ent.lifeTime*0.8 && ent.lifeTimer<ent.lifeTime*0.9)
		{
			speechBubble.SetActiveRecursively(true);
			
			text.text=normalWords[sad];
		}
		else
		{
			speechBubble.SetActiveRecursively(false);
		}
	}
}

function PowerUp()
{
	if (!fire.gameObject.active)
	{
		fire.gameObject.SetActiveRecursively(true);
	}
}

function PowerDown()
{
	if (fire.gameObject.active)
	{
		fire.gameObject.SetActiveRecursively(false);
	}
}