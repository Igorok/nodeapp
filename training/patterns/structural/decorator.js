/*

Структурные паттерны проектирования - отвечают за построение удобных в поддержке иерархий классов.
Декоратор — это структурный паттерн проектирования, который позволяет динамически добавлять объектам новую функциональность, оборачивая их в полезные «обёртки».

*/

class User {
    constructor(p) {
        this.id = p.id;
        this.login = p.login;
        this.email = p.email;
        this.phone = p.phone;
        this.facebook = p.facebook;
        this.slack = p.slack;
    }
}

class Notifier {
    constructor(p) {
        this.user = p.user;
    }
    notify(text) {
        console.log('notify', this.user.id, text);
    }
}

class NotifierEmail extends Notifier {
    constructor(p) {
        super({ user: p.notifier.user});
        this.notifier = p.notifier;
    }
    notify(text) {
        console.log('email', this.user.email, text);
        // this.notifier.notify(text);
    }
}

class NotifierSms extends Notifier {
    constructor(p) {
        super({ user: p.notifier.user});
        this.notifier = p.notifier;
    }
    notify(text) {
        console.log('sms', this.user.phone, text);
        this.notifier.notify(text);
    }
}

class NotifierFacebook extends Notifier {
    constructor(p) {
        super({ user: p.notifier.user});
        this.notifier = p.notifier;
    }
    notify(text) {
        console.log('facebook', this.user.facebook, text);
        this.notifier.notify(text);
    }
}

class NotifierSlack extends Notifier {
    constructor(p) {
        super({ user: p.notifier.user});
        this.notifier = p.notifier;
    }
    notify(text) {
        console.log('slack', this.user.slack, text);
        this.notifier.notify(text);
    }
}


class Application {
    constructor(p) {
        this.user = p.user;
        this.settings = p.settings;

        this.notifier = new Notifier({ user: this.user });

        if (this.settings.email) {
            this.notifier = new NotifierEmail({ notifier: this.notifier });
        }
        if (this.settings.sms) {
            this.notifier = new NotifierSms({ notifier: this.notifier });
        }
        if (this.settings.facebook) {
            this.notifier = new NotifierFacebook({ notifier: this.notifier });
        }
        if (this.settings.slack) {
            this.notifier = new NotifierSlack({ notifier: this.notifier });
        }

    }

    message(text) {
        this.notifier.notify(text);
    }
}

const user = new User({
    id: 1,
    login: 'user',
    email: 'user@mail.com',
    phone: '+71234567890',
    facebook: 'fbuser',
    slack: 'slackuser'
});
const settings = {
    email: true,
    sms: true,
    facebook: false,
    slack: true,
};

const app = new Application({ user, settings });
app.message('Hello word!');