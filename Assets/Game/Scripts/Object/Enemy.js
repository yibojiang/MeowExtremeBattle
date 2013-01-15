#pragma strict

var myTransform:Transform;
//var target:Transform;
var HP:int=1000;
//var alive:boolean;
var am:AudioManager;

var originSpeed:float;
var speedFactor:float=1.0;
var speed:float=10.0;
var randomSpeed:boolean;
var randomRange:float=5.0;

var originY:float;
var frequent:float=2.0;
var frequentRange:float=1.0;


var ent:Entity;
var head:exSprite;

var damageText:GameObject;

var score:int;
var exp:int;
var fish:int;

var sm:ScoreManager;

var HPbar:exSprite;

var maxHP:int;

var protection:Protection;

var hitHurt:int;

var boom:GameObject;

var freezeToggle:float;
var freezeInterval:float=1.5;
var freezing:boolean=false;

var ghost:boolean=false;


enum HurtType
{
	Beam,
	Shell,
	Explosion,
	Suicide,
	Freeze
}

function Awake()
{
	//sm=GameObject.Find("ScoreManager").GetComponent(ScoreManager) as ScoreManager;
	//am=GameObject.Find("AudioManager").GetComponent(AudioManager) as AudioManager;
	
	ent=GetComponent(Entity) as Entity;
	myTransform=this.transform;
	
	originY=myTransform.position.y;
	
	//target=GameObject.FindGameObjectWithTag("Player").transform;
	
	
	maxHP=HP;
	
	if (randomSpeed)
	{
		originSpeed+=Random.Range(-randomRange,randomRange);
	}
	
	frequent+=Random.Range(-frequentRange,frequentRange);
	
	speed=originSpeed*speedFactor;
}

function Start () 
{

}

function Hurt(_damage:int,_type:HurtType)
{
	if (_type==HurtType.Freeze)
	{
		HP-=_damage;
		freezeToggle=0.0;
		freezing=true;
		speedFactor=0.5;
	}
	
	if (protection!=null && _type!=HurtType.Explosion)
	{
		HP-=_damage*0.3;
		head.color.r=0;
		head.color.b=0;
		protection.Hurt(_damage,_type);
	}
	else 
	{
		HP-=_damage;
		head.color.g=0;
		head.color.b=0;
	}
	
	
	//var damageObj:GameObject=Instantiate(damageText,myTransform.position,Quaternion.identity);
	//var text:DamageText=damageObj.GetComponent(DamageText) as DamageText;
	//text.SetText(damage.ToString());
}

function Update () {
	if (!ent.alive)
	{
		sm.AddScore(score);
		sm.AddExp(exp);
		sm.AddFish(fish);
		sm.AddChain();
		Destroy(this.gameObject);
	}
	else
	{
		
		if (myTransform.position.x-Camera.main.transform.position.x<-300)
		{
			//ent.alive=false;
			sm.ResetChain();
			Destroy(this.gameObject);
		}
		
		head.color.r+=5*Time.deltaTime;
		head.color.g+=5*Time.deltaTime;
		head.color.b+=5*Time.deltaTime;
		
		if (freezing)
		{
		
			if (freezeToggle<freezeInterval)
			{
				freezeToggle+=Time.deltaTime;
			}
			else
			{
				speedFactor=1.0;
				freezeToggle=0.0;
				freezing=false;
			}
			head.color=Color.blue;
			
		}
		
		speed=originSpeed*speedFactor;
		
		
		if (HP<0)
		{
			HP=0;
			Explode();
			ent.alive=false;
		}
		HPbar.scale.x=HP*(100.0/maxHP);
	}
}


function Explode()
{
	am.audio.PlayOneShot(am.explosion[0]);
	Instantiate(boom,myTransform.position,Quaternion.identity);
}