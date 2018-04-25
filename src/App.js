import React, { Component } from 'react';
import './asset/App.css';
import TaskForm from './Components/TaskForm';
import ControlForm from './Components/ControlForm';
import TaskList from './Components/TaskList';
import * as actions from './actions/index';
import { connect } from 'react-redux';
// import { findIndex,toLower, sortBy } from 'lodash';

class App extends Component {

	constructor(props){
		super(props);
		this.state = {
			filter: {
				name: '',
				status: -1
			},
			keyword: '',
			sort: {
				SortName: 'name',
				SortValue: -1
			}
		}
	}

	componentWillMount(){
		if (localStorage && localStorage.getItem('tasks')) {
			var tasks = JSON.parse(localStorage.getItem('tasks'));
			this.setState({
				tasks: tasks
			});
		}
	}

	onToggleForm = () => {
		var taskEditting = this.props;
		if(taskEditting && taskEditting.id !== ''){
			this.props.onOpenForm();
		} else {
			this.props.onToggleForm();
		}
		this.props.onClearForm({
			id: '',
			name: '',
			status: true
		});
	}

	// onCloseForm = () => {
	// 	this.setState({
	// 		isDisplayForm : false
	// 	});
	// }

	// onShowForm = () => {
	// 	this.setState({
	// 		isDisplayForm : true
	// 	});
	// }

	// onSubmit = (data) => {
	// 	var { tasks } = this.state;
	// 	if (data.id === '') {
	// 		data.id = this.generateID();
	// 		tasks.push(data);
	// 	} else {
	// 		var index = this.findIndex(data.id);
	// 		// var index = findIndex(tasks, (task)=> {
	// 		// 	return task.id === data.id;
	// 		// });
	// 		tasks[index] = data;
	// 	}
	// 	this.SETSTATE(tasks);
	// }

	// SETSTATE = (data) => {
	// 	this.setState({
	// 		tasks: data,
	// 		taskEditing: null
	// 	});
	// 	localStorage.setItem('tasks', JSON.stringify(data));
	// }

	// onUpdateStatus = (id) => {
	// 	var {tasks} = this.state;
	// 	var index = this.findIndex(id);
	// 	// var index = findIndex(tasks, (task)=> {
	// 	// 	return task.id === id;
	// 	// });
	// 	if (index !== -1) {
	// 		tasks[index].status = !tasks[index].status;
	// 		this.SETSTATE(tasks);
	// 	}
	// }

	// findIndex = (id) => {
	// 	var {tasks} = this.state;
	// 	var result = -1;
	// 	tasks.forEach((task, index) => {
	// 		if (task.id === id) {
	// 			return result = index;
	// 		}
	// 	});
	// 	return result;
	// }

	// onDeleteitem = (id) => {
	// 	var {tasks} = this.state;
	// 	var index = this.findIndex(id);
	// 	if (index !== -1) {
	// 		tasks.splice(index,1);
	// 		this.SETSTATE(tasks);
	// 	}
	// 	this.onCloseForm();
	// }

	// onUpdate = (id) => {
	// 	var {tasks} = this.state;
	// 	// var index = this.findIndex(id);
	// 	// var index = findIndex(tasks, (task)=> {
	// 	// 	return task.id === id;
	// 	// });
	// 	// var taskEditing = tasks[index];
	// 	// this.setState({
	// 	// 	taskEditing: taskEditing
	// 	// });
	// 	this.props.onOpenForm();
	// }

	// onFilter = (filterName, filterStatus) => {
	// 	filterStatus = parseInt(filterStatus,10);
	// 	this.setState({
	// 		filter: {
	// 			name: filterName.toLowerCase(),
	// 			status: filterStatus
	// 		}
	// 	});
	// }

	// onSearch = (keyword) => {
	// 	this.setState({
	// 		keyword: keyword
	// 	});
	// }

	// onSort = (SortName, SortValue) => {
	// 	this.setState({
	// 		SortName: SortName,
	// 		SortValue: SortValue
	// 	});
	// }

	render() {
		var {isDisplayForm} = this.props;

		

		return (
			 <div className="container">
				<div className="text-center">
					<h1>Tasks</h1>
					<hr/>
				</div>
				<div className="row">
					<div className={ isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : '' }>

						{ isDisplayForm ? <TaskForm/> : '' }
						
					</div>
					<div className={ isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12' }>
						<button
							type="button"
							className="btn btn-primary"
							onClick={ this.onToggleForm }
						>
							<span className="fas fa-plus mr-5"></span>Add
						</button>
						
						<ControlForm />
						
						<TaskList />
						{/* <TaskList
							// tasks={tasks}
							// onUpdate={this.onUpdate}
							// onUpdateStatus={this.onUpdateStatus}
							onFilter={this.onFilter}
							// onDeleteitem={this.onDeleteitem}
							/> */}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		taskEditting: state.taskEditting,
		isDisplayForm : state.isDisplayForm,
		
	}

};

const mapDispatchToProps = (dispatch, props) => {
	return{
		onToggleForm: () => {
			dispatch(actions.toggleForm());
		},
		onOpenForm: () => {
			dispatch(actions.openForm());
		},
		onClearForm: (task) => {
			dispatch(actions.updateTask(task));
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps) (App);
