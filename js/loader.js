/*
loader.js
variable app is in global scope - i.e. a property of window.
app is our single global object literal - all other functions and properties of 
the bubbles game will be properties of app.
*/
"use strict";

// if app exists use the existing copy
// else create a new object literal
var app = app || {};

// CONSTANTS
app.KEYBOARD = {
	"KEY_LEFT": 37,
	"KEY_UP": 38,
	"KEY_RIGHT": 39,
	"KEY_DOWN": 40,
	"KEY_SPACE": 32,
	"KEY_W": 87,
	"KEY_A": 65,
	"KEY_S": 83,
	"KEY_D": 68,
	"KEY_ENTER": 13,
	"KEY_L": 76,

	
};
app.keydown = [];

app.IMAGES = {
   
 };



app.animationID = undefined;
app.paused = false;

// app.keydown array to keep track of which keys are down
// this is called a "key daemon"
// blastem.js will "poll" this array every frame
// this works because JS has "sparse arrays" - not every language does
app.keydown = [];

// the Modernizr object is from the modernizr.custom.js file
Modernizr.load(
	{ 
		// load all of these files
		load : [
		
			'js/main.js',
			'js/drawLib.js',
			'js/gem.js',
			'js/ship.js',
			'js/shipb.js',
			'js/utils.js',
			'js/power_size.js',
			'js/power_speed.js',
			'js/power_weight.js',
			'js/power_acceleration.js',
		],
		
		// when the loading is complete, this function will be called
		complete: function(){
			
			// set up event handlers
			window.onblur = function(){
				app.paused = true;
				cancelAnimationFrame(app.animationID);
				app.keydown = []; // clear key daemon
				// call update() so that our paused screen gets drawn
				app.main.update();
				//createjs.Sound.stop();
				
			};
			
			window.onfocus = function(){
				app.paused = false;
				cancelAnimationFrame(app.animationID);
				// start the animation back up
				app.main.update();
				//app.main.startSoundtrack();
			};
			
			// event listeners
			window.addEventListener("keydown", function(e){
		//console.log("keydown " + e.keyCode);
		app.keydown[e.keyCode] = true;
	});
	
	window.addEventListener("keyup", function(e){
		//console.log("keyup");
		app.keydown[e.keyCode] = false;
	});
			
			
			// start game
			app.main.init();
		} // end complete
		
	} // end object
); // end Modernizr.load