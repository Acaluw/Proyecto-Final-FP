export default class Mensaje extends Phaser.GameObjects.Text{
    constructor(x: number, y: number, texto: string, scene: Phaser.Scene) {
        super(scene, x, y, texto, {
            color: '#ffffff', 
            align: 'left', 
            fontSize: '20px',
            padding: {
                left: 10,
                right: 10,
                bottom: 100
            }
        });
    }
}