#pragma strict

var id:int;
var HP:int;
var maxHP:int=1000;
var HPBar:exSprite;
var parts:exSprite[];
var alive:boolean;

var slots:EquipSlot[];
var player:PlayerController;

var smoke:ParticleEmitter;

var shellDef:int;
var beamDef:int;
var explosionDef:int;

var com:ComponentData;

function Hurt(_damage:int,_type:HurtType):boolean
{

	if (_type==HurtType.Explosion)
	{
		_damage-=_damage*explosionDef*0.05;
	}
	else if (_type==HurtType.Beam)
	{
		_damage-=_damage*beamDef*0.05;
	}
	else if (_type==HurtType.Shell)
	{
		_damage-=_damage*shellDef*0.05;
	}
	
	var i:int;
	for (i=0;i<parts.Length;i++)
	{
		parts[i].color.g=0;
		parts[i].color.b=0;
	}
	
	HP-=_damage;
	if (HP<=0)
	{
		Die();
		return false;
	}
	else
	{
		return true;
	}
}

function Awake()
{	
	
	var coms:Component[]=this.GetComponentsInChildren(EquipSlot);
	slots=new EquipSlot[coms.Length];
	for (var i:int=0;i<slots.Length;i++)
	{
		slots[i]=coms[i] as EquipSlot;
		slots[i].shipComponent=this;
	}
}

function Start () {
	HP=maxHP;
	alive=true;
}

function Die()
{
	if (smoke!=null )
	{
		smoke.emit=true;
	}
	var i:int;
	HP=0;
	for (i=0;i<parts.Length;i++)
	{
		parts[i].color.g=0;
		parts[i].color.b=0;
	}
	
	
	if (player.difficulty==Difficulty.Hardcore)
	{
		for (i=0;i<slots.Length;i++)
		{
			
			if (slots[i].weaponObj!=null)
			{
				slots[i].Die();
				
			}
			slots[i].alive=false;
			//Destroy(slotss[i].gameObject);
		
		}
	}
	alive=false;
}

function Reborn()
{
	if (smoke!=null )
	{
		smoke.emit=false;
	}
	var i:int;
	HP=maxHP;
	alive=true;
	
	for (i=0;i<slots.Length;i++)
	{
		slots[i].alive=true;
		
	}
	//player.shipParts.Add(this);
}




function Update () {
	if (alive)
	{
		if (HP>maxHP)
		{
			HP=maxHP;
		}
		for (var i:int=0;i<parts.Length;i++)
		{
			parts[i].color.r+=5*Time.deltaTime;
			parts[i].color.g+=5*Time.deltaTime;
			parts[i].color.b+=5*Time.deltaTime;
		}
	}
	else 
	{
		if (HP>=maxHP)
		{
			Reborn();
		}
	}
	
}