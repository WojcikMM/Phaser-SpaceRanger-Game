var score = 0;
var game = new Phaser.Game(800, 640, Phaser.AUTO, 'gameScreen');



game.state.add('load',LoadState);
game.state.add('play',PlayState);


game.state.start('load');