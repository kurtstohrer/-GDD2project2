// blastem.js
// Dependencies: 
// Description: singleton object
// This object will be our main "controller" class and will contain references
// to most of the other objects in the game.

"use strict";

// if app exists use the existing copy
// else create a new object literal
var app = app || {};
var music;
var title;

app.main = {
	// CONSTANT properties
    WIDTH : 1920 ,
    HEIGHT: 1080, 
	dt: 1/60.0,
	
	GEM_PROBABILITY_PER_SECOND: 0.75,
	POWER_SIZE_PROBABILITY_PER_SECOND: 0.043,
	POWER_SPEED_PROBABILITY_PER_SECOND: 0.045,
	POWER_WEIGHT_PROBABILITY_PER_SECOND: 0.045,
	POWER_ACCEL_PROBABILITY_PER_SECOND: 0.045,
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
	
	countDown: 120,
	coolDown:60,
	gameState: 1,
	learnState: 1,
	fps: 60,
	playState: 0,
	
	aspectRatio: undefined,
    
    // methods
	init : function() {
	
		music = new Audio("music/od.wav");
		title = new Audio("music/title.wav");
		title.volume = 0.2;
		music.loop = true;
		title.loop = true;
		title.play();
		var keys = {};
		window.addEventListener("keydown",function(e)
		{
			keys[e.keyCode] = true;
			switch(e.keyCode)
			{
				case 37: 
				case 39: 
				case 38:  
				case 40: // Arrow keys
				case 32: // Space
				{
					e.preventDefault(); 
					break;
				}
				default: break; // do not block other keys
			}
		},false);
		
		window.addEventListener('keyup',function(e)
		{
			keys[e.keyCode] = false;
		},false);
			
		// declare properties
		this.canvas = document.querySelector('canvas');
		this.canvas.width = this.WIDTH;
		this.canvas.height = this.HEIGHT;
		this.ctx = this.canvas.getContext('2d');
		
		this.ctx.textAlign = 'center';
		
		this.gameState = 1;
		this.learnState =1;
		// BEGIN CHAD CODE		
		//load images
		this.gemImage = new Image();
		this.shipImage = new Image();
		this.shipbImage = new Image();
		this.speedImage = new Image();
		this.sizeImage = new Image();
		this.weightImage = new Image();
		this.accelImage = new Image();
		this.backgroundImg = new Image();
		
		this.gemImage.src = "img/base gem sheet contrasted.png";
		this.shipImage.src = "img/player1ship.png";
		this.shipbImage.src = "img/player2ship.png";
		this.speedImage.src = "img/speedup.png";
		this.sizeImage.src = "img/sizeupv2.png";
		this.weightImage.src = "img/weightup.png";
		this.accelImage.src = "img/Acccelupv2.png";
		this.backgroundImg.src = "img/Static background2.png";
		// END CHAD CODE
			
			
		this.aspectRatio = this.WIDTH / this.HEIGHT;
		// set up player ship
		this.ship = app.ship;
		this.ship.init(this.shipImage); //Chad: edited init to take in an image
			
		this.shipb = app.shipb;
		this.shipb.init(this.shipbImage);//Chad: edited init to take in an image
			
		this.drawLib = app.drawLib;
			
		this.update();
	},
	AIACTIVE: false, // for random walk AI added for no reason at all
	
	menuControls: function(){
	
		if(app.keydown[app.KEYBOARD.KEY_ENTER])
		{
			if(this.gameState ==1){
				this.gameState = 2;
				this.playState = 2;
				title.loop=false;
				title.pause();
				music.volume = 0.2;
				music.play();
			}
			if(this.gameState ==3){
				location.reload();
				music.pause();
			}
		}
		if(app.keydown[app.KEYBOARD.KEY_L])
		{
			if(this.gameState ==1){
			
				this.gameState = 4;
				
			}
			
		}
		if(app.keydown[app.KEYBOARD.KEY_SPACE])
		{
			if(this.gameState ==1){
			
				this.gameState = 5;
				this.playState = 5;
				title.loop=false;
				title.pause();
				music.volume = 0.2;
				music.play();
				this.GEM_PROBABILITY_PER_SECOND = 1.0;
				this.POWER_SIZE_PROBABILITY_PER_SECOND = 0.06;
			}
		}
	
	
	},
	moveSprites: function()
	{
		var randX = (this.AIACTIVE)? Math.random(): 0;                       // random walk
		var randY = (this.AIACTIVE)? Math.random(): 0;                       // random walk
		randX = (randX < 0.5&&randX > 0)? -1:(randX > 0.5&&randX < 1)? 1 : 0 // random walk
		randY = (randY < 0.5&&randY > 0)? -1:(randY > 0.5&&randY < 1)? 1 : 0 // random walk
		
		if(app.keydown[app.KEYBOARD.KEY_LEFT]||randX == -1)
		{
			this.ship.moveLeft(this.dt);
		}
		if(app.keydown[app.KEYBOARD.KEY_RIGHT]||randX == 1)
		{
			this.ship.moveRight(this.dt);
		}
		if(app.keydown[app.KEYBOARD.KEY_UP]||randY == -1)
		{
			this.ship.moveUp(this.dt);
		}
		if(app.keydown[app.KEYBOARD.KEY_DOWN]||randY == 1)
		{
			this.ship.moveDown(this.dt);
		}
		
		randX = (this.AIACTIVE)? Math.random(): 0;                           // random walk
		randY = (this.AIACTIVE)? Math.random(): 0;                           // random walk
		randX = (randX < 0.5&&randX > 0)? -1:(randX > 0.5&&randX < 1)? 1 : 0 // random walk
		randY = (randY < 0.5&&randY > 0)? -1:(randY > 0.5&&randY < 1)? 1 : 0 // random walk
		if(app.keydown[app.KEYBOARD.KEY_A]||randX == -1)
		{
			this.shipb.moveLeft(this.dt);
		}
		if(app.keydown[app.KEYBOARD.KEY_D]||randX == 1)
		{
			this.shipb.moveRight(this.dt);
		}
		if(app.keydown[app.KEYBOARD.KEY_W]||randY == -1)
		{
			this.shipb.moveUp(this.dt);
		}
		if(app.keydown[app.KEYBOARD.KEY_S]||randY == 1)
		{
			this.shipb.moveDown(this.dt);
		}
		
		this.ship.x += this.ship.xVelocity * this.elapsed/10;
		this.ship.y += this.ship.yVelocity * this.elapsed/10;
		
		this.shipb.x += this.shipb.xVelocity * this.elapsed/10;
		this.shipb.y += this.shipb.yVelocity * this.elapsed/10;
		
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
			if(this.gameState == 2 || this.gameState == 5){
				this.gems.push(new app.Gem(this.WIDTH, this.HEIGHT, this.gemImage));
			
			}
			if(this.gameState == 4){
			
				if(this.learnState == 1 ){
					if(this.gems.length < 1){
						this.gems.push(new app.Gem(this.WIDTH, this.HEIGHT, this.gemImage));
						}
				
				}
				if(this.learnState == 6){
					this.gems.push(new app.Gem(this.WIDTH, this.HEIGHT, this.gemImage));
				}
			}
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
		
		//power up Size
		if (Math.random() < this.POWER_SIZE_PROBABILITY_PER_SECOND/60)
		{
				if(this.gameState == 2 || this.gameState == 5){
			
					this.size_powerups.push(new app.power_size(this.WIDTH, this.HEIGHT, this.sizeImage));
				
				}
				if(this.gameState == 4){
						if(this.learnState == 2){
							if(this.size_powerups.length < 1){
								this.size_powerups.push(new app.power_size(this.WIDTH, this.HEIGHT, this.sizeImage));
							
							}
						}
				
				}
		}
		this.size_powerups = this.size_powerups.filter(function(power_size)
		{
			return power_size.active;
		});
		
		this.size_powerups.forEach(function(power_size)
		{
			power_size.update(self.dt);
		});
		
		//power up Speed
		if (Math.random() < this.POWER_SPEED_PROBABILITY_PER_SECOND/60)
		{
				if(this.gameState == 2 || this.gameState == 5){
					this.speed_powerups.push(new app.power_speed(this.WIDTH, this.HEIGHT, this.speedImage));
				}
				if(this.gameState == 4){
						if(this.learnState == 3){
							if(this.speed_powerups < 1 ){
								this.speed_powerups.push(new app.power_speed(this.WIDTH, this.HEIGHT, this.speedImage));
							}
						
						}
				
				}
		}
		this.speed_powerups = this.speed_powerups.filter(function(power_speed)
		{
			return power_speed.active;
		});
		
		this.speed_powerups.forEach(function(power_speed)
		{
			power_speed.update(self.dt);
		});
		
		//power up Weight
		if (Math.random() < this.POWER_WEIGHT_PROBABILITY_PER_SECOND/60)
		{
			if(this.gameState == 2 || this.gameState == 5){
				this.weight_powerups.push(new app.power_weight(this.WIDTH, this.HEIGHT, this.weightImage));
			}
			if(this.gameState == 4){
						if(this.learnState == 4){
						if(this.weight_powerups.length < 1){
							this.weight_powerups.push(new app.power_weight(this.WIDTH, this.HEIGHT, this.weightImage));
						}
						
						}
				
				}
		}
		this.weight_powerups = this.weight_powerups.filter(function(power_weight)
		{
			return power_weight.active;
		});
		
		this.weight_powerups.forEach(function(power_weight)
		{
			power_weight.update(self.dt);
		});
		
		//power up Accel
		if (Math.random() < this.POWER_ACCEL_PROBABILITY_PER_SECOND/60)
		{
			if(this.gameState == 2 || this.gameState == 5){
					this.accel_powerups.push(new app.power_accel(this.WIDTH, this.HEIGHT, this.accelImage));
			}
			if(this.gameState == 4){
						if(this.learnState == 5){
						if(this.accel_powerups.length < 1){
							this.accel_powerups.push(new app.power_accel(this.WIDTH, this.HEIGHT, this.accelImage));
						}
						
						}
				
				}
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
			
			//var xBounce = ((this.ship.xVelocity * this.ship.weight / 10) - (this.shipb.xVelocity * this.shipb.weight / 10)) * 0.5;
			//var yBounce = ((this.ship.yVelocity * this.ship.weight / 10) - (this.shipb.yVelocity * this.shipb.weight / 10)) * 0.5;
			var xBounce = (this.ship.xVelocity - this.shipb.xVelocity) * 0.5;
			var yBounce = (this.ship.yVelocity - this.shipb.yVelocity) * 0.5;
			
			this.ship.xVelocity = xVel - xBounce * this.shipb.weight / this.ship.weight;
			this.ship.yVelocity = yVel - yBounce * this.shipb.weight / this.ship.weight;
			this.shipb.xVelocity = xVel + xBounce * this.ship.weight / this.shipb.weight;
			this.shipb.yVelocity = yVel + yBounce* this.ship.weight / this.shipb.weight;
			
			while(this.collides(this.ship, this.shipb))
			{
				var xDiff = this.ship.x - this.shipb.x;
				var yDiff = this.ship.y - this.shipb.y;
				
				this.ship.x += xDiff * 0.01;
				this.ship.y += yDiff * 0.01;
				this.shipb.x -= xDiff * 0.01;
				this.shipb.y -= yDiff * 0.01;
			}
		}	

		this.gems.forEach(function(gem)
		{
			if (self.collides(gem, self.ship))
			{
				gem.active = false;
				self.scorea += 1;
				if(self.gameState ==4){
					
					if(self.learnState == 1){
						self.learnState = 2; 
					}
					if(self.learnState == 6){
						location.reload();
					}
				
				}
			}
			if (self.collides(gem, self.shipb))
			{
				gem.active = false;
				self.scoreb += 1;
				if(self.gameState ==4){
					
					if(self.learnState == 1){
						self.learnState = 2; 
					}
					if(self.learnState == 6){
						location.reload();
					}
				
				}
			}
		});
		
		this.size_powerups.forEach(function(size)
		{
		
			if (self.collides(size, self.ship))
			{
				size.active = false;
				
				self.ship.spriteSize += 8;
				self.ship.radius += 4;
				if(self.gameState ==4){
					self.learnState = 3;
				}
				
			}
			if (self.collides(size, self.shipb))
			{
				size.active = false;
				self.shipb.spriteSize += 8;
				self.shipb.radius += 4;
				if(self.gameState ==4){
					self.learnState = 3;
				}
				
			}
		});
		this.speed_powerups.forEach(function(speed)
		{
			if (self.collides(speed, self.ship))
			{
				speed.active = false;
				self.ship.maxVelocity += 3;
				if(self.gameState ==4){
					self.learnState = 4;
				}
			}
			if (self.collides(speed, self.shipb))
			{
				speed.active = false;
				self.shipb.maxVelocity += 3;
				if(self.gameState ==4){
					self.learnState = 4;
				}
			}
		});
		this.weight_powerups.forEach(function(weight)
		{
			if (self.collides(weight, self.ship))
			{
				weight.active = false;
				self.ship.weight += 2;
				if(self.gameState ==4){
					self.learnState = 5;
				}
			}
			if (self.collides(weight, self.shipb))
			{
				weight.active = false;
				self.shipb.weight += 2;
				if(self.gameState ==4){
					self.learnState = 5;
				}
			}
		});
		this.accel_powerups.forEach(function(accel)
		{
			if (self.collides(accel, self.ship))
			{
				accel.active = false;
				self.ship.speed += 2;
				if(self.gameState ==4){
					self.learnState = 6;
				}
			}
			if (self.collides(accel, self.shipb))
			{
				accel.active = false;
				self.shipb.speed += 2;
				if(self.gameState ==4){
					self.learnState = 6;
				}
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
	
	timer: function (){
		this.coolDown -= this.elapsed/10;
		
		if(this.coolDown <=0){
			this.countDown --;
			this.coolDown = 60;
		}
	
	},
	draw: function(){
		
		var self = this;
		
		this.ctx.drawImage(this.backgroundImg, 0, 0, self.WIDTH, self.HEIGHT);
		//this.drawLib.backgroundGradient(this.ctx, this.WIDTH, this.HEIGHT);
		
		if(this.gameState == 1)
		{
		
			this.drawLib.text(this.ctx, "CRYSTALLINE COLLECTOR" , this.WIDTH/2, 300, 100, "white");
			
			this.drawLib.text(this.ctx, "[ PRESS ENTER TO START ]" , this.WIDTH/2, 700, 50, "white");
			this.drawLib.text(this.ctx, "[ PRESS L TO LEARN TO PLAY ]" , this.WIDTH/2, 900, 50, "white");
		
		}
		
		if(this.gameState == 2 || this.gameState == 5){
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
			
			this.speed_powerups.forEach(function(power_speed){
			
				power_speed.draw(self.ctx);
			});
			this.weight_powerups.forEach(function(power_weight){
			
				power_weight.draw(self.ctx);
			});
			this.accel_powerups.forEach(function(power_accel){
			
				power_accel.draw(self.ctx);
			});
			
			this.drawLib.text(this.ctx, "" + this.scorea, this.ship.x+1, this.ship.y + 10.25, 30, "white");
			this.drawLib.text(this.ctx, "" + this.scorea, this.ship.x-1, this.ship.y + 8.25, 30, "white");
			this.drawLib.text(this.ctx, "" + this.scorea, this.ship.x-1, this.ship.y + 10.25, 30, "white");
			this.drawLib.text(this.ctx, "" + this.scorea, this.ship.x+1, this.ship.y + 8.25, 30, "white");
			this.drawLib.text(this.ctx, "" + this.scorea, this.ship.x, this.ship.y + 9.25, 30, "blue");
			this.drawLib.text(this.ctx, "" + this.scoreb, this.shipb.x+1, this.shipb.y + 10.25, 30, "black");
			this.drawLib.text(this.ctx, "" + this.scoreb, this.shipb.x-1, this.shipb.y + 8.25, 30, "black");
			this.drawLib.text(this.ctx, "" + this.scoreb, this.shipb.x-1, this.shipb.y + 10.25, 30, "black");
			this.drawLib.text(this.ctx, "" + this.scoreb, this.shipb.x+1, this.shipb.y + 8.25, 30, "black");
			this.drawLib.text(this.ctx, "" + this.scoreb, this.shipb.x, this.shipb.y + 9.25, 30, "red");
			
			if(this.countDown > 5){
					this.drawLib.text(this.ctx, "" + this.countDown, this.WIDTH/2, this.HEIGHT- 10, 40, "white");
			}
			if(this.countDown <= 5){
					this.drawLib.outlinedText(this.ctx, "" + this.countDown, this.WIDTH/2, this.HEIGHT/2 +100, 300, "#FFBF00","white");
			}
			if(this.countDown >= 115 && this.gameState == 5)
			{
				this.drawLib.text(this.ctx, "Secret Game Mode, Avoid the gems", this.WIDTH/2, 80, 72, "white");
			}
		}
		
		if(this.gameState == 3){
		
				
					
					if((this.scorea > this.scoreb && this.playState == 2) || (this.scorea < this.scoreb && this.playState == 5)){
							this.drawLib.text(this.ctx, "WINNER" , this.WIDTH/2, 300, 100, "white");
							this.drawLib.text(this.ctx, "Blue Ship!" , this.WIDTH/2, 350, 50, "blue");
						}
					if((this.scorea < this.scoreb && this.playState == 2) || (this.scorea > this.scoreb && this.playState == 5)){
						this.drawLib.text(this.ctx, "WINNER" , this.WIDTH/2, 300, 100, "white");
						this.drawLib.text(this.ctx, "Red Ship! " , this.WIDTH/2, 350, 50, "red");
					}
					if(this.scoreb == this.scorea){
					
						this.drawLib.text(this.ctx, "DRAW" , this.WIDTH/2, 300, 100, "white");
					}
					this.ship.draw(this.ctx);
					this.shipb.draw(this.ctx);
					//player 1 stats
					this.drawLib.text(this.ctx, "Crystals:  " + this.scorea , this.WIDTH - 400, 350, 40, "#13F059");
					//size
					this.drawLib.text(this.ctx, "Size:" , this.WIDTH - 390, 400, 40, "#8C00FF");
					this.drawLib.rect(this.ctx, this.WIDTH - 320, 375,this.ship.spriteSize- 41 ,30,"#8C00FF");
					//weight
					this.drawLib.text(this.ctx, "Weight:" , this.WIDTH - 412, 450, 40, "#7D7D7D");
					this.drawLib.rect(this.ctx, this.WIDTH - 320, 425,this.ship.weight- 4 ,30,"#7D7D7D");
					//top speed
					this.drawLib.text(this.ctx, "Top Speed:" , this.WIDTH - 445, 500, 40, "#1AEB28");
					this.drawLib.rect(this.ctx, this.WIDTH - 320, 475,this.ship.maxVelocity- 9 ,30,"#1AEB28");
					//acceleration
					this.drawLib.text(this.ctx, "Acceleration:" , this.WIDTH - 478, 550, 40, "#EB6D1A");
					this.drawLib.rect(this.ctx, this.WIDTH - 320, 525,this.ship.speed- 24 ,30,"#EB6D1A");
					
					//player 2 stats
					this.drawLib.text(this.ctx, "Crystals:  " + this.scoreb , 300, 350, 40, "#13F059");
					//size
					this.drawLib.text(this.ctx, "Size:" , 310, 400, 40, "#8C00FF");
					this.drawLib.rect(this.ctx,  380, 375,this.shipb.spriteSize- 41 ,30,"#8C00FF");
					//weight
					this.drawLib.text(this.ctx, "Weight:" , 288, 450, 40, "#7D7D7D");
					this.drawLib.rect(this.ctx, 380, 425,this.shipb.weight- 4 ,30,"#7D7D7D");
					//top speed
					this.drawLib.text(this.ctx, "Top Speed:" , 254, 500, 40, "#1AEB28");
					this.drawLib.rect(this.ctx, 380, 475,this.shipb.maxVelocity- 9 ,30,"#1AEB28");
					//acceleration
					this.drawLib.text(this.ctx, "Acceleration:" ,  222, 550, 40, "#EB6D1A");
					this.drawLib.rect(this.ctx, 380, 525,this.shipb.speed- 24 ,30,"#EB6D1A");
					
				this.drawLib.text(this.ctx, "[ PRESS ENTER TO PLAY AGAIN ]" , this.WIDTH/2, this.HEIGHT - 50, 50, "white");
		
		}
		
		
		if(this.gameState == 4){
		
			this.ship.draw(this.ctx);
			this.shipb.draw(this.ctx);
			if(this.learnState == 1){
			
			
			
					this.gems.forEach(function(gem)
					{
							gem.draw(self.ctx);
					});
				this.drawLib.text(this.ctx, "Collect these Crystals to gain points!" , this.WIDTH/2, 40, 30, "white");
			
			}
			if(this.learnState == 2){
				
					this.size_powerups.forEach(function(power_size)
					{
							power_size.draw(self.ctx);
					});
				this.drawLib.text(this.ctx, "Collect these to Grow larger and collect Crystals easier!" , this.WIDTH/2, 40, 30, "white");
			}
			if(this.learnState == 3){
				
					this.speed_powerups.forEach(function(power_speed){
			
					power_speed.draw(self.ctx);
				});
				this.drawLib.text(this.ctx, "Collect these to increase top Speed!" , this.WIDTH/2, 40, 30, "white");
			}
			if(this.learnState == 4){
				
				this.weight_powerups.forEach(function(power_weight){
			
					power_weight.draw(self.ctx);
				});
				this.drawLib.text(this.ctx, "Collect these to increase your Weight and Make the other player go further when you collide!" , this.WIDTH/2, 40, 30, "white");
			}
			if(this.learnState == 5){
				
				this.accel_powerups.forEach(function(power_accel){
			
					power_accel.draw(self.ctx);
				});
				this.drawLib.text(this.ctx, "Collect these to increase your Acceleration!" , this.WIDTH/2, 40, 30, "white");
			}
			if(this.learnState == 6){
				
				this.gems.forEach(function(gem)
					{
							gem.draw(self.ctx);
					});
				this.drawLib.text(this.ctx, "Now collect a Crystal to return to the home menu!" , this.WIDTH/2, 40, 30, "white");
			}
		
		}
	},
	
	start: Date.now(),
	elapsed: 0,
	update: function(){
		//console.log(this.gems.length);
		var self = this;
		
		setTimeout(function()
		{
			
			requestAnimationFrame(self.update.bind(self));
			self.elapsed = Date.now()-self.start;
			self.start = Date.now();
		
			self.drawLib.clear(self.ctx,0,0,self.WIDTH, self.HEIGHT);
		
			self.menuControls();
		
			self.ship.update();
			self.shipb.update();
			
			if(self.gameState == 2 || self.gameState == 5){
		
				self.crystals(); 
			
				self.moveSprites();
				
				self.checkCollisions();
			
				self.timer();
			
				if(self.countDown <= 0){
				self.gameState =3;
		
				}	
			}
			if(self.gameState == 4){
				
				self.GEM_PROBABILITY_PER_SECOND= 2.0;
				self.POWER_SIZE_PROBABILITY_PER_SECOND = 2.0;
				self.POWER_SPEED_PROBABILITY_PER_SECOND = 2.0;
				self.POWER_WEIGHT_PROBABILITY_PER_SECOND = 2.0;
				self.POWER_ACCEL_PROBABILITY_PER_SECOND = 2.0;
			
				self.moveSprites();
				self.crystals(); 
				self.checkCollisions();
			}
			
		
			self.draw();
		}, 1000 / self.fps);
		
		
		
	},
	
    
    
}; 

// BEGIN FORREST CODE -- The Wicked Awesome that is Argzero's code
/* A Collection of Vector Functions */

// returns distance between two objects with x and y attributes given as scalar float
function distance(a, b){

	return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

// returns average middle vector object between two vector objects with x and y attributes given as an object with an x and y
function averageVector(a,b){

	return {x:(a.x + b.x)/2,y:(a.x + b.x)/2};
}

// returns magnitude of a vector object with an x and y attribute given as a float
function vectorMagnitude(a){

	return Math.sqrt(Math.pow(a.x + a.x, 2) + Math.pow(a.y + a.y, 2));
}

// returns the passed vector object (with an x and a y) as its normalized vector
function normalizeVector(a){

	return {x: a.x/vectorMagnitude(a), y:a.y/vectorMagnitude(a)};
}

// returns the passed vector object (with an x and a y) as itself multiplied by a scalar value
function multVector(a,b){

	return {x: a.x * b, y: a.y * b};
}

// scales a value between min and max to instead be between mappedMin and mappedMax
// function map(value, min, max, mappedMin, mappedMax)
// {
// 	return (((value-min)/(max-min))*(mappedMax-mappedMin))- mappedMin;
// }
// END FORREST CODE
