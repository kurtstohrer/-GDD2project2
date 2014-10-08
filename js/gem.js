//gem.js

"use strict"

var app = app || {};

app.Gem = function()
{
	function Gem(width,height)
	{
		this.x = Math.random() * width;
		this.y = Math.random() * height;
		this.active = true;
		this.xVelocity = 0;
		this.yVelocity = 0;
		this.radius = 12;
		this.color = "#0F0";
	}
	
	var p = Gem.prototype;
	
	p.update = function(dt)
	{
		this.x += this.xVelocity * dt;
		this.y += this.yVelocity * dt;
	};
	
	p.draw = function(ctx)
	{
		ctx.save();
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius / 3, 0, Math.PI * 2);
		ctx.closePath();
		ctx.fill()
		ctx.restore();
		//console.log("drawing gem:" + this.x + " " + this.y);
	};
	
	function inBounds(y)
	{
		return y >= -10;
	};
	
	return Gem;
}();