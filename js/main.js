"use strict";
var GA = document.getElementById('gameArea');
var GC= document.getElementById('gameCanvas');
var app = app || {};

app.main = {
	
	// CONSTANT properties
    	WIDTH : 1800, 
    	HEIGHT:950,
		    dt: 1/60.0,

    	
		// variable properties
		canvas : undefined,
		ctx :  undefined,
		aspectRatio: undefined,
		
	
	init: function () {
		this.canvas = document.querySelector('canvas');
		
		this.aspectRatio = this.WIDTH / this.HEIGHT;
			
	
			// interact with the canvas api
		this.ctx = this.canvas.getContext('2d');
		
		this.update();
		
	
	},
	

	update: function (){
    	// clear screen
    	this.resizeGame();
    	app.draw.clear(this.ctx,0,0,this.WIDTH,this.HEIGHT);
		
		
		app.animationID = requestAnimationFrame(this.update.bind(this));
	},
	
	
	draw: function (){

	
	
	},
	
	resizeGame: function (){
	
	var gameArea = document.getElementById('gameArea');
    var widthToHeight = this.aspectRatio;
    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight;
    var newWidthToHeight = newWidth / newHeight;
    
    if (newWidthToHeight > widthToHeight) {
        newWidth = newHeight * widthToHeight;
        gameArea.style.height = newHeight + 'px';
        gameArea.style.width = newWidth + 'px';
    } else {
        newHeight = newWidth / widthToHeight;
        gameArea.style.width = newWidth + 'px';
        gameArea.style.height = newHeight + 'px';
    }
    
    gameArea.style.marginTop = (-newHeight / 2) + 'px';
    gameArea.style.marginLeft = (-newWidth / 2) + 'px';
    
    var gameCanvas = document.getElementById('gameCanvas');
    gameCanvas.width = newWidth;
    gameCanvas.height = newHeight;
	
	},
	
	
	
	
	
 //sounds
 /*
  startSoundtrack: function(){
	createjs.Sound.stop();
	createjs.Sound.play("soundtrack",{loop:-1, volume: 0.5});
 
 },
 
 */

};