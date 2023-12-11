import Constantes from "../constantes";
import Miestilo from "../textos";
import Menu from "./menu";

export default class MenuOptions extends Phaser.Scene {
    public static ambientSound: number = 25;
    public static effectsSound: number = 25;
    background_back_mountains: any;
    background_top_mountains: any;

    constructor() { super('MenuOptions'); }

    preload(){}

    create()
    {
        const ancho = this.sys.canvas.width
        const alto = this.sys.canvas.height;

        this.cameras.main.fadeIn(150, 0, 0, 0);

        //Declaración de elementos del menú
        const background = this.add.image(ancho / 2, alto / 2, Constantes.ELEMENTOS_MENU.FONDO_MENU);
        this.background_back_mountains = this.add.tileSprite(ancho/2, alto/2, 0, 0, Constantes.ELEMENTOS_MENU.ANIMACION_2);
        this.background_top_mountains = this.add.tileSprite(ancho / 2, alto / 2, 0, 0, Constantes.ELEMENTOS_MENU.ANIMACION_1);
        const optionsTitle = this.add.image((ancho/2), alto/8, Constantes.ELEMENTOS_MENU.OPCIONES_TITULO);
        const border = this.add.image(ancho/2, alto/2, Constantes.ELEMENTOS_MENU.OPCIONES_CUADRO);
        const border_back = this.add.image(ancho/2, alto/2, Constantes.ELEMENTOS_MENU.OPCIONES_FONDO);
        
        const ambient_vol_title = this.add.image(ancho/2, (alto/3)-30, Constantes.ELEMENTOS_MENU.OPCIONES_VOL_AMBIENTE);
        const ambient_box = this.add.image(ancho/2, (alto/2)-60, Constantes.ELEMENTOS_MENU.OPCIONES_CUADRO);
        const ambient_box_back = this.add.image(ancho/2, (alto/2)-60, Constantes.ELEMENTOS_MENU.OPCIONES_FONDO);
        
        const effects_vol_title = this.add.image(ancho/2, (alto/2)+60, Constantes.ELEMENTOS_MENU.OPCIONES_VOL_EFECTOS);
        const effects_box = this.add.image(ancho/2, (alto/2)+120, Constantes.ELEMENTOS_MENU.OPCIONES_CUADRO);
        const effects_box_back = this.add.image(ancho/2, (alto/2)+120, Constantes.ELEMENTOS_MENU.OPCIONES_FONDO);
        
        const music_volumen_up = this.add.sprite((ancho/2)+100, (alto/2)-60, Constantes.ELEMENTOS_MENU.OPCIONES_ATLAS_BOTONES);
        const music_volumen_down = this.add.sprite((ancho/2)-100, (alto/2)-60, Constantes.ELEMENTOS_MENU.OPCIONES_ATLAS_BOTONES);

        const effects_volumen_up = this.add.sprite((ancho/2)+100, (alto/2)+120, Constantes.ELEMENTOS_MENU.OPCIONES_ATLAS_BOTONES);
        const effects_volumen_down = this.add.sprite((ancho/2)-100, (alto/2)+120, Constantes.ELEMENTOS_MENU.OPCIONES_ATLAS_BOTONES);
        
        const btnBack = this.add.image(ancho/2, alto-50, Constantes.ELEMENTOS_MENU.OPCIONES_VOLVER);

        //Ajustes de elementos
        border.scaleX = 1.25;
        border.scaleY = 1.25;
        
        border_back.scaleX = 1.25;
        border_back.scaleY = 1.25;
        border_back.alpha = 0.5;
        
        btnBack.scaleX = 0.40;
        btnBack.scaleY = 0.40;
        
        optionsTitle.scaleX = 0.75;
        optionsTitle.scaleY = 0.75;

        ambient_vol_title.scaleX = 0.5;
        ambient_vol_title.scaleY = 0.5;
        ambient_box.scaleX = 0.3;
        ambient_box.scaleY = 0.2;
        ambient_box_back.scaleX = 0.3;
        ambient_box_back.scaleY = 0.2;
        ambient_box_back.alpha = 0.75;

        effects_vol_title.scaleX = 0.5;
        effects_vol_title.scaleY = 0.5;
        effects_box.scaleX = 0.3;
        effects_box.scaleY = 0.2;
        effects_box_back.scaleX = 0.3;
        effects_box_back.scaleY = 0.2;
        effects_box_back.alpha = 0.75;

        music_volumen_up.scaleX = 0.75;
        music_volumen_up.scaleY = 0.75;
        music_volumen_down.scaleX = 0.75;
        music_volumen_down.scaleY = 0.75;
        music_volumen_down.flipX = true;

        effects_volumen_up.scaleX = 0.75;
        effects_volumen_up.scaleY = 0.75;
        effects_volumen_down.scaleX = 0.75;
        effects_volumen_down.scaleY = 0.75;
        effects_volumen_down.flipX = true;

        //Asignacion de cajas de texto (mostrar volumen de musica y efectos)
        var musicText = this.add.text((ancho/2)-15, (alto/2)-65, MenuOptions.ambientSound.toString()+' %', Miestilo);
        var effectsText = this.add.text((ancho/2)-15, (alto/2)+115, MenuOptions.effectsSound.toString()+' %', Miestilo);

        //Acciones de elementos
        this.anims.create({
            key: 'btninteract',
            frames: this.anims.generateFrameNames('menu_options_button', {
                start: 1,
                prefix: "sprite", //Prefijo de los sprites
                end: 3
            }),
            frameRate: 10,
            repeat: 0
        });

        btnBack.setInteractive();
        this.cambiarEscena(btnBack, Constantes.ESCENAS.MENU);

        music_volumen_up.setInteractive().on('pointerdown', () =>{
            music_volumen_up.play('btninteract');
            if (MenuOptions.ambientSound < 100) {
                MenuOptions.ambientSound = MenuOptions.ambientSound+5;
                Menu.bd.datos.musica.volumenAmbiente = MenuOptions.ambientSound;
                Menu.bd.actualizarBD();
                musicText.destroy();
                musicText = this.add.text((ancho/2)-15, (alto/2)-65, MenuOptions.ambientSound.toString()+' %', Miestilo);
            }
        });
        music_volumen_down.setInteractive().on('pointerdown', () =>{
            music_volumen_down.play('btninteract');
            if (MenuOptions.ambientSound > 0) {
                MenuOptions.ambientSound = MenuOptions.ambientSound-5;
                Menu.bd.datos.musica.volumenAmbiente = MenuOptions.ambientSound;
                Menu.bd.actualizarBD();
                musicText.destroy();
                musicText = this.add.text((ancho/2)-15, (alto/2)-65, MenuOptions.ambientSound.toString()+' %', Miestilo);
            }
        });

        effects_volumen_up.setInteractive().on('pointerdown', () =>{
            effects_volumen_up.play('btninteract');
            if (MenuOptions.effectsSound < 100) {
                MenuOptions.effectsSound = MenuOptions.effectsSound+5;
                Menu.bd.datos.musica.volumenEfectos = MenuOptions.effectsSound;
                Menu.bd.actualizarBD();
                effectsText.destroy();
                effectsText = this.add.text((ancho/2)-15, (alto/2)+115, MenuOptions.effectsSound.toString()+' %', Miestilo);
            }
        });
        effects_volumen_down.setInteractive().on('pointerdown', () =>{
            effects_volumen_down.play('btninteract');
            if (MenuOptions.effectsSound > 0) {
                MenuOptions.effectsSound = MenuOptions.effectsSound-5;
                Menu.bd.datos.musica.volumenEfectos = MenuOptions.effectsSound;
                Menu.bd.actualizarBD();
                effectsText.destroy();
                effectsText = this.add.text((ancho/2)-15, (alto/2)+115, MenuOptions.effectsSound.toString()+' %', Miestilo);
            }
        });
    }

    override update(){}

    cambiarEscena(titulo: any, escena: string) 
    {
        titulo.on('pointerdown', () => {
            this.cameras.main.fadeOut(150, 0, 0, 0);
            this.tweens.add({
                targets: Menu.music,
                volume: 0,
                duration: 500,
                onComplete: () => {this.sound.stopAll();}
            });
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam: any, effect: any) => {
                this.time.delayedCall(600, () => {
                    this.scene.start(escena);
                })
            })            
        });   
    }
}