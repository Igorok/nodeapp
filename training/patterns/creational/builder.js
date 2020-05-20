/*
Строитель — это порождающий паттерн проектирования, который позволяет создавать сложные объекты пошагово. Строитель даёт возможность использовать один и тот же код строительства для получения разных представлений объектов.
*/

class Car {
    constructor() {
        this.seats = 0;
        this.engine = '1.4';
        this.doors = 0;
        this.color = 'black';
    }

}

class CarWagon extends Car {
    constructor() {
        super();
        this.roofBox = false;
    }
}

class CarCoupe extends Car {
    constructor() {
        super();
        this.spoiler = false;
    }
}

class BuilderCar {
    constructor() {
        this.car = new Car();
    }

    setSeats(n) {
        this.car.seats = n;
    }
    setEngine(s) {
        this.car.engine = s;
    }
    setDoors(n) {
        this.car.doors = n;
    }
    setColor(s) {
        this.car.color = s;
    }

    getCar() {
        return this.car;
    }
}

class BuilderCarWagon extends BuilderCar {
    constructor() {
        super();
    }

    setRoofBox(b) {
        this.car.roofBox = b;
    }
}

class BuilderCarCoupe extends BuilderCar {
    constructor() {
        super();
    }

    setSpoiler(b) {
        this.car.spoiler = b;
    }
}

class Director {
    buildCarWagon(builder) {
        builder.setSeats(7);
        builder.setEngine('2.0');
        builder.setDoors(5);
        builder.setColor('brown');
        builder.setRoofBox(true);
        return builder.getCar();
    }

    buildCarCoupe(builder) {
        builder.setSeats(2);
        builder.setEngine('3.0');
        builder.setDoors(2);
        builder.setColor('red');
        builder.setSpoiler(true);
        return builder.getCar();
    }
}

const bw = new BuilderCarWagon();
const bc = new BuilderCarCoupe();
const dir = new Director();

const cw = dir.buildCarWagon(bw);
const cc = dir.buildCarCoupe(bc);

console.log(
    'cw', cw,
    'cc', cc
);