import CargaDatos from './escenas/cargadatos';
import prologo from './escenas/Prologo';
import MenuOptions from './escenas/MenuOptions';
import menu from './escenas/menu';
import batalla from './escenas/batalla';
import batallaInterfaz from './escenas/batallaInterfaz';
import eventosTexto from './escenas/eventosTexto';
import victoria_derrota from './escenas/victoria_derrota';

const Configuracion = {
  type: Phaser.AUTO, //AUTO: Automáticamente elige WebGL o Canvas

  scene: [CargaDatos, menu, MenuOptions, prologo, batalla, batallaInterfaz, eventosTexto, victoria_derrota],
  scale: {
    scale: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800, 
    height: 600,
  },
  render: {
    pixelArt: true,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  parent: 'divjuego',
};

export default Configuracion;
