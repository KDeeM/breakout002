import { BREAKOUT, COLORS } from "./game.js";

export function generateTestObject( scene, color = COLORS.main ){
  let textBox = scene.add.rectangle(
    BREAKOUT.config.width / 2,
    BREAKOUT.config.height/ 2,
    200,
    200,
    color
  );
  scene.add.existing( textBox );
  return;
}

/**Helper function for switching between scenes, the second parameter
 * sets the state to leave the scene being exited from.
 */
export function switchScene( currentScene ,targetScene, data = [], exitState = "sleep" ){
  BREAKOUT.game.scene.run( targetScene, data );

  switch( exitState ){
    default:
      BREAKOUT.game.scene.sleep( currentScene.scene.key );
    
  }
}

export function singleShotTimer( scene, delay, callback, context = null, ...args ){
  // error checking
  if( scene instanceof Phaser.Scene == false ) return false;
  if( _.isFunction( callback ) == false ) return false;

  // create the callback to run
  context = scene ? context == null : context;

  scene.time.delayedCall(
    delay, callback, [...args],context
  );
  return;
}

export function deleteScene( scene ){
  BREAKOUT.game.scene.remove( scene.scene.key );
  return;
}

/**Takes a scene key as a parameter, checks if the scene exists,
 * if it does not exist it falls back to the main menu by default
 */
export function navigateToScene( scene_key, data = null ){
  let targetScene = "mainMenuScene";
  try{
    if( sceneExists( scene_key ) ){
      targetScene = scene_key;
    }

    BREAKOUT.game.scene.run( targetScene, data );
    return true;
  }catch( err ){
    console.error( err );
  }
  return false;
}

export function sceneExists( sceneTag ){
  let keys = BREAKOUT.game.scene.keys;
  if( sceneTag in keys ) return true;
  return false;
}

export function writeSceneKey( scene ){
  scene.add.text( 0, 0, scene.scene.key );
  return;
}

export function logExistingScenes(){
  console.log( BREAKOUT.game.scene.keys);
  return;
}

/**Iterates thhrough the scenes passed and for each shutsdown */
export function shutDownScenes( ...scenes ){
  let scenesList = scenes;
  // only retain valid scenes
  let invalidScenes = []
  let validScenes = scenesList.filter(
    function( scene ){
      if( sceneExists( scene ) ) return true;
      invalidScenes.push( scene );
      return false;
    }
  );
  // shutdown scenes 
  validScenes.forEach(
    function( scene ){
      BREAKOUT.game.scene.stop( scene );
    }
  )
  // display an error for invalid scenes
  if( invalidScenes.length > 0 ){
    console.error( `invalid scene keys passed ${invalidScenes}` );
  }

  return;
}

export function createScene( scene_key, scene_class ){
  if( sceneExists( scene_key ) ){
    return true;
  }
  BREAKOUT.game.scene.add( scene_key, scene_class );
  return;
}