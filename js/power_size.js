//power_size.js

"use strict"

var app = app || {};

app.power_size = function()
{
	function power_size(width,height, image)
	{
		this.x = Math.random() * width;
		this.y = Math.random() * height;
		this.active = true;
		this.xVelocity = 0;
		this.yVelocity = 0;
		this.radius = 20;
		this.color = "#FFEC00";
		
		//image
		this.img = image;
		this.spriteSize = 20;
		this.spriteCrop = 32;
		this.rotAngle = 0;
		this.rotAmt = 60;
		
		//for animation
		this.imgIndex = 1;
		this.ticsPerFrame = 18;
		this.tics = 0;
		this.animating = false;
		this.counter = 0;
	}
	
	var p = power_size.prototype;
	
	p.update = function(dt)
	{
		this.x += this.xVelocity * dt;
		this.y += this.yVelocity * dt;
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
		if(this.counter > 0)
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
		
		ctx.translate(this.x, this.y);
		// BEGIN CHAD CODE
		ctx.drawImage(
			this.img, //image
			(this.imgIndex*this.spriteCrop), //x of the sprite sheet
			0, // y of the sprite sheet
			this.spriteCrop, // width of the crop
			this.spriteCrop, // height of the crop
			-(this.spriteSize/2), // x coord of where to draw
			-(this.spriteSize/2), // y coord of where to draw
			this.spriteSize, // width to draw the image
			this.spriteSize); // height to draw the image
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
			if(this.imgIndex == 2)
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
	
	return power_size;
}();