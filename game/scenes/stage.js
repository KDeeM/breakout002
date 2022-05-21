import { BREAKOUT, COLORS } from "../game.js";
import { createScene, writeSceneKey } from "../gameFunction.js";
import { gamePauseScene } from "./pause.js";

export class GameStageScene extends Phaser.Scene{
  constructor(){
    super( "gameStageScene" );
    this.objects = {}
  }

  init(){
    // create pause scene;
    this.createPauseScene();
  }

  create(){
    // Scene Label
    writeSceneKey( this );

    // create dummy physics object
    this.testPhysicsObject();

    // create game start button
    this.objects.btn_startGame = this.add.rectangle( BREAKOUT.config.width / 2, 300,
    200, 40, COLORS.secondary, 1 );
    this.objects.txt_startGame = this.add.text( BREAKOUT.config.width / 2, 300,
    "Pause Game",{ fontSize: "20px", color: COLORS.secondary }).setOrigin( 0.5 );


    this.objects.btn_startGame.setInteractive();
    this.objects.btn_startGame.on("pointerdown", this.pauseGame, this );
  }

  pauseGame(){
    // run the pause scene
    this.scene.run( "gamePauseScene", [] );
    // pause game stage scene scene
    this.scene.pause( this.scene.key, [] );
    return;
  }

  createPauseScene(){
    createScene( "gamePauseScene", gamePauseScene );
    return;
  }

  testPhysicsObject(){
    this.dummy = this.add.ellipse( 150, 100, 50, 50, 0xff6400, 1 );
    this.physics.world.enableBody( this.dummy, Phaser.Physics.Arcade.DYNAMIC_BODY );
    this.dummy.body.setVelocity( 100, 100 );
    this.dummy.body.setBounce( 1 );
    this.dummy.body.setCollideWorldBounds( true );
    return;
  }

  createPaddle(){
    
  }
  
}