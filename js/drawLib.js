//draeLib.js
"use strict"

var app = app || {};

app.drawLib = {
	clear : function(ctx, x,y,w,h)
	{
		ctx.clearRect(x,y,w,h);
	},
	
	rect : function(ctx, x, y, w, h, col)
	{
		ctx.save();
		ctx.fillStyle = col;
		ctx.fillRect(x,y,w,h);
		ctx.restore();
	},
	
	text: function(ctx, string, x, y, size, col)
	{
		ctx.save();
		ctx.font = 'bold ' + size + 'px Monospace';
		ctx.fillStyle = col;
		ctx.fillText(string, x, y);
		ctx.restore();
	},
	
	backgroundGradient : function(ctx, width, height)
	{
		ctx.save();
		var grad = ctx.createLinearGradient(0,0,0,height);
		grad.addColorStop(0,"#888");
		grad.addColorStop(1,"black");
		
		ctx.fillStyle = "black";
		ctx.fillRect(0,0,width,height) //what's the point of the rect function if we're just going to do this?
		ctx.restore();
	}
};