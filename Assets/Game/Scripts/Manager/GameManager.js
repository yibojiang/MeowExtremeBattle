#pragma strict

var data:Database;

var isPaused:boolean=false;

var gameGUI:GameObject;

var menuGUI:GameObject;


var resultMenu:ResultMenu;
var pauseMenu:GameObject;

var restartBtn:CustomButton;
var puaseBtn:CustomButton;
var resumeBtn:CustomButton;
var homeBtn:CustomButton;


var battleBtn:CustomButton;
var shipBtn:CustomButton;
var catBtn:CustomButton;

var cc:CameraController;
var player:PlayerController;


var GUIParent:Transform;
var im:InputManager;
var em:EnemyManager;
var sm:ScoreManager;
var bm:BaseManager;
var wm:WeaponManager;
var bgm:AudioSource;
var am:AudioManager;

var shipMenu:GameObject;

var curShip:ShipData;

var ynMenu:YNMenu;

var resultRestartBtn:CustomButton;
var resultHomeBtn:CustomButton;

var bgFade:BGFade;



var catMenu:GameObject;

var readyMenu:ReadyMenu;

var cameraFade:CameraFade;

function GameStart()
{
	am.audio.PlayOneShot(am.depart2);
	gameGUI.SetActiveRecursively(true);
	pauseMenu.SetActiveRecursively(false);
	resultMenu.gameObject.SetActiveRecursively(false);
	ynMenu.gameObject.SetActiveRecursively(false);
	cc.MoveToMenu(Menu.Game);
	cc.ResetLayers();
	cc.FollowPlayer();
	
	gameGUI.transform.parent=cc.transform;
	gameGUI.transform.localPosition.x=0;
	gameGUI.transform.localPosition.y=0;
	
	wm.GameStart();
	player.GameStart();
	im.GameStart();
	
	sm.Reset();
	em.Reset();
	bgm.Play();
}

function Start () {
	curShip=data.GetShipByID(data.player.curShip);
	
	
	restartBtn.releaseFunc=ShowRestart;
	puaseBtn.releaseFunc=GamePause;
	
	resumeBtn.releaseFunc=GameResume;
	homeBtn.releaseFunc=ShowGotoBase;
	
	resultRestartBtn.releaseFunc=SlideToRestart;
	resultHomeBtn.releaseFunc=SlideToGotobase;

	
	battleBtn.releaseFunc=GameReady;
	shipBtn.releaseFunc=GotoShip;
	catBtn.releaseFunc=GotoCat;
}

function GameReady()
{
	am.audio.PlayOneShot(am.menuPull);
	readyMenu.UpdateCount();
	bgFade=cc.ShowFade(readyMenu.transform.position.z+5);
	
	iTween.Stop(readyMenu.gameObject);
	iTween.MoveTo(readyMenu.gameObject,iTween.Hash("time",0.5,"x",0,"islocal",true));
}

function GotoCat()
{
	
	am.audio.PlayOneShot(am.menuPull);
	bgFade=cc.ShowFade(catMenu.transform.position.z+5);
	
	iTween.Stop(catMenu);
	iTween.MoveTo(catMenu,iTween.Hash("time",0.5,"x",0,"islocal",true));
}

function Update () {

}



function GotoShip()
{
	am.audio.PlayOneShot(am.menuPull);
	bgFade=cc.ShowFade(shipMenu.transform.position.z+5);
	curShip=data.GetShipByID(data.player.curShip);
	bm.curShip=curShip;
	
	iTween.Stop(shipMenu);
	iTween.MoveTo(shipMenu,iTween.Hash("time",0.5,"x",0,"islocal",true));
}


function GoBackPause()
{
	pauseMenu.SetActiveRecursively(true);
	ynMenu.gameObject.SetActiveRecursively(false);
}

function ShowRestart()
{
	pauseMenu.SetActiveRecursively(false);
	ynMenu.gameObject.SetActiveRecursively(true);
	ynMenu.text.text="Are you sure to restart ?";
	ynMenu.noBtn.releaseFunc=GoBackPause;
	ynMenu.yesBtn.releaseFunc=SlideToRestart;
}

function ShowGotoBase()
{
	pauseMenu.SetActiveRecursively(false);
	ynMenu.gameObject.SetActiveRecursively(true);
	ynMenu.text.text="Are you sure to quit battle ?";
	ynMenu.noBtn.releaseFunc=GoBackPause;
	ynMenu.yesBtn.releaseFunc=SlideToGotobase;
}

function SlideToRestart()
{
	am.audio.PlayOneShot(am.depart);
	cameraFade.SlideTo(this.gameObject,"Restart",2);
}

function SlideToGotobase()
{
	am.audio.PlayOneShot(am.depart);
	cameraFade.SlideTo(this.gameObject,"GotoBase",2);
}

function Restart()
{
	am.audio.PlayOneShot(am.depart2);
	cc.Reset();
	player.Reset();
	
	sm.Reset();
	em.Reset();
	wm.GameStart();
	ynMenu.gameObject.SetActiveRecursively(false);
	resultMenu.gameObject.SetActiveRecursively(false);
	Resources.UnloadUnusedAssets();
	Time.timeScale=1.0;
	cc.ResetLayers();
	player.GameStart();
	
	im.GameStart();
	
	em.Reset();
	bgm.Play();
	
}

function GotoBase()
{
	am.audio.PlayOneShot(am.depart2);
	wm.GameOver();
	cc.Reset();
	player.Reset();
	Time.timeScale=1.0;
	
	gameGUI.SetActiveRecursively(false);
	pauseMenu.SetActiveRecursively(false);
	resultMenu.gameObject.SetActiveRecursively(false);
	Resources.UnloadUnusedAssets();
	
	gameGUI.transform.parent=GUIParent.transform;
	cc.MoveToMenu(Menu.Base);
	cc.ResetLayers();
	
	em.Reset();
	
	bgm.Stop();
}

function GameOver()
{
	//sm.Save();
	//data.Save();
	cc.target=null;
	resultMenu.gameObject.SetActiveRecursively(true);
	resultMenu.Show();
}

function GamePause()
{
	isPaused=true;
	pauseMenu.SetActiveRecursively(true);
	Time.timeScale=0;
}


function GameResume()
{
	isPaused=false;
	pauseMenu.SetActiveRecursively(false);
	Time.timeScale=1;
}