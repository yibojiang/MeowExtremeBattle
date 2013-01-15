#pragma strict


var data:Database;


function Awake()
{

}

function Start () {
	
}

function Update () {

}

function SaveComponentsData()
{
	var prefix:String="Components";
	var i:int;
	PlayerPrefs.SetInt(prefix+"Count",data.coms.Length);
	for (i=0;i<data.coms.Length;i++)
	{
		PlayerPrefs.SetInt(prefix+i+"level",data.coms[i].level);
		PlayerPrefs.SetInt(prefix+i+"id",data.coms[i].id);
		PlayerPrefs.SetString(prefix+i+"name",data.coms[i].name);
		PlayerPrefs.SetInt(prefix+i+"HP",data.coms[i].HP);
		PlayerPrefs.SetInt(prefix+i+"beamDef",data.coms[i].beamDef);
		PlayerPrefs.SetInt(prefix+i+"shellDef",data.coms[i].shellDef);
		PlayerPrefs.SetInt(prefix+i+"explosionDef",data.coms[i].explosionDef);
		
		
		//PlayerPrefs.SetInt(prefix+"maxHP",data.coms[i].maxHP);
		//PlayerPrefs.SetInt(prefix+"maxShellDef",data.coms[i].maxShellDef);
		//PlayerPrefs.SetInt(prefix+"maxBeamDef",data.coms[i].maxBeamDef);
		//PlayerPrefs.SetInt(prefix+"maxExplosionDef",data.coms[i].maxExplosionDef);
		//PlayerPrefs.SetInt(prefix+"part",data.coms[i].part);
	}
}

function LoadComponentsData()
{
	var prefix:String="Components";
	var i:int;
	var count:int=PlayerPrefs.GetInt(prefix+"Count");
	for (i=0;i<count;i++)
	{
		data.coms[i].level=PlayerPrefs.GetInt(prefix+i+"level");
		data.coms[i].id=PlayerPrefs.GetInt(prefix+i+"id");
		data.coms[i].name=PlayerPrefs.GetString(prefix+i+"name");
		data.coms[i].HP=PlayerPrefs.GetInt(prefix+i+"HP");
		data.coms[i].beamDef=PlayerPrefs.GetInt(prefix+i+"beamDef");
		data.coms[i].shellDef=PlayerPrefs.GetInt(prefix+i+"shellDef");
		data.coms[i].explosionDef=PlayerPrefs.GetInt(prefix+i+"explosionDef");
		
	}
}

function SavePlayerData()
{
	var prefix:String="Player";
	var shipsPrefix:String="Ship";
	var i:int;
	
	PlayerPrefs.SetInt(prefix+"curShip",data.player.curShip);
	PlayerPrefs.SetInt(prefix+"exp",data.player.exp);
	PlayerPrefs.SetInt(prefix+"fish",data.player.fish);
	PlayerPrefs.SetInt(prefix+"bestScore",data.player.bestScore);
	PlayerPrefs.SetInt(prefix+shipsPrefix+"Count",data.player.ships.Length);
	for (i=0;i<data.player.ships.Length;i++)
	{
		PlayerPrefs.SetInt(prefix+shipsPrefix+i,data.player.ships[i]);
	}
}



function LoadPlayerData()
{
	var prefix:String="Player";
	var shipsPrefix:String="Ship";
	var i:int;
	
	data.player.curShip=PlayerPrefs.GetInt(prefix+"curShip");
	data.player.exp=PlayerPrefs.GetInt(prefix+"exp");
	data.player.fish=PlayerPrefs.GetInt(prefix+"fish");
	data.player.bestScore=PlayerPrefs.GetInt(prefix+"bestScore");
	var count:int=PlayerPrefs.GetInt(prefix+shipsPrefix+"Count");
	for (i=0;i<count;i++)
	{
		data.player.ships[i]=PlayerPrefs.GetInt(prefix+shipsPrefix+i);
	}

}

function SaveCatData()
{
	var prefix:String="Cat";
	var i:int;
	
	PlayerPrefs.SetInt(prefix+"Count",data.wm.weapons.Length);
	for (i=0;i<data.wm.weapons.Length;i++)
	{
		PlayerPrefs.SetInt(prefix+i+"level",data.wm.weapons[i].level);
		PlayerPrefs.SetInt(prefix+i+"equip",data.wm.weapons[i].equip?1:0);
		
	}
}

function LoadCatData()
{
	var prefix:String="Cat";
	var i:int;
	
	var count=PlayerPrefs.GetInt(prefix+"Count",0);
	
	for (i=0;i<count;i++)
	{
		data.wm.weapons[i].level=PlayerPrefs.GetInt(prefix+i+"level");
		var equip:int=PlayerPrefs.GetInt(prefix+i+"equip");
		if (equip==1)
		{
			data.wm.weapons[i].equip=true;
		}
		else
		{
			data.wm.weapons[i].equip=false;
		}
		
	}

}

function SaveData()
{
	
	
	SavePlayerData();
	SaveComponentsData();
	SaveCatData();
	PlayerPrefs.SetInt("Saved",1);
	PlayerPrefs.Save();
	Debug.Log("saved");
}

function LoadData()
{
	var saved:int=PlayerPrefs.GetInt("Saved",0);
	if (saved==0)
	{
		return;
	}
	LoadCatData();
	LoadComponentsData();
	LoadPlayerData();
	
}