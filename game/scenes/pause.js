import { BREAKOUT, COLORS } from "../game.js";
import { navigateToScene, shutDownScenes, switchScene, writeSceneKey } from "../gameFunction.js";

export class gamePauseScene extends Phaser.Scene{
  constructor(){
    super( "gamePauseScene" );
    this.objects = {}
  }

  create(){
    // create background overlay
    this.createBackgroundOverlay();

    // Scene Label
    writeSceneKey( this );

    // create game resume button
    this.objects.btn_resumeGame = this.add.rectangle( BREAKOUT.config.width / 2, 300,
    200, 40, COLORS.secondary, 1 );
    this.objects.txt_resumeGame = this.add.text( BREAKOUT.config.width / 2, 300,
    "Resume Game",{ fontSize: "20px", color: COLORS.secondary }).setOrigin( 0.5 );


    this.objects.btn_resumeGame.setInteractive();
    this.objects.btn_resumeGame.on("pointerdown", this.resumeGame, this );

    // create game quit button
     this.objects.btn_quitGame = this.add.rectangle( BREAKOUT.config.width / 2, 350,
     200, 40, COLORS.secondary, 1 );
     this.objects.txt_quitGame = this.add.text( BREAKOUT.config.width / 2, 350,
     "Quit Game",{ fontSize: "20px", color: COLORS.secondary }).setOrigin( 0.5 );
 
 
     this.objects.btn_quitGame.setInteractive();
     this.objects.btn_quitGame.on("pointerdown", this.quitGame, this );

    // create game settings button
    this.objects.btn_settings = this.add.rectangle( BREAKOUT.config.width / 2, 400,
    200, 40, COLORS.secondary, 1 );
    this.objects.txt_settings = this.add.text( BREAKOUT.config.width / 2, 400,
    "Settings",{ fontSize: "20px", color: COLORS.secondary }).setOrigin( 0.5 );


    this.objects.btn_settings.setInteractive();
    this.objects.btn_settings.on("pointerdown", this.launchSettingsMenu, this );
  }

  resumeGame(){
    // resume game scene
    this.scene.resume( "gameStageScene", [] );
    // put the pause menu to sleep
    this.scene.sleep( this.scene.key, [] );
    return;
  }

  /**Launches the settings scene */
  launchSettingsMenu(){
    // navigate to settings scene
    navigateToScene( "gameSettingsScene",  { callingScene: this.scene.key } );
    // put the pause scene to sleep 
    this.scene.sleep( this.scene.key );
    return;
  }

  /** */
  quitGame(){
    // exit to main menu
    navigateToScene( "mainMenuScene" );
    // shutdown the pause menu and the game stage menu;
    shutDownScenes("gameStageScene", "gamePauseScene");
    return
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