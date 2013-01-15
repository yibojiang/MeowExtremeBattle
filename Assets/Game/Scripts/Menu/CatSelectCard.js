#pragma strict

var type:WeaponType;
var btn:CustomButton;
var ready:ReadyMenu;


var selected:boolean;

var graphics:exSprite;

function Start () {
	btn.releaseFunc=Select;
	if (ready.wm.weapons[type].equip)
	{
		selected=true;
	}
	else
	{
		selected=false;
	}
}

function Select()
{
	if (!selected)
	{
		selected=true;
		ready.wm.weapons[type].equip=true;
	}
	else
	{
		selected=false;
		ready.wm.weapons[type].equip=false;
	}
	ready.UpdateCount();
	
	
	
	
	
}

function Update () {
	
	if (selected)
	{
		graphics.color=Color.white;
	}
	else
	{
		graphics.color=Color.gray;
	}
}