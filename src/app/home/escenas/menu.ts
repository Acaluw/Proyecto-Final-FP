import GestorBD from "src/basedatos/gestorbd";
import Constantes from "../constantes";
import Mensaje from "../gameobjects/Mensaje";
import MenuOptions from "./MenuOptions";


export default class Menu extends Phaser.Scene {
    public static music: any;
    public static bd: GestorBD;

    private background_back_mountains: any;
    private background_top_mountains: any;

    version!: Phaser.GameObjects.Container;

    private btnPlay!: any;
    private btnOptions!: any;

    constructor() {
        super('Menu');
    }

    create() //Crea escena
    {
        const ancho = this.sys.canvas.width
        const alto = this.sys.canvas.height;

        Menu.bd = new GestorBD();
        if (Menu.bd.datos.datosGuardados == false){
            Menu.music = this.sound.add(Constantes.SONIDOS.MENU,{volume: MenuOptions.ambientSound/100});
        } else {
            Menu.music = this.sound.add(Constantes.SONIDOS.MENU,{volume: Menu.bd.datos.musica.volumenAmbiente/100});
        }

        this.cameras.main.fadeIn(700, 0, 0, 0, (camera: Phaser.Cameras.Scene2D.Camera, progreso: number) => {
            if (progreso == 1){
                Menu.music.play({
                    loop: true
                });
            }
        });
        
        //Declaración de elementos del menú
        const background = this.add.image(ancho / 2, alto / 2, Constantes.ELEMENTOS_MENU.FONDO_MENU);
        this.background_back_mountains = this.add.tileSprite(ancho/2, alto/2, 0, 0, Constantes.ELEMENTOS_MENU.ANIMACION_2);
        this.background_top_mountains = this.add.tileSprite(ancho / 2, alto / 2, 0, 0, Constantes.ELEMENTOS_MENU.ANIMACION_1);
        const title1 = this.add.image((ancho/2)-50, alto/8 , Constantes.ELEMENTOS_MENU.TITULO_1);
        const title2 = this.add.image((ancho/2)+50, alto/3.5, Constantes.ELEMENTOS_MENU.TITULO_2);
        this.btnPlay = this.add.image(ancho/2, alto/2, Constantes.ELEMENTOS_MENU.BOTON_JUGAR);
        this.btnOptions = this.add.image(ancho/2, (alto/2)+90, Constantes.ELEMENTOS_MENU.BOTON_OPCIONES);
        const bottom = this.add.image(ancho/2,alto-20, Constantes.ELEMENTOS_MENU.AUTOR);

        this.version = this.add.container();
        this.version.add( new Mensaje ( ancho-110, alto-20, Constantes.VERSION.V, this) );

        //Ajustes de elementos
        bottom.scaleX = 0.28;
        bottom.scaleY = 0.28;
        this.btnPlay.scaleX = 0.5;
        this.btnPlay.scaleY = 0.5;
        this.btnOptions.scaleX = 0.5;
        this.btnOptions.scaleY = 0.5;

        //Acciones de elementos
        this.btnPlay.setInteractive();
        this.btnOptions.setInteractive();
        
        this.comenzarJuego(this.btnPlay, Constantes.ESCENAS.PROLOGO);
        this.cambiarEscena(this.btnOptions, Constantes.ESCENAS.MENUOPTIONS);
        console.log("Escena Menú Creada");
    }

    override update() {//Se ejecuta cada x milisegundos
        this.background_back_mountains.tilePositionX +=0.15;
        this.background_top_mountains.tilePositionX += 0.5;
    }

    cambiarEscena(titulo: any, escena: string) 
    {
        titulo.on('pointerdown', () => {
            this.cameras.main.fadeOut(150, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam: any, effect: any) => {
                this.time.delayedCall(300, () => {
                    this.scene.start(escena);
                })
            })            
        });   
    }

    comenzarJuego(titulo: any, escena: string)
    {
        titulo.on('pointerdown', () => {
            this.cameras.main.fadeOut(300, 0, 0, 0);
            this.sound.stopAll();
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam: any, effect: any) => {
                this.time.delayedCall(350, () => {
                    this.scene.start(escena);
                })
            })            
        });
    }
}