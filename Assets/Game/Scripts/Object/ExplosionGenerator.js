#pragma strict

var boom:GameObject;
var interval:float=0.6;
var toggle:float;
var count:int=10;
var radius:int=150;
var cameraFade:CameraFade;
var lightening:boolean;
var flash:exSprite;


var explosionSFX:AudioClip;
var bigExplosionSFX:AudioClip;
var am:AudioManager; 
var shake:boolean; 
var cc:CameraController;
function Awake()
{
	cameraFade=Camera.main.GetComponent(CameraFade) as CameraFade;  
	cc=Camera.main.GetComponent(CameraController) as CameraController;
	
	
	am=GameObject.Find("AudioManager").GetComponent(AudioManager) as AudioManager;
}


function Start () {
	if (shake) 
	{
		cc.ShakeCamera(5,interval*count); 
	}
}

function Update () {
	if (count>0)
	{
		if (toggle<interval)
		{
			toggle+=Time.deltaTime;
		}
		else
		{
			
			
			toggle=0;
			if (flash!=null)
			{
				flash.color=Color.black;
			}
			am.audio.PlayOneShot(explosionSFX);
			GenerateBoom();
			count--;
		}
		
		
	}
	else
	{
		if (lightening)
		{
			cameraFade.Lightening(0.5);
		}
		am.audio.PlayOneShot(bigExplosionSFX);
		
		
		Destroy(this.gameObject);
	}
}

function GenerateBoom()
{
	var r:int=Random.Range(0,radius);
	var pos:Vector3;
	var angle:int=Random.Range(0,360);
	pos.x=transform.position.x+r*Mathf.Cos(angle*Mathf.Deg2Rad);
	pos.y=transform.position.y+r*Mathf.Sin(angle*Mathf.Deg2Rad);
	pos.z=transform.position.z;
	Instantiate(boom,pos,Quaternion.identity);
}