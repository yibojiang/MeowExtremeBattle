#pragma strict

var ent:Entity;

var enemy:Enemy;
function Awake()
{
	ent=GetComponent(Entity) as Entity;
	enemy=GetComponent(Enemy) as Enemy;
}

function Start () {
	ent.velocity.x=-enemy.speed;
}

function Update () {
	ent.velocity.x=-enemy.speed;
	//ent.acceleration.y=Mathf.Sin(Time.time);
	//ent.velocity.x=enemy.speed;
}
