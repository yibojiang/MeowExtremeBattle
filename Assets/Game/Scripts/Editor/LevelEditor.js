class LevelEditor extends EditorWindow
{
    var myString : String;
    var groupEnabled : boolean = false;
    var myBool : boolean = false;
    var myFloat : float = 0.0;
    
    var init : boolean = false;


    //var gSL : GameSaveLoad;
    
    var currentLevelToEdit : int = 0;
    
    var numRandomFireWorks : int = 0;
    
    //var randomOptions : flightPath[];
    var maxFWTypes : int = 12;
    
    var defaultGUIWidth : int = 250;
    
    var scrollPos : Vector2 = Vector2(0,100);
    

    var text : String[];
    var textEnd : String[];
    
	var copiedLevelNumber : int = 0;       
	
  	var startIndex : int = 0;
  	var prevStartIndex : int = 0;
       
	var screenWidth : int = 960;
	var screenHeight : int = 640;
	
	var gridWidth : int = 16;
	var gridHeight : int = 16;
	
	var numGridElements : int = gridWidth * gridHeight;
	
	var numTestLevelsToPlay : int = 1;
	
	// MultiCopy
	var multiStart : int = 0;
	var multiEnd : int = 0;
	var multiDest : int = 0;
	
	var autonumberRepeatAt : int = 0;
	
	var scrollPos2 : Vector2 = Vector2.zero;
	
	var confirmDelete : boolean = false;
	
	
	var em:EnemyManager;
	var levelInterval:float;
	
    @MenuItem ("Level/LevelEditor")
    
    static function ShowWindow ()
    {
        var leveleditor = EditorWindow.GetWindow(LevelEditor);
        leveleditor.autoRepaintOnSceneChange = true;
        leveleditor.LoadLevelPosition();
    }
    
    
    function Start()
    {
    	
    	
    }
    
    function Init()
    {
    	var emObj:GameObject=GameObject.Find("EnemyManager");
    	
    	if (emObj!=null)
    	{
    		em=emObj.GetComponent(EnemyManager) as EnemyManager;
    	}
    	
    	
   }
    
    
    function OnGUI ()
    {
    
    	if ( !init || em == null)
	    {
	      	Init();
	       	init = true;
	    }
	        
        
        if (em!=null)
        {
        	//scrollPos2 = EditorGUILayout.BeginScrollView(scrollPos2);
        	defaultGUIWidth = GUILayout.HorizontalSlider(defaultGUIWidth, 150, 300, GUILayout.Width(defaultGUIWidth));
	        EditorGUILayout.BeginHorizontal(GUILayout.Width(defaultGUIWidth));
	        EditorGUILayout.BeginVertical(GUILayout.Width(defaultGUIWidth));
	        currentLevelToEdit = EditorGUILayout.IntSlider(currentLevelToEdit, 0, (em.levels.Length- 1), GUILayout.Width(defaultGUIWidth));
		    GUILayout.Label("Level: " + currentLevelToEdit + "/" + (em.levels.Length-1) );
		    
		    
		        
		    GUILayout.Label ("Meow Level Editor", EditorStyles.boldLabel);
		    GUILayout.Label ("LevelName", EditorStyles.boldLabel);
	         
	        em.levels[currentLevelToEdit].levelName=GUILayout.TextField(em.levels[currentLevelToEdit].levelName, 32, GUILayout.Width(defaultGUIWidth));
	        GUILayout.Label("Level Interval", EditorStyles.boldLabel);
	        em.levels[currentLevelToEdit].time=EditorGUILayout.FloatField("Time", em.levels[currentLevelToEdit].time, GUILayout.Width(defaultGUIWidth));
	        
	        GUILayout.Label("Enemy Info", EditorStyles.boldLabel);
	        em.levels[currentLevelToEdit].speed=EditorGUILayout.FloatField("Speed", em.levels[currentLevelToEdit].speed, GUILayout.Width(defaultGUIWidth));
	        
	        
	        em.levels[currentLevelToEdit].randomPos=EditorGUILayout.Toggle("Random Position", em.levels[currentLevelToEdit].randomPos);
	        if (!em.levels[currentLevelToEdit].randomPos)
	        {
	        	em.levels[currentLevelToEdit].positionX=EditorGUILayout.FloatField("PositionX", em.levels[currentLevelToEdit].positionX, GUILayout.Width(defaultGUIWidth));
	        	em.levels[currentLevelToEdit].position=EditorGUILayout.FloatField("PositionY", em.levels[currentLevelToEdit].position, GUILayout.Width(defaultGUIWidth));
	        }
	        
	        
	        
	        em.levels[currentLevelToEdit].count=EditorGUILayout.FloatField("Count", em.levels[currentLevelToEdit].count, GUILayout.Width(defaultGUIWidth));
	        if (em.levels[currentLevelToEdit].count>1)
	        {
	        	em.levels[currentLevelToEdit].interval=EditorGUILayout.FloatField("Interval", em.levels[currentLevelToEdit].interval, GUILayout.Width(defaultGUIWidth));
	        	
	        	em.levels[currentLevelToEdit].group=EditorGUILayout.Toggle("Group", em.levels[currentLevelToEdit].group);	
	        	if (em.levels[currentLevelToEdit].group)
	        	{
	        		em.levels[currentLevelToEdit].radius=EditorGUILayout.IntField("Radius", em.levels[currentLevelToEdit].radius);
	        	}
	        }
	        
	        em.levels[currentLevelToEdit].enemyType= EditorGUILayout.EnumPopup("Enemy Type: ", em.levels[currentLevelToEdit].enemyType, GUILayout.Width(defaultGUIWidth));
	        em.levels[currentLevelToEdit].path= EditorGUILayout.EnumPopup("Path: ", em.levels[currentLevelToEdit].path, GUILayout.Width(defaultGUIWidth));
	        
	       	em.levels[currentLevelToEdit].warning=EditorGUILayout.Toggle("Show Warning", em.levels[currentLevelToEdit].warning);
			
			if ( GUILayout.Button("Play ALL") )
			{
				em.GenerateLevels(0);
				EditorApplication.ExecuteMenuItem("Edit/Play");
				this.Close();
			}
			
			if ( GUILayout.Button("Play CURRENT") )
			{
				em.GenerateLevels(currentLevelToEdit);
				//lm.SetPlayModeTest(currentLevelToEdit, numTestLevelsToPlay, true);
				EditorApplication.ExecuteMenuItem("Edit/Play");
				this.Close();
			}
			
	        EditorGUILayout.EndVertical();
	        
	        EditorGUILayout.BeginHorizontal(GUILayout.Width(100));
	        
	        var tmpLevels:LevelInfo[];
	        var i:int;
	        var j:int;
	        if ( GUILayout.Button("Add Level") )
			{
				tmpLevels=em.levels;
				em.levels=new LevelInfo[tmpLevels.Length+1];
				for (i=0;i<tmpLevels.Length;i++)
				{
					em.levels[i]=new LevelInfo(tmpLevels[i]);
				}
				em.levels[em.levels.Length-1]=new LevelInfo();
			}
			
			if ( GUILayout.Button("Delete Level") )
			{
				tmpLevels=em.levels;
				em.levels=new LevelInfo[tmpLevels.Length-1];
				for (i=0;i<currentLevelToEdit;i++)
				{
					em.levels[i]=new LevelInfo(tmpLevels[i]);
				}
				
				for (j=currentLevelToEdit+1;j<tmpLevels.Length;j++)
				{
					em.levels[i]=new LevelInfo(tmpLevels[j]);
					i++;
				}
				
				currentLevelToEdit=Mathf.Clamp(currentLevelToEdit,0,em.levels.Length-1);
			}
	        
	        if ( GUILayout.Button("Prev Level") )
			{
				currentLevelToEdit--;
				
				currentLevelToEdit=Mathf.Clamp(currentLevelToEdit,0,em.levels.Length-1);       
				
				GUIUtility.keyboardControl = 0;	         	
				
			};
			
			if ( GUILayout.Button("Next Level") )
			{
				currentLevelToEdit++;
				currentLevelToEdit=Mathf.Clamp(currentLevelToEdit,0,em.levels.Length-1);
				
				GUIUtility.keyboardControl = 0;
				
			}
		  	EditorGUILayout.EndHorizontal();   
			
			if ( GUILayout.Button("COPY & NEXT LEVEL") )
			{
				copiedLevelNumber = currentLevelToEdit;
				
				if ( currentLevelToEdit <em.levels.Length )
				{
					currentLevelToEdit += 1;
				}
				
				em.levels[currentLevelToEdit]=em.levels[currentLevelToEdit-1];
				//CopyLevel(currentLevelToEdit, copiedLevelNumber);
				
				GUIUtility.keyboardControl = 0;
				
				//lm.SetCurrentLevelBeingEdited(currentLevelToEdit);
			}
			
		  	EditorGUILayout.EndHorizontal();
       }
    }
    

   
    function OnFocus()
    {
    	autoRepaintOnSceneChange = true;
    	//Debug.Log("I got my focus back");
    	Init();
    }


	function SaveLevelPosition()
	{
		PlayerPrefs.SetInt("LevelEditorCurrentLevel", currentLevelToEdit);
	}
	
	/*
	function PlayStateChanged()
	{
		Debug.Log("PlayStateChanged! @ " + Time.time);
		if ( EditorApplication.isPlaying == false )
		{
			var leveleditor = EditorWindow.GetWindow(LevelEditor);
	        leveleditor.autoRepaintOnSceneChange = true;
	        leveleditor.LoadLevelPosition();
		}
	}
	*/
	
	function LoadLevelPosition()
	{
		currentLevelToEdit = PlayerPrefs.GetInt("LevelEditorCurrentLevel", 0);
		
		//Debug.Log(PlayStateChanged);

		//this.playmodeStateChanged += PlayStateChanged;
	}
	
	function OnDisable()
	{
		Debug.Log("Disable Called");
		SaveLevelPosition();
	}


}