
import Particle from "./particle.js";
import Vector from "./vector.js";

const TAU = Math.PI * 2;

class App {

    constructor () {
        this.initializeUI();

        window.addEventListener("resize", this.resize.bind(this));
        this.resize();

        this.initializeModels();

        this.updateFn = this.update.bind(this);
        this.update(performance.now());
    }

    initializeUI() {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);
    }

    initializeModels() {
        this.aux = new Vector();

        const centerX = this.width / 2;
        const centerY = this.height / 2;
        this.centerParticle = new Particle(centerX, centerY);

        const minDimension = Math.min(this.width, this.height);
        const minRadius = minDimension * .25;
        const maxRadius = minDimension * .5;

        const NUM_PARTICLES = 200;
        this.particles = Array(NUM_PARTICLES);
        for (let i = 0; i < NUM_PARTICLES; i++) {
            const radius = minRadius + Math.random() * (maxRadius - minRadius);
            const angle = Math.random() * TAU;
            this.aux.setPolarCoordinates(angle, radius);
            this.aux.add(this.centerParticle.position);

            const particle = new Particle(0, 0);
            particle.position.set(this.aux);

            // this.aux.set(particle.position);
            // this.aux.sub(this.centerParticle.position);
            // this.aux.normalize();
            //
            // this.aux.rotate(-Math.PI).normalize();
            // particle.velocity.set(this.aux);

            this.particles[i] = particle;
            // console.info(`Setting particle at ${x},${y}`);
        }
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.setAttribute("width", this.width);
        this.canvas.setAttribute("height", this.height);
    }

    update() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        // this.centerParticle.draw(this.ctx);
        for (const particle of this.particles) {
            particle.acceleration.clear();
            this.computeNuclearForce(particle);
            particle.update();
            particle.draw(this.ctx);
        }

        requestAnimationFrame(this.updateFn);
    }

    /**
     * @param {Particle} particle
     */
    computeNuclearForce(particle) {
        Vector.subtract(this.centerParticle.position, particle.position, this.aux);
        const distance = this.aux.length;
        const I = -40;
        const B = 1.2;
        const X = distance - 180;
        // Use desmos to figure out how this formula works: https://www.desmos.com/calculator/ltmrialkfl
        // I made it similar to the nuclear force: https://en.wikipedia.org/wiki/Nuclear_force
        // There is a hack, though: the positive constant at the end. It's necessary to bring back particles going away.
        const magnitude = X * I * B ** (- X) + .03;
        this.aux.normalize().scale(magnitude);
        particle.acceleration.set(this.aux);
    }
}

new App();
