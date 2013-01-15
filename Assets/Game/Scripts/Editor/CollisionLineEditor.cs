using UnityEngine;
using UnityEditor;
using System.Collections;

[CustomEditor(typeof(CollisionLine))]
public class CollisionLineEditor : Editor
{
	CollisionLine _target;
	GUIStyle style = new GUIStyle();
	GUIStyle styleRed = new GUIStyle();
	public static int count = 0;
	GameObject obj;
	GameObject cubeObj;
	Material mt;
	
	
	
	
	void OnEnable(){
		//i like bold handle labels since I'm getting old:
		style.fontStyle = FontStyle.Bold;
		style.normal.textColor = Color.white;
		_target = (CollisionLine)target;
		
		styleRed.fontStyle = FontStyle.Bold;
		styleRed.normal.textColor = Color.red;
		
		//lock in a default path name:
		if(!_target.initialized){
			_target.initialized = true;
			_target.pathName = "New Path " + ++count;
			_target.initialName = _target.pathName;
		}
	}
	
	
	
	public override void OnInspectorGUI(){		
		//path name:
		
		
		if(_target.pathName == ""){
			_target.pathName = _target.initialName;
		}
		
		EditorGUILayout.BeginHorizontal();
		EditorGUILayout.PrefixLabel("Node Count");
		EditorGUILayout.IntField(_target.nodes.Count);
		EditorGUILayout.EndHorizontal();
		
		EditorGUILayout.BeginHorizontal();
		EditorGUILayout.PrefixLabel("Selected Node");
		EditorGUILayout.IntField(_target.curNode);
		EditorGUILayout.EndHorizontal();
		
		EditorGUILayout.BeginHorizontal();
		EditorGUILayout.PrefixLabel("Path Color");
		_target.pathColor = EditorGUILayout.ColorField(_target.pathColor);
		EditorGUILayout.EndHorizontal();
		
		EditorGUILayout.BeginHorizontal();
		EditorGUILayout.PrefixLabel("Width");
		_target.width=EditorGUILayout.FloatField(_target.width);
		obj=(GameObject)EditorGUILayout.ObjectField(obj,typeof(GameObject) ,false);	
		if (obj!=null)
		{
			_target.prefabObj=obj;
		}
		else
		{
			obj=_target.prefabObj;
		}
		if (GUILayout.Button("GenerateCollider"))
		{
			_target.GenerateCollider();
		}
		
		EditorGUILayout.EndHorizontal();
		
		
		EditorGUILayout.BeginHorizontal();
		mt=(Material)EditorGUILayout.ObjectField(mt,typeof(Material) ,false);	
		if (mt!=null)
		{
			_target.mt=mt;
		}
		else
		{
			mt=_target.mt;
		}
		if (GUILayout.Button("GenerateMesh"))
		{
			_target.GenerateBlock();
		}
		EditorGUILayout.EndHorizontal();
		
		
		EditorGUILayout.BeginHorizontal();
		_target.bezier=GUILayout.Toggle(_target.bezier,"BezierPreview");
		if (GUILayout.Button("Bezier"))
		{
			_target.ToBezier();
			EditorUtility.SetDirty(_target);
		}
		
		if (GUILayout.Button("AlignToOrigin"))
		{
			Vector3 offset=_target.transform.position-_target.nodes[0];
			for (int i = 0; i < _target.nodes.Count; i++) {
				_target.nodes[i]=new Vector3(_target.nodes[i].x+offset.x,_target.nodes[i].y+offset.y,_target.transform.position.z);	
				
			}
			EditorUtility.SetDirty(_target);
		}
		
		if (GUILayout.Button("Clear"))
		{
			_target.Clear();
			EditorUtility.SetDirty(_target);
		}
		
		EditorGUILayout.EndHorizontal();
		
		//add node?
		if(_target.nodeCount > _target.nodes.Count){
			for (int i = 0; i < _target.nodeCount - _target.nodes.Count; i++) {
				_target.nodes.Add(Vector3.zero);	
			}
		}
		
		
		EditorGUILayout.BeginHorizontal();
		_target.height=EditorGUILayout.FloatField(_target.height);
		cubeObj=(GameObject)EditorGUILayout.ObjectField(cubeObj,typeof(GameObject) ,false);	
		if (cubeObj!=null)
		{
			_target.cubeObj=cubeObj;
		}
		else
		{
			cubeObj=_target.cubeObj;
		}
		if (GUILayout.Button("GenerateObstacle"))
		{
			_target.GenerateObstacle();
		}
		EditorGUILayout.EndHorizontal();
		//node display:
		//EditorGUI.indentLevel = 4;
		/*
		for (int i = 0; i < _target.nodes.Count; i++) {
			_target.nodes[i] = EditorGUILayout.Vector3Field("Node " + (i+1), _target.nodes[i]);
		}
		*/
		
		//update and redraw:
		if(GUI.changed){
			EditorUtility.SetDirty(_target);			
		}
	}
	
	void OnSceneGUI(){
		if(_target.enabled) { // dkoontz
			if(_target.nodes.Count > 0){
				//allow path adjustment undo:
				Undo.SetSnapshotTarget(_target,"Adjust iTween Path");
				
				//path begin and end labels:
				Handles.Label(_target.nodes[0], "'" + _target.pathName + "' Begin", style);
				Handles.Label(_target.nodes[_target.nodes.Count-1], "'" + _target.pathName + "' End", style);
				
				if (_target.curNode<=_target.nodes.Count-1)
				{
					Handles.Label(_target.nodes[_target.curNode],"Selected Node",styleRed);
				}
				//node handle display:
				for (int i = 0; i < _target.nodes.Count; i++) {
					Vector3 prePos=_target.nodes[i];
					_target.nodes[i] = Handles.PositionHandle(_target.nodes[i], Quaternion.identity);
					if (prePos!=_target.nodes[i])
					{
						//Debug.Log(i);
						_target.curNode=i;
					}
					
				}	
			}
			
			//Selection.
			
			
			Event e = Event.current;
			
			
			//Debug.Log(e.mousePosition);
			
			if (e.type==EventType.MouseUp && e.shift )
			{ 
				
				if(e.button == 1) 
				{
					Vector3 p=Camera.current.ScreenToWorldPoint(new Vector3(e.mousePosition.x,-e.mousePosition.y+Camera.current.pixelHeight));
					//p.z=0;
					p.z=_target.transform.position.z;
					_target.nodes.Add(p);
			    } 
				
			}
			
			
			
			if (e.Equals(Event.KeyboardEvent("c") ) )
			{
            	//Debug.Log("delete");
				_target.nodes.RemoveAt(_target.curNode);
			}
			
			if (e.Equals(Event.KeyboardEvent("n") ) )
			{
            	//Debug.Log("delete");
				_target.nodes.Insert(_target.curNode,_target.nodes[_target.curNode]);
			}
			//Handles.PositionHandle
			//Debug.Log(Selection.objects.Length);
			
			
			
		} // dkoontz
	}
}