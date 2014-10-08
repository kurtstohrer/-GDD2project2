/*
loader.js
variable 'app' is in global scope - i.e. a property of window.
app is our single global object literal - all other functions and properties of 
the game will be properties of app.
*/
"use strict";

// if app exists use the existing copy
// else create a new object literal
var app = app || {};

app.KEYBOARD = {
	"KEY_LEFT": 37,
	"KEY_UP": 38,
	"KEY_RIGHT": 39,
	"KEY_DOWN": 40,
	"KEY_SPACE": 32,
	"KEY_W": 87,
	"KEY_A": 65,
	"KEY_S": 83,
	"KEY_D": 68
};

app.keydown = [];

app.IMAGES = 
{
	shipImage: "images/Hunter1.png",
	enemyImage: "images/Drone1.png"
};

window.onload = function(){
	console.log("window.onload called");
	app.ship.drawLib = app.drawLib;
	app.blastem.drawLib = app.drawLib;
	app.blastem.app = app;
	app.blastem.utils = app.utils;
	
	//app.blastem.init(app.ship);
	
	app.queue = new createjs.LoadQueue(false);
	app.queue.installPlugin(createjs.Sound)
	app.queue.on("complete", function()
	{
		app.blastem.init(app.ship, app.shipb);
	});
	
	app.queue.loadManifest([
		{id: "shipImage", src:"images/Hunter1.png"},
		{id: "enemyImage", src:"images/Drone1.png"}
	]);
	
	window.addEventListener("keydown", function(e){
		//console.log("keydown " + e.keyCode);
		app.keydown[e.keyCode] = true;
	});
	
	window.addEventListener("keyup", function(e){
		//console.log("keyup");
		app.keydown[e.keyCode] = false;
	});
}