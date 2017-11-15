import React from 'react'
import { connect } from 'react-redux'
import 'jquery';
import 'bootstrap/dist/js/bootstrap';


import {api} from '../helpers/action'
import {Alert} from '../helpers/component'


class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			public: this.props.blogDetail.public,
			name: this.props.blogDetail.name,
			description: this.props.blogDetail.description,
		}
	}
	formSubmit (e) {
		e.preventDefault();
		this.props.dispatch(api({
			type: 'BLOG_EDIT',
			fetch: 'blog.editMyBlog',
			_id: this.props.blogDetail.blogId,
			public: this.state.public,
			name: this.state.name,
			description: this.state.description,
		}));
	}
	fieldChange (e) {
		let stateObj = {};
		let val = (e.target.id == 'public') ? e.target.checked : e.target.value;
		stateObj[e.target.id] = val;
		this.setState(stateObj);
	}
	componentWillReceiveProps (newProps) {
		this.setState({
			public: newProps.blogDetail.public,
			name: newProps.blogDetail.name,
			description: newProps.blogDetail.description,
		});

		if (newProps.blogDetail.fetch_status === 'success_edit') {
			this.props.dispatch(api({
				type: 'BLOG_DETAIL',
				fetch: 'blog.getMyBlogDetail',
				_id: this.props.blogDetail.blogId
			}))
			.then(() => {
				$('.modal').modal('hide');
				return;
			});
		}
	}
	render () {
		let alertOpts = null;
		if (this.props.blogDetail.fetch_status === 'error_edit') {
			alertOpts = {
				className: 'danger',
				text: this.props.blogDetail.fetch_error
			}
		} else if (this.props.blogDetail.fetch_status === 'send_edit') {
			alertOpts = {
				className: 'info',
				text: 'Loading, please wait',
			}
		} else if (this.props.blogDetail.fetch_status === 'success_edit') {
			alertOpts = {
				className: 'success',
				text: 'Edited successfully',
			}
		}

		return <div>
			<div className="modal fade" tabIndex="-1" role="dialog">
				<div className="modal-dialog modal-lg" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							<h4 className="modal-title">Modal title</h4>
						</div>						
						<form onSubmit={::this.formSubmit}>
							<div className="modal-body">
								<Alert opts={alertOpts} />

								<div className="form-group">
									<label htmlFor="name">Name</label>
									<input 
										type="text" 
										className="form-control" 
										id="name" 
										placeholder="Name" 
										onChange={::this.fieldChange}
										value={this.state.name}
									/>
								</div>
								<div className="form-group">
									<label htmlFor="exampleInputPassword1">Description</label>
									<textarea 
										className="form-control" 
										id="description" 
										placeholder="Description" 
										onChange={::this.fieldChange} 
										value={this.state.description}
									/>
								</div>
								<div className="checkbox">
									<label>
										<input 
											type="checkbox" 
											id='public' 
											onChange={::this.fieldChange} 
											checked = {!! this.state.public}
										/> Public
									</label>
								</div>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
								<button type="submit" className="btn btn-primary">
									<span className='glyphicon glyphicon-floppy-disk'></span>&nbsp;
									Save changes
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	}
}




// blog widget
class Blog extends React.Component {
	showModal () {
		$('.modal').modal('show');
	}
	componentWillMount () {
		this.props.dispatch(api({
			type: 'BLOG_DETAIL',
			fetch: 'blog.getMyBlogDetail',
			_id: this.props.blogDetail.blogId
		}));
	}
	render () {
		let alertOpts = null,
			pub = null;
		
		if (this.props.blogDetail.public) {
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

		if (this.props.blogDetail.fetch_status === 'error') {
			alertOpts = {
				className: 'danger',
				text: this.props.blogDetail.fetch_error
			}
		} else if (this.props.blogDetail.fetch_status === 'send') {
			alertOpts = {
				className: 'info',
				text: 'Loading, please wait',
			}
		}

        let newLink = `/my-post-detail/${this.props.blogDetail.blogId}/-1`
		return <div>
			<ol className="breadcrumb">
				<li>
					<a href="/profile">
						<span className='glyphicon glyphicon-home'></span>&nbsp;
						Profile
					</a>
				</li>
				<li>
					<a href="/my-blog-list">
						My blogs
					</a>
				</li>
				<li className="active">{this.props.blogDetail.name}</li>
			</ol>
			<div className="panel panel-default">
				<div className="panel-heading">
					<h4 className='panel-title'>
						{this.props.blogDetail.name}
					</h4>
				</div>
				<div className="panel-body">
					<Alert opts={alertOpts} />
					<p >
						{this.props.blogDetail.description}
					</p>
					{pub}
					<button className='btn btn-default' onClick={::this.showModal}>
						<span className='glyphicon glyphicon-pencil'></span>&nbsp;
						Edit
					</button>
                    &nbsp;
                    <a className='btn btn-default' href={newLink}>
						<span className='glyphicon glyphicon-plus'></span>&nbsp;
						Add post
					</a>
				</div>
			</div>
			<Modal blogDetail={this.props.blogDetail} dispatch={this.props.dispatch} />
		</div>
	}
}
const mapStateToProps = (state) => {
	return {blogDetail: state.blogDetail};
}
Blog = connect(mapStateToProps)(Blog);
export default Blog