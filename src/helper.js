

/*
const _ = require('lodash');
function mediator () {
	let self = this;
	let eventObj = {};

	self.subscribe = (name, func) => {
		eventObj[name] = func;
	};
	self.unsubscribe = function (name) {
		delete eventObj[name];
	};
	self.publish = function () {
		let a = _.toArray(arguments);
		let name = a[0];
		a = a.slice(1, a.length);

		if (eventObj[name]) {
			eventObj[name].apply(self, a);
		}
	};
}

module.exports = {
	mediator: mediator,
};
*/
