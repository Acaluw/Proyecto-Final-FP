export default class MensajeInformacion extends Phaser.GameObjects.Text{
    constructor(x: number, y: number, texto: string, tam: number, fuente: string,centrado: string, scene: Phaser.Scene) {
        super(scene, x, y, texto, {
            color: '#ffffff', 
            align: centrado, 
            fontFamily: fuente,
            fontSize: tam+'px',
            padding: {
                left: 10,
                right: 10,
                bottom: 100
            }
        });
    }
}