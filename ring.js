
import Vector from "./vector.js";
import Particle from "./particle.js";

const TAU = Math.PI * 2;

export default class Ring {

    constructor (width, height, centerParticle) {
        this.centerParticle = centerParticle;

        this.aux = new Vector();

        const minDimension = Math.min(width, height);
        const minRadius = minDimension * .3;
        const maxRadius = minDimension * .5;

        const NUM_PARTICLES = 300;
        this.particles = Array(NUM_PARTICLES);
        for (let i = 0; i < NUM_PARTICLES; i++) {
            const radius = minRadius + Math.random() * (maxRadius - minRadius);
            const angle = Math.random() * TAU;
            this.aux.setPolarCoordinates(angle, radius);
            this.aux.add(this.centerParticle.position);

            const particle = new Particle(0, 0, "#5385E0");
            particle.position.set(this.aux);

            this.aux.set(this.centerParticle.position);
            this.aux.sub(particle.position);
            this.aux.normalize();

            this.aux.rotate(-Math.PI/2);
            this.aux.normalize().mul(2);
            particle.velocity.set(this.aux);

            this.particles[i] = particle;
        }
    }

    update() {
        for (const particle of this.particles) {
            particle.acceleration.clear();
            this.computeNuclearForce(particle);
            particle.update();
        }
    }

    draw(ctx) {
        for (const particle of this.particles) {
            particle.draw(ctx);
        }
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
