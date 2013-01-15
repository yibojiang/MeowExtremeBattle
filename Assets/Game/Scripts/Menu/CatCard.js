#pragma strict

var type:WeaponType;
var btn:CustomButton;
var cm:CatManager;



function Awake()
{
	btn=this.GetComponent(CustomButton) as CustomButton;
}

function Start () {
	btn.releaseFunc=ShowDetail;
	
}


function ShowDetail()
{
	cm.ShowDetail(type);
}

function Update () {

}