//gem.js

"use strict"

var app = app || {};

app.Gem = function()
{
	function Gem(width,height, gemImage)
	{
		this.x = Math.random() * width;
		this.y = Math.random() * height;
		this.active = true;
		this.xVelocity = Math.random() * 40 - 20; // added initial velocities
		this.yVelocity = Math.random() * 30 - 15; // added initial velocities
		this.velocityPlus;
		this.radius = 10;
		this.color = "#0F0";
		this.closestShip = undefined;
		//image
		this.image = gemImage;
		this.spriteSize = 20;
		this.spriteCrop = 16
		
		//for animation
		this.imgIndex = 0;
		this.ticsPerFrame = 4;
		this.tics = 0;
		this.animating = false;
		this.counter = 0;
	}
	
	var p = Gem.prototype;
	
	p.constructor = function()
	{
	}
	
	p.update = function(dt)
	{
		// BEGIN FORREST CODE -- The Wicked Awesome that is Argzero's code
		/// <summary>
		/// determines the closest ship to this gem in range of this gem if there is one
		/// </summary>
		//*
		var shipA, shipB;
		shipA = app.ship;
		shipB = app.shipb;
		this.velocityPlus = (!this.velocityPlus)? 1: this.velocityPlus;
		
		var distA, distB;
		var currentDistance;
		distA = distance({x:shipA.x, y:shipA.y}, {x:this.x, y:this.y});
		distB = distance({x:shipB.x, y:shipB.y}, {x:this.x, y:this.y});
		
		if(distA < distB && (distA < shipA.radius*5 + 120))
		{
			this.closestShip = shipA;
			currentDistance = distA;
		}
		else if(distB < distA && (distB < shipB.radius*5 + 120))
		{
			this.closestShip = shipB;
			currentDistance = distB;
		}
		else {this.closestShip = undefined;}
		// *
		
		/// <summary>
		/// modifies velocity to head towards the nearest ship within range
		/// </summary>
		// *
		if(this.velocityPlus < 10) { this.velocityPlus += 0.2; }
			
			
		var heading1;
		var direction1;
		var heading2;
		var direction2;
		var avgHead;
		var avgDir = {x: 0, y: 0};
		var avgDist;
		if((distA<shipA.radius*5 + 50) && !(distB<shipB.radius*5 + 50)){
			heading1 = {x: this.x-shipA.x, y: this.y-shipA.y};
			avgHead = heading1;
			direction1 = {x: heading1.x/distA,y: heading1.y/distA};
			avgDir = direction1;
		}
		else if((distB<shipB.radius*5 + 50) && !(distA<shipA.radius*5 + 50)){
			heading2 = {x: this.x-shipB.x, y: this.y-shipB.y};
			avgHead = heading2;
			direction2 = {x: heading2.x/distB,y: heading2.y/distB};
			avgDir = direction2;
		}
		else if((distA<shipA.radius*5 + 50) && (distB<shipB.radius*5 + 50)){
			heading1 = {x: this.x-shipA.x, y: this.y-shipA.y};
			heading2 = {x: this.x-shipB.x, y: this.y-shipB.y};
			avgHead = averageVector(heading1,heading2);
			avgDist = Math.abs(vectorMagnitude(avgHead));
			avgDir = {x: avgHead.x/avgDist,y: avgHead.y/avgDist};;
		}
		else 
		{
			if(this.velocityPlus > 1) { this.velocityPlus -= 0.1; }
		}

		var mag = vectorMagnitude({x: this.xVelocity, y: this.yVelocity});
		var newVector = {x: this.xVelocity-((0.1)*(mag*avgDir.x)), y: this.yVelocity-((0.1)*(mag*avgDir.y))};
		newVector = multVector(normalizeVector(newVector),mag);
		this.xVelocity = newVector.x;
		this.yVelocity = newVector.y;
			
		
		// *
		// END FORREST CODE
		
		
		this.x += (this.xVelocity * (this.velocityPlus)) * dt * app.main.elapsed/10;
		this.y += (this.yVelocity * (this.velocityPlus)) * dt * app.main.elapsed/10;
	};
	
	p.draw = function(ctx)
	{
		// BEGIN CHAD CODE
		// if not animating increment counter
		if(!this.animating)
		{
			this.counter += 1;
		}
		
		// if the counter reaches 200 allow animation
		if(this.counter > 100)
		{
			this.animating = true;
		}
		
		// if animation is allowed, animate
		if(this.animating)
		{
			this.animate();
		}
		// END CHAD CODE
		
		ctx.save();
		
		// BEGIN CHAD CODE
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
		// END CHAD CODE
			
		ctx.restore();
		//console.log("drawing gem:" + this.x + " " + this.y);
	};
	
	// BEGIN CHAD CODE
	// controls animation
	p.animate = function()
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
			if(this.imgIndex == 15)
			{
				// reset the counter, imgIndex and turn animating off
				this.imgIndex = 0;
				this.counter = 0;
				this.animating = false;
			}
			else this.imgIndex += 1;
		}
	}
	// END CHAD CODE
	
	function inBounds(y)
	{
		return y >= -10;
	};
	
	return Gem;
}();