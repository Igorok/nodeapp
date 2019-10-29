webpackJsonp([5],{310:function(e,t,a){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}var r=a(0),l=s(r),n=a(8),o=a(22),i=a(2),c=a(39),u=a(40),d=s(u);a(10),a(11);var p=a(4),f=a(12),m=s(f),h=a(311),_=s(h),b=a(312),y=s(b),E=(0,o.createStore)((0,o.combineReducers)({auth:m.default,postDetail:y.default}),(0,o.compose)((0,o.applyMiddleware)(d.default),(0,o.applyMiddleware)((0,c.createLogger)()))),v=(0,p.layout)(_.default,!0);(0,n.render)(l.default.createElement(i.Provider,{store:E},l.default.createElement(v,null)),document.getElementById("root"))},311:function(e,t,a){"use strict";function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var s in a)Object.prototype.hasOwnProperty.call(a,s)&&(e[s]=a[s])}return e},o=function(){function e(e,t){for(var a=0;a<t.length;a++){var s=t[a];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,a,s){return a&&e(t.prototype,a),s&&e(t,s),t}}(),i=a(0),c=function(e){return e&&e.__esModule?e:{default:e}}(i),u=a(2),d=a(13),p=a(4),f=function(e){function t(e){s(this,t);var a=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.state={_id:a.props.postDetail._id,_bId:a.props.postDetail._bId,name:a.props.postDetail.name,description:a.props.postDetail.description,status:a.props.postDetail.status},a.statArr=[{key:"write",text:"Write"},{key:"publish",text:"Publish"},{key:"archive",text:"Archive"}],a}return l(t,e),o(t,[{key:"fieldChange",value:function(e){var t={};t[e.target.id]=e.target.value,this.setState(t)}},{key:"setDescription",value:function(e){this.setState({description:e})}},{key:"formSubmit",value:function(e){e.preventDefault(),this.props.dispatch((0,d.api)({type:"POST_EDIT",fetch:"blog.editMyPostDetail",_id:this.state._id,_bId:this.state._bId,status:this.state.status,name:this.state.name,description:this.state.description}))}},{key:"componentWillMount",value:function(){this.props.dispatch((0,d.api)({type:"POST_DETAIL",fetch:"blog.getMyPostDetail",_id:this.props.postDetail._id,_bId:this.state._bId}))}},{key:"componentWillReceiveProps",value:function(e){this.setState({name:e.postDetail.name||"",description:e.postDetail.description||"",status:e.postDetail.status||"write"})}},{key:"render",value:function(){var e=null,t="/my-blog-detail/"+this.props.postDetail._bId;return"error"===this.props.postDetail.fetch_status||"error_edit"===this.props.postDetail.fetch_status?e={className:"danger",text:this.props.postDetail.fetch_error}:"send"===this.props.postDetail.fetch_status||"send_edit"===this.props.postDetail.fetch_status?e={className:"info",text:"Loading, please wait"}:"success_edit"===this.props.postDetail.fetch_status&&(e={className:"success",text:"Updated successfully!"}),c.default.createElement("div",null,c.default.createElement("ol",{className:"breadcrumb"},c.default.createElement("li",null,c.default.createElement("a",{href:"/profile"},c.default.createElement("span",{className:"glyphicon glyphicon-home"}),"  Profile")),c.default.createElement("li",null,c.default.createElement("a",{href:"/my-blog-list"},"My blogs")),c.default.createElement("li",null,c.default.createElement("a",{href:t},this.props.postDetail.blogName)),c.default.createElement("li",{className:"active"},this.state.name)),c.default.createElement("div",{className:"panel panel-default"},c.default.createElement("div",{className:"panel-body"},c.default.createElement("form",{onSubmit:this.formSubmit.bind(this)},c.default.createElement("div",{className:"modal-body"},c.default.createElement("div",{className:"form-group"},c.default.createElement("label",{htmlFor:"name"},"Name"),c.default.createElement("input",{type:"text",className:"form-control",id:"name",placeholder:"Name",onChange:this.fieldChange.bind(this),value:this.state.name})),c.default.createElement("div",{className:"form-group"},c.default.createElement("label",{htmlFor:"status"},"Status")),c.default.createElement("div",{className:"form-group"},c.default.createElement("select",{id:"status",className:"form-control",value:this.state.status,onChange:this.fieldChange.bind(this)},this.statArr.map(function(e){return c.default.createElement("option",{value:e.key,key:e.key},e.text)}))),c.default.createElement("div",{className:"form-group"},c.default.createElement("label",null,"Description"),c.default.createElement(p.TextEditor,{description:this.state.description,cb:this.setDescription.bind(this)}))),c.default.createElement(p.Alert,{opts:e}),c.default.createElement("div",{className:"modal-footer"},c.default.createElement("button",{type:"button",className:"btn btn-default","data-dismiss":"modal"},"Close"),c.default.createElement("button",{type:"submit",className:"btn btn-primary"},c.default.createElement("span",{className:"glyphicon glyphicon-floppy-disk"}),"  Save changes"))))))}}]),t}(c.default.Component),m=function(e){return n({},e)};f=(0,u.connect)(m)(f),t.default=f},312:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var s in a)Object.prototype.hasOwnProperty.call(a,s)&&(e[s]=a[s])}return e},r=window.locals.postId||null,l=window.locals.blogId||null,n={fetch_status:null,fetch_error:null,_bId:l,created:"",user:"",name:"",blogName:"",description:"",status:"",_id:r},o=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:n,t=arguments[1];switch(t.type){case"POST_DETAIL_SEND":return e=s({},e),e.fetch_status="send",e;case"POST_DETAIL_SUCCESS":return e=s({},e),e.created=t.data.created,e.user=t.data.user,e.name=t.data.name,e.blogName=t.data.blogName,e.description=t.data.description,e.status=t.data.status,e.fetch_status="success",e;case"POST_DETAIL_EROR":return e=s({},e),e.fetch_status="error",e.fetch_error=t.fetch_error,e;case"POST_EDIT_SEND":return e=s({},e),e.fetch_status="send_edit",e.status=t.status,e.name=t.name,e.description=t.description,e;case"POST_EDIT_SUCCESS":return e=s({},e),e.fetch_status="success_edit",e;case"POST_EDIT_ERROR":return e=s({},e),e.fetch_status="error_edit",e.fetch_error=t.error,e;default:return e}};t.default=o}},[310]);
//# sourceMappingURL=my_post_detail.js.map