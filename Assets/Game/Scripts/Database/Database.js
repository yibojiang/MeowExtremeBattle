#pragma strict
enum ComPart
{
	Wing=0,
	Head=1,
	Body=2,
	Jet=3
	
}

class ShipData
{
	var id:int;
	var name:String;
	var head:int;
	var body:int;
	var jet:int;
	var wing:int;
	
	var shipObj:GameObject;
	var prefab:GameObject;
	
}

class ComponentData
{
	var level:int;
	var maxLevel:int;
	var id:int;
	
	var name:String;
	var HP:int;
	var beamDef:int;
	var shellDef:int;
	var explosionDef:int;
	var slots:int;
	
	var maxHP:int;
	var maxBeamDef:int;
	var maxShellDef:int;
	var maxExplosionDef:int;
	var maxSlots:int;
	
	var part:ComPart;
	
	var baseExp:int;
}

class PlayerData
{
	var curShip:int;
	var ships:int[];
	var exp:int;
	var fish:int;
	var bestScore:int;
}

var ships:ShipData[];
var coms:ComponentData[];
var player:PlayerData;

var pm:ProfileManager;

var wm:WeaponManager;

function GetShipByID(_id:int):ShipData
{
	for (var i:int=0;i<ships.Length;i++)
	{
		if (ships[i].id==_id)
		{
			return ships[i];
		}
	}
	return null;
}


function GetComByID(_id):ComponentData
{
	for (var i:int=0;i<coms.Length;i++)
	{
		if (coms[i].id==_id)
		{
			return coms[i];
		}
	}
	return null;

}

function Save()
{
	pm.SaveData();
}

function Load()
{
	pm.LoadData();
}

function Awake()
{
	Load();
}

function Start () {

}

function Update () {

}