#pragma strict
class ComponentEditor extends EditorWindow
{
	@MenuItem ("Editor/ComponentEditor")
	static function ShowWindow ()
    {
        var comEditor = EditorWindow.GetWindow(ComponentEditor);
        comEditor.autoRepaintOnSceneChange = true;
        
    }
	
	var data:Database;
	
	var init : boolean = false;
	
	var defaultGUIWidth : int = 100;
	
	

	function Init()
	{
		data=GameObject.Find("Database").GetComponent(Database) as Database;
		
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
			
			var temp:ComponentData[]=data.coms;
			data.coms=new ComponentData[temp.Length+1];
			for (i=0;i<temp.Length;i++)
			{
				data.coms[i]=temp[i];
			}
			data.coms[data.coms.Length-1]=new ComponentData();
			data.coms[data.coms.Length-1].id=data.coms.Length+100000-1;
			data.coms[data.coms.Length-1].name="unknown";
		}
		
		if ( GUILayout.Button("Delete",GUILayout.Width(100)) )
		{
			
			temp=data.coms;
			data.coms=new ComponentData[temp.Length-1];
			for (i=0;i<temp.Length-1;i++)
			{
				data.coms[i]=temp[i];
			}
			
		}
	    EditorGUILayout.EndHorizontal();
	
	    EditorGUILayout.BeginHorizontal();
	    
	    /*
	    var id:int;
	var HP:int;
	var beamDef:int;
	var shellDef:int;
	var explosionDef:int;
	
	var maxHP:int;
	var maxBeamDef:int;
	var maxShellDef:int;
	var maxExplosionDef:int;
	    */
	    GUILayout.Label ("ID", EditorStyles.boldLabel,GUILayout.Width(50));
	    GUILayout.Space (20);
	    GUILayout.Label ("Name", EditorStyles.boldLabel,GUILayout.Width(defaultGUIWidth));
		GUILayout.Space (20);
		GUILayout.Label ("Level/Max", EditorStyles.boldLabel,GUILayout.Width(defaultGUIWidth));
		GUILayout.Space (20);
	    GUILayout.Label ("HP/Max", EditorStyles.boldLabel,GUILayout.Width(defaultGUIWidth));
		GUILayout.Space (20);
		GUILayout.Label ("beamDef/Max", EditorStyles.boldLabel,GUILayout.Width(defaultGUIWidth));
		GUILayout.Space (20);
		GUILayout.Label ("shellDef/Max", EditorStyles.boldLabel,GUILayout.Width(defaultGUIWidth));
		GUILayout.Space (20);
		GUILayout.Label ("explode/Max", EditorStyles.boldLabel,GUILayout.Width(defaultGUIWidth));
		GUILayout.Space (20);
		GUILayout.Label ("slots/Max", EditorStyles.boldLabel,GUILayout.Width(defaultGUIWidth));
		GUILayout.Space (20);
		
		GUILayout.Label ("Part", EditorStyles.boldLabel,GUILayout.Width(defaultGUIWidth));
		GUILayout.Space (20);
		
		
		
		EditorGUILayout.EndVertical();
	    for (i=0;i<data.coms.Length;i++)
	    {
	    	EditorGUILayout.BeginHorizontal();
	    	GUILayout.Label (data.coms[i].id+"", EditorStyles.boldLabel,GUILayout.Width(50));
	    	GUILayout.Space (20);	
	    	
	    	
	    	data.coms[i].name=EditorGUILayout.TextField(data.coms[i].name,GUILayout.Width(defaultGUIWidth));
	    	GUILayout.Space (20);
	    	//data.coms[i].level=data.coms[i].HP+data.coms[i].beamDef+data.coms[i].shellDef+data.coms[i].explosionDef;
	    	//data.coms[i].maxLevel=data.coms[i].maxHP+data.coms[i].maxBeamDef+data.coms[i].maxShellDef+data.coms[i].maxExplosionDef;
	    	//GUILayout.Label (data.coms[i].level+"", EditorStyles.boldLabel,GUILayout.Width(defaultGUIWidth/2));
	    	//GUILayout.Label (data.coms[i].maxLevel+"", EditorStyles.boldLabel,GUILayout.Width(defaultGUIWidth/2));
	    	
	    	data.coms[i].level=EditorGUILayout.IntField(data.coms[i].level,GUILayout.Width(defaultGUIWidth/2));
	    	data.coms[i].maxLevel=EditorGUILayout.IntField(data.coms[i].maxLevel,GUILayout.Width(defaultGUIWidth/2));
	    	GUILayout.Space (20);
	    	
	    	data.coms[i].HP=EditorGUILayout.IntField(data.coms[i].HP,GUILayout.Width(defaultGUIWidth/2));
	    	data.coms[i].maxHP=EditorGUILayout.IntField(data.coms[i].maxHP,GUILayout.Width(defaultGUIWidth/2));
	    	GUILayout.Space (20);
	    	data.coms[i].beamDef=EditorGUILayout.IntField(data.coms[i].beamDef,GUILayout.Width(defaultGUIWidth/2));
	    	data.coms[i].maxBeamDef=EditorGUILayout.IntField(data.coms[i].maxBeamDef,GUILayout.Width(defaultGUIWidth/2));
	    	GUILayout.Space (20);
	    	data.coms[i].shellDef=EditorGUILayout.IntField( data.coms[i].shellDef,GUILayout.Width(defaultGUIWidth/2));
	    	data.coms[i].maxShellDef=EditorGUILayout.IntField(data.coms[i].maxShellDef,GUILayout.Width(defaultGUIWidth/2));
	    	GUILayout.Space (20);
	    	data.coms[i].explosionDef=EditorGUILayout.IntField(data.coms[i].explosionDef,GUILayout.Width(defaultGUIWidth/2));
	    	data.coms[i].maxExplosionDef=EditorGUILayout.IntField(data.coms[i].maxExplosionDef,GUILayout.Width(defaultGUIWidth/2));
	    	GUILayout.Space (20);
	    	data.coms[i].slots=EditorGUILayout.IntField(data.coms[i].slots,GUILayout.Width(defaultGUIWidth/2));
	    	data.coms[i].maxSlots=EditorGUILayout.IntField(data.coms[i].maxSlots,GUILayout.Width(defaultGUIWidth/2));
	    	GUILayout.Space (20);
	    	data.coms[i].part=EditorGUILayout.EnumPopup(data.coms[i].part,GUILayout.Width(defaultGUIWidth));
	    	GUILayout.Space (20);
	    	data.coms[i].baseExp=EditorGUILayout.IntField(data.coms[i].baseExp,GUILayout.Width(defaultGUIWidth/2));
	    	GUILayout.Space (20);
	    	
	    	
	    	EditorGUILayout.EndHorizontal();
	    }
	

		EditorGUILayout.EndVertical();
		EditorGUILayout.EndHorizontal();
	}
	

}