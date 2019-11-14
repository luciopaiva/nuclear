
import Vector from "./vector.js";

const TAU = Math.PI * 2;
const RADIUS = 8;

export default class Particle {

    constructor (x, y, color) {
        this.position = new Vector(x, y);
        this.velocity = new Vector();
        this.acceleration = new Vector();
        this.color = color;
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     */
    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.ellipse(this.position.x, this.position.y, RADIUS, RADIUS, 0, 0, TAU);
        ctx.fill();
    }
}
