#pragma strict

var btn:CustomButton;
var target:Transform;

var touched:boolean;

var touchPos:Vector3;

var left:float;
var right:float;

function Start () {

}

function Update () {
	if (btn.stage==1)
	{
		//Debug.Log(Time.time);
		if (Input.touchCount>0)
		{
			var offset:float=Input.GetTouch(0).deltaPosition.x*0.2;
			
			target.position.x+=offset;
		}
		
		
		if ( Input.GetMouseButtonUp(0) )
		{
			touched=false;
		}
		
		if ( Input.GetMouseButtonDown(0) )
		{
			
			touched=true;
			touchPos=Input.mousePosition;
		}
		else 
		{
			if (touched)
			{
				//Debug.Log(Time.time);
				
				//var dir:float=(Input.mousePosition.x-touchPos.x)*0.3;
				
				//dir=Mathf.Clamp(dir,-5,5);
				
				offset=(Input.mousePosition.x-touchPos.x)*Time.deltaTime*30;
				
				target.position.x+=offset;
				
				
				touchPos= Input.mousePosition;
				
				
			}
			
		}
		
		target.localPosition.x=Mathf.Clamp(target.localPosition.x,left,right);
	}
	
}

function Reset()
{
	target.localPosition.x=left;
}