import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions/index';

class TaskForm extends Component {

	constructor(props){
		super(props);
		this.state = {};
	}

	componentWillMount(){
		if (this.props.taskEditting && this.props.taskEditting.id !== null) {
			this.setState({
				id: this.props.taskEditting.id,
				name: this.props.taskEditting.name,
				status: this.props.taskEditting.status
			});
		} else {
			this.setState({
				id:'',
				name: '',
				status: true
			});
		}
	}

	componentWillReceiveProps(nextProps){
		if (nextProps && nextProps.taskEditting) {
			this.setState({
				id: nextProps.taskEditting.id,
				name: nextProps.taskEditting.name,
				status: nextProps.taskEditting.status
			});
		} else if(!nextProps.taskEditting){
			this.setState({
				id:'',
				name: '',
				status: true
			});
		}
	}

	onCloseForm = () => {
		this.onClear();
		this.props.onCloseForm();
	}

	onChange = (event) => {
		// Get data from input
		var target = event.target;
		var name = target.name;
		var value = target.type === 'checkbox' ? target.checked : target.value;
		if (name === 'status') {
			value = target.value === "true" ? true: false
		}
		this.setState({
			[name]:value
		});
	}

	onHandleSubmit = (event) => {
		// Form submit
		event.preventDefault();
		this.props.onAddTask(this.state);
		this.onClear();
		this.onCloseForm();
	}

	onClear = () => {
		// Button reset
		this.setState({
			name:'',
			status: true
		});
	}

	render() {

		if(!this.props.isDisplayForm) return null;

		return (
			
				<div className="panel panel-warning">
					<div className="panel-heading">
						<h3 className="panel-title">
							{ !this.state.id ? "Add" : "Edit"}
						</h3>
						<span onClick={this.onCloseForm}><i className="fa fa-times position-close float-right"></i></span>
					</div>
					
					<div className="panel-body">
						<form onSubmit={this.onHandleSubmit}>
							<div className="form-group">
								<label>Name :</label>
								<input
									type="text"
									className="form-control"
									name="name"
									value={this.state.name}
									onChange={this.onChange}
								 />
							</div>
							<div className="form-group">
							<label>Status :</label>
							<select
								className="form-control"
								name="status"
								value={this.state.status}
								onChange={this.onChange}
							>
								<option value={true}>Active</option>
								<option value={false}>Deactive</option>
							</select>
							</div>
							<div className="text-center">
								<button type="submit" className="btn btn-warning"><i className="fas fa-plus mr-5"></i>Add</button>&nbsp;
								<button type="button" className="btn btn-danger" onClick={this.onClear}><i className="fas fa-ban mr-5"></i>Cancel</button>
							</div>
						</form>
					</div>
				</div>
			
		);
	}
}

const mapStateToProps = (state) => {
	
	return {
		taskEditting: state.taskEditting,
		isDisplayForm: state.isDisplayForm
	}

};

const mapDispatchToProps = (dispatch, props) => {
	return{
		onAddTask: (task) => {
			dispatch(actions.addTask(task));
		}, 
		onCloseForm: () => {
			dispatch(actions.closeForm());
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps) (TaskForm);

//connect( func1, func2) => func1: chuyen cac state thanh props | func2: chuyen cac dispatch thanh props de thuc thi action