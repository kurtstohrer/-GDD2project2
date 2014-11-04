// ship.js
// Dependencies: 
// Description: singleton object that is a module of app
// properties of the ship and what it needs to know how to do go here

"use strict";

// if app exists use the existing copy
// else create a new object literal
var app = app || {};

// the 'ship' object literal is now a property of our 'app' global variable
app.ship = {
	color: "yellow",
	x: app.main.WIDTH/2 + 200,
	y: 450,
	radius: 21,
	speed: 25,
	xVelocity: 0,
	yVelocity: 0,
	maxVelocity: 10,
	image: undefined,
	spriteSize: 42,
	spriteCrop: 32,
	imgIndex: 0,
	tics: 0,
	ticsPerFrame: 8,
	drawLib: undefined,
	weight: 5,
	
	
	init: function(shipImage){
		console.log("app.ship.init() called");
		
		this.image = shipImage;
	},
	update: function(){
		if(app.main.gameState == 3){
			this.x = app.main.WIDTH /2 + 600;
			this.y = 200;
			
		
		}
	},
	
	moveLeft: function(dt)
	{
		this.xVelocity -= this.speed * dt;
		if (this.xVelocity < -this.maxVelocity)
		{
			this.xVelocity = -this.maxVelocity;
		}
	},
	
	moveRight: function(dt)
	{
		this.xVelocity += this.speed * dt;
		if (this.xVelocity > this.maxVelocity)
		{
			this.xVelocity = this.maxVelocity;
		}
	},
	
	moveUp: function(dt)
	{
		this.yVelocity -= this.speed * dt;
		if (this.yVelocity < -this.maxVelocity)
		{
			this.yVelocity = -this.maxVelocity;
		}
	},
	
	moveDown: function(dt)
	{
		this.yVelocity += this.speed * dt;
		if (this.yVelocity > this.maxVelocity)
		{
			this.yVelocity = this.maxVelocity;
		}
	},
	
	draw: function(ctx)
	{
		this.animate();
		
		if(!this.image)
		{
			ctx.save();
			ctx.fillStyle = this.color;
			ctx.beginPath();
			ctx.arc(this.x,this.y,this.radius, 0, 2*Math.PI, false);
			ctx.closePath();
			ctx.fill();
			ctx.restore();
		}
		
		// BEGIN CHAD CODE
		else
		{
			ctx.save();
			
			ctx.drawImage(
			this.image, //image
			(this.imgIndex*this.spriteCrop), //x of the sprite sheet
			0, // y of the sprite sheet
			this.spriteCrop, // width of the crop
			this.spriteCrop, // height of the crop
			this.x - (this.spriteSize/2), // x coord of where to draw
			this.y - (this.spriteSize/2), // y coord of where to draw
			this.spriteSize, // width to draw the image
			this.spriteSize); // height to draw the image
			
			ctx.restore();
		}
	},
	
	animate: function()
	{
		// increment tics
		this.tics += 1;
		
		// if tics is >= the tics allowed per frame
		// this controls the speed of the animation
		if(this.tics >= this.ticsPerFrame)
		{
			// reset tics
			this.tics = 0;
			
			// if we have reached the end of the sprite sheet
			// if not, increment the imgIndex
			if(this.imgIndex == 2)
			{
				// reset the counter, imgIndex and turn animating off
				this.imgIndex = 0;
				this.counter = 0;
				//this.animating = false;
			}
			else this.imgIndex += 1;
		}
	}
	// END CHAD CODE
}; // end app.ship