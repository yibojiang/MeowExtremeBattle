#pragma strict

var speed:float=300;
var myTransform:Transform;
var life:float=0.0;
var lifeTime:float=1.0;

var alive:boolean;
var damage:int=10;

var flag:WeaponFlag;
var ent:Entity;

var toDestroy:boolean;



function Awake()
{
	myTransform=this.transform;
	alive=false;
	ent=GetComponent(Entity) as Entity;
}

function Start () {

}


function OnTriggerEnter (other : Collider)
{
//	Debug.Log("hit");
	if (flag==WeaponFlag.Player)
	{
		if (other.gameObject.tag=="Enemy")
		{
			var e:Enemy=other.gameObject.GetComponent(Enemy) as Enemy;
			e.Hurt(damage,HurtType.Shell);
			alive=false;
				
		}
	}
	
	if (flag==WeaponFlag.Enemy)
	{
		if (other.gameObject.tag=="Player")
		{
			var p:PlayerController=other.gameObject.GetComponent(PlayerController) as PlayerController;
			p.Hurt(damage,HurtType.Shell);
			alive=false;
		}
		/*
		if (other.gameObject.tag=="ShellShield")
		{
			var protection:Protection=other.gameObject.GetComponent(Protection) as Protection;
			protection.Hurt(damage,HurtType.Shell);
			alive=false;
		}
		*/
	}
}


function Reset(t:Transform)
{
	this.gameObject.SetActiveRecursively(true);
	life=0;
	alive=true;
	myTransform.position=t.position;
	myTransform.rotation=t.rotation;
}

function Update () {
	if (!alive)
	{
		if (toDestroy)
		{
			GameObject.Destroy(this.gameObject);
		}
		else
		{
			this.gameObject.SetActiveRecursively(false);
		}
	}
	else
	{
		if (life<lifeTime)
		{
			life+=Time.deltaTime;
		}
		else
		{
			life=0;
			alive=false;
		}
		ent.velocity=myTransform.TransformDirection(Vector3.up).normalized*speed;
		//myTransform.position+=myTransform.TransformDirection(Vector3.up).normalized*speed;
	}
	
	//myTransform.localPosition.y+=speed*Time.deltaTime;
}