// blastem.js
// Dependencies: 
// Description: singleton object
// This object will be our main "controller" class and will contain references
// to most of the other objects in the game.

"use strict";

// if app exists use the existing copy
// else create a new object literal
var app = app || {};

app.blastem = {
	// CONSTANT properties
    WIDTH : 1500, 
    HEIGHT: 900,
	GEM_PROBABILITY_PER_SECOND: 1.0,
    canvas: undefined,
    ctx: undefined,
    ship: undefined,
    shipb: undefined,
	drawLib: undefined,
	dt: 1/60.0,
	app: undefined,
	utils: undefined,
	gems: [],
	scorea: 0,
	scoreb: 0,
	friction: 15,
	
    
    // methods
	init : function(ship, shipb) {
			console.log("app.blastem.init() called");
			// declare properties
			this.canvas = document.querySelector('canvas');
			this.canvas.width = this.WIDTH;
			this.canvas.height = this.HEIGHT;
			this.ctx = this.canvas.getContext('2d');
			
			// set up player ship
			this.ship = ship;
			this.ship.init();
			
			this.shipb = shipb;
			this.shipb.init();
			
			this.update();
	},
	
	moveSprites: function()
	{
		if(this.app.keydown[this.app.KEYBOARD.KEY_LEFT])
		{
			this.ship.moveLeft(this.dt);
		}
		if(this.app.keydown[this.app.KEYBOARD.KEY_RIGHT])
		{
			this.ship.moveRight(this.dt);
		}
		if(this.app.keydown[this.app.KEYBOARD.KEY_UP])
		{
			this.ship.moveUp(this.dt);
		}
		if(this.app.keydown[this.app.KEYBOARD.KEY_DOWN])
		{
			this.ship.moveDown(this.dt);
		}
		
		if(this.app.keydown[this.app.KEYBOARD.KEY_A])
		{
			this.shipb.moveLeft(this.dt);
		}
		if(this.app.keydown[this.app.KEYBOARD.KEY_D])
		{
			this.shipb.moveRight(this.dt);
		}
		if(this.app.keydown[this.app.KEYBOARD.KEY_W])
		{
			this.shipb.moveUp(this.dt);
		}
		if(this.app.keydown[this.app.KEYBOARD.KEY_S])
		{
			this.shipb.moveDown(this.dt);
		}
		
		this.ship.x += this.ship.xVelocity;
		this.ship.y += this.ship.yVelocity;
		
		this.shipb.x += this.shipb.xVelocity;
		this.shipb.y += this.shipb.yVelocity;
		
		if(this.ship.xVelocity > 0)
		{
			if (this.ship.xVelocity < this.friction * this.dt)
			{
				this.ship.xVelocity = 0;
			}
			else
			{
				this.ship.xVelocity -= this.friction * this.dt;
			}
		}
		if(this.ship.xVelocity < 0)
		{
			if (this.ship.xVelocity > -this.friction * this.dt)
			{
				this.ship.xVelocity = 0;
			}
			else
			{
				this.ship.xVelocity += this.friction * this.dt;
			}
		}
		if(this.ship.yVelocity > 0)
		{
			if (this.ship.yVelocity < this.friction * this.dt)
			{
				this.ship.yVelocity = 0;
			}
			else
			{
				this.ship.yVelocity -= this.friction * this.dt;
			}
		}
		if(this.ship.yVelocity < 0)
		{
			if (this.ship.yVelocity > -this.friction * this.dt)
			{
				this.ship.yVelocity = 0;
			}
			else
			{
				this.ship.yVelocity += this.friction * this.dt;
			}
		}
		
		//shipb
		if(this.shipb.xVelocity > 0)
		{
			if (this.shipb.xVelocity < this.friction * this.dt)
			{
				this.shipb.xVelocity = 0;
			}
			else
			{
				this.shipb.xVelocity -= this.friction * this.dt;
			}
		}
		if(this.shipb.xVelocity < 0)
		{
			if (this.shipb.xVelocity > -this.friction * this.dt)
			{
				this.shipb.xVelocity = 0;
			}
			else
			{
				this.shipb.xVelocity += this.friction * this.dt;
			}
		}
		if(this.shipb.yVelocity > 0)
		{
			if (this.shipb.yVelocity < this.friction * this.dt)
			{
				this.shipb.yVelocity = 0;
			}
			else
			{
				this.shipb.yVelocity -= this.friction * this.dt;
			}
		}
		if(this.shipb.yVelocity < 0)
		{
			if (this.shipb.yVelocity > -this.friction * this.dt)
			{
				this.shipb.yVelocity = 0;
			}
			else
			{
				this.shipb.yVelocity += this.friction * this.dt;
			}
		}
		
		//this.ship.x = this.utils.clamp(this.ship.x, 0, this.WIDTH);
		//this.ship.y = this.utils.clamp(this.ship.y, 0, this.HEIGHT);

		
		//wrap when ship fully leaves screen
		if (this.ship.x < 0 - this.ship.radius)
		{
			this.ship.x = this.WIDTH + this.ship.radius;
		}
		else if (this.ship.x > this.WIDTH + this.ship.radius)
		{
			this.ship.x = 0 - this.ship.radius;
		}
		if (this.ship.y < 0 - this.ship.radius)
		{
			this.ship.y = this.HEIGHT + this.ship.radius;
		}
		else if (this.ship.y > this.HEIGHT + this.ship.radius)
		{
			this.ship.y = 0 - this.ship.radius;
		}
		
		//shipb
		if (this.shipb.x < 0 - this.shipb.radius)
		{
			this.shipb.x = this.WIDTH + this.shipb.radius;
		}
		else if (this.shipb.x > this.WIDTH + this.shipb.radius)
		{
			this.shipb.x = 0 - this.shipb.radius;
		}
		if (this.shipb.y < 0 - this.shipb.radius)
		{
			this.shipb.y = this.HEIGHT + this.shipb.radius;
		}
		else if (this.shipb.y > this.HEIGHT + this.shipb.radius)
		{
			this.shipb.y = 0 - this.shipb.radius;
		}
		
		if (Math.random() < this.GEM_PROBABILITY_PER_SECOND/60)
		{
			//console.log(this.gems);
			this.gems.push(new app.Gem(this.WIDTH, this.HEIGHT));
			//console.log("new gem " + xpos + " " + ypos);
		}
		
		this.gems = this.gems.filter(function(gem)
		{
			return gem.active;
		});
		
		var self = this;
		
		this.gems.forEach(function(gem)
		{
			gem.update(self.dt);
		});
	},
	
	checkCollisions: function()
	{
		var self = this;
		
		if(this.collides(this.ship, this.shipb))
		{
			console.log("collision!");
			var xVel = (this.ship.xVelocity + this.shipb.xVelocity) / 2;
			var yVel = (this.ship.yVelocity + this.shipb.yVelocity) / 2;
			
			var xBounce = (this.ship.xVelocity - this.shipb.xVelocity) * 0.5;
			var yBounce = (this.ship.yVelocity - this.shipb.yVelocity) * 0.5;
			
			this.ship.xVelocity = xVel - xBounce;
			this.ship.yVelocity = yVel - yBounce;
			this.shipb.xVelocity = xVel + xBounce;
			this.shipb.yVelocity = yVel + yBounce;
		}	

		this.gems.forEach(function(gem)
		{
			if (self.collides(gem, self.ship))
			{
				gem.active = false;
				self.scorea += 1;
			}
			if (self.collides(gem, self.shipb))
			{
				gem.active = false;
				self.scoreb += 1;
			}
		});
	},
	
	collides: function(a, b) //circle collision
	{
		var radsum = a.radius + b.radius;
		var xdiff = a.x - b.x;
		var ydiff = a.y - b.y;
		
		return radsum * radsum >= xdiff * xdiff + ydiff * ydiff;
	},
	
	update: function()
	{
		requestAnimationFrame(this.update.bind(this));
		
		this.drawLib.clear(this.ctx,0,0,this.WIDTH, this.HEIGHT);
		
		this.moveSprites();
		
		this.checkCollisions();
		
		this.drawLib.backgroundGradient(this.ctx, this.WIDTH, this.HEIGHT);
		
		this.ship.draw(this.ctx);
		this.shipb.draw(this.ctx);
		
		var self = this;
		
		this.gems.forEach(function(gem)
		{
			gem.draw(self.ctx);
		});
		
		this.drawLib.text(this.ctx, "" + this.scorea, 10, 20, 18, "yellow");
		this.drawLib.text(this.ctx, "" + this.scoreb, 10, 40, 18, "red");
		
		if(this.scorea >= 50)
		{
			setTimeout( function()
			{
				alert("player 1 wins!");
				location.reload();
			},25);
		}
		
		if(this.scoreb >= 50)
		{
			setTimeout( function()
			{
				alert("player 2 wins!");
				location.reload();
			},25);
		}
	}
    
    
}; // end app.blastem