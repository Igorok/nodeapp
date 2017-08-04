import React from 'react'


/**
 * boostrap message
 * @param {String} className - success, info, warning, danger
 * @param {String} text - the text of the message
 */
export class Alert extends React.Component {
	render () {
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