#pragma strict


var bgFade:BGFade;
var gm:GameManager;

var catMenu:GameObject;

var backBtn:CustomButton;

var detail:GameObject;

var detailBackBtn:CustomButton;

var upgradeBtn:CustomButton;
var data:Database;

var curType:WeaponType;

var cardGraphics:exSprite;
var wm:WeaponManager;

var levelBar:exSprite;

var totalExpText:exSpriteFont;
var expText:exSpriteFont;

var nameText:exSpriteFont;

var am:AudioManager;

var list:ScrollList;
function Start () {
	backBtn.releaseFunc=GoBack;
	detailBackBtn.releaseFunc=HideDetail;
	upgradeBtn.releaseFunc=Upgrade;
}



function GoBack()
{
	list.Reset();
	am.audio.PlayOneShot(am.menuPush);
	if (gm.bgFade!=null)
	{
		gm.bgFade.Hide();
	}
	iTween.Stop(catMenu);
	iTween.MoveTo(catMenu,iTween.Hash("time",0.5,"x",-700,"islocal",true));
}

function HideDetail()
{
	am.audio.PlayOneShot(am.menuPush);
	if (bgFade!=null)
	{
		bgFade.Hide();
	}
	iTween.Stop(detail);
	iTween.MoveTo(detail,iTween.Hash("time",0.5,"x",-700,"islocal",true));
}

function UpdateText():boolean
{
	var upgrade:boolean=false;
	var exp:int=wm.weapons[curType].baseExp*(1+0.2*wm.weapons[curType].level);
	if (exp>data.player.exp)
	{
		totalExpText.topColor=Color.red;	
		totalExpText.botColor=totalExpText.topColor;
		upgrade=false;
	}
	else
	{
		upgrade=true;
		totalExpText.topColor=Color.white;	
		totalExpText.botColor=totalExpText.topColor;
	}
	
	expText.text=exp.ToString("n0")+" XP";
	totalExpText.text="TOTAL: "+data.player.exp.ToString("n0")+" XP";
	return upgrade;
}

function Upgrade()
{
	var exp:int=wm.weapons[curType].baseExp*(1+0.2*wm.weapons[curType].level);
	if (data.player.exp>=exp)
	{
		data.player.exp-=exp;
	}
	else
	{
		return;
	}
	
	wm.weapons[curType].level++;
	
	
	
	if (wm.weapons[curType].level>=5)
	{
		am.audio.PlayOneShot(am.upgradeMaxClip);
		upgradeBtn.SetEnabled(false);
	}
	else
	{
		am.audio.PlayOneShot(am.upgradeClip);
		upgradeBtn.SetEnabled(true);
	}
	
	if (UpdateText())
	{
		//upgradeBtn.SetEnabled(true);
	}
	else
	{
		upgradeBtn.SetEnabled(false);
	}
	
	wm.weapons[curType].level=Mathf.Clamp(wm.weapons[curType].level,0,5);
	levelBar.scale.x=wm.weapons[curType].level*10;
	
	(levelBar.GetComponent(FlashBar) as FlashBar).Flash();
	
	data.Save();
}

function ShowDetail(_type:WeaponType)
{
	am.audio.PlayOneShot(am.menuPull);
	
	curType=_type;
	cardGraphics.SetSprite(wm.weapons[curType].graphics.atlas,wm.weapons[curType].graphics.index,true);
	levelBar.scale.x=wm.weapons[curType].level*10;
	
	
	nameText.text="Name: "+wm.weapons[curType].name;
	if (wm.weapons[curType].level>=5)
	{
		upgradeBtn.SetEnabled(false);
	}
	else
	{
		upgradeBtn.SetEnabled(true);
	}
	
	if (UpdateText())
	{
		//upgradeBtn.SetEnabled(true);
	}
	else
	{
		upgradeBtn.SetEnabled(false);
	}
	
	iTween.Stop(detail);
	iTween.MoveTo(detail,iTween.Hash("time",0.5,"x",0,"islocal",true));
	
	bgFade=gm.cc.ShowFade(detail.transform.position.z+5);
}

function Update () {
	/*
	if (Input.GetKeyDown(KeyCode.S))
	{
		ShowDetail();
	}
	
	if (Input.GetKeyDown(KeyCode.H))
	{
		HideDetail();
	}
	*/
}