webpackJsonp([11],{284:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var n=a(0),s=r(n),l=a(8),o=a(2);a(10),a(11);var i=a(4),u=a(12),c=r(u),d=a(285),f=r(d),p=a(286),m=r(p),h=a(18),g=(0,h.configureStore)({auth:c.default,reg:m.default}),b=(0,i.layout)(f.default);(0,l.render)(s.default.createElement(o.Provider,{store:g},s.default.createElement(b,null)),document.getElementById("root"))},285:function(e,t,a){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},o=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),i=a(0),u=function(e){return e&&e.__esModule?e:{default:e}}(i),c=a(2),d=a(13),f=a(4),p=function(e){function t(e){r(this,t);var a=n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.state={login:"",email:"",password:"",confPassword:""},a}return s(t,e),o(t,[{key:"componentDidMount",value:function(){if(this.props.auth.isAuthenticated)return window.location="/"}},{key:"changeField",value:function(e){var t={};t[e.target.id]=e.target.value,this.setState(t)}},{key:"formSubmit",value:function(e){return e.preventDefault(),this.state.captcha?this.state.password!==this.state.confPassword?this.props.dispatch({type:"REG_ERROR",error:"Please, confirm password!"}):void this.props.dispatch((0,d.api)({type:"REG",fetch:"user.registration",login:this.state.login,email:this.state.email,password:this.state.password})):this.props.dispatch({type:"REG_ERROR",error:"Captcha is not valid!!"})}},{key:"checkCaptcha",value:function(e){this.setState({captcha:e})}},{key:"componentDidUpdate",value:function(){"success"===this.props.reg.status&&setTimeout(function(){return window.location="/login"},1e3)}},{key:"render",value:function(){var e=null,t=null;return"error"===this.props.reg.status?t={className:"danger",text:this.props.reg.error||"Error, wrong login or password"}:"send"===this.props.reg.status?(e="disabled",t={className:"info",text:"Loading, please wait"}):"success"===this.props.reg.status&&(t={className:"success",text:"Registered successfully, please login!"}),u.default.createElement("div",{className:"row"},u.default.createElement("div",{className:"col-lg-offset-4 col-lg-4"},u.default.createElement("div",{className:"panel panel-default"},u.default.createElement("div",{className:"panel-heading"},u.default.createElement("h3",{className:"panel-title"},"Authentication")),u.default.createElement("div",{className:"panel-body"},u.default.createElement("form",{onSubmit:this.formSubmit.bind(this)},u.default.createElement("div",{className:"form-group"},u.default.createElement("label",{htmlFor:"login"},"Login"),u.default.createElement("input",{type:"text",className:"form-control",id:"login",placeholder:"Login",defaultValue:this.state.login,onChange:this.changeField.bind(this),required:!0})),u.default.createElement("div",{className:"form-group"},u.default.createElement("label",{htmlFor:"email"},"Email"),u.default.createElement("input",{type:"email",className:"form-control",id:"email",placeholder:"Email",defaultValue:this.state.email,onChange:this.changeField.bind(this),required:!0})),u.default.createElement("div",{className:"form-group"},u.default.createElement("label",{htmlFor:"password"},"Password"),u.default.createElement("input",{type:"password",className:"form-control",id:"password",placeholder:"Password",defaultValue:this.state.password,onChange:this.changeField.bind(this),required:!0})),u.default.createElement("div",{className:"form-group"},u.default.createElement("label",{htmlFor:"confPassword"},"Confirm password"),u.default.createElement("input",{type:"password",className:"form-control",id:"confPassword",placeholder:"Confirm password",defaultValue:this.state.confPassword,onChange:this.changeField.bind(this),required:!0})),u.default.createElement(f.MathCaptcha,{cb:this.checkCaptcha.bind(this)}),u.default.createElement(f.Alert,{opts:t}),u.default.createElement("button",{type:"submit",className:"btn btn-default btn-block",disabled:e},"Submit")),u.default.createElement("br",null),u.default.createElement("p",{className:"text-center"},u.default.createElement("a",{href:"/login"},"Authorisation"))))))}}]),t}(u.default.Component),m=function(e){return l({},e)};p=(0,c.connect)(m)(p),t.default=p},286:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={},n=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:r,t=arguments[1];switch(t.type){case"REG_SEND":return{status:"send"};case"REG_SUCCESS":return{status:"success"};case"REG_ERROR":return{status:"error",error:t.error};default:return e}};t.default=n}},[284]);
//# sourceMappingURL=registration.js.map