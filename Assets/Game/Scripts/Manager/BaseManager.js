#pragma strict

var data:Database;


var backBtn:CustomButton;

var gm:GameManager;

var shipMenu:GameObject;
var detail:GameObject;

var headBtn:CustomButton;
var bodyBtn:CustomButton;
var jetBtn:CustomButton;
var wingBtn:CustomButton;

var detailBackBtn:CustomButton;
var upgradeBtn:CustomButton;


var curShip:ShipData;


var HPPoint:exSprite;
var shellPoint:exSprite;
var beamPoint:exSprite;
var explodePoint:exSprite;

var levelText:exSpriteFont;

var totalExpText:exSpriteFont;
var expText:exSpriteFont;


var curcom:ComponentData;

var bgFade:BGFade;


var am:AudioManager;

function Start () {
	backBtn.releaseFunc=GoBack;
	detailBackBtn.releaseFunc=HideDetail;
	
	headBtn.releaseFunc=ShowHeadDetail;
	bodyBtn.releaseFunc=ShowBodyDetail;
	jetBtn.releaseFunc=ShowJetDetail;
	wingBtn.releaseFunc=ShowWingDetail;
	
	upgradeBtn.releaseFunc=Upgrade;
}

function Upgrade()
{
	var exp:int=curcom.baseExp*(1+0.2*curcom.level);
	if (data.player.exp>=exp)
	{
		data.player.exp-=exp;
	}
	else
	{
		return;
	}
	if (curcom.HP<curcom.maxHP)
	{
		curcom.HP++;
	}
	
	if (curcom.shellDef<curcom.maxShellDef)
	{
		curcom.shellDef++;
	}
	
	if (curcom.beamDef<curcom.maxBeamDef)
	{
		curcom.beamDef++;
	}
	
	if (curcom.explosionDef<curcom.maxExplosionDef)
	{
		curcom.explosionDef++;
	}
	
	curcom.level++;
	
	if (curcom.level<curcom.maxLevel )
	{
		am.audio.PlayOneShot(am.upgradeClip);
		levelText.text="Lv."+curcom.level;
	}
	else
	{
		am.audio.PlayOneShot(am.upgradeMaxClip);
		levelText.text="Lv.MAX";
		upgradeBtn.SetEnabled(false);
	}
	
	if (UpdateText())
	{
		//upgradeBtn.SetEnabled(true);
	}
	else
	{
		upgradeBtn.SetEnabled(false);
	}
	
	HPPoint.scale.x=curcom.HP*2.5;
	shellPoint.scale.x=curcom.shellDef*2.5;
	beamPoint.scale.x=curcom.beamDef*2.5;
	explodePoint.scale.x=curcom.explosionDef*2.5;
	
	(HPPoint.GetComponent(FlashBar) as FlashBar).Flash();
	(shellPoint.GetComponent(FlashBar) as FlashBar).Flash();
	(beamPoint.GetComponent(FlashBar) as FlashBar).Flash();
	(explodePoint.GetComponent(FlashBar) as FlashBar).Flash();
	
	
	
	UpdateText();
	
	
	data.Save();
}

function GoBack()
{
	am.audio.PlayOneShot(am.menuPush);
	if (gm.bgFade!=null)
	{
		gm.bgFade.Hide();
	}
	iTween.Stop(shipMenu);
	iTween.MoveTo(shipMenu,iTween.Hash("time",0.5,"x",-700,"islocal",true));
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
	var exp:int=curcom.baseExp*(1+0.2*curcom.level);
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

function ShowDetail()
{
	am.audio.PlayOneShot(am.menuPull);
	
	iTween.Stop(detail);
	iTween.MoveTo(detail,iTween.Hash("time",0.5,"x",0,"islocal",true));
	
	bgFade=gm.cc.ShowFade(detail.transform.position.z+5);
	
	
	
	if (curcom.level<curcom.maxLevel)
	{
		levelText.text="Lv. "+curcom.level;
		upgradeBtn.SetEnabled(true);
	}
	else
	{
		levelText.text="Lv.MAX";
		upgradeBtn.SetEnabled(false);
	}
	
	if (UpdateText())
	{
		//upgradeBtn.SetEnabled(true);
	}
	else
	{
		upgradeBtn.SetEnabled(false);
	}
	
	HPPoint.scale.x=curcom.HP*2.5;
	shellPoint.scale.x=curcom.shellDef*2.5;
	beamPoint.scale.x=curcom.beamDef*2.5;
	explodePoint.scale.x=curcom.explosionDef*2.5;
}

function ShowHeadDetail()
{
	
	curcom=data.GetComByID(curShip.head);
	
	
	
	
	ShowDetail();
}

function ShowBodyDetail()
{
	
	curcom=data.GetComByID(curShip.body);
	
	
	ShowDetail();
}

function ShowJetDetail()
{
	
	curcom=data.GetComByID(curShip.jet);
	

	ShowDetail();
}

function ShowWingDetail()
{
	
	curcom=data.GetComByID(curShip.wing);
	

	ShowDetail();
}



function Update () {

}