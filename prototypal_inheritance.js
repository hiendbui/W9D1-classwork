// Function.prototype.inherits = function (parentClass) {
//     function Surrogate () {};
//     Surrogate.prototype = parentClass.prototype;
//     this.prototype = new Surrogate ();
//     this.prototype.constructor = this;
// }

Function.prototype.inherits = function (parentClass) {
    this.prototype = Object.create(parentClass.prototype);
    this.prototype.constructor = this;
}

function MovingObject (name, velocity, size) {
    this.name = name;
    this.velocity = velocity;
    this.size = size;
}

MovingObject.prototype.increaseSpeed = function () {
    this.velocity += 100;
}

function Ship (name, velocity,size) {
    MovingObject.call(this, name, velocity, size);

}

Ship.inherits(MovingObject);

Ship.prototype.destroyAsteroid = function () {
    console.log(`${this.name} destroyed asteroid!`);
}

function Asteroid (name,velocity,size) {
    MovingObject.call(this, name, velocity, size);
}

Asteroid.inherits(MovingObject);

Asteroid.prototype.destroyShip = function() {
    console.log(`${this.name} destroyed ship!`);
}


const a = new Asteroid("A",100,200);
console.log(a.name);
a.destroyShip();
const space = new Ship("space",60,100);
space.destroyAsteroid();
a.destroyAsteroid();


