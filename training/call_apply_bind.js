// apply
let user = {
    name: 'Name',
    surname: 'Surname',
    getText(textLeft, textRight) {
        return textLeft + ' ' + this.name + ' ' + this.surname + ' ' + textRight;
    }
};

let greeting = user.getText;

setTimeout(() => {
    try {
        const text = greeting('Dear', 'hello!');
        console.log('text', text);
    } catch(e) {
        console.trace(e);
    }
}, 1000);

setTimeout(() => {
    try {
        const text = greeting.call(user, 'Dear', 'hello!');
        console.log('text', text);
    } catch(e) {
        console.trace(e);
    }
}, 2000);

setTimeout(() => {
    try {
        const text = greeting.apply(user, ['Dear', 'hello!']);
        console.log('text', text);
    } catch(e) {
        console.trace(e);
    }
}, 3000);

setTimeout(() => {
    try {
        const bind = greeting.bind(user, 'Dear', 'hello!');
        console.log('text', bind());
    } catch(e) {
        console.trace(e);
    }
}, 4000);