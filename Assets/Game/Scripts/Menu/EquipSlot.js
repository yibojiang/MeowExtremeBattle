#pragma strict

var weapon:Weapon;
var weaponObj:GameObject;
var circle:UICircle;
var drag:DragItem;

var layerMask:int;
var ray : Ray;
var hit:RaycastHit;
var im:InputManager;
var descriptionText:exSpriteFont;

var alive:boolean=true;

var shipComponent:ShipComponent;

var ent:Entity;
var cat:CatController;

function Awake()
{
	im=GameObject.Find("InputManager").GetComponent(InputManager) as InputManager;
	//descriptionText=GameObject.Find("WeaplonValue").GetComponent(exSpriteFont) as exSpriteFont;
	drag=GetComponent(DragItem) as DragItem;
	drag.hoverFunc=Hover;
	drag.normalFunc=Normal;
	drag.tapFunc=Tap;
	drag.releaseFunc=Release;
}

function Normal()
{
	circle.selected=false;
}

function Hover()
{
	circle.selected=true;
}

function Show()
{
	circle.Show();
}

function Hide()
{
	circle.Hide();
}

function Tap()
{
	if (!drag.empty)
	{
		drag.dragGraphics=Instantiate(weapon.dragGraphics,Vector3(0,1000,0),Quaternion.identity).GetComponent(DragCat) as DragCat;
		drag.dragGraphics.drag=true;
		im.ShowAllEquipSlots();
		drag.stage=1;
		//descriptionText.text=weapon.description;
	}
}

function Release()
{
	im.HideAllEquipSlots();
	
	if (drag.empty)
	{
		return;
	}
	
	
	ray = Camera.main.ScreenPointToRay(Input.mousePosition);
	layerMask = 1 << 8;
	//Debug.DrawRay(ray.origin, ray.direction * 500, Color.red);
	
	
	if (Physics.Raycast(ray,hit,1000.0,layerMask))
    {
    	
    	if ( hit.collider.tag == "DragItem" )
    	{
    		if (hit.collider.gameObject!=this.gameObject)
    		{
    			
    		}
    		
    	}
    	
    	if (drag.dragGraphics!=null)
	    {
	    	Destroy(drag.dragGraphics.gameObject);
	    }
    	
    	
    }
    else
	{
		Sell();
		
	}
	
	
	
}
function Update()
{
}

function PowerDown()
{
	if (weapon.type==WeaponType.BarrageLauncher)
	{
		var barrage:BarrageLauncherController=weaponObj.GetComponent(BarrageLauncherController) as BarrageLauncherController;
		barrage.damage*=0.8;
		barrage.explosionDamage*=0.5;
		barrage.barrageCountMax=5;
		barrage.graphics.color=Color.white;
		barrage.powerUp=false;
	}
	else if (weapon.type==WeaponType.BeamGun)
	{
		var beam:BeamGunController=weaponObj.GetComponent(BeamGunController) as BeamGunController;
		beam.damage*=0.5;
		beam.shootInterval*=2;
		beam.graphics.color=Color.white;
		beam.powerUp=false;
	}
	else if (weapon.type==WeaponType.Funnel)
	{
		var funnel:FunnelController=weaponObj.GetComponent(FunnelController) as FunnelController;
		funnel.damage*=0.333;
		funnel.graphics.color=Color.white;
		funnel.powerUp=false;
	}
	else if (weapon.type==WeaponType.MachineGun)
	{
		var machineGun:MachineGunController=weaponObj.GetComponent(MachineGunController) as MachineGunController;
		machineGun.damage*=0.5;
		machineGun.MGshootInterval*=2;
		machineGun.graphics.color=Color.white;
		machineGun.powerUp=false;
	}
	else if (weapon.type==WeaponType.MissleLauncher)
	{
		var missle:MissleLauncherController=weaponObj.GetComponent(MissleLauncherController) as MissleLauncherController;
		missle.damage*=0.5;
		missle.shootInterval*=1.25;
		missle.graphics.color=Color.white;
		missle.powerUp=false;
	}
	else if (weapon.type==WeaponType.RepairRobot)
	{
		var repair:RepairRobotController=weaponObj.GetComponent(RepairRobotController) as RepairRobotController;
		repair.healRate*=0.8;
		repair.graphics.color=Color.white;
		repair.powerUp=false;
	}
	else if (weapon.type==WeaponType.FrozenGun)
	{
		var frozen:FrozenGunController=weaponObj.GetComponent(FrozenGunController) as FrozenGunController;
		frozen.graphics.color=Color.white;
		frozen.fireInterval=frozen.fireInterval*2;
		frozen.powerUp=false;
	}
	else if (weapon.type==WeaponType.LaserGun)
	{
		var laser:LaserGunController=weaponObj.GetComponent(LaserGunController) as LaserGunController;
		laser.graphics.color=Color.white;
		laser.maxDamage=laser.maxDamage*0.5;
		laser.speed=laser.speed*0.5;
		laser.powerUp=false;
	}
	else if (weapon.type==WeaponType.FireGun)
	{
		var fire:FireGunController=weaponObj.GetComponent(FireGunController) as FireGunController;
		fire.graphics.color=Color.white;
		fire.damage=fire.damage*0.5;
		fire.powerUp=false;
	}
}

function PowerUp()
{
	
	var ent:Entity=weaponObj.GetComponent(Entity) as Entity;
	ent.lifeTime=10.0;
	ent.lifeTimer=0.0;
	if (weapon.type==WeaponType.BarrageLauncher)
	{
		var barrage:BarrageLauncherController=weaponObj.GetComponent(BarrageLauncherController) as BarrageLauncherController;
		barrage.damage*=1.25;
		barrage.explosionDamage*=2;
		barrage.barrageCountMax=8;
		//barrage.graphics.color=weapon.color;
		barrage.powerUp=true;
	}
	else if (weapon.type==WeaponType.BeamGun)
	{
		var beam:BeamGunController=weaponObj.GetComponent(BeamGunController) as BeamGunController;
		beam.damage*=2;
		beam.shootInterval*=0.5;
		//beam.graphics.color=weapon.color;
		beam.powerUp=true;
	}
	else if (weapon.type==WeaponType.Funnel)
	{
		var funnel:FunnelController=weaponObj.GetComponent(FunnelController) as FunnelController;
		funnel.damage*=3;
		//funnel.graphics.color=weapon.color;
		funnel.powerUp=true;
	}
	else if (weapon.type==WeaponType.MachineGun)
	{
		var machineGun:MachineGunController=weaponObj.GetComponent(MachineGunController) as MachineGunController;
		machineGun.damage*=2;
		machineGun.MGshootInterval*=0.5;
		//machineGun.graphics.color=weapon.color;
		machineGun.powerUp=true;
	}
	else if (weapon.type==WeaponType.MissleLauncher)
	{
		var missle:MissleLauncherController=weaponObj.GetComponent(MissleLauncherController) as MissleLauncherController;
		missle.damage*=2;
		missle.shootInterval*=0.8;
		//missle.graphics.color=weapon.color;
		missle.powerUp=true;
	}
	else if (weapon.type==WeaponType.RepairRobot)
	{
		var repair:RepairRobotController=weaponObj.GetComponent(RepairRobotController) as RepairRobotController;
		repair.healRate*=1.25;
		//repair.graphics.color=weapon.color;
		repair.powerUp=true;
	}
	else if (weapon.type==WeaponType.FrozenGun)
	{
		var frozen:FrozenGunController=weaponObj.GetComponent(FrozenGunController) as FrozenGunController;
		//frozen.graphics.color=weapon.color;;
		frozen.fireInterval=frozen.fireInterval*0.5;
		frozen.powerUp=true;
	}
	else if (weapon.type==WeaponType.LaserGun)
	{
		var laser:LaserGunController=weaponObj.GetComponent(LaserGunController) as LaserGunController;
		//laser.graphics.color=Color.white;
		laser.maxDamage=laser.maxDamage*2;
		laser.speed=laser.speed*2;
		laser.powerUp=true;
	}
	else if (weapon.type==WeaponType.FireGun)
	{
		var fire:FireGunController=weaponObj.GetComponent(FireGunController) as FireGunController;
		//fire.graphics.color=Color.white;
		fire.damage=fire.damage*2;
		fire.powerUp=true;
	}
}

function Die()
{
	ent.Die();
}

function Sell()
{
	if (weapon==null)
	{
		return;
	}
	im.CheckCombine(weapon.type,-1);
	if (drag.dragGraphics!=null)
    {
    	drag.dragGraphics.drag=false;
    }
	drag.empty=true;
	weapon=null;
	GameObject.Destroy(weaponObj);
}



function Start () {

}