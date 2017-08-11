import React from 'react'
import { connect } from 'react-redux'
import {api} from '../helpers/action'
import {Alert} from '../helpers/component'

class BlogListItem extends React.Component {
	render () {
		let pub = null;
		if (this.props.item.public) {
			pub = <p>
				<span className='glyphicon glyphicon-eye-open'></span>&nbsp;&nbsp;
				Public
			</p>
		} else {
			pub = <p>
				<span className='glyphicon glyphicon-eye-close'></span>&nbsp;&nbsp;
				Private
			</p>
		}
		return <div className="col-md-4">
			<div className="panel panel-default">
				<div className="panel-heading">
					<h4 className="panel-title">
						<span className='glyphicon glyphicon-bookmark'></span>&nbsp;&nbsp;
						<a href = {"/my-blog-detail/" + this.props.item._id}>
							{this.props.item.name}
						</a>
					</h4>
				</div>
				<div className="panel-body">
					<p>
						{this.props.item.description}
					</p>
					{pub}
				</div>
			</div>
		</div>
	}
}

class BlogListComp extends React.Component {
	componentWillMount () {
		this.props.dispatch(api({
			type: 'MY_BLOG_LIST',
			fetch: 'blog.getMyBlogList',
		}));
	}

	render () {
		let alertOpts = null,
			blogs = null;
	
		if (this.props.blogList.status === 'error') {
			alertOpts = {
				className: 'danger',
				text: this.props.blogList.error
			}
		} else if (this.props.blogList.status === 'send') {
			alertOpts = {
				className: 'info',
				text: 'Loading, please wait',
			}
		}

		if (this.props.blogList.status === 'success' && this.props.blogList.list.length) {
			blogs = this.props.blogList.list.map((val) => {
				return <BlogListItem item={val} key={val._id} dispatch={this.props.dispatch} />
			});
		}

		// col-md-4
		return <div>
			<Alert opts={alertOpts} />
			<ol className="breadcrumb">
				<li>
					<a href="/profile">
						<span className='glyphicon glyphicon-home'></span>&nbsp;
						Profile
					</a>
				</li>
				<li className="active">My blogs</li>
			</ol>
			<div className="row">{blogs}</div>
		</div>
		
	}
}
const mapStateToProps = (state) => {
	return {...state}
}
BlogListComp = connect(mapStateToProps)(BlogListComp)

export default BlogListComp