#pragma strict

enum GameMode
{
	Endless,
	Arcade,
	Sequences
}


var gameMode:GameMode;
var generateToggle:float;


var defalutInterval:float=2.0;
var generateInterval:float;

var intervalRange:float=1.0;

var enemies:GameObject[];

var totalCount:int;

var enemyInfoCount:int;


var am:AudioManager;
var sm:ScoreManager;

var mutiply:int=1;



class EnmeyInfo
{
	var enemyType:EnemyType;
	var path:EnemyPath=EnemyPath.Straight;
	var speed:float=-10;
	var time:float;
	var positionX:int=0;
	var position:int=0;
	var warning:boolean=false;
	
	function EnmeyInfo(_enemy:EnmeyInfo)
	{
		enemyType=_enemy.enemyType;
		path=_enemy.path;
		speed=_enemy.speed;
		time=_enemy.time;
		positionX=_enemy.positionX;
		position=_enemy.position;
		warning=_enemy.warning;
	}
	
	function EnmeyInfo()
	{
	
	}
	
}

class SequenceInfo
{
	var sequenceName:String;
	var from:int;
	var to:int;
	var cost:int;
	var alive:boolean=true;
	
	function SequenceInfo(_sequence:SequenceInfo)
	{
		sequenceName=_sequence.sequenceName;
		from=_sequence.from;
		to=_sequence.to;
		cost=_sequence.cost;
		alive=_sequence.alive;
	}
	
	function SequenceInfo()
	{
	
	}

}

class LevelInfo
{
	var levelName:String;
	var enemyType:EnemyType;
	var path:EnemyPath=EnemyPath.Straight;
	var speed:float=-10;
	var time:float=1;
	var count:int=1;
	var randomPos:boolean=false;
	var positionX:int=0;
	var position:int=0;
	
	var group:boolean;
	var radius:int;
	
	var interval:float;
	var warning:boolean;
	
	
	function LevelInfo(_level:LevelInfo)
	{
		levelName=_level.levelName;
		enemyType=_level.enemyType;
		path=_level.path;
		speed=_level.speed;
		time=_level.time;
		count=_level.count;
		randomPos=_level.randomPos;
		positionX=_level.positionX;
		position=_level.position;
		interval=_level.interval;
		warning=_level.warning;
		group=_level.group;
		radius=_level.radius;
	}
	
	function LevelInfo()
	{
		levelName="";
	}
}

var sequences:SequenceInfo[];

var enemyInfos:EnmeyInfo[];

var levels:LevelInfo[];

var index:int=0;

var customPath:CollisionLine[];

var alive:boolean;

var warning:WarningBox;

var mutiplyText:exSpriteFont;

var sequences1000:SequenceInfo[];
var sequences2000:SequenceInfo[];
var sequences3000:SequenceInfo[];


var costSequences:int[];
var costIndex:int=0;
enum EnemyType
{
	EnemyBomb=0,
	EnemyBoss=1,
	EnemyMissle=2,
	EnemyMSGun=3,
	EnemyBeam=4,
	EnemyShieldMSGun=5,
	EnemyShieldMSMissle=6
}

enum EnemyPath
{
	Straight=0,
	Sin=1,
	UpDownPath=2,
	ThrowPath=3,
	ZPath=4
}

function Start () {
	if (gameMode==GameMode.Endless)
	{
		generateInterval=defalutInterval;
		defalutInterval=10.0;
	}
	else if (gameMode==GameMode.Arcade)
	{
		generateInterval=enemyInfos[index].time;
	}
	
	if (gameMode==GameMode.Sequences)
	{
		costIndex=0;
		GenerateSequenceLevel(costSequences[costIndex]);
		costIndex++;
		generateInterval=enemyInfos[index].time;
	}
}

function Update () {
	if (!alive)
	{
		return;
	}
	
	var pos:Vector3;
	var i:int;
	if (gameMode==GameMode.Endless)
	{
		if (defalutInterval>2.0)
		{
			defalutInterval-=0.05*Time.deltaTime;
		}
		if (generateToggle<generateInterval)
		{
			generateToggle+=Time.deltaTime;
		}
		else
		{
			generateToggle=0.0;
			generateInterval=defalutInterval+Random.Range(-intervalRange,intervalRange);
			GenerateRandomEnemy();
		}
	}
	else if (gameMode==GameMode.Arcade )
	{
		if (generateToggle<generateInterval)
		{
			generateToggle+=Time.deltaTime;
		}
		else
		{
			generateToggle=0.0;
			
			if (enemyInfos[index].warning)
			{
				warning.Show(enemyInfos[index].enemyType);
			}
			
			pos=this.transform.position;
			pos.x=this.transform.position.x+enemyInfos[index].positionX;
			pos.y=enemyInfos[index].position;
			GenerateEnemy(enemyInfos[index].enemyType,pos,enemyInfos[index].path,enemyInfos[index].speed);
			
		
			
			index++;
			if (index>enemyInfoCount-1)
			{

				for (i=0;i<mutiply;i++)
				{
					sm.GenerateBunesShip();
				}
				mutiply++;
				index=0;
				mutiplyText.text="X"+mutiply;
				
				
			}
			generateInterval=enemyInfos[index].time;
			
		}
	}
	else if (gameMode==GameMode.Sequences)
	{
		if (generateToggle<generateInterval)
		{
			generateToggle+=Time.deltaTime;
		}
		else
		{
			generateToggle=0.0;
			
			if (enemyInfos[index].warning)
			{
				warning.Show(enemyInfos[index].enemyType);
			}
			
			pos=this.transform.position;
			pos.x=this.transform.position.x+enemyInfos[index].positionX;
			pos.y=enemyInfos[index].position;
			GenerateEnemy(enemyInfos[index].enemyType,pos,enemyInfos[index].path,enemyInfos[index].speed);
			
		
			
			index++;
			if (index>enemyInfoCount-1)
			{
				
				
				GenerateSequenceLevel(costSequences[costIndex]);
				
				costIndex++;
				
				if (costIndex>costSequences.Length-1)
				{
					for (i=0;i<mutiply;i++)
					{
						sm.GenerateBunesShip();
					}
					
					
					mutiply++;
					mutiplyText.text="X"+mutiply;
					costIndex=0;
					
				}
				
				index=0;
				
				
				
			}
			generateInterval=enemyInfos[index].time;
			
		}
	
	}
}

function GenerateSequences()
{
	var i:int;
	
	var costCount1000:int=0;
	var costCount2000:int=0;
	var costCount3000:int=0;
	for (i=0;i<sequences.Length;i++)
	{
		if (sequences[i].cost==1000)
		{
			costCount1000++;
		}
		
		if (sequences[i].cost==2000)
		{
			costCount2000++;
		}
		
		if (sequences[i].cost==3000)
		{
			costCount3000++;
		}
	}
	
	sequences1000=new SequenceInfo[costCount1000];
	sequences2000=new SequenceInfo[costCount2000];
	sequences3000=new SequenceInfo[costCount3000];
	
	var costIndex1000:int=0;
	var costIndex2000:int=0;
	var costIndex3000:int=0;
	for (i=0;i<sequences.Length;i++)
	{
		if (sequences[i].cost==1000)
		{
			sequences1000[costIndex1000]=new SequenceInfo(sequences[i]);
			costIndex1000++;
		}
		
		if (sequences[i].cost==2000)
		{
			sequences2000[costIndex2000]=new SequenceInfo(sequences[i]);
			costIndex2000++;
		}
		
		if (sequences[i].cost==3000)
		{
			sequences3000[costIndex3000]=new SequenceInfo(sequences[i]);
			costIndex3000++;
		}
	}
}

function GenerateSequenceLevel(_cost:int)
{
	
	var tmpSequences:SequenceInfo;
	if (_cost==1000)
	{
		tmpSequences=sequences1000[Random.Range(0,sequences1000.Length)];
	}
	else if (_cost==2000)
	{
		tmpSequences=sequences2000[Random.Range(0,sequences2000.Length)];
	}
	else if (_cost==3000)
	{
		tmpSequences=sequences3000[Random.Range(0,sequences3000.Length)];
	}
	Debug.Log(tmpSequences.sequenceName);
	GenerateLevels(tmpSequences.from,tmpSequences.to);
}

function GenerateLevels(_from:int,_to:int)
{
	var infoIndex:int=0;
	for (var i:int=_from;i<=_to;i++)
	{
		for (var j:int=0;j<levels[i].count;j++)
		{
			if (j==0)
			{
				if (levels[i].warning)
				{
					enemyInfos[infoIndex].warning=true;
				}
				
				enemyInfos[infoIndex].time=levels[i].time;
			}
			else
			{
				enemyInfos[infoIndex].warning=false;
				enemyInfos[infoIndex].time=levels[i].interval;
			}
			
			enemyInfos[infoIndex].speed=levels[i].speed;
			enemyInfos[infoIndex].enemyType=levels[i].enemyType;
			enemyInfos[infoIndex].path=levels[i].path;
			if (levels[i].randomPos)
			{
				enemyInfos[infoIndex].positionX=Random.Range(-10,10);
				enemyInfos[infoIndex].position=Random.Range(-80,80);
				
			}
			else
			{
				if (levels[i].group)
				{
					var deg:float=360/levels[i].count;
					
					enemyInfos[infoIndex].positionX=levels[i].positionX+levels[i].radius*Mathf.Cos(deg*j*Mathf.Deg2Rad);
					enemyInfos[infoIndex].position=levels[i].position+levels[i].radius*Mathf.Sin(deg*j*Mathf.Deg2Rad);
				}
				else 
				{
					enemyInfos[infoIndex].positionX=levels[i].positionX;
					enemyInfos[infoIndex].position=levels[i].position;
				}
			}
			
			
			infoIndex++;
		}
	}
	enemyInfoCount=infoIndex;
}


function GenerateLevels(_from:int)
{
	var infoIndex:int=0;
	for (var i:int=_from;i<levels.Length;i++)
	{
		for (var j:int=0;j<levels[i].count;j++)
		{
			if (j==0)
			{
				if (levels[i].warning)
				{
					enemyInfos[infoIndex].warning=true;
				}
				
				enemyInfos[infoIndex].time=levels[i].time;
			}
			else
			{
				enemyInfos[infoIndex].warning=false;
				enemyInfos[infoIndex].time=levels[i].interval;
			}
			
			enemyInfos[infoIndex].speed=levels[i].speed;
			enemyInfos[infoIndex].enemyType=levels[i].enemyType;
			enemyInfos[infoIndex].path=levels[i].path;
			if (levels[i].randomPos)
			{
				enemyInfos[infoIndex].positionX=Random.Range(-10,10);
				enemyInfos[infoIndex].position=Random.Range(-80,80);
				
			}
			else
			{
				if (levels[i].group)
				{
					var deg:float=360/levels[i].count;
					
					enemyInfos[infoIndex].positionX=levels[i].positionX+levels[i].radius*Mathf.Cos(deg*j*Mathf.Deg2Rad);
					enemyInfos[infoIndex].position=levels[i].position+levels[i].radius*Mathf.Sin(deg*j*Mathf.Deg2Rad);
				}
				else 
				{
					enemyInfos[infoIndex].positionX=levels[i].positionX;
					enemyInfos[infoIndex].position=levels[i].position;
				}
			}
			
			
			infoIndex++;
		}
	}
	enemyInfoCount=infoIndex;
}


function GenerateEnemy(_type:EnemyType,_pos:Vector3,_path:EnemyPath,_speed:float):GameObject
{
	var enemyObj:GameObject=Instantiate(enemies[_type],_pos,Quaternion.identity);
	var enemy:Enemy=enemyObj.GetComponent(Enemy) as Enemy;
	enemyObj.transform.parent=this.transform;
	enemy.sm=sm;
	enemy.am=am;
	
	enemy.score=enemy.score*mutiply;
	enemy.exp=enemy.exp*mutiply;
	enemy.HP=enemy.HP*(1+0.2*mutiply);
	enemy.maxHP=enemy.maxHP*(1+0.2*mutiply);
	enemy.originSpeed=_speed*(1+0.2*mutiply);
	var cp:CustomPath;
	if (_path==EnemyPath.Straight)
	{
		//cp=enemyObj.AddComponent(CustomPath) as CustomPath;
		//cp.path=customPath[EnemyPath.Straight];
		enemyObj.AddComponent(StraightPath);
	}
	else if (_path==EnemyPath.Sin)
	{
		enemyObj.AddComponent(SinPath);
		//cp=enemyObj.AddComponent(CustomPath) as CustomPath;
		//cp.path=customPath[EnemyPath.Sin];
	}
	else if (_path==EnemyPath.ZPath)
	{
		cp=enemyObj.AddComponent(CustomPath) as CustomPath;
		cp.path=customPath[EnemyPath.ZPath];
		
	}
	else if (_path==EnemyPath.ThrowPath)
	{
		cp=enemyObj.AddComponent(CustomPath) as CustomPath;
		cp.path=customPath[EnemyPath.ThrowPath];
	}
	else if (_path==EnemyPath.UpDownPath)
	{
		cp=enemyObj.AddComponent(CustomPath) as CustomPath;
		cp.path=customPath[EnemyPath.UpDownPath];
	}
	return enemyObj;
}


function Reset()
{
	mutiply=1;
	
	DestroyAllEnemies();
	generateToggle=0;
	index=0;
	generateInterval=enemyInfos[index].time;
	
	mutiplyText.text="";
	
	warning.Reset();
}

function DestroyAllEnemies()
{
	var enemies:Enemy[]=GameObject.FindObjectsOfType(Enemy);
	
	for (var i:int=0;i<enemies.Length;i++)
	{
		Destroy(enemies[i].gameObject);
	}
	
}

function GenerateRandomEnemy()
{
	totalCount++;
	var type:int=Random.Range(0,enemies.Length);
	/*
	if (type==EnemyType.EnemyBoss)
	{
		this.audio.PlayOneShot(this.audio.clip);
	}
	*/
	var pos:Vector3=this.transform.position;
	pos.y=Random.Range(-80,80);
	
	var enemyObj:GameObject=Instantiate(enemies[type],pos,Quaternion.identity);
	enemyObj.transform.parent=this.transform;
	var enemy:Enemy=enemyObj.GetComponent(Enemy) as Enemy;
	enemy.sm=sm;
	enemy.am=am;
	
	var path:int=Random.Range(0,4);
	
	if (path==EnemyPath.Straight)
	{
		enemyObj.AddComponent(StraightPath);
	}
	else if (path==EnemyPath.Sin)
	{
		enemyObj.AddComponent(SinPath);
	}
}