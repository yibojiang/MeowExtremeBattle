private var lastRealTime:float;
static var realDeltaTime:float;



function SetSlowTime(_timeScale:float,_duration:float)
{
	Time.timeScale=_timeScale;
	AddTimer(_duration,this.gameObject,"ResumeTimeScale",true);
}

function ResumeTimeScale()
{
	Time.timeScale=1;
}


function Awake()
{
	lastRealTime = Time.realtimeSinceStartup;
} 

function AddTimer(_time:float,_target:GameObject,_functionName:String,_params:Hashtable,_ignoreTimeScale:boolean)
{
	var timer:Timer;
	timer=this.gameObject.AddComponent("Timer");
	timer.SetTimer(_time,_target,_functionName,_params,_ignoreTimeScale);
}

function AddTimer(_time:float,_target:GameObject,_functionName:String,_params:Hashtable)
{
	var timer:Timer;
	timer=this.gameObject.AddComponent("Timer");
	timer.SetTimer(_time,_target,_functionName,_params);
}

function AddTimer(_time:float,_target:GameObject,_functionName:String)
{
	var timer:Timer;
	timer=this.gameObject.AddComponent("Timer");
	timer.SetTimer(_time,_target,_functionName);
}

function AddTimer(_time:float,_target:GameObject,_functionName:String,_ignoreTimeScale:boolean)
{
	var timer:Timer;
	timer=this.gameObject.AddComponent("Timer");
	timer.SetTimer(_time,_target,_functionName,_ignoreTimeScale);
}

function Update () 
{
	realDeltaTime=Time.realtimeSinceStartup - lastRealTime;
	lastRealTime=Time.realtimeSinceStartup;
}