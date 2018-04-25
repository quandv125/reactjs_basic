import * as types from './../constants/ActionType';

export const listALl = () => {
	return {
		type: types.LIST_ALL
	}
};

export const addTask = (task) => {
	// store_tasks
	return {
		type: types.ADD_TASK,
		task  // => task: task
	}
};

export const toggleForm = () => {
	// isDisplayForm
	return {
		type: types.TOGGLE_FORM
	}
};

export const openForm = () => {
	// isDisplayForm
	return {
		type: types.OPEN_FORM
	}
};

export const closeForm = () => {
	// isDisplayForm
	return {
		type: types.CLOSE_FORM
	}
};

export const update_status_task = (id) => {
	// store_tasks
	return{
		type: types.UPDATE_STATUS_TASK,
		id // id : id
	}
};

export const deleteTask = (id) => {
	// store_tasks
	return{
		type: types.DELETE_TASK,
		id // id : id
	}
};

export const updateTask = (task) => {
	// taskEditting
	return{
		type: types.UPDATE_TASK,
		task // task : task
	}
};

export const filterStatus = (filter) => {
	return {
		type: types.FILTER_TASK,
		filter
	}
};

export const seachTask = (keyword) => {
	return {
		type: types.SEARCH_TASK,
		keyword
	}
};

export const onSortTask = (sort) => {
	return {
		type: types.SORT_TASK,
		sort
	}
}