/*

Структурные паттерны проектирования - отвечают за построение удобных в поддержке иерархий классов.
Мост — это структурный паттерн проектирования, который разделяет один или несколько классов на две отдельные иерархии — абстракцию и реализацию, позволяя изменять их независимо друг от друга.

*/

// разделение управления устройствами на устройства и пульты
class Remote {
    constructor(device) {
        this.device;
    }

    togglePower() {
        if (this.device.isEnabled()) {
            this.device.disable();
        } else {
            this.device.enable();
        }
    }

    volumeDown() {
        this.device.setVolume(this.device.volume - 10);
    }
    volumeUp() {
        this.device.setVolume(this.device.volume + 10);
    }
    channelDown() {
        this.device.setChannel(this.device.channel - 1);
    }
    channelUp() {
        this.device.setChannel(this.device.channel + 1);
    }
}

class AdvancedRemote extends Remote {
    constructor(device) {
        super(device);
    }
    mute() {
        this.device.setVolume(0);
    }
}

class Device {
    isEnabled() {

    }
    enable() {

    }
    disable() {

    }
    getVolume() {

    }
    setVolume(percent) {

    }
    getChannel() {

    }
    setChannel(channel) {

    }
}

class Tv extends Device {

}
class Radio extends Device {

}

const tv = new Tv();
const tvRemote = new Remote(tv);
tvRemote.togglePower();

const radio = new Radio();
const radioRemote = new AdvancedRemote(radio);