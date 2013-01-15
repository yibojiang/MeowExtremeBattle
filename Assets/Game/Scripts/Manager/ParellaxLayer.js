#pragma strict

var speedFactor:float=1.0;
var myTransform:Transform;

var buildings:BuildingLoop[];

function Awake()
{
	myTransform=this.transform;
	var coms=this.GetComponentsInChildren(BuildingLoop);
	buildings=new BuildingLoop[coms.Length];
	for (var i:int=0;i<buildings.Length;i++)
	{
		buildings[i]=coms[i] as BuildingLoop;
	}
}

function Reset()
{
	myTransform.position.x=0;
	for (var i:int=0;i<buildings.Length;i++)
	{
		buildings[i].myTransform.position=buildings[i].initPos;
	}
}

function Start () {

}

function Update () {

}