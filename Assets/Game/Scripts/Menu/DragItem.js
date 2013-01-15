#pragma strict
var layerMask:int;
var ray : Ray;
var hit:RaycastHit;
var stage:int;//0-normal 1-draging


var tapFunc:Function;
var releaseFunc:Function;

var hoverFunc:Function;
var normalFunc:Function;

var hover:boolean;
var empty:boolean;
var im:InputManager;

var dragGraphics:DragCat;
function Awake()
{
	im=GameObject.Find("InputManager").GetComponent(InputManager) as InputManager;
}

function Start () {

}

function Update () {
	if (hover)
	{
		if (hoverFunc!=null)
		{
			hoverFunc();
		}
	}
	else
	{
		if (normalFunc!=null)
		{
			normalFunc();	
		}
	}
	hover=false;
	
	if (stage==0)
	{
		
	}
	else if (stage==1)
	{
		hover=true;
		if (Input.GetMouseButton(0))
		{
			ray = Camera.main.ScreenPointToRay(Input.mousePosition);
			if (dragGraphics!=null)
			{
				if (dragGraphics.drag)
				{
					dragGraphics.transform.position=ray.origin;
				}
			}
			
	    	layerMask = 1 << 8;
	    	Debug.DrawRay(ray.origin, ray.direction * 500, Color.red);
	    	if (Physics.Raycast(ray,hit,1000.0,layerMask))
		    {
	    		if ( hit.collider.tag == "DragItem" )
		    	{
		    		var drag:DragItem=hit.collider.gameObject.GetComponent(DragItem) as DragItem;
		    		drag.hover=true;
		    	}
			}		
		}
		else
		{
			Release();
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
		//Debug.Log("Tap");
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
		//Debug.Log("Release");
	}
	stage=0;
	
}