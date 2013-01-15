#pragma strict

var weak:HurtType;
var maxHP:int=40;
var HP:int;

function Start () {

}

function Hurt(_damage:int,_type:HurtType)
{
	if (weak==_type)
	{
		Explode();
	}

}

function Explode()
{
	Destroy(this.gameObject);
}

function Update () {

}