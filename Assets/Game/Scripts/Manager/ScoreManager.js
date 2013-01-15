#pragma strict
var totalScore:int;
var scoreText:exSpriteFont;
var bestScoreText:exSpriteFont;
var enemyDefeated:int;
var enemyDamage:int;
var playerDamage:int;
var distanceText:exSpriteFont;
var distance:float;
var player:PlayerController;
var pm:ProfileManager;

var expText:exSpriteFont;
var fishText:exSpriteFont;
var totalExp:int;

var totalFish:int;

var data:Database;

var em:EnemyManager;

var bunesShip:GameObject;

var chain:int=0;
var chainText:exSpriteFont;
var combo:int=0;
var comboText:exSpriteFont;

function Awake()
{
	
}

function ResetChain()
{
	chain=0;
}

function AddChain()
{
	chain++;
}

function AddCombo()
{
	combo++;
}

function Start () {
	
	bestScoreText.text=data.player.bestScore.ToString("n0");
}



function AddScore(_score:int)
{
	totalScore+=_score;
	
}

function AddExp(_exp:int)
{
	totalExp+=_exp;
}

function AddFish(_fish:int)
{
	totalFish+=_fish;
}

function Save()
{
	if (totalScore>data.player.bestScore)
	{
		data.player.bestScore=totalScore;
		
		
	}
	
	data.player.exp+=totalExp;
	data.player.fish+=totalFish;
	data.Save();
}

function Reset()
{
	totalScore=0;
	totalExp=0;
	totalFish=0;
	distance=0;
	combo=0;
	ResetChain();
}

function Update () 
{
	//totalScore=Mathf.Clamp(totalScore,0,100000000);
	scoreText.text="Score: "+totalScore.ToString("n0");
	distance+=player.ent.velocity.x*Time.deltaTime;
	distanceText.text=distance.ToString("n0")+" km";
	
	expText.text=totalExp.ToString("n0");
	fishText.text=totalFish.ToString();
	chainText.text=chain.ToString();
	comboText.text=combo.ToString();
	//timer.text=Time.time.ToString("f2");
	
	
	if (Input.GetKeyDown(KeyCode.B))
	{
		GenerateBunesShip();
	}
}


function GenerateBunesShip()
{
	var pos:Vector3=em.transform.position;
	pos.y=Random.Range(-80,80);
	pos.z+=1;
	
	var enemyObj:GameObject=Instantiate(bunesShip,pos,Quaternion.identity);
	enemyObj.transform.parent=em.transform;
	var enemy:Enemy=enemyObj.GetComponent(Enemy) as Enemy;
	enemy.sm=this;
	enemy.am=em.am;
	enemy.originSpeed=50;
	enemyObj.AddComponent(SinPath);
}