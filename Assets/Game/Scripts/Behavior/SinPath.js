#pragma strict

var ent:Entity;

var enemy:Enemy;
var randomOffset:float;
function Awake()
{
	ent=GetComponent(Entity) as Entity;
	enemy=GetComponent(Enemy) as Enemy;
}

function Start () {
	ent.velocity.x=-enemy.speed;
	randomOffset=Random.value*Mathf.PI;
}

function Update () {
	ent.velocity.y=0.5*Mathf.Sin(randomOffset+Time.time)*enemy.speed;
	ent.velocity.x=-enemy.speed;
	//ent.velocity.x=enemy.speed;
}
