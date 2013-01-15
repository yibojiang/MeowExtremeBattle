#pragma strict


var lift:GameObject;
var data:Database;

var curShipIndex:int;


var prevBtn:CustomButton;

var nextBtn:CustomButton;

var modelText:exSpriteFont;


var liftUp:AudioClip;

var liftDown:AudioClip;

var am:AudioManager;

var spark:ParticleEmitter;


var moving:boolean=false;
function Start () 
{
	GetShipIndex();
	var ship:ShipData=data.GetShipByID(data.player.curShip);
	ship.shipObj.SetActiveRecursively(true);
	
	prevBtn.releaseFunc=SwitchToPrevShip;
	nextBtn.releaseFunc=SwitchToNextShip;
	UpdateShipInfo();
}

function UpdateShipInfo()
{
	var ship:ShipData=data.GetShipByID(data.player.curShip);
	modelText.text=ship.name;
}

function Update () {
	/*
	if (Input.GetKeyDown(KeyCode.L))
	{
		SwitchToNextShip();
	}
	*/
}

function GetShipIndex()
{
	var i:int;
	for (i=0;i<data.player.ships.Length;i++)
	{
		var ship:ShipData=data.GetShipByID(data.player.ships[i]);
		if (ship.id==data.player.curShip)
		{
			curShipIndex=i;
			break;
		}
	}
}

function GetPrevShip()
{
	var ship:ShipData=data.GetShipByID(data.player.curShip);
	ship.shipObj.SetActiveRecursively(false);
	
	curShipIndex--;
	if (curShipIndex<0)
	{
		curShipIndex=0;
	}
	
	data.player.curShip=data.player.ships[curShipIndex];
	UpdateShipInfo();
	data.Save();
}

function GetNextShip()
{
	var ship:ShipData=data.GetShipByID(data.player.curShip);
	ship.shipObj.SetActiveRecursively(false);
	
	curShipIndex++;
	if (curShipIndex>data.player.ships.Length-1)
	{
		curShipIndex=data.player.ships.Length-1;
	}
	
	data.player.curShip=data.player.ships[curShipIndex];
	UpdateShipInfo();
	data.Save();
}

function SwitchToPrevShip()
{
	if (!moving)
	{
		if (curShipIndex-1>=0)
		{
			moving=true;
			iTween.Stop(lift);
			iTween.MoveTo(lift,iTween.Hash("islocal",true,"y",-500,"time",1.0,"oncompletetarget",this.gameObject,"oncomplete","SwitchPrevShip","easetype",iTween.EaseType.easeInOutQuad));
			spark.emit=true;
			am.audio.PlayOneShot(liftDown);
		}
	}
	
}

function SwitchToNextShip()
{
	if (!moving)
	{
		if (curShipIndex+1<=data.player.ships.Length-1)
		{
			moving=true;
			iTween.Stop(lift);
			iTween.MoveTo(lift,iTween.Hash("islocal",true,"y",-500,"time",1.0,"oncompletetarget",this.gameObject,"oncomplete","SwitchNextShip","easetype",iTween.EaseType.easeInOutQuad));
			spark.emit=true;
			am.audio.PlayOneShot(liftDown);
			
		}
	}
}

function FinishMoving()
{
	moving=false;
	spark.emit=false;
}

function SwitchNextShip()
{
	GetNextShip();
	iTween.Stop(lift);
	iTween.MoveTo(lift,iTween.Hash("islocal",true,"y",-75,"time",1.0,"easetype",iTween.EaseType.easeInOutQuad,"oncompletetarget",this.gameObject,"oncomplete","FinishMoving"));
	
	am.audio.PlayOneShot(liftUp);
	
	
	var ship:ShipData=data.GetShipByID(data.player.curShip);
	ship.shipObj.SetActiveRecursively(true);
}

function SwitchPrevShip()
{
	GetPrevShip();
	iTween.Stop(lift);
	iTween.MoveTo(lift,iTween.Hash("islocal",true,"y",-75,"time",1.0,"easetype",iTween.EaseType.easeInOutQuad,"oncompletetarget",this.gameObject,"oncomplete","FinishMoving"));
	am.audio.PlayOneShot(liftUp);
	
	var ship:ShipData=data.GetShipByID(data.player.curShip);
	ship.shipObj.SetActiveRecursively(true);
}