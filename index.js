
import Particle from "./particle.js";
import Ring from "./ring.js";

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
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        this.centerParticle = new Particle(centerX, centerY);

        this.rings = [
            new Ring(this.width, this.height, this.centerParticle, 150,
                0.35, 0.4, "#5385E0", 180, -Math.PI/2),
            new Ring(this.width, this.height, this.centerParticle, 150,
                0.25, 0.3, "#5385e0", 110, -Math.PI/2),
            new Ring(this.width, this.height, this.centerParticle, 150,
                0.1, 0.15, "#5385e0", 45, -Math.PI/2),
        ];
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

        for (const ring of this.rings) {
            ring.update();
            ring.draw(this.ctx);
        }

        requestAnimationFrame(this.updateFn);
    }
}

new App();
