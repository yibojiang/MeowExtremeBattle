#pragma strict

var speed:float;
var myTransform:Transform;
var HP:int=1000;
var maxHP:int=1000;

var HPbar:exSprite;

var ent:Entity;


var damageText:GameObject;

var puaseBtn:CustomButton;
var pause:GameObject;

var resumeBtn:CustomButton;



var restartBtn:CustomButton;


var homeBtn:CustomButton;
var homeBtn0:CustomButton;



var target:Transform;

var pm:ProfileManager;
var sm:ScoreManager;
var im:InputManager;

var em:EnemyManager;



var stage:int;


var energy:int;
var maxEnergy:int=6;

var energyBar:exSprite;
var energyCover:exSprite;

var chargeToggle:float;
var chargeInterval:float=5.0;
var chargeBar:exSprite;

var readyColor:Color;
var chargeColor:Color=Color.yellow;

var readySound:AudioClip;

var cc:CameraController;

var data:Database;

var gm:GameManager;

var ship:Ship;

var fireBtn:CustomButton;
var shieldBtn:CustomButton;

var cameraTarget:Transform;

enum Difficulty
{
	Casual,
	Hardcore
}

var difficulty:Difficulty;


function GameStart()
{
	
	cc.FollowPlayer();
	em.alive=true;
	GenerateShip();
	
	
	energyCover.scale.x=(8-maxEnergy)*7.4;
	/*
	var i:int;
	for (i=maxEnergy;i<energyPoints.Length;i++)
	{
		energyPoints[i].SetActiveRecursively(false);
	}
	*/
	energyBar.scale.x=energy*7.4;
}

function GenerateShip()
{
	
	stage=0;
	collider.enabled=true;
	ent.alive=true;
	var curShip:ShipData=data.GetShipByID(data.player.curShip);
	ship=Instantiate(curShip.prefab,myTransform.position,Quaternion.identity).GetComponent(Ship) as Ship;
	ship.transform.parent=myTransform;
	ship.fireBtn=fireBtn;
	ship.shieldBtn=shieldBtn;
	ship.player=this;
	maxHP=0;
	
	ship.shipComponents[ComPart.Wing].com=data.GetComByID(curShip.wing);
	ship.shipComponents[ComPart.Head].com=data.GetComByID(curShip.head);
	ship.shipComponents[ComPart.Body].com=data.GetComByID(curShip.body);
	ship.shipComponents[ComPart.Jet].com=data.GetComByID(curShip.jet);
	
	ship.data=data;
	for (var i:int;i<ship.shipComponents.Length;i++)
	{
		ship.shipComponents[i].maxHP=ship.shipComponents[i].com.HP*500;
		ship.shipComponents[i].beamDef=ship.shipComponents[i].com.beamDef;
		ship.shipComponents[i].shellDef=ship.shipComponents[i].com.shellDef;
		ship.shipComponents[i].explosionDef=ship.shipComponents[i].com.explosionDef;
		
		ship.shipComponents[i].player=this;
		maxHP+=ship.shipComponents[i].maxHP;
	}
	HPbar.scale.x=HP*(220.0/22000);
	ent.velocity.x=speed;
	ent.velocity.y=0;
	
	cc.FollowPlayer();
	
	
}

function OnTriggerEnter (other : Collider)
{
	if (other.gameObject.tag=="Enemy")
	{
		var e:Enemy=other.gameObject.GetComponent(Enemy) as Enemy;
		if (!e.ghost)
		{
			Hurt(e.hitHurt,HurtType.Suicide);
			e.HP=-1;
		}
		
	}
}


function Start()
{
	
	
	
	
}

function AddEnergy(_point:int)
{
	
	energy+=_point;
	energy=Mathf.Clamp(energy,0,maxEnergy);
	energyBar.scale.x=energy*7.4;
}

function ReduceEnergy(_point:int):boolean
{
	if (energy>=_point)
	{
		energy-=_point;
		energyBar.scale.x=energy*7.4;
		return true;
	}
	else
	{
		return false;
	}
	
}



function Shuffle(a:Array)
{
    // Knuth shuffle algorithm :: courtesy of Wikipedia :)
    for (var i:int = 0; i < a.length; i++ )
    {
        var tmp:Object = a[i];
        var j:int  = Random.Range(i, a.length);
        a[i] = a[j];
        a[j] = tmp;
    }

}

function Heal(_point:int)
{
	
	ship.Heal(_point);
}

function Hurt(_damage:int,_type:HurtType)
{
	if (!ship.Hurt(_damage,_type))
	{
		Die();
	}
	
}



function Update () {
	if (Input.GetKeyDown(KeyCode.E))
	{
		AddEnergy(8);
	
	}
	
	if (ship==null)
	{
		return;
	}
	
	if (Input.GetKeyDown(KeyCode.D))
	{
		Die();
	}
	HP=0;
	for (var i:int;i<ship.shipComponents.Length;i++)
	{
		HP+=ship.shipComponents[i].HP;
		
	}
	
	HPbar.scale.x=HP*(220.0/22000);
		
		
	if (HP>=maxHP*0.5)
	{
		HPbar.color=Color.green;
	}
	if (HP<maxHP*0.5)
	{
		HPbar.color=Color.yellow;
	}
	
	if (HP<maxHP*0.2)
	{
		HPbar.color=Color.red;
	}
	
	if (stage==0)
	{
		ent.velocity.y=Mathf.Sin(Time.time)*speed*0.5;
		if (energy<maxEnergy)
		{
			if (chargeToggle<chargeInterval)
			{
				chargeToggle+=Time.deltaTime;
			}
			else
			{
				chargeToggle=0.0;
				AddEnergy(1);
				this.audio.PlayOneShot(readySound);
			}
			energyBar.color=readyColor;
		}
		else
		{
			energyBar.color=Color.Lerp(readyColor,Color.white,Mathf.PingPong(Time.time*2,1));
		}
		chargeBar.scale.x=(chargeToggle/chargeInterval)*100;
		
	}
	else if(stage==1)
	{
		
		ent.velocity.y=-3*speed;
		
		if (ship.explosion==null)
		{
			ReduceEnergy(energy);
			energyBar.scale.x=(chargeToggle/chargeInterval)*100;
			
			
			stage=2;
			
			Destroy(ship.gameObject);
			ent.velocity.y=0;
			ent.velocity.x=0;
			
			GameOver();
		}
	}
	
	
	

}


function Reset()
{
	ent.alive=false;
	collider.enabled=false;
	myTransform.localPosition=Vector3(-113,0,0);
	ent.velocity=Vector3.zero;
	
	
	if (ship!=null)
	{
		
		Destroy(ship.gameObject);
	}
}



function Die()
{
	
	em.alive=false;
	ship.Die();
	
	ent.alive=false;
	this.collider.enabled=false;
	stage=1;
	for (var i:int=0;i<im.equipSlots.Length;i++)
	{
		if (im.equipSlots[i].weaponObj!=null)
		{
			im.equipSlots[i].Die();
		}
		Destroy(im.equipSlots[i].gameObject);
	}
}





function GameOver()
{
	
	ent.velocity=Vector3.zero;
	sm.Save();

	gm.GameOver();
	

}


