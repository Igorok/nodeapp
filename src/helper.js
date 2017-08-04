import fetch from 'isomorphic-fetch';
console.log('fetch ', fetch);

export const api = (opts) => {
	let param = {
		method: 'POST', 
		body: JSON.stringify(opts),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	};

	return fetch('/fetch', param)
		.then((r) => {
			if (! r.status || r.status != 200) {
				throw new Error(r.status);
			}
			return r.json();
		})
		.catch((e) => {
			console.trace(e);
		});
};



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
