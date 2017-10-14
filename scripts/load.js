var LoadState = {
	preload: function(){
			game.load.image('starfield','assets/starfieldbackground.jpg');
			game.load.image('player','assets/player.png');
			game.load.image('bullet','assets/bullet.png');
			game.load.image('enemy','assets/alien.png');
	},
	create: function(){
			game.state.start('play');

	}


}