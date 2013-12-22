/**
 * @author pworman
 */

/* establish window size*/

/*var winw=window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;*/

var winw=screen.width
var winh=screen.height

/*var winh=window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;*/

function randomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function convert2Hex()
{
var numberAsk=parseInt(window.prompt('Enter a number'));

var answer=numberAsk.toString(16);

window.alert(answer)
}


function randomColour()
{return '#'+Math.random().toString(16).substring(4)}

function switchBG()
{
	colour='#'+Math.random().toString(16).substring(4);
	
	document.body.style.backgroundColor=colour;
		
}
function randomRGB(){
    var r = function () { return Math.floor(Math.random()*256) };
    return r() + "," + r() + "," + r();
}

document.getElementById("dimensions").innerHTML=("Window dimensions are: "+w+"x"+h);

document.getElementById("dateline").innerHTML=("The date is "+Date());

