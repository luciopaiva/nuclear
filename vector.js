
export default class Vector {

    constructor (x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.save();
    }

    /**
     * @return {Vector}
     */
    save() {
        this.savedX = this.x;
        this.savedY = this.y;
        this.savedZ = this.z;
        return this;
    }

    /**
     * @return {Vector}
     */
    restore() {
        this.x = this.savedX;
        this.y = this.savedY;
        this.z = this.savedZ;
        return this;
    }

    /**
     * @return {Vector}
     */
    clear() {
        this.x = this.y = this.z = 0;
        return this;
    }

    /**
     * @param {Number} phi
     * @param {Number} theta
     * @return {Vector}
     */
    setSphericalCoordinates(phi, theta) {
        this.x = Math.cos(phi) * Math.sin(theta);
        this.y = Math.sin(theta) * Math.sin(phi);
        this.z = Math.cos(theta);
        return this;
    }

    /**
     * @param {Number} phi
     * @param {Number} radius
     * @return {Vector}
     */
    setPolarCoordinates(phi, radius) {
        this.x = Math.cos(phi);
        this.y = Math.sin(phi);
        this.z = 0;
        this.mul(radius);
        return this;
    }

    /**
     * @param {Vector} other
     * @return {Vector}
     */
    copyFrom(other) {
        this.x = other.x;
        this.y = other.y;
        this.z = other.z;
        return this;
    }

    /**
     * @param {Vector|Number} x
     * @param {Number} [y]
     * @param {Number} [z]
     * @returns {Vector}
     */
    set(x = 0, y = 0, z = 0) {
        if (x instanceof Vector) {
            this.x = x.x;
            this.y = x.y;
            this.z = x.z;
        } else {
            this.x = x;
            this.y = y;
            this.z = z;
        }
        return this;
    }

    /**
     * @param {Number|Vector} other
     * @returns {Vector}
     */
    add(other) {
        if (other instanceof Vector) {
            this.x += other.x;
            this.y += other.y;
            this.z += other.z;
        } else {
            this.x += other;
            this.y += other;
            this.z += other;
        }
        return this;
    }

    /**
     * @param {Number|Vector} other
     * @return {Vector}
     */
    sub(other) {
        if (other instanceof Vector) {
            this.x -= other.x;
            this.y -= other.y;
            this.z -= other.z;
        } else {
            this.x -= other;
            this.y -= other;
            this.z -= other;
        }
        return this;
    }

    /**
     * @param {Number} scalar
     * @returns {this}
     */
    mul(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        return this;
    }

    /**
     * @param {Number} scalar
     * @returns {this}
     */
    scale(scalar) {
        return this.mul(scalar);
    }

    /**
     * @param {Number} scalar
     * @returns {this}
     */
    div(scalar) {
        this.x /= scalar;
        this.y /= scalar;
        this.z /= scalar;
        return this;
    }

    /**
     * @param {Number} radians
     * @returns {this}
     */
    rotate(radians) {
        const x = this.x;
        const y = this.y;
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        this.x = cos * x - sin * y;
        this.y = sin * x - cos * y;
        return this;
    }

    /**
     * Gets the angle (in radians) between this vector and the unit vector (1, 0). Note that this considers only the
     * plane x,y - z coordinate is discarded
     * @returns {Number}
     */
    get angle() {
        return Math.atan2(this.y, this.x);
    }

    /**
     * @return {Number}
     */
    get length() {
        return Math.hypot(this.x, this.y, this.z);
    }

    /**
     * @return {Vector}
     */
    normalize() {
        const len = this.length;
        if (len !== 0) {
            this.x /= len;
            this.y /= len;
            this.z /= len;
        }
        return this;
    }

    /**
     * @return {Vector}
     */
    limit(maxLength) {
        if (this.length > maxLength) {
            this.normalize().scale(maxLength);
        }
        return this;
    }

    /**
     * You may need to normalize the vectors first.
     *
     * @param {Vector} other
     * @returns {Number}
     */
    dot(other) {
        return Vector.dot(this, other);
    }

    /**
     * @param {Vector} other
     * @param {Vector} result
     * @return {Vector}
     */
    cross(other, result = this) {
        Vector.cross(this, other, result);
        return result;
    }

    /**
     * @return {String}
     */
    toString() {
        return Array.from(this.d).join(" ");
    }


    /**
     * @param {Vector} v1
     * @param {Number} scalar
     * @param {Vector} result
     * @returns {Vector} result
     */
    static scale(v1, scalar, result) {
        result.x = v1.x * scalar;
        result.y = v1.y * scalar;
        result.z = v1.z * scalar;
        return result;
    }

    /**
     * @param {Vector} v1
     * @param {Vector} v2
     * @param {Vector} result
     * @returns {Vector} result
     */
    static add(v1, v2, result) {
        result.x = v1.x + v2.x;
        result.y = v1.y + v2.y;
        result.z = v1.z + v2.z;
        return result;
    }

    /**
     * @param {Vector} v1
     * @param {Vector} v2
     * @param {Vector} result
     * @returns {Vector} result
     */
    static subtract(v1, v2, result) {
        result.x = v1.x - v2.x;
        result.y = v1.y - v2.y;
        result.z = v1.z - v2.z;
        return result;
    }

    /**
     * @param {Vector} a
     * @param {Vector} b
     * @param {Vector} result
     * @returns {Vector}
     */
    static cross(a, b, result) {
        result.x = a.y * b.z - a.z * b.y;
        result.y = a.z * b.x - a.x * b.z;
        result.z = a.x * b.y - a.y * b.x;
        return result;
    }

    /**
     * @param {Vector} a
     * @param {Vector} b
     * @returns {Number}
     */
    static dot(a, b) {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }

    /**
     * @param {Vector} other
     * @returns {Vector}
     */
    static from(other) {
        return new Vector(other.x, other.y, other.z)
    }

    /**
     * @param {Vector} a
     * @param {Vector} b
     * @returns {Number}
     */
    static distance(a, b) {
        return Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
    }

    /**
     * @param {Vector} a
     * @param {Vector} b
     * @returns {Number}
     */
    static squaredDistance(a, b) {
        return (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2;
    }
}
