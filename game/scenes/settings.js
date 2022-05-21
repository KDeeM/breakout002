import { BREAKOUT, COLORS } from "../game.js";
import { sceneExists, writeSceneKey } from "../gameFunction.js";

export class GameSettingsScene extends Phaser.Scene{
  constructor(){
    super( "gameSettingsScene" );
    this.objects = {
      exitPage: "mainMenuScene",
    }
  }

  init( data ){
    console.log("init was called");
    this.__setReturnPage( data );
    return;
  }

  create(){
    // create the scenes background;
    this.createBackgroundOverlay();

    // run scene events
    this.events.on( "wake", this.__onWake );

    // Scene Label
    writeSceneKey( this );

    // create game start button
    this.objects.btn_startGame = this.add.rectangle( BREAKOUT.config.width / 2, 300,
    200, 40, COLORS.secondary, 1 );
    this.objects.txt_startGame = this.add.text( BREAKOUT.config.width / 2, 300,
    "Back",{ fontSize: "20px", color: COLORS.secondary }).setOrigin( 0.5 );


    this.objects.btn_startGame.setInteractive();
    this.objects.btn_startGame.on("pointerdown", this.navigateBack, this );
  }

  // returns to the scene that called it
  navigateBack(){
    // navigate back to the scene that called settings
    this.scene.run( this.objects.exitPage );
    // sleep settings menu
    this.scene.sleep( this.scene.key );
    return;
  }

  __onResume(sys, data){
    let scene = sys.scene;
    scene.__setReturnPage( data );
    return;
  }

  __onWake(sys, data){
    let scene = sys.scene;
    scene.__setReturnPage( data );
    return;
  }

  /**Sets the page the settings shall go back to when closed,
   * defaults to main menu if no valid scene is found */
  __setReturnPage( dataPassed ){
    // check if a scene was passed
    if( "callingScene" in dataPassed ){
      // if it is a valid scene, set it as the returned to page
      if( sceneExists( dataPassed["callingScene"] ) ){
        this.objects.exitPage = dataPassed["callingScene"];
        return;
      }
    }
    // fallback on main menu if no valid scene was passed
    this.objects.exitPage = "mainMenuScene";
    return;
  }

  /**Create the semi transparent backgound that allows us to partially see the game
   * in the background
   */
   createBackgroundOverlay(){
    this.objects.backgroundOverlay = this.add.rectangle( 0, 0, BREAKOUT.config.width,
      BREAKOUT.config.height, COLORS.prussianBlue, 0.8 ).setOrigin(0);
    return;
  }
}