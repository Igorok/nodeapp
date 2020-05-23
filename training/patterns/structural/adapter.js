/*

Структурные паттерны проектирования - отвечают за построение удобных в поддержке иерархий классов.
Адаптер — это структурный паттерн проектирования, который позволяет объектам с несовместимыми интерфейсами работать вместе.
Это объект-переводчик, который трансформирует интерфейс или данные одного объекта в такой вид, чтобы он стал понятен другому объекту.

*/

class RoundHole {
    constructor(p) {
        this.radius = p.radius;
    }
    fits(roundPeg) {
        if (! roundPeg || ! roundPeg.radius) {
            throw new Error('Wrong peg');
        }

        return this.radius >= roundPeg.radius;
    }
}

class RoundPeg {
    constructor(p) {
        this.radius = p.radius;
    }
}

class SquarePeg {
    constructor(p) {
        this.width = p.width;
    }
}

class SquarePegAdapter {
    constructor(squarePeg) {
        // const radius = Math.sqrt(Math.pow(squarePeg.width, 2) * 2) / 2;
        const radius = squarePeg.width * Math.sqrt(2) / 2;
        console.log('radius', radius);

        return new RoundPeg({ radius });
    }
}

const roundHole = new RoundHole({ radius: 5 });
const rp1 = new RoundPeg({ radius: 5 });
const rp2 = new RoundPeg({ radius: 10 });

const sp1 = new SquarePeg({ width: 5 });
const sp2 = new SquarePeg({ width: 10 });

const spa1 = new SquarePegAdapter(sp1);
const spa2 = new SquarePegAdapter(sp2);

console.log('rp1', roundHole.fits(rp1));
console.log('rp2', roundHole.fits(rp2));

console.log('spa1', roundHole.fits(spa1));
console.log('spa2', roundHole.fits(spa2));

console.log('sp1', roundHole.fits(sp1));
console.log('sp1', roundHole.fits(sp1));

