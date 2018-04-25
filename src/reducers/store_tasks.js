import * as types from './../constants/ActionType';
import { findIndex } from 'lodash';

var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data? data : [];
var s4 = () => {
	return Math.floor((1+Math.random()) * 0x1000).toString(10).substring(1);
}
var randomID = () => {
	return s4() +"-"+ s4() +"-"+ s4()+"-"+ s4();
}

var findID = (tasks, id) => {
	var index = findIndex(tasks, (task)=> {
		return task.id === id;
	});
	return index;
}

var myReducer = (state = initialState, action) => {
	
	switch(action.type){
	
		case types.LIST_ALL:
			return [...state];
		case types.ADD_TASK:
			var task ={
				id: action.task.id,
				name: action.task.name,
				status: action.task.status === false ? false : true
			}
			if(!task.id){
				task.id = randomID();
				state.push(task);
			} else {
				var index = findID(state, action.task.id);
				state[index] = task;
			}
			
			localStorage.setItem('tasks', JSON.stringify(state));
			return [...state];
		case types.UPDATE_STATUS_TASK:
			index = findID(state, action.id);
			if (index !== -1) {
				var cloneTask = {...state[index], };
				cloneTask.status = !cloneTask.status;
				state[index] = cloneTask;
				localStorage.setItem('tasks', JSON.stringify(state));
			}
			return [...state];
		case types.DELETE_TASK:
			var i = findIndex(state, action.id);
			state.splice(i, 1);
			localStorage.setItem('tasks', JSON.stringify(state));
			return [...state];

		default: return [...state];
	}
	
};

export default myReducer;