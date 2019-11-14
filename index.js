
import Particle from "./particle.js";
import {readCssVar} from "./utils.js";
import Vector from "./vector.js";

class App {

    constructor () {
        this.initializeUI();
        this.initializeModels();

        window.addEventListener("resize", this.resize.bind(this));
        this.resize();

        this.updateFn = this.update.bind(this);
        this.update(performance.now());
    }

    initializeUI() {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);
    }

    initializeModels() {
        this.particleColor = readCssVar("particle-color");
        this.particles = [new Particle(0, 0, this.particleColor)];
        this.centerParticle = new Particle(0, 0, this.particleColor);
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.setAttribute("width", this.width);
        this.canvas.setAttribute("height", this.height);

        const centerX = this.width / 2;
        const centerY = this.height / 2;
        this.centerParticle.position.set(centerX, centerY);

        const particle = this.particles[0];
        particle.position.set(0.7 * centerX, 0.7 * centerY);
        particle.velocity.set(0, 0);
    }

    update() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.centerParticle.draw(this.ctx);
        for (const particle of this.particles) {
            particle.acceleration.clear();
            this.computeNuclearForce(particle);
            particle.update();
            particle.draw(this.ctx);
        }

        requestAnimationFrame(this.updateFn);
    }

    aux = new Vector();

    /**
     * @param {Particle} particle
     */
    computeNuclearForce(particle) {
        Vector.subtract(this.centerParticle.position, particle.position, this.aux);
        const distance = this.aux.length;
        const I = -8;
        const B = 1.2;
        const X = distance - 35;
        const magnitude = X * I * B ** (- X) + 0.1;
        this.aux.normalize().scale(magnitude);
        particle.acceleration.set(this.aux);
    }
}

new App();
