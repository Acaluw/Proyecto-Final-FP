export default class BatallaMenuItem extends Phaser.GameObjects.Text {
    //Esta variable almacenará la opción seleccionada en el menú de ataque
    opcionMenu: string;

    constructor(x: number, y: number, texto: string, scene: Phaser.Scene) {
        super(scene, x, y, texto, {
            color: '#ffffff', 
            align: 'left', 
            fontSize: '28px',
            padding: {
                left: 5,
                right: 10,
                bottom: 100
            }
        });

        this.opcionMenu = texto;
    }

    //Método por el cuál tintamos la opción seleccionada, de modo que es reconocible
    seleccionarOpcion(){
        this.setColor('#f8ff38');
    }

    //Método por el cuál tintamos la opción no seleccionada/deseleccionada, para diferenciar de la opción seleccionada
    deseleccionarOpcion(){
        this.setColor('#ffffff');
    }

    //Método para obtener la opción seleccionada en ese momento
    getText(){
        return this.opcionMenu;
    }
}