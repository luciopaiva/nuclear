
import Vector from "./vector.js";

const TAU = Math.PI * 2;
const RADIUS = 6;
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
        this.drawTail(ctx, this.velocity, "#930067", 20);
        // this.debugVector(ctx, this.velocity, "#2983c5", 50);
        // this.debugVector(ctx, this.acceleration, "#2983c5", 50);

        ctx.beginPath();
        ctx.fillStyle = "#9c2050";  //this.color;
        ctx.ellipse(this.position.x, this.position.y, RADIUS, RADIUS, 0, 0, TAU);
        ctx.fill();
    }

    drawTail(ctx, vector, color, scalar) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 4;
        ctx.moveTo(this.position.x, this.position.y);
        this.aux.set(vector).scale(-scalar).add(this.position);
        ctx.lineTo(this.aux.x, this.aux.y);
        ctx.stroke();
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
