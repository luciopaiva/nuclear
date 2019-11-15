
import Vector from "./vector.js";

const TAU = Math.PI * 2;
const RADIUS = 5;
const MAX_VEL = 2;

export default class Particle {

    constructor (x, y, color) {
        this.color = color;

        this.position = new Vector(x, y);
        this.velocity = new Vector();
        this.acceleration = new Vector();

        this.aux = new Vector();
    }

    update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(MAX_VEL);
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

        // this.debugVector(ctx, this.velocity, "#d30000", 10);
        this.debugVector(ctx, this.acceleration, "#63ba61",500);
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     * @param {Vector} vector
     * @param {String} color
     * @param {Number} scalar
     */
    debugVector(ctx, vector, color, scalar) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.moveTo(this.position.x, this.position.y);
        this.aux.set(vector).scale(scalar).add(this.position);
        ctx.lineTo(this.aux.x, this.aux.y);
        ctx.stroke();
    }
}
