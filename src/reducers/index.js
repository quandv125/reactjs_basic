import {combineReducers} from 'redux';
import tasks_in_store from './store_tasks';
import isDisplayForm from './isDisplayForm';
import taskEditting from './taskEditting';
import filterTask from './filterTask';
import searchTask from './searchTask';
import sortTask from './sortTask';
const myReducers = combineReducers({
	tasks_in_store : tasks_in_store,
	isDisplayForm,
	taskEditting,
	filterTask,
	searchTask,
	sortTask
});

export default myReducers;