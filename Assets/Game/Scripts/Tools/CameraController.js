#pragma strict


var target:Transform;


var myTransform:Transform;


var tc:TimerController;


var layers:ParellaxLayer[];

var playerTarget:Transform;

var bgfade:GameObject;

enum Menu
{
	Game,
	Base,
}

var menuPos:Transform[];


function ShowFade(_z:float):BGFade
{
	var fade:BGFade=Instantiate(bgfade,myTransform.position,Quaternion.identity).GetComponent(BGFade);
	fade.Show(_z);
	return fade;
}

function Reset()
{
	target=null;
	iTween.Stop(this.gameObject);
}


function MoveToMenu(_menu:Menu)
{
	myTransform.position.x=menuPos[_menu].position.x;
	myTransform.position.y=menuPos[_menu].position.y;

}


function FollowPlayer()
{
	myTransform.position.x=playerTarget.position.x;
	
	target=playerTarget;
}

function Awake()
{
	
	
	var layersObjs:GameObject[]=GameObject.FindGameObjectsWithTag("ParellaxLayer");
	layers=new ParellaxLayer[layersObjs.Length];
	for (var i:int=0;i<layersObjs.Length;i++)
	{
		layers[i]=layersObjs[i].GetComponent(ParellaxLayer) as ParellaxLayer;
	}
}

function Start () 
{
	
}


function SlowMotion(_target:Transform,_duration:float,_scale:float)
{
	target=null;
	iTween.MoveTo(this.gameObject,iTween.Hash("x",_target.transform.position.x,"y",_target.transform.position.y,"z",myTransform.position.z*_scale,"time",0.8,"ignoretimescale",true,"easetype",iTween.EaseType.easeInQuad));
	yield WaitForSeconds(1.5);
	
	tc.SetSlowTime(0.5,_duration);
	tc.AddTimer(_duration,this.gameObject,"ReturnToPlayer",true);
}


function ShakeCamera(_strength:float,_duration:float)
{
	iTween.ShakePosition(this.transform.parent.gameObject,iTween.Hash("islocal",true,"time",_duration,"x",_strength,"y",_strength));
}


function ResetLayers()
{
	for (var i:int=0;i<layers.Length;i++)
	{
		//layers[i].myTransform.position.x+=xOffset*(1-layers[i].speedFactor);
		layers[i].Reset();
	}
}




function LateUpdate () {
	
	if (target!=null)
	{
		var xOffset:float=(target.position.x-myTransform.position.x)*2*Time.deltaTime;
		var yOffset:float=(target.position.y-myTransform.position.y)*2*Time.deltaTime;
		
		myTransform.position.x+=xOffset;
		
		//myTransform.position.y+=yOffset;
		
		for (var i:int=0;i<layers.Length;i++)
		{
			layers[i].myTransform.position.x+=xOffset*(1-layers[i].speedFactor);
			//layers[i].myTransform.position.y+=yOffset*(1-layers[i].speedFactor);
		}	
	}
}