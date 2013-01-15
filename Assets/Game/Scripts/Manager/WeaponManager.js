#pragma strict
class Weapon
{
	var name:String;
	var prefab:GameObject;
	var level:int;
	var color:Color;
	var graphics:exSprite;
	var dragGraphics:GameObject;
	var type:WeaponType;
	var description:String;
	var baseExp:int;
	var equip:boolean;
	
}


enum WeaponType
{
	BarrageLauncher,
	BeamGun,
	Funnel,
	MachineGun,
	MissleLauncher,
	RepairRobot,
	FrozenGun,
	LaserGun,
	FireGun
}

var weapons:Weapon[];
var equipedWeapon:Weapon[];

var slots:WeaponSlot[];

var test:WeaponType;
var testing:boolean;

function Start () {
	weapons[WeaponType.MachineGun].description="Meowchine Gun\nLow\nFastest\nShell\nNone";
	weapons[WeaponType.BeamGun].description="Dark Meow Cry\nHigh\nSlow\nBeam\nStright";
	weapons[WeaponType.Funnel].description="Kitty Robot Station\nLow\nFast\nBeam\nNone";
	weapons[WeaponType.BarrageLauncher].description="Fish Bone Launcher\nHigh\nVery Slow\nBarrage\nGood";
	weapons[WeaponType.MissleLauncher].description="Fish Launcher\nHigh\nSlow\nMissle\nExcellent";
	weapons[WeaponType.RepairRobot].description="Meow Engineer\nNone\nNone\nRepair\nNone";
	weapons[WeaponType.FrozenGun].description="Meow Frozen Gun\nNone\nNone\nSlow down motion.\nNone";
}

function GameStart()
{
	for (var i:int=0;i<slots.Length;i++)
	{
		slots[i].Empty();
		slots[i].alive=true;
	}
}

function GameOver()
{
	for (var i:int=0;i<slots.Length;i++)
	{
		slots[i].Empty();
		slots[i].alive=false;
	}
}

function Update () {

}