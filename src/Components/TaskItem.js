import React, { Component } from 'react';
import * as actions from './../actions/index';
import { connect } from 'react-redux';
class TaskItem extends Component {

	onUpdateStatus = () => {
		this.props.onUpdateStatus(this.props.task.id);
	}

	onDeleteTask = () => {
	
		 this.props.onDeleteTask(this.props.task.id);
	}

	onUpdate = () => {
		// console.log(this.props.task);
		this.props.onOpenForm();
		this.props.onUpdate(this.props.task);
	}

	render() {
		var {task, index} = this.props;
		return (
			<tr key={index}>
				<td>{task.id}</td>
				<td>{task.name}</td>
				<td className="text-center">
					<span
						className={task.status === true ?"label label-success":"label label-danger"}
						onClick={this.onUpdateStatus}
					>
						{task.status?"Active":"Deactive"}
					</span>
				</td>
				<td className="text-center">
					<button type="button" className="btn btn-warning" onClick={this.onUpdate}>
						<i className="fas fa-edit mr-5"></i>Edit
					</button>
					&nbsp;
					<button type="button" className="btn btn-danger" onClick={this.onDeleteTask}>
						<i className="fas fa-trash mr-5"></i>Delete
					</button>
				</td>
			</tr>
		);
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return{
		onOpenForm: () => {
			dispatch(actions.openForm());
		},
		onUpdateStatus: (id) => {
			dispatch(actions.update_status_task(id));
		},
		onDeleteTask: (id) => {
			dispatch(actions.deleteTask(id));
		},
		onUpdate: (task) => {
			dispatch(actions.updateTask(task));
		}
	}
};
export default connect(null, mapDispatchToProps)(TaskItem);