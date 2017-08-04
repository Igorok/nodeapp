import React from 'react'


export class Alert extends React.Component {
	render () {
		console.log('this.props ', this.props);

		let tpl = null;
		if (
			this.props.opts && 
			this.props.opts.className && 
			this.props.opts.text
		) {
			let className = "alert alert-" + this.props.opts.className;
			tpl = <div className={className} role="alert">
				{this.props.opts.text}
			</div>
		}
		return tpl;
	}
}