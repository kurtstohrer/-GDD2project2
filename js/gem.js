//gem.js

"use strict"

var app = app || {};

function returnAbove(floatValue, min){
	if(Math.abs(floatValue)<Math.abs(min)){
		return floatValue * (min/floatValue);
	}
	return floatValue;
}

app.Gem = function()
{
	function Gem(width,height, gemImage)
	{
		this.x = Math.random() * width;
		this.y = Math.random() * height;
		this.active = true;
		this.xVelocity = Math.random() * 16 - 8; // added initial velocities
		this.yVelocity = Math.random() * 9 - 4.5; // added initial velocities
		
		this.xVelocity = (this.xVelocity<0)? returnAbove(this.xVelocity,-2): (this.xVelocity>0)? returnAbove(this.xVelocity,2): 0;
		this.yVelocity = (this.yVelocity<0)? returnAbove(this.yVelocity,-1): (this.yVelocity>0)? returnAbove(this.yVelocity,1): 0;
		
		this.velocityPlus;
		this.radius = 10;
		this.color = "#0F0";
		this.closestShip = undefined;
		//image
		this.image = gemImage;
		this.spriteSize = 20;
		this.spriteCrop = 16
		this.rotAngle = 0;
		this.rotAmt = 60;
		
		//for animation
		this.imgIndex = 1;
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
		/// determines 
		
		//the closest ship to this gem in range of this gem if there is one
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
		if(this.velocityPlus < 15) { this.velocityPlus += 0.2; }
					
		var heading1;
		var direction1;
		var heading2;
		var direction2;
		var avgHead;
		var avgDir = {x: 0, y: 0};
		var avgDist;
		var aInRange = (distA<shipA.radius*5 + 50);
		var bInRange = (distB<shipB.radius*5 + 50);
		
		if(!aInRange || !bInRange){
			if(distA < 10) { distA = 10; }
			if(distB < 10) { distB = 10; }
		}
		if(aInRange && !bInRange){
			heading1 = {x: this.x-shipA.x, y: this.y-shipA.y};
			avgHead = heading1;
			direction1 = {x: heading1.x*(shipA.weight/2)/distA,y: heading1.y*(shipA.weight/2)/distA};
			avgDir = direction1;
			
		}
		else if(bInRange && !aInRange){
			heading2 = {x: this.x-shipB.x, y: this.y-shipB.y};
			avgHead = heading2;
			direction2 = {x: heading2.x*(shipB.weight/2)/distB,y: heading2.y*(shipB.weight/2)/distB};
			avgDir = direction2;
		}
		else if(aInRange && bInRange){
			heading1 = {x: this.x-shipA.x, y: this.y-shipA.y};
			heading1 = multVector(heading1, (shipA.weight/2));
			heading2 = {x: this.x-shipB.x, y: this.y-shipB.y};
			heading1 = multVector(heading2, (shipB.weight/2));
			avgHead = averageVector(heading1,heading2);
			avgDist = Math.abs(vectorMagnitude(avgHead));
			avgDir = {x: avgHead.x/avgDist,y: avgHead.y/avgDist};;
		}
		else 
		{
			if(this.velocityPlus > 1) { this.velocityPlus -= 0.1; }
		}

		var mag = vectorMagnitude({x: this.xVelocity, y: this.yVelocity});
		
		if(aInRange || bInRange){
			if(this.rotAmt < 150 && avgDir.x < 0){
				this.rotAmt +=5;
			}
			else if (this.rotAmt > -150 && avgDir.x > 0){
				this.rotAmt -=5;
			}
		}
		
		var newVector = {x: this.xVelocity-((0.1)*(avgDir.x)), y: this.yVelocity-((0.1)*(avgDir.y))};
		newVector = multVector(normalizeVector(newVector),mag);
		this.xVelocity = newVector.x;
		this.yVelocity = newVector.y;
			
		
		// *
		// END FORREST CODE
		
		if(app.main.gameState == 2 || app.main.gameState == 5){
			this.x += (this.xVelocity * (this.velocityPlus)) * dt * app.main.elapsed/10;
			this.y += (this.yVelocity * (this.velocityPlus)) * dt * app.main.elapsed/10;
			if(this.x < 0 - this.radius)
			{
				this.x = app.main.WIDTH + this.radius;
			}
			if(this.x > app.main.WIDTH + this.radius)
			{
				this.x = 0 - this.radius;
			}
			if(this.y < 0 - this.radius)
			{
				this.y = app.main.HEIGHT + this.radius;
			}
			if(this.y > app.main.HEIGHT + this.radius)
			{
				this.y = 0 - this.radius;
			}
		}
		else{
		
		
		}
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
		ctx.translate(this.x, this.y);
		ctx.rotate(this.rotAngle * (Math.PI/180));
		this.rotAngle += this.rotAmt * app.main.dt;
		this.rotAngle = (this.rotAngle>360)? this.rotAngle-360: (this.rotAngle<-360)? this.rotAngle+360: this.rotAngle;
		ctx.drawImage(
			this.image, //image
			(this.imgIndex*this.spriteCrop), //x of the sprite sheet
			0, // y of the sprite sheet
			this.spriteCrop, // width of the crop
			this.spriteCrop, // height of the crop
			-(this.spriteSize/2), // x coord of where to draw
			-(this.spriteSize/2), // y coord of where to draw
			this.spriteSize, // width to draw the image
			this.spriteSize); // height to draw the image
		// END CHAD CODE
			
		ctx.restore();
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
			if(this.imgIndex == 13)
			{
				// reset the counter, imgIndex and turn animating off
				this.imgIndex = 1;
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