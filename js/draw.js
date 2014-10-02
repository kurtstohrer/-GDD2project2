// draw.js
// dependencies: none
"use strict";
var app = app || {};

app.draw = {
   clear : function(ctx, x, y, w, h) {
			ctx.clearRect(x, y, w, h);
	},
	
	rect : function(ctx, x, y, w, h, col) {
			ctx.fillStyle = col;
			ctx.fillRect(x, y, w, h);
	},
	//draw just a border for menu selections
	border :function(ctx, x, y, w, h, col) {
		  ctx.lineWidth = 10;
		  ctx.strokeStyle = col;
          ctx.strokeRect(x, y, w, h);; 
	},
	circle : function(ctx, x, y, r, col) {
			ctx.fillStyle = col;
			ctx.beginPath();
			ctx.arc(x + 5, y + 5, r, 0,  Math.PI * 2, true);
			ctx.closePath();
			ctx.fill();
	},
	
	text : function(ctx, string, x, y, size, col) {
			ctx.font = 'bold '+size+'px Monospace';
			ctx.fillStyle = col;
			ctx.fillText(string, x, y);
	},
	
	backgroundGradient: function(ctx, width, height){
		// Create gradient - top to bottom
		var grd = ctx.createLinearGradient(width / 2, 0, width / 2, height);
     
		grd.addColorStop(0, '#593178');   
      
		grd.addColorStop(.5, '#250240');
		grd.addColorStop(1, '#130121');
		ctx.fillStyle = grd;
		//ctx.fill();
			
		ctx.fillRect(0,0,width,height);
	}
			
};
