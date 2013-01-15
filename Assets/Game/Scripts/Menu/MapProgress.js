#pragma strict

var start:Transform;
var end:Transform;

var mapStart:Transform;
var mapEnd:Transform;

var player:Transform;
var marker:Transform;

var progress:float;

function Start () {

}

function Update () {
	progress=(player.position.x-start.position.x)/ (end.position.x-start.position.x);
	marker.position.x=Mathf.Lerp(mapStart.position.x,mapEnd.position.x,progress);
}