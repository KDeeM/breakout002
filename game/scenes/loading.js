import { generateTestObject, singleShotTimer, switchScene } from "../gameFunction.js";

export class LoadingScene extends Phaser.Scene{
  constructor(){
    super( "loadingScene" );
  }

  create(){
    generateTestObject( this, 0xff6400 );

    singleShotTimer( this, 2500, generateTestObject, null, this, 0xff0000 );

    let nextSceneParams = [ this, "mainMenuScene", []];
    singleShotTimer( this, 2500, switchScene, null, ...nextSceneParams );
    return;
  }
}