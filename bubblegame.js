/**
 * @author pworman
 */

var circles=[] // just enemies
var playerList=[] // just player
var started=false
var timer=0
var intervals=[]
var flakes=[]
var presents=[]
var masterList=[]
var presentScore=0
var highScore=0


var c=document.getElementById("canvas1");
var ctx=c.getContext("2d");
var w=ctx.canvas.clientWidth;
var h=ctx.canvas.clientHeight;

function levelUp(){
var adjust=timer/45
return adjust
}

function Circle(radius){
		
	this.x=randomInt(0,w);
	this.y=randomInt(0,h);
	this.dx=randomInt(-2,2)/3;
	this.dx+=levelUp()
	this.dy=randomInt(-2,2)/3;
	this.dy+=levelUp()
	this.radius=radius;
	this.startRadius=radius;
	this.hit=false;
	this.type="circle";
	this.alpha=1
	this.colour="rgba("+randomRGB()+","+this.alpha+")";
	
	
	this.max=randomInt(2,12);
	
	this.alive=true;
	
	this.draw=function(){
	
	this.radius+=(1/500*this.startRadius);
		if (this.radius>=this.startRadius*this.max){this.alive=false}
	
	
		ctx.fillStyle=this.colour;
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
		ctx.fill();
		ctx.closePath()
		}
		
	this.bounding=function(){
		  if ((this.x+this.radius + this.dx )> w || this.x + this.dx < this.radius)
  		 { this.dx = -this.dx;
if (this.type=="player"){this.life-=1;}
}
 		 if ((this.y +this.radius+ this.dy )> h || this.y + this.dy < this.radius)
  		{this.dy = -this.dy;
if (this.type=="player"){this.life-=1;}}

}

	
	this.move=function(){
		this.x+=this.dx;
		this.y+=this.dy;}
	
	;}

function SnowFlake(){
this.radius=20;
this.x=randomInt(30,w-30);
this.y=-20
this.hits=0
this.hit=false
this.type="snowFlake";

}

SnowFlake.prototype=new Circle();

SnowFlake.prototype.move=function(){

this.y+=.25;
if (randomInt(1,10)<6){
this.x+=1}
else {this.x-=1}


}

SnowFlake.prototype.draw=function(){

  ctx.drawImage(snowflake, this.x-15, this.y-15, 30, 30)

}

SnowFlake.prototype.bounding=function(){

if (this.y>(h+20)){
this.alive=false
} }

function Player(){
this.radius=20;
this.x=h/2; this.y=w/2;
this.colour="black";
this.alpha=1
this.type="player";
this.life=250;
this.hits=0;
}

function Present(){

this.type="present";
this.x=randomInt(25,w-30);
this.y=-20
}

Present.prototype=new SnowFlake();

Present.prototype.draw=function(){

		ctx.drawImage(present, this.x-25, this.y-25, 50, 50)

}


Player.prototype=new Circle();

Player.prototype.move=function(){

		
		this.x-=ipx/20
		this.y+=ipy/20
		
}

Player.prototype.draw=function(){
		
		ctx.fillStyle=this.colour
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
		ctx.fill();
		
		ctx.drawImage(santa, this.x-15, this.y-15, 30, 30)
		

		}

function createCircle(circleList){
	
	var circle=new Circle(randomInt(5, 12));
	circleList.push(circle);
	masterList.push(circle)
	
	
}

function dropSnowflake(circleList){
var snowflake=new SnowFlake()
circleList.push(snowflake);
masterList.push(snowflake);

}

function dropPresent(circleList){
var present=new Present();
circleList.push(present);
masterList.push(present);}

function scanCollisions(){

p=playerList[0];
p.hit=false

		collisionCheck(flakes, p);
		if (p.hit){p.life+=50; if (p.life>275){p.life=275}}
		
		p.hit=false;
		
		collisionCheck(presents, p);
		if (p.hit){p.colour="green";p.alpha=1; presentScore+=10};
		
		p.hit=false
	
		collisionCheck(circles, p);
		if (p.hit){p.colour="red"; p.alpha=1;p.life-=3.5}
		
		else {p.colour="white"; p.alpha=0}
		
}

function remove(element, list){

var index=list.indexOf(element)

list.splice(index, 1)
return list

}

function renderCircles(list){
	
	ctx.clearRect(0,0,w,h);
	
	scanCollisions()
	
	
		
	for (var i=0; i<list.length; i++){
			
		var item=list[i];
		
		
		if (item.alive==false){
			list.splice(i,1)
			
			//remove from specific lists
			
			if (item.type=="snowFlake"){
			remove(item, flakes)}
			
			else if (item.type=="circle"){
			remove(item, circles)}
			
			else if (item.type=="present"){
			remove(item, presents)}
			
		
			
			
		} 
		
		for (var j=0; j<list.length; j++){
		
		list[j].bounding();
		list[j].move();
		list[j].draw();
		
		}		
}   	
p=playerList[0];
if (p.life<=0){
		gameOver()}
	}
	

 window.addEventListener('deviceorientation', function (event) {
  ipx = event.beta;

  ipy = event.gamma;
  
}, true);

function reset(){

for (i=0; i<intervals.length; i++){
clearInterval(intervals[i])
}

list=[] // all elements to be rendered
circles=[] // just enemies
flakes=[]
playerList=[] // just player
masterList=[]
presents=[]
presentScore=0

timer=0
started=false

ctx.clearRect(0,0,w,h);

}

function startUp(){
if (started===false){

var elem = document.getElementById("playagain");
elem.style.visibility="hidden";

var elements=document.getElementsByClassName("intro");
for (var i=0; i<elements.length; i++){
elements[i].style.visibility="hidden";}

var newElements=document.getElementsByClassName("data");
for (var j=0; j<newElements.length; j++){
newElements[j].style.visibility="visible";}

var player=new Player();
playerList.push(player);
masterList.push(player)

circleDraw=setInterval("renderCircles(masterList)", 20);
     
circleGen=setInterval("createCircle(circles)",2000);

snowDrop=setInterval("dropSnowflake(flakes)", 6000);

presentDrop=setInterval("dropPresent(presents)", 5000)


gameTimer=setInterval("incrementTimer()", 1000);

intervals.push(circleGen, circleDraw,gameTimer,snowDrop, presentDrop);

started=true}

}


function incrementTimer(){
timer+=1
document.getElementById("timer").innerHTML=("Survived: "+timer+" seconds");
}


function collision (p1x, p1y, r1, p2x, p2y, r2) {
    var a;
    var x;
    var y;

    a = r1 + r2;
    x = p1x - p2x;
    y = p1y - p2y;

   if(a > Math.sqrt(x*x + y*y)) { 
        return true;
    } else {
        return false;
    }   
}

function collisionCheck(circleInput, player){

var startHits=player.hits;

for (var k=0; k<circleInput.length; k++){


c=circleInput[k];

if  (collision(c.x, c.y, c.radius, player.x, player.y, player.radius ))
 {player.hits+=1;

if (c.type=="snowFlake" || c.type=="present"){c.alive=false}
}

if (player.hits>startHits){
player.hit=true; 

}
else {player.hit=false; }

document.getElementById("score").innerHTML=("Bonus: "+presentScore);
document.getElementById("highscore").innerHTML=("Highscore: "+highScore);
//document.getElementById("hit").innerHTML=("hit="+player.hit);

var elem = document.getElementById("life");
elem.style.width = player.life+"px";
if (player.life>200){elem.style.background="green"}
else if (player.life<200 && player.life >100){elem.style.background="yellow"}
else if (player.life<100){elem.style.background="red"}

}

}

function gameOver(){

var total=presentScore+timer;
if (total>highScore){
highScore=total}
reset();
var elem = document.getElementById("playagain");
elem.style.visibility="visible";

ctx.font="50px Electrolize"
ctx.fillStyle="white"
ctx.fillText("G A M E   O V E R", w/4-30, h/2-70)
ctx.fillText("Score: "+total, w/4+50, h/2-10)
ctx.fill()

//window.setTimeout(startUp,2000)


}
