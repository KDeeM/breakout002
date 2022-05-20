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