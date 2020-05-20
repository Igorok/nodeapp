/*
Абстрактная фабрика — это порождающий паттерн проектирования, который позволяет создавать семейства связанных объектов, не привязываясь к конкретным классам создаваемых объектов.
*/
// button
class Button {
    onClick(p) {
        console.log(p);
    }
}

class ButtonRectagle extends Button {
    onClick(p) {
        console.log('ButtonRectagle');
        super.onClick(p);
    }
}

class ButtonCircle extends Button {
    onClick(p) {
        console.log('ButtonCircle');
        super.onClick(p);
    }
}

// input
class Input {
    onChange(p) {
        console.log(p);
    }
}

class InputRectagle extends Input {
    onChange(p) {
        console.log('InputRectagle');
        super.onChange(p);
    }
}

class InputCircle extends Input {
    onChange(p) {
        console.log('InputCircle');
        super.onChange(p);
    }
}

// select
class Select {
    onSelect(p) {
        console.log(p);
    }
}

class SelectRectagle extends Select {
    onSelect(p) {
        console.log('SelectRectagle');
        super.onSelect(p);
    }
}

class SelectCircle extends Select {
    onSelect(p) {
        console.log('SelectCircle');
        super.onSelect(p);
    }
}

// factories
class Factory {
    createButton() {
        return new Button();
    }
    createInput() {
        return new Input();
    }
    createSelect() {
        return new Select();
    }
}

class FactoryRectagle extends Factory{
    createButton() {
        return new ButtonRectagle();
    }
    createInput() {
        return new InputRectagle();
    }
    createSelect() {
        return new SelectRectagle();
    }
}

class FactoryCircle extends Factory {
    createButton() {
        return new ButtonCircle();
    }
    createInput() {
        return new InputCircle();
    }
    createSelect() {
        return new SelectCircle();
    }
}

// application
class Application {
    constructor(factory) {
        this.factory = factory;
        this.button = this.factory.createButton();
        this.input = this.factory.createInput();
        this.select = this.factory.createSelect();
    }

    onButtonClick(p) {
        this.button.onClick(p);
    }
    onInputChange(p) {
        this.input.onChange(p);
    }
    onOptionSelect(p) {
        this.select.onSelect(p);
    }
}

class ApplicationCreator {
    constructor(type) {
        if (type === 'rectagle') {
            this.factory = new FactoryRectagle();
        } else {
            this.factory = new FactoryCircle();
        }
    }
    getApp() {
        return new Application(this.factory);
    }
}

const creator = new ApplicationCreator('rectagle');
const a = creator.getApp();

a.onInputChange('value');
a.onOptionSelect('option');
a.onButtonClick('confirm');
