/*
Прототип — это порождающий паттерн проектирования, который позволяет копировать объекты, не вдаваясь в подробности их реализации.
Не каждый объект удастся скопировать, ведь часть его состояния может быть приватной, а значит — недоступной для остального кода программы.
Но есть и другая проблема. Копирующий код станет зависим от классов копируемых объектов. Ведь, чтобы перебрать все поля объекта, нужно привязаться к его классу. Из-за этого вы не сможете копировать объекты, зная только их интерфейсы, а не конкретные классы.
Объект, который копируют, называется прототипом (откуда и название паттерна). Когда объекты программы содержат сотни полей и тысячи возможных конфигураций, прототипы могут служить своеобразной альтернативой созданию подклассов.
*/

class Shape {
    constructor(p) {
        this.x = p.x;
        this.y = p.y;
        this.color = p.color;
    }
    clone() {
        return new Shape(this);
    }
}

class Circle extends Shape {
    constructor(p) {
        super(p);
        this.radius = p.radius;
    }
    clone() {
        return new Circle(this);
    }
}

class Rectangle extends Shape {
    constructor(p) {
        super(p);
        this.width = p.width;
        this.height = p.height;
    }
    clone() {
        return new Rectangle(this);
    }
}

const circle = new Circle({
    x: 1,
    y: 1,
    color: 'green',
    radius: 2,
});

const rectangle = new Rectangle({
    x: 5,
    y: 5,
    color: 'red',
    width: 2,
    height: 2,
});

const circleArray = [];
const rectangleArray = [];

for (let i = 0; i < 10; i++) {
    circleArray.push(circle.clone());
    rectangleArray.push(rectangle.clone());
}

console.log(
    'circleArray', circleArray,
    'rectangleArray', rectangleArray
);