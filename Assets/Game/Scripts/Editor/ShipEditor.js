#pragma strict
class ShipEditor extends EditorWindow
{
	@MenuItem ("Editor/ShipEditor")
	static function ShowWindow ()
    {
        var shipEditor = EditorWindow.GetWindow(ShipEditor);
        shipEditor.autoRepaintOnSceneChange = true;
        
    }
	
	var data:Database;
	
	var init : boolean = false;
	
	var defaultGUIWidth : int = 100;
	
	var comsID:int[];
	var comsName:String[];

	function Init()
	{
		data=GameObject.Find("Database").GetComponent(Database) as Database;
		
		
		comsID=new int[data.coms.Length];
		comsName=new String[data.coms.Length];
		var i:int;
		for (i=0;i<data.coms.Length;i++)
		{
			comsID[i]=data.coms[i].id;
			comsName[i]=data.coms[i].name;
		}
		
	}
	
	function OnFocus()
    {
    	autoRepaintOnSceneChange = true;
    	Init();
    }
    
    function OnDisable()
	{
		//Debug.Log("Disable Called");
	}
	
	function OnGUI ()
	{
		
		if ( !init || data == null)
	    {
	      	Init();
	       	init = true;
	    }
		
		defaultGUIWidth = GUILayout.HorizontalSlider(defaultGUIWidth, 100, 200, GUILayout.Width(defaultGUIWidth));
		EditorGUILayout.BeginHorizontal();
		
		var i:int;
		
	    EditorGUILayout.BeginVertical();
	    
	    EditorGUILayout.BeginHorizontal();
	    if ( GUILayout.Button("Add",GUILayout.Width(100)) )
		{
			
			var temp:ShipData[]=data.ships;
			data.ships=new ShipData[temp.Length+1];
			for (i=0;i<temp.Length;i++)
			{
				data.ships[i]=temp[i];
			}
			data.ships[data.ships.Length-1]=new ShipData();
			data.ships[data.ships.Length-1].id=data.ships.Length+100000-1;
			data.ships[data.ships.Length-1].name="unknown";
		}
		
		if ( GUILayout.Button("Delete",GUILayout.Width(100)) )
		{
			
			temp=data.ships;
			data.ships=new ShipData[temp.Length-1];
			for (i=0;i<temp.Length-1;i++)
			{
				data.ships[i]=temp[i];
			}
			
		}
		
		if ( GUILayout.Button("Refresh",GUILayout.Width(100)) )
		{
			
			Init();
			
		}
		
	    EditorGUILayout.EndHorizontal();
	
	    EditorGUILayout.BeginHorizontal();
	    
	    
	    GUILayout.Label ("ID", EditorStyles.boldLabel,GUILayout.Width(50));
	    GUILayout.Space (20);
	    GUILayout.Label ("Name", EditorStyles.boldLabel,GUILayout.Width(defaultGUIWidth));
		GUILayout.Space (20);
		GUILayout.Label ("head", EditorStyles.boldLabel,GUILayout.Width(defaultGUIWidth));
		GUILayout.Space (20);
	  	GUILayout.Label ("body", EditorStyles.boldLabel,GUILayout.Width(defaultGUIWidth));
		GUILayout.Space (20);
		GUILayout.Label ("wing", EditorStyles.boldLabel,GUILayout.Width(defaultGUIWidth));
		GUILayout.Space (20);
		GUILayout.Label ("jet", EditorStyles.boldLabel,GUILayout.Width(defaultGUIWidth));
		GUILayout.Space (20);
		
		
		
		EditorGUILayout.EndVertical();
	    for (i=0;i<data.ships.Length;i++)
	    {
	    	EditorGUILayout.BeginHorizontal();
	    	GUILayout.Label (data.ships[i].id+"", EditorStyles.boldLabel,GUILayout.Width(50));
	    	GUILayout.Space (20);	
	    	data.ships[i].name=EditorGUILayout.TextField(data.ships[i].name,GUILayout.Width(defaultGUIWidth));
	    	GUILayout.Space (20);
	    	data.ships[i].head=EditorGUILayout.IntPopup(data.ships[i].head,comsName,comsID,GUILayout.Width(defaultGUIWidth));
	    	GUILayout.Space (20);
	    	data.ships[i].body=EditorGUILayout.IntPopup(data.ships[i].body,comsName,comsID,GUILayout.Width(defaultGUIWidth));
	    	GUILayout.Space (20);
	    	data.ships[i].wing=EditorGUILayout.IntPopup(data.ships[i].wing,comsName,comsID,GUILayout.Width(defaultGUIWidth));
	    	GUILayout.Space (20);
	    	data.ships[i].jet=EditorGUILayout.IntPopup(data.ships[i].jet,comsName,comsID,GUILayout.Width(defaultGUIWidth));
	    	GUILayout.Space (20);
	    	
	    	
	    	EditorGUILayout.EndHorizontal();
	    }
	

		EditorGUILayout.EndVertical();
		EditorGUILayout.EndHorizontal();
	}
	

}