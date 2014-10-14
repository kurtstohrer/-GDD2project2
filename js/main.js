// blastem.js
// Dependencies: 
// Description: singleton object
// This object will be our main "controller" class and will contain references
// to most of the other objects in the game.

"use strict";

// if app exists use the existing copy
// else create a new object literal
var app = app || {};

app.main = {
	// CONSTANT properties
    WIDTH : 1920 ,
    HEIGHT: 1080,
	dt: 1/60.0,
	
	GEM_PROBABILITY_PER_SECOND: 1.0,
	POWER_SIZE_PROBABILITY_PER_SECOND: 0.3,
	POWER_SPEED_PROBABILITY_PER_SECOND: 0.3,
	POWER_WEIGHT_PROBABILITY_PER_SECOND: 0.3,
	POWER_ACCEL_PROBABILITY_PER_SECOND: 0.3,
    canvas: undefined,
    ctx: undefined,
    ship: undefined,
    shipb: undefined,
	drawLib: undefined,
	app: undefined,
	utils: undefined,
	gems: [],
	size_powerups: [],
	speed_powerups: [],
	weight_powerups: [],
	accel_powerups: [],
	scorea: 0,
	scoreb: 0,
	friction: 15,
	
	aspectRatio: undefined,
    
    // methods
	init : function() {
			
			// declare properties
			this.canvas = document.querySelector('canvas');
			this.canvas.width = this.WIDTH;
			this.canvas.height = this.HEIGHT;
			this.ctx = this.canvas.getContext('2d');
			
			
			this.aspectRatio = this.WIDTH / this.HEIGHT;
			// set up player ship
			this.ship = app.ship;
			this.ship.init();
			
			this.shipb = app.shipb;
			this.shipb.init();
			
			this.drawLib = app.drawLib;
			
			this.update();
	},
	
	moveSprites: function()
	{
		if(app.keydown[app.KEYBOARD.KEY_LEFT])
		{
			this.ship.moveLeft(this.dt);
		}
		if(app.keydown[app.KEYBOARD.KEY_RIGHT])
		{
			this.ship.moveRight(this.dt);
		}
		if(app.keydown[app.KEYBOARD.KEY_UP])
		{
			this.ship.moveUp(this.dt);
		}
		if(app.keydown[app.KEYBOARD.KEY_DOWN])
		{
			this.ship.moveDown(this.dt);
		}
		
		if(app.keydown[app.KEYBOARD.KEY_A])
		{
			this.shipb.moveLeft(this.dt);
		}
		if(app.keydown[app.KEYBOARD.KEY_D])
		{
			this.shipb.moveRight(this.dt);
		}
		if(app.keydown[app.KEYBOARD.KEY_W])
		{
			this.shipb.moveUp(this.dt);
		}
		if(app.keydown[app.KEYBOARD.KEY_S])
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
		
		
		
		
	},
	
	crystals : function()
	{
		var self = this;
		//GEMS
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
		this.gems.forEach(function(gem)
		{
			gem.update(self.dt);
		});
		
		//power up Grow
		if (Math.random() < this.POWER_SIZE_PROBABILITY_PER_SECOND/60)
		{
			//console.log(this.gems);
			this.size_powerups.push(new app.power_size(this.WIDTH, this.HEIGHT));
			//console.log("new gem " + xpos + " " + ypos);
		}
		this.size_powerups = this.size_powerups.filter(function(power_size)
		{
			return power_size.active;
		});
		
		this.size_powerups.forEach(function(power_size)
		{
			power_size.update(self.dt);
		});
		
		//power up speed boost
		if (Math.random() < this.POWER_SPEED_PROBABILITY_PER_SECOND/60)
		{
			//console.log(this.gems);
			this.speed_powerups.push(new app.power_speed(this.WIDTH, this.HEIGHT));
			//console.log("new gem " + xpos + " " + ypos);
		}
		this.speed_powerups = this.speed_powerups.filter(function(power_speed)
		{
			return power_speed.active;
		});
		
		this.speed_powerups.forEach(function(power_speed)
		{
			power_speed.update(self.dt);
		});
		
			//power up speed boost
		if (Math.random() < this.POWER_WEIGHT_PROBABILITY_PER_SECOND/60)
		{
			//console.log(this.gems);
			this.weight_powerups.push(new app.power_weight(this.WIDTH, this.HEIGHT));
			//console.log("new gem " + xpos + " " + ypos);
		}
		this.weight_powerups = this.weight_powerups.filter(function(power_weight)
		{
			return power_weight.active;
		});
		
		this.weight_powerups.forEach(function(power_weight)
		{
			power_weight.update(self.dt);
		});
		
		if (Math.random() < this.POWER_ACCEL_PROBABILITY_PER_SECOND/60)
		{
			//console.log(this.gems);
			this.accel_powerups.push(new app.power_accel(this.WIDTH, this.HEIGHT));
			//console.log("new gem " + xpos + " " + ypos);
		}
		this.accel_powerups = this.accel_powerups.filter(function(power_accel)
		{
			return power_accel.active;
		});
		
		this.weight_powerups.forEach(function(power_accel)
		{
			power_accel.update(self.dt);
		});
	},
	
	checkCollisions: function()
	{
		var self = this;
		
		if(this.collides(this.ship, this.shipb))
		{
			
			var xVel = (this.ship.xVelocity + this.shipb.xVelocity) / 2;
			var yVel = (this.ship.yVelocity + this.shipb.yVelocity) / 2;
			
			var xBounce = ((this.ship.xVelocity + this.ship.weight) - (this.shipb.xVelocity + this.shipb.weight)) * 0.5;
			var yBounce = ((this.ship.yVelocity + this.ship.weight) - (this.shipb.yVelocity + this.shipb.weight)) * 0.5;
			
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
		
		this.size_powerups.forEach(function(size)
		{
		
			if (self.collides(size, self.ship))
			{
				size.active = false;
				
				self.ship.radius += .5;
				
			}
			if (self.collides(size, self.shipb))
			{
				size.active = false;
				self.shipb.radius += .5;
				
				
			}
		});
		this.speed_powerups.forEach(function(speed)
		{
			if (self.collides(speed, self.ship))
			{
				speed.active = false;
				self.ship.maxVelocity ++;
			}
			if (self.collides(speed, self.shipb))
			{
				speed.active = false;
				self.shipb.maxVelocity ++;
				
			}
		});
		this.weight_powerups.forEach(function(weight)
		{
			if (self.collides(weight, self.ship))
			{
				weight.active = false;
				self.ship.weight ++;
			}
			if (self.collides(weight, self.shipb))
			{
				weight.active = false;
				self.shipb.weight ++;
				
			}
		});
		this.accel_powerups.forEach(function(accel)
		{
			if (self.collides(accel, self.ship))
			{
				accel.active = false;
				self.ship.speed ++;
			}
			if (self.collides(accel, self.shipb))
			{
				accel.active = false;
				self.shipb.speed ++;
				
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
	
	draw: function(){
		
		var self = this;
	
		this.drawLib.backgroundGradient(this.ctx, this.WIDTH, this.HEIGHT);
		
		this.ship.draw(this.ctx);
		this.shipb.draw(this.ctx);
		
		this.gems.forEach(function(gem)
		{
			gem.draw(self.ctx);
		});
		
		this.size_powerups.forEach(function(power_size)
		{
			power_size.draw(self.ctx);
		});
		
		this.speed_powerups.forEach(function(power_speed)
		{
			power_speed.draw(self.ctx);
		});
		this.weight_powerups.forEach(function(power_weight)
		{
			power_weight.draw(self.ctx);
		});
		this.accel_powerups.forEach(function(power_accel)
		{
			power_accel.draw(self.ctx);
		});
		
		this.drawLib.text(this.ctx, "" + this.scorea, 10, 20, 18, "yellow");
		this.drawLib.text(this.ctx, "" + this.scoreb, 10, 40, 18, "red");
	
	},
	
	
	update: function()
	{
		requestAnimationFrame(this.update.bind(this));
		
		
		this.drawLib.clear(this.ctx,0,0,this.WIDTH, this.HEIGHT);
		
		this.crystals(); 
		
		this.moveSprites();
		
		this.checkCollisions();
		
		this.draw();
		
		
		
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
	},
	
    
    
}; 