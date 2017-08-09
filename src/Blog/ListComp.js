import React from 'react'
import { connect } from 'react-redux'
import {api} from '../helpers/action'
import {Alert} from '../helpers/component'

class BlogListItem extends React.Component {
	render () {
		return <div className="col-md-4">
			<div className="panel panel-default">
				<div className="panel-heading">
					<h3 className="panel-title">
						<span className='glyphicon glyphicon-bookmark'></span>&nbsp;&nbsp;
						<a href = {"/blog-detail/" + this.props.item._id}>
							{this.props.item.name}
						</a>
					</h3>
				</div>
				<div className="panel-body">
					<p>
						{this.props.item.description}
					</p>
					<p>
						<span className='glyphicon glyphicon-user'></span>&nbsp;&nbsp;
						Author: {this.props.item.user}
						<br />
						<span className='glyphicon glyphicon-time'></span>&nbsp;&nbsp;
						Created: {this.props.item.created}
						
					</p>
				</div>
			</div>
		</div>
	}
}

class BlogListComp extends React.Component {
	componentWillMount () {
		this.props.dispatch(api({
			type: 'BLOG_LIST',
			fetch: 'blog.getBlogList',
		}));
	}

	render () {
		let alertOpts = null,
			blogs = null;
	
		if (this.props.status === 'error') {
			alertOpts = {
				className: 'danger',
				text: this.props.error
			}
		} else if (this.props.status === 'send') {
			alertOpts = {
				className: 'info',
				text: 'Loading, please wait',
			}
		}

		if (this.props.status === 'success' && this.props.list.length) {
			blogs = this.props.list.map((val) => {
				return <BlogListItem item={val} key={val._id} dispatch={this.props.dispatch} />
			});
		}

		// col-md-4
		return <div>
			<Alert opts={alertOpts} />
			<div className="row">{blogs}</div>
		</div>
		
	}
}
const mapStateToProps = (state) => {
	return {...state.blogList}
}
BlogListComp = connect(mapStateToProps)(BlogListComp)

export default BlogListComp