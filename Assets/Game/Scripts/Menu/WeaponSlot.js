#pragma strict
var drag:DragItem;
var layerMask:int;
var ray : Ray;
var hit:RaycastHit;

var weapon:Weapon;


var toggle:float;
var interval:float=5.0;

var wm:WeaponManager;
var graphics:exSprite;

var im:InputManager;

var data:Database;

var descriptionText:exSpriteFont;

var alive:boolean;

function Awake()
{
	wm=GameObject.Find("WeaponManager").GetComponent(WeaponManager) as WeaponManager;
	im=GameObject.Find("InputManager").GetComponent(InputManager) as InputManager;
	//descriptionText=GameObject.Find("WeaplonValue").GetComponent(exSpriteFont) as exSpriteFont;
	drag=GetComponent(DragItem) as DragItem;
	drag.tapFunc=Tap;
	drag.releaseFunc=Release;
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
    		var equip:EquipSlot=hit.collider.gameObject.GetComponent(EquipSlot) as EquipSlot;
    		if (equip!=null)
    		{
    			if (equip.alive || (!equip.alive && weapon.type==WeaponType.RepairRobot ) )
				{
	    			if (equip.weaponObj!=null)
	    			{
						equip.Die();
					}
					
	    			var weaponObj:GameObject=Instantiate(weapon.prefab,equip.transform.position,equip.transform.rotation);
	    			var ent:Entity=weaponObj.GetComponent(Entity) as Entity;
	    			ent.dieFunc=equip.Sell;
	    			equip.ent=ent;
	    			
					weaponObj.transform.parent=equip.transform;
					
					var cat:CatController=weaponObj.GetComponent(CatController) as CatController;
					equip.cat =cat;
					cat.SetTarget(im.target);
					cat.LevelUp(wm.weapons[weapon.type].level);
					
					if (weapon.type==WeaponType.RepairRobot)
					{
						var repair:RepairRobotController=weaponObj.GetComponent(RepairRobotController) as RepairRobotController;
						repair.shipComponent=equip.shipComponent;
						//repair.LevelUp(wm.weapons[weapon.type].level);
					}
					
	
					equip.weaponObj=weaponObj;
					equip.weapon=weapon;
					equip.drag.empty=false;
					Empty();

					im.CheckCombine(weapon.type,1);
				}
				
    		}
    	}
    	Destroy(drag.dragGraphics.gameObject);
    }
    else
    {
    	Empty();
    	
    	
    }
    
    if (drag.dragGraphics!=null)
    {
    	drag.dragGraphics.drag=false;
    }
	
}

function Start () {

}

function Update () {
	if (!alive)
	{
		return;
	}
	if (drag.empty)
	{
		if (toggle<interval)
		{
			toggle+=Time.deltaTime;
		}
		else
		{
			NewWeapon();
			
			toggle=0;
		}
	}
	
	
}

function NewWeapon()
{
	var random:int=Random.Range(0,wm.equipedWeapon.Length);
	
	weapon=wm.equipedWeapon[random];
	if (wm.testing)
	{
		weapon=wm.weapons[wm.test];
	}
	graphics.SetSprite(weapon.graphics.atlas,weapon.graphics.index,true);
	graphics.color.a=1;
	drag.empty=false;
}


function Empty()
{
	graphics.color.a=0;
	drag.empty=true;
	
	toggle=0;
}