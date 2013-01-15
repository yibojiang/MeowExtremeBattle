#pragma strict

var layerMask:int;
var ray : Ray;
var hit:RaycastHit;


var tapFunc:Function;
var releaseFunc:Function;

var stage:int;


var alive:boolean=true;

var disableColor:Color=Color.gray;
var graphics:exSprite;
var normalColor:Color;

var enableFunc:Function;
var disableFunc:Function;


var timeLimit:boolean=false;
var interval:float=0.5;
var toggle:float;


function Start () {
	if (graphics!=null)
	{
		normalColor=graphics.color;
	}
}

function Update () {

	if (!alive)
	{
		return;
	}
	if (stage==1)//hover
	{
		
		if (Input.GetMouseButton(0))
		{
			if (timeLimit)
			{
				if (toggle<interval)
				{
					toggle+=Time.deltaTime;
				}
				else
				{
					toggle=0;
					MoveOutArea();
				}
			}
		}
		else
		{
			toggle=0;
			ray = Camera.main.ScreenPointToRay(Input.mousePosition);
	    	layerMask = 1 << 8;
	    	//Debug.DrawRay(ray.origin, ray.direction * 500, Color.red);
	    	if (Physics.Raycast(ray,hit,1000.0,layerMask))
		    {
		    	if (hit.collider.gameObject==this.gameObject)
	    		{
	    			Release();
	    		}
	    		else
	    		{
	    			MoveOutArea();
	    		}
			}
			else
			{
				MoveOutArea();
			}
			
		}
	}
}

function Tap()
{
	

	if (tapFunc!=null)
	{
		tapFunc();
	}
	else
	{
	
	}
	stage=1;
}

function MoveOutArea()
{
	stage=0;
	
}

function SetEnabled(_alive:boolean)
{
	alive=_alive;
	
	if (!alive)
	{
		if (disableFunc!=null)
		{
			disableFunc();
		}
		if (graphics!=null)
		{
			graphics.color=disableColor;
		}
	}
	else
	{
		if (enableFunc!=null)
		{
			enableFunc();
		}
		if (graphics!=null)
		{
			graphics.color=normalColor;
		}
	}
}

function Release()
{
	

	if (releaseFunc!=null)
	{
		releaseFunc();
	}
	else
	{
		
	}
	stage=0;
	
}