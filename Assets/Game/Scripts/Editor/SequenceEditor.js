class SequenceEditor extends EditorWindow
{
    var init : boolean = false;

    var currentSequenceToEdit : int = 0;
    
    
    var defaultGUIWidth : int = 250;
    
    var scrollPos : Vector2 = Vector2(0,100);
    

    var text : String[];
    var textEnd : String[];
    
	var copiedLevelNumber : int = 0;       
	
  	var startIndex : int = 0;
  	var prevStartIndex : int = 0;
       
	
	var scrollPos2 : Vector2 = Vector2.zero;
	
	
	var em:EnemyManager;
	var levelInterval:float;
	
    @MenuItem ("Level/SequenceEditor")
    
    static function ShowWindow ()
    {
        var sequenceEditor = EditorWindow.GetWindow(SequenceEditor);
        sequenceEditor.autoRepaintOnSceneChange = true;
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
        	
        	defaultGUIWidth = GUILayout.HorizontalSlider(defaultGUIWidth, 150, 300, GUILayout.Width(defaultGUIWidth));
	        EditorGUILayout.BeginHorizontal(GUILayout.Width(defaultGUIWidth));
	        EditorGUILayout.BeginVertical(GUILayout.Width(defaultGUIWidth));
	        currentSequenceToEdit = EditorGUILayout.IntSlider(currentSequenceToEdit, 0, (em.sequences.Length- 1), GUILayout.Width(defaultGUIWidth));
		    GUILayout.Label("Level: " + currentSequenceToEdit + "/" + (em.sequences.Length-1) );
		    
		    
		        
		    GUILayout.Label ("Meow Sequence Editor", EditorStyles.boldLabel);
		    GUILayout.Label ("SequenceName", EditorStyles.boldLabel);
	         
	        em.sequences[currentSequenceToEdit].sequenceName=EditorGUILayout.TextField(em.sequences[currentSequenceToEdit].sequenceName, GUILayout.Width(defaultGUIWidth));
	        
	        em.sequences[currentSequenceToEdit].from=EditorGUILayout.IntField("From",em.sequences[currentSequenceToEdit].from, GUILayout.Width(defaultGUIWidth));
	        em.sequences[currentSequenceToEdit].to=EditorGUILayout.IntField("To",em.sequences[currentSequenceToEdit].to,  GUILayout.Width(defaultGUIWidth));
	        em.sequences[currentSequenceToEdit].cost=EditorGUILayout.IntField("cost",em.sequences[currentSequenceToEdit].cost, GUILayout.Width(defaultGUIWidth));
	        em.sequences[currentSequenceToEdit].alive=EditorGUILayout.Toggle("alive",em.sequences[currentSequenceToEdit].alive);
	        
	        //em.levels[currentLevelToEdit].group=EditorGUILayout.Toggle("Group", em.levels[currentLevelToEdit].group);	
	        
	        
	        
			if ( GUILayout.Button("Set Sequences") )
			{
				//em.GenerateLevels(0);
				//EditorApplication.ExecuteMenuItem("Edit/Play");
				em.GenerateSequences();
				
			}
			
			
			
	        EditorGUILayout.EndVertical();
	        
	        EditorGUILayout.BeginHorizontal(GUILayout.Width(100));
	        
	        var tmpLevels:LevelInfo[];
	        var i:int;
	        var j:int;
	        if ( GUILayout.Button("Add Level") )
			{
				tmpSequences=em.sequences;
				em.sequences=new SequenceInfo[tmpSequences.Length+1];
				for (i=0;i<tmpSequences.Length;i++)
				{
					em.sequences[i]=new SequenceInfo(tmpSequences[i]);
				}
				em.sequences[em.sequences.Length-1]=new SequenceInfo();
			}
			
			if ( GUILayout.Button("Delete Level") )
			{
				tmpSequences=em.sequences;
				em.sequences=new SequenceInfo[tmpSequences.Length-1];
				for (i=0;i<currentSequenceToEdit;i++)
				{
					em.sequences[i]=new SequenceInfo(tmpSequences[i]);
				}
				
				for (j=currentSequenceToEdit+1;j<tmpSequences.Length;j++)
				{
					em.sequences[i]=new SequenceInfo(tmpSequences[j]);
					i++;
				}
				
				currentSequenceToEdit=Mathf.Clamp(currentSequenceToEdit,0,em.sequences.Length-1);
			}
	        
	        if ( GUILayout.Button("Prev Level") )
			{
				currentSequenceToEdit--;
				
				currentSequenceToEdit=Mathf.Clamp(currentSequenceToEdit,0,em.sequences.Length-1);       
				
				GUIUtility.keyboardControl = 0;	         	
				
			};
			
			if ( GUILayout.Button("Next Level") )
			{
				currentSequenceToEdit++;
				currentSequenceToEdit=Mathf.Clamp(currentSequenceToEdit,0,em.sequences.Length-1);
				
				GUIUtility.keyboardControl = 0;
				
			}
		  	EditorGUILayout.EndHorizontal();   
			
			if ( GUILayout.Button("COPY & NEXT LEVEL") )
			{
				copiedLevelNumber = currentSequenceToEdit;
				
				if ( currentSequenceToEdit <em.levels.Length )
				{
					currentSequenceToEdit += 1;
				}
				
				em.sequences[currentSequenceToEdit]=em.sequences[currentSequenceToEdit-1];
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


	
	
	function OnDisable()
	{
		Debug.Log("Disable Called");
	}


}