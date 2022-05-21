import { BREAKOUT, COLORS } from "../game.js";
import { createScene, navigateToScene, switchScene, writeSceneKey } from "../gameFunction.js";
import { GameSettingsScene } from "./settings.js";
import { GameStageScene } from "./stage.js";

export class MainMenuScene extends Phaser.Scene{
  constructor(){
    super( "mainMenuScene" );
    this.objects = {}
  }

  init(){
    // create required scenes
    this.createStageScene();
    this.createSettingsScene();
  }

  create(){
    // Scene Label
    writeSceneKey( this );

    // create game start button
    this.objects.btn_startGame = this.add.rectangle( BREAKOUT.config.width / 2, 300,
    200, 40, COLORS.secondary, 1 );
    this.objects.txt_startGame = this.add.text( BREAKOUT.config.width / 2, 300,
    "Start Game",{ fontSize: "20px", color: COLORS.secondary }).setOrigin( 0.5 );


    this.objects.btn_startGame.setInteractive();
    this.objects.btn_startGame.on("pointerdown", this.startGame, this );

    // create settings button
    this.objects.btn_settings = this.add.rectangle( BREAKOUT.config.width / 2, 350,
    200, 40, COLORS.secondary, 1 );
    this.objects.txt_settings = this.add.text( BREAKOUT.config.width / 2, 350,
    "Settings",{ fontSize: "20px", color: COLORS.secondary }).setOrigin( 0.5 );


    this.objects.btn_settings.setInteractive();
    this.objects.btn_settings.on("pointerdown", this.launchSettingsScene, this );
  }

  startGame(){
    // run the game stage scene
    this.scene.run( "gameStageScene", [] );
    // temporarily deactivate this scene
    this.scene.sleep( this.scene.key, [] );
    return;
  }

  launchSettingsScene(){
    // run the settings scene
    navigateToScene("gameSettingsScene", { callingScene: this.scene.key } );
    // sleep main menu
    this.scene.sleep( this.scene.key );
    return;
  }

  createStageScene(){
    createScene( "gameStageScene", GameStageScene );
    return;
  }

  createSettingsScene(){
    createScene( "gameSettingsScene", GameSettingsScene );
    return;
  }
}