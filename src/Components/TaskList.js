import React, { Component } from 'react';
import { connect } from 'react-redux';
import TaskItem from './TaskItem'

import * as ActionType from './../constants/ActionType';
import * as actions from './../actions/index';
import { sortBy } from 'lodash';
class TaskList extends Component {

	constructor(props){
		super(props);
		this.state = {
			filterName: '',
			filterStatus: ActionType.FILLTER_STATUS_ALL 
		}
	}

	onChange = (event) => {
		var target = event.target;
		var name = target.name;
		var value = target.value;

		this.props.onfillterStatus({
			name: ( name === 'filterName' ) ? value : this.state.filterName,
			status: ( name === 'filterStatus' ) ? value : this.state.filterStatus,
		});
		
		this.setState({
			[name]: value
		});

	}

	render() {
		var {tasks, filterTask, searchTask, sortTask} = this.props;
		
		if (filterTask) {
			tasks = tasks.filter((task) => { // Filter: name
				return (task.name.toLowerCase()).indexOf((filterTask.name.toLowerCase())) !== -1;
			});
			tasks = tasks.filter((task) => { // Filter: status
				if (filterTask.status === ActionType.FILLTER_STATUS_ALL) {
					return task;
				} else {
					return task.status === (filterTask.status === ActionType.FILLTER_STATUS_ACTIVE ? true:false)
				}
			});
		}

		if(searchTask) {
			tasks = tasks.filter((task) => {
				return (task.name.toLowerCase()).indexOf((searchTask.keyword.toLowerCase())) !== -1;
			});
		}

		if (sortTask) {
			if (sortTask.sortName === 'name') {
				if (sortTask.sortValue === ActionType.SORT_NAME_ASC) {
					tasks = sortBy(tasks, (task)=> {
						return task.name;
					});
				} else {
					tasks = sortBy(tasks, (task)=> {
						return task.name;
					}).reverse();
				}
			} else {
				if (sortTask.sortValue === ActionType.SORT_STATUS_ACTIVED) {
					tasks = sortBy(tasks, (task)=> {
						return task.status;
					}).reverse(); 
				} else {
					tasks = sortBy(tasks, (task)=> {
						return task.status;
					});
				}
			}		
		}

		var element = tasks.map((task, index) => {
			return <TaskItem
						key={task.id}
						index={index}
						task={task}
					/>
		});
		return (
			<div className="row mt-15">
				<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
					<table className="table table-bordered table-hover">
						<thead>
							<tr>
								<th className="text-center">#</th>
								<th className="text-center">Name</th>
								<th className="text-center">Status</th>
								<th className="text-center">Action</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td></td>
								<td>
									<input
										type="text"
										className="form-control"
										name="filterName"
										value={this.state.filterName}
										onChange={ this.onChange }
									/>
								</td>
								<td>
									<select
										className="form-control"
										name="filterStatus"
										value={this.state.filterStatus}
										onChange={this.onChange}
									>
										<option value={ActionType.FILLTER_STATUS_ALL}>All</option>
										<option value={ActionType.FILLTER_STATUS_ACTIVE}>Active</option>
										<option value={ActionType.FILLTER_STATUS_DEACTIVE }>Dective</option>
									</select>
								</td>
								<td></td>
							</tr>

							{/*TaskItem*/}
							{element}

						</tbody>
					</table>
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	
	return { 
		tasks: state.tasks_in_store,
		filterTask: state.filterTask,
		searchTask: state.searchTask,
		sortTask: state.sortTask
	}
};
const mapDispatchToProps = (dispatch, props) => {
	return{
		onfillterStatus: (filter) => {
			dispatch(actions.filterStatus(filter));
		} 
	}
}
export default connect(mapStateToProps, mapDispatchToProps) (TaskList);