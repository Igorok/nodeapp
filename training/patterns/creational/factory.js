
/*
Фабричный метод — это порождающий паттерн проектирования, который определяет общий интерфейс для создания объектов в суперклассе, позволяя подклассам изменять тип создаваемых объектов.
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

// dialog
class Dialog {
    constructor() {}
    onButtonClick(p) {
        this.button.onClick(p);
    }
}

class DialogRectagle extends Dialog {
    constructor() {
        super();
        this.button = new ButtonRectagle();
    }
    onButtonClick(p) {
        console.log('DialogRectagle');
        super.onButtonClick(p);
    }
}

class DialogCircle extends Dialog {
    constructor() {
        super();
        this.button = new ButtonCircle();
    }
    onButtonClick(p) {
        console.log('DialogCircle');
        super.onButtonClick(p);
    }
}

// application
class Application {
    constructor(type) {
        if (type === 'rectagle') {
            this.dialog = new DialogRectagle();
        } else {
            this.dialog = new DialogCircle();
        }
    }

    onDialogConfirm(p) {
        this.dialog.onButtonClick(p);
    }
}

const a = new Application('rectagle');
a.onDialogConfirm('ok');
