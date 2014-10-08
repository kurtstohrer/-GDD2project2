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
	x: 700,
	y: 450,
	radius: 17,
	speed: 30,
	xVelocity: 0,
	yVelocity: 0,
	maxVelocity: 10,
	image: undefined,
	drawLib: undefined,
	
	
	init: function(){
		console.log("app.ship.init() called");
	
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
		
	}
}; // end app.ship