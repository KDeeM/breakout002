import { BREAKOUT, COLORS } from "../game.js";
import { switchScene } from "../gameFunction.js";
import { LoadingScene } from "./loading.js";

export class MainMenuScene extends Phaser.Scene{
  constructor(){
    super( "mainMenuScene" );
    this.objects = {}
  }

  create(){
    // create game start button
    this.objects.btn_startGame = this.add.rectangle( BREAKOUT.config.width / 2, 300,
    200, 40, COLORS.secondary, 1 );
    this.objects.txt_startGame = this.add.text( BREAKOUT.config.width / 2, 300,
    "Start Game",{ fontSize: "20px", color: COLORS.secondary }).setOrigin( 0.5 );

    this.objects.btn_startGame.setInteractive();
    this.objects.btn_startGame.on("pointerdown", this.startGame, this );
  }

  startGame(){
    switchScene( this, "loadingScene" );
    return;
  }
}