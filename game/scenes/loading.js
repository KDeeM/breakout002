import { deleteScene, logExistingScenes, sceneExists, writeSceneKey } from "../gameFunction.js";
import { MainMenuScene } from "./mainmenu.js";

export class LoadingScene extends Phaser.Scene{
  constructor(){
    super( "loadingScene" );
    this.objects = {
      launchAttemptCount: 0,
      maxLaunchAttempt: 3,
      launchAttemptDelay: 1500
    }
  }

  create(){
    // scene Label
    writeSceneKey( this );

    // add the main menu to the scenes
    this.createMainMenuScene();    
  }

  mainMenuLaunch(){
    this.objects.launchAttemptCount += 1;
    // check if main menu key exists
    if( sceneExists("mainMenuScene") ){
      // start main menu scene
      this.scene.run( "mainMenuScene", [] );
      // destroy current scene
      deleteScene( this );
      return true;
    }

    // if scene does not exist
    // increment launch attempt counter, retry check
    if( this.objects.launchAttemptCount < this.objects.maxLaunchAttempt ){
      // wait a few moments and launch the main menu
      this.time.delayedCall(
        this.objects.launchAttemptDelay,
        this.mainMenuLaunch,
        undefined,
        this
      )
    } else {
      this.mainMenuLaunchError();
    }
    return false;
  }

  createMainMenuScene(){
    this.scene.add( "mainMenuScene", MainMenuScene );

    // wait a few moments and launch the main menu
    this.time.delayedCall(
      this.objects.launchAttemptDelay,
      this.mainMenuLaunch,
      undefined,
      this
    )
  }

  mainMenuLaunchError(){
    console.log( "failed to start menu" );
  }
}