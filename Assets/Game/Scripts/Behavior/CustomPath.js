#pragma strict

var path:CollisionLine;

var curIndex:int=1;

var ent:Entity;

var enemy:Enemy;

var myTransform:Transform;
var startPos:Vector3;

var bornTransform:Transform;

var offset:Vector3=Vector3(-330,-20,0);
function Awake()
{
	ent=GetComponent(Entity) as Entity;
	enemy=GetComponent(Enemy) as Enemy;
	myTransform=this.transform;
	
	
	
}

function Start () {
	bornTransform=path.gameObject.transform.parent;
	startPos=myTransform.position-bornTransform.position;
	
}

function Update () {
	if (curIndex<path.nodes.Count)
	{
		//var dir:Vector3=path.nodes[curIndex]+offset+startPos+bornTransform.position-myTransform.position;
		var dir:Vector3=path.nodes[curIndex]+offset+startPos-myTransform.localPosition;
		
		if (dir.sqrMagnitude>10)
		{
			ent.velocity=dir.normalized*enemy.speed;
		}
		else
		{
			curIndex++;
		}
	}
}