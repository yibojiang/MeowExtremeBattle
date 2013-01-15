#pragma strict

var backBtn:CustomButton;

var readyMenu:GameObject;

var gm:GameManager;




var battleBtn:CustomButton;


var wm:WeaponManager;

var max:int=6;

var countText:exSpriteFont;

var cameraFade:CameraFade;

var am:AudioManager;
var list:ScrollList;
function Start () {
	battleBtn.releaseFunc=GameStart;
	backBtn.releaseFunc=GoBack;

}

function UpdateCount()
{
	var count:int=0;
	for (var i:int=0;i<wm.weapons.Length;i++)
	{
		if (wm.weapons[i].equip)
		{
			count++;
		}
	}
	countText.text=count+"/"+max;
	
	if (count==max)
	{
		countText.botColor=Color.green;
		countText.topColor=countText.botColor;
		battleBtn.SetEnabled(true);
	}
	else if (count<max)
	{
		countText.botColor=Color.white;
		countText.topColor=countText.botColor;
		battleBtn.SetEnabled(false);
	}
	else
	{
		countText.botColor=Color.red;
		countText.topColor=countText.botColor;
		battleBtn.SetEnabled(false);
	}
}

function GameStart()
{
	var j:int=0;
	for (var i:int=0;i<wm.weapons.Length;i++)
	{
		if (wm.weapons[i].equip)
		{
			wm.equipedWeapon[j]=wm.weapons[i];
			j++;
		}
	}
	
	list.Reset();
	if (gm.bgFade!=null)
	{
		gm.bgFade.Hide();
	}
	iTween.Stop(readyMenu);
	iTween.MoveTo(readyMenu,iTween.Hash("time",0.5,"x",-700,"islocal",true));
	
	
	am.audio.PlayOneShot(am.depart);
	cameraFade.SlideTo(gm.gameObject,"GameStart",2.0);
	//gm.GameStart();
}


function GoBack()
{
	list.Reset();
	am.audio.PlayOneShot(am.menuPush);
	if (gm.bgFade!=null)
	{
		gm.bgFade.Hide();
	}
	iTween.Stop(readyMenu);
	iTween.MoveTo(readyMenu,iTween.Hash("time",0.5,"x",-700,"islocal",true));
}

function Update () {

}