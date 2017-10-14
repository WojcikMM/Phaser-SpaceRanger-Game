
var PlayState = {
	preload: function(){
		this.bulletTime = 0;
		this.enemyCreateDelayTime = 0;
		this.spaceFieldSpeed = 3;
		this.playerLifes = 5;
	},
	create: function(){
		this.spaceField = game.add.tileSprite(0,0,800,640,'starfield');
		this.player = game.add.sprite(game.world.centerX-15,game.world.centerY+225,'player');
		game.physics.enable(this.player,Phaser.Physics.ARCADE);
		this.cursors = game.input.keyboard.createCursorKeys();
		this.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		this.bullets = game.add.group();
		this.bullets.enableBody = true;
		this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
		this.bullets.createMultiple(30,'bullet'); // load in pre
		this.bullets.setAll('anchor.x',0.5);
		this.bullets.setAll('anchor.y',1);
		this.bullets.setAll('outOfBoundsKill',true);
		this.bullets.setAll('checkWorldBounds',true);

		this.enemies = game.add.group();
		this.enemies.enableBody = true;
		game.physics.enable(this.enemies,Phaser.Physics.ARCADE);
		this.enemies.createMultiple(30,'enemy');
		this.enemies.setAll('bounce.x',1);
		this.enemies.setAll('bounce.y',1);
		this.enemies.setAll('anchor.x',0.5);
		this.enemies.setAll('anchor.y',1);
		this.enemies.setAll('outOfBoundsKill',true);
		this.enemies.setAll('checkWorldBounds',true);

		game.add.text(game.world.width-220,30,'Score:',{fill: '#fff'});
		this.scoreText = game.add.text(game.world.width-120,30,score,{fill:'#fff'});
	
		game.add.text(game.world.width-220,70,'Lifes:',{fill: '#fff'});
		this.lifesText = game.add.text(game.world.width-120,70,this.playerLifes,{fill: '#fff'});
	},
	update: function(){
		this.player.body.velocity.x = 0;
		this.spaceField.tilePosition.y += this.spaceFieldSpeed;
		this.createEnemy();

		game.physics.arcade.collide(this.bullets,this.enemies,
			this.enemiesShoutCallback,null,this);

		game.physics.arcade.collide(this.enemies,this.player,
			this.playerCrashCollider,null,this);

		if(this.cursors.left.isDown){
			this.player.body.velocity.x = -350;
		}
		if(this.cursors.right.isDown){
			this.player.body.velocity.x = 350;
		}

		if(this.fireButton.isDown){
			this.fireBullet();
		}

		if(this.playerLifes<=0){
			score = 0;
			this.player.kill();

			game.state.start('load');
		}
	},
	playerCrashCollider: function(playerObject,enemyObject){
		this.playerLifes --;
		this.lifesText.text = this.playerLifes;
		playerObject.body.velocity.y =0;
		enemyObject.kill();
	},
	enemiesShoutCallback: function(bulletObject,enemyObject){
		score+= Math.floor((game.world.height-enemyObject.body.y)/25);
	
		this.scoreText.text = score;
		enemyObject.kill();
		bulletObject.kill();
	},
	createEnemy: function(){
		if(game.time.now>this.enemyCreateDelayTime){
			this.enemy = this.enemies.getFirstExists(false);
			if(this.enemy){
				this.randomX = Math.floor((Math.random()*(game.world.width-15))+15);
				this.enemy.reset(this.randomX,0);
				this.enemy.body.velocity.y = 500;
				this.enemyCreateDelayTime = game.time.now + 1500;
			}
		}
	},
	fireBullet: function(){
		if(game.time.now>this.bulletTime){
			this.bullet = this.bullets.getFirstExists(false);
			if(this.bullet){
					this.bullet.reset(this.player.x+30,this.player.y);
					this.bullet.body.velocity.y = - 400;
					this.bulletTime = game.time.now+150;
			}
		}
	}
}