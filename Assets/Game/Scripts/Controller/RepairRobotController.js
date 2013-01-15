#pragma strict
var player:PlayerController;
var healRate:float=50;
var graphics:exSprite;
var powerUp:boolean;
var shipComponent:ShipComponent;

var baseRate:float;

var cat:CatController;


function Awake()
{
	player=GameObject.FindGameObjectWithTag("Player").GetComponent(PlayerController) as PlayerController;
	
	if (cat!=null)
	{
		cat.levelUpFunc=LevelUp;
		cat.setTargetFunc=SetTarget;
	}
}
function Start () {
	//LevelUp(ent.level);
}

function SetTarget()
{

}

function Update () {
	if (powerUp)
	{
		/*
		if (graphics!=null)
		{
			graphics.color=Color.Lerp(Color.white,Color.red,Mathf.PingPong(Time.time*3,1));
		}
		*/
		if (cat!=null)
		{
			cat.PowerUp();
		}
	}
	else
	{
		if (cat!=null)
		{
			cat.PowerDown();
		}
	}
	/*
	if (shipComponent.HP<shipComponent.maxHP)
	{
		shipComponent.HP+=healRate*Time.deltaTime;
	}
	*/
	player.Heal(healRate*Time.deltaTime);
	
}

function LevelUp()
{
	healRate=baseRate*(1+cat.level*0.1);
}