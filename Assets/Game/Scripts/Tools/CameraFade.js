var whiteTexture:Texture2D;
var blackTexture:Texture2D;

var blackMask:GameObject;
function Awake()
{
	whiteTexture=iTween.CameraTexture(Color.white);
	blackTexture=iTween.CameraTexture(Color.black);
 	iTween.CameraFadeAdd();
	//iTween.CameraFadeTo(1,0);
	//iTween.CameraFadeTo(1,0);
	iTween.CameraFadeFrom(1,1);
	
}

function Lightening(_time:float)
{
	iTween.CameraFadeSwap(whiteTexture);
	iTween.CameraFadeTo(iTween.Hash("amount",1,"time",_time,"ignoretimescale",true,"oncompletetarget",this.gameObject,"oncomplete","LighteningOver") );
}

function LighteningOver()
{
	iTween.CameraFadeTo(iTween.Hash("amount",0,"time",1,"ignoretimescale",true));
	
}

function FadeTo(_completeTarget:GameObject,_function:String)
{
	iTween.CameraFadeSwap(blackTexture);
	iTween.CameraFadeTo(iTween.Hash("amount",1,"time",0.5,"ignoretimescale",true,"oncompletetarget",this.gameObject,"oncomplete","FadeIn","oncompleteparams",iTween.Hash("target",_completeTarget,"function",_function)) );
}

function FadeTo(_completeTarget:GameObject,_function:String,_time:float)
{
	iTween.CameraFadeSwap(blackTexture);
	iTween.CameraFadeTo(iTween.Hash("amount",1,"time",_time,"ignoretimescale",true,"oncompletetarget",this.gameObject,"oncomplete","FadeIn","oncompleteparams",iTween.Hash("target",_completeTarget,"function",_function)) );
}

function FadeIn(_params:Hashtable)
{
	var _completeTarget:GameObject;
	var _function:String;
	_completeTarget=_params["target"];
	_function=_params["function"];
	_completeTarget.SendMessage(_function);
	iTween.CameraFadeTo(iTween.Hash("amount",0,"time",0.5,"ignoretimescale",true));
}

function SlideIn(_params:Hashtable)
{
	var _completeTarget:GameObject;
	var _function:String;
	var _time:float=1.0;
	_completeTarget=_params["target"];
	_function=_params["function"];
	_time=_params["time"];
	_completeTarget.SendMessage(_function);
	yield WaitForSeconds(0.5);
	iTween.MoveTo(blackMask,iTween.Hash("islocal",true,"time",_time,"x",-1000,"ignoretimescale",true));
}

function SlideTo(_completeTarget:GameObject,_function:String)
{
	blackMask.transform.localPosition.x=1000;
	iTween.MoveTo(blackMask,iTween.Hash("islocal",true,"time",1,"x",0,"ignoretimescale",true,"oncompletetarget",this.gameObject,"oncomplete","SlideIn","oncompleteparams",iTween.Hash("target",_completeTarget,"function",_function,"time",1.0)) );

}

function SlideTo(_completeTarget:GameObject,_function:String,_time:float)
{
	blackMask.transform.localPosition.x=1000;
	iTween.MoveTo(blackMask,iTween.Hash("islocal",true,"time",_time,"x",0,"ignoretimescale",true,"oncompletetarget",this.gameObject,"oncomplete","SlideIn","oncompleteparams",iTween.Hash("target",_completeTarget,"function",_function,"time",_time)) );

}
function Update () 
{

}