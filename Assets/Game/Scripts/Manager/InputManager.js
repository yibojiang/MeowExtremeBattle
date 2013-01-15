#pragma strict
var ray : Ray;
var hit:RaycastHit;



var layerMask:int;

var equipSlots:EquipSlot[];

var weaponCount:int[];

var aim:Aim;
var target:Entity;
var sm:ScoreManager;

function Awake()
{
	#if UNITY_UNITY_IPHONE
	Application.targetFrameRate = 60;
	#endif
}

function Start () 
{

}


function GameStart()
{
	equipSlots=GameObject.FindObjectsOfType(EquipSlot);
	for (var i:int=0;i<weaponCount.Length;i++)
	{
		weaponCount[i]=0;
	}
}

function ShowAllEquipSlots()
{
	for (var i:int=0;i<equipSlots.Length;i++)
	{
		if (equipSlots[i]!=null)
		{
			equipSlots[i].Show();
		}
	}
}

function HideAllEquipSlots()
{
	for (var i:int=0;i<equipSlots.Length;i++)
	{
		if (equipSlots[i]!=null)
		{
			equipSlots[i].Hide();
		}
	}
}

function CheckCombine(_type:WeaponType,count:int)
{
	var powerUp:boolean=false;
	if (weaponCount[_type]>=3)
	{
		powerUp=true;
	}
	weaponCount[_type]+=count;
	
	if (weaponCount[_type]<3 && powerUp)
	{
		PowerDown(_type);
	}
	
	if (weaponCount[_type]>=3 && !powerUp)
	{
		PowerUp(_type);
	}
	
}


function PowerDown(_type:WeaponType)
{
	for (var i:int=0;i<equipSlots.Length;i++)
	{
		if (equipSlots[i].weaponObj!=null && equipSlots[i].weapon!=null )
		{
			if (equipSlots[i].weapon.type==_type)
			{
				equipSlots[i].PowerDown();
			}
		}
	}
}

function PowerUp(_type:WeaponType)
{
	sm.AddCombo();
	for (var i:int=0;i<equipSlots.Length;i++)
	{
		if (equipSlots[i].weaponObj!=null && equipSlots[i].weapon!=null)
		{
			if (equipSlots[i].weapon.type==_type)
			{
				equipSlots[i].PowerUp();
			}
		}
	}

}

function Update () {

	#if UNITY_EDITOR || UNITY_STANDALONE_WIN || UNITY_STANDALONE_OSX
	
	
	#endif
	//Debug.Log(Input.mousePosition);
	if ( Input.GetMouseButtonUp(0) )
	{
	
	}
	
	if ( Input.GetMouseButtonDown(0) )
	{
		
		//Debug.Log(ray.origin);
		//var hits : RaycastHit[];
	    //hits = Physics.RaycastAll (ray, 1000.0);
	
		//Debug.DrawRay(ray.origin, ray.direction * 50, Color.red);
		//Debug.Log(hits.Length);
	    // Change the material of all hit colliders
	    // to use a transparent Shader
	    /*
	    for (var i = 0;i < hits.Length; i++) 
	    {
	    	
	        var hit : RaycastHit = hits[i];
	        if ( hit.transform.tag == "Slot" )
	    	{
	    		//Debug.Log("hit");
	    		var s:Slot=hit.transform.gameObject.GetComponent(Slot) as Slot;
	    		s.selected=true;
	    	}
	    }
	    */
	    

	
	    ray = Camera.main.ScreenPointToRay(Input.mousePosition);
	    layerMask = 1 << 8;
	    
	    var hits : RaycastHit[];
	    hits = Physics.RaycastAll (ray, 1000.0,layerMask);
	
	    // Change the material of all hit colliders
	    // to use a transparent Shader
	    var i:int;
	    for (i=0;i < hits.Length; i++) {
	        hit = hits[i];
	        if ( hit.collider.tag == "CustomButton" )
	    	{
	    		(hit.collider.GetComponent(CustomButton) as CustomButton).Tap();
	    	}
	    	
	    	if ( hit.collider.tag == "DragItem" )
	    	{
	    		var drag:DragItem=hit.collider.gameObject.GetComponent(DragItem) as DragItem;
	    		drag.Tap();
	    	}
		}
	    
	    /*
	    if (Physics.Raycast(ray,hit,1000.0,layerMask))
	    {
	    
	    	if ( hit.collider.tag == "CustomButton" )
	    	{
	    		(hit.collider.GetComponent(CustomButton) as CustomButton).Tap();
	    	}
	    	
	    	
	    	if ( hit.collider.tag == "DragItem" )
	    	{
	    		var drag:DragItem=hit.collider.gameObject.GetComponent(DragItem) as DragItem;
	    		drag.Tap();
	    	}
	    }
	    */
	    
	    if (Physics.Raycast(ray,hit,1000.0))
	    {
	    	if ( hit.collider.tag == "Enemy" )
	    	{
	    		for (i=0;i<equipSlots.Length;i++)
	    		{
	    			if (equipSlots[i].weaponObj!=null)
	    			{
	    				equipSlots[i].cat.SetTarget(hit.collider.GetComponent(Entity) as Entity);
	    			}
	    		}
	    		aim.SetTarget(hit.collider.transform);
	    	}
	    	
	    }

	}
	
}