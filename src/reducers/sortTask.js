import * as types from './../constants/ActionType';

var initialState = {
	sortName: '',
	sortValue: ''
};

var myReducer = (state = initialState, action) => {
	
	switch(action.type){
		case types.SORT_TASK:
			state.sortName = action.sort.SortName;
			state.sortValue = action.sort.SortValue;
			return state;
		default: 
			return state;
	}
	
};

export default myReducer;