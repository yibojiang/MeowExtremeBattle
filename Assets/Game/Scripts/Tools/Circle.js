#pragma strict

var num:int=50;

var line:LineRenderer;

var radius:float=10;

var maxRadius:float=300;


var color:Color;




function Awake()
{

	color=Color(1,1,1,1);
	//radius=0;
	
	
	
	line.SetVertexCount(num);

}


function Start()
{

	
	//color.a=1-radius/maxRadius;
	line.SetColors(color,color);
	
	var interval:float=2*Mathf.PI/(num-1);
	var t:float=0;
	for (var i:int=0;i<num;i++)
	{
		
		//bezier.AddPoint(Vector3(radius*Mathf.Cos(t),radius*Mathf.Sin(t),0));
		
		line.SetPosition(i,Vector3(radius*Mathf.Cos(t),radius*Mathf.Sin(t),0) );
		//line.SetPosition(i,Vector3(myTransform.position.x+radius*((1-t*t)/(1+t*t)),myTransform.position.y+radius*((2*t)/(1+t*t)),0) );
		t+=interval;
	}
	
	line.SetPosition(num-1,Vector3(radius*Mathf.Cos(0),radius*Mathf.Sin(0),0));
}




function Update () {

	//bezier.RemoveAllPoints();
	
	
	
	//bezier.AddPoint(Vector3(radius*Mathf.Cos(0),radius*Mathf.Sin(0),0));
	
}