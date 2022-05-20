import { LoadingScene } from "./scenes/loading.js";
import { MainMenuScene } from "./scenes/mainmenu.js";

export const COLORS = {
  main: 0x184e77,
  secondary: 0xd9ed92,
}
export const BREAKOUT = {
  config: {
    type: Phaser.AUTO,
    width: 360,
    height: 720,
    parent: document.querySelector("#pageContent .gameContainer"),
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
      default: "arcade",
      arcade: {},
    },
    backgroundColor: COLORS.main,
    scene: [ LoadingScene, MainMenuScene ],
  }
}

export function startGame(){
  BREAKOUT.game = new Phaser.Game( BREAKOUT.config );
  return;
}