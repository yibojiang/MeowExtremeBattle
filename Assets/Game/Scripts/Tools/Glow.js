var startAlpha:float;
var endAlpha:float;
var exsprite:exSprite;
var lerp:boolean=false;
var lerpSpeed:float=1.0;

var notRandom:boolean;
private var randomTime:float;

function Awake()
{
	exsprite=this.GetComponent(exSprite);
	
	if (notRandom)
	{
		
	}
	else
	{
		randomTime=Random.value*100;
		//exsprite.color.a=randomTime;
		//Debug.Log(exsprite.color.a);
	}
}

function Update () {
	if (lerp)
	{
		exsprite.color.a=startAlpha+Mathf.PingPong(lerpSpeed*(Time.time+randomTime), endAlpha-startAlpha);
		
	}
	else
	{
		exsprite.color.a=Random.Range(startAlpha,endAlpha);
	}
}