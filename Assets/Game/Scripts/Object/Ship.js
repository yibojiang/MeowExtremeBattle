#pragma strict

var shipComponents:ShipComponent[];

//var positron:PositronGunController;
//var shield:ShieldController;


var fire:ShipSkill;
var shield:ShipSkill;

var explosion:ExplosionGenerator;
var id:int;
var ship:ShipData;
var data:Database;

var fireBtn:CustomButton;
var shieldBtn:CustomButton;

var player:PlayerController;

function Hurt(_damage:int,_type:HurtType):boolean
{
	var hurt:boolean=false;
	
	
	for (var i:int;i<shipComponents.Length;i++)
	{
		if (shipComponents[i].HP>0)
		{
			hurt=true;
			shipComponents[i].Hurt(_damage,_type);
			return hurt;
		}
	}

	return hurt;
	
}

function Heal(_point:int)
{
	
	for (var i:int=shipComponents.Length-1;i>=0;i--)
	{
		if (shipComponents[i].HP<shipComponents[i].maxHP)
		{
			shipComponents[i].HP+=_point;
			
			break;
		}
	}
}


function Awake()
{
	explosion.gameObject.SetActiveRecursively(false);
}

function Start () {
	
	ship=data.GetShipByID(id);
	
	//shieldBtn.tapFunc=shield.OpenShield;
	//fireBtn.tapFunc=positron.Open;
	shield.player=player;
	fire.player=player;
	
	shield.button=shieldBtn;
	fire.button=fireBtn;
	
	shieldBtn.tapFunc=shield.OpenFunc;
	fireBtn.tapFunc=fire.OpenFunc;
	
	
	//shield.player=player;
	//positron.player=player;
}

function Update () {

}

function Die()
{
	if (fire!=null)
	{
		fire.gameObject.SetActiveRecursively(false);
	}
	
	if (shield!=null)
	{
		shield.gameObject.SetActiveRecursively(false);
	}
	explosion.gameObject.SetActiveRecursively(true);
}