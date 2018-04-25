import * as types from './../constants/ActionType';

var initialState = {
	name: '',
	status: types.FILLTER_STATUS_ALL 
};

var myReducer = (state = initialState, action) => {
	
	switch(action.type){
		case types.FILTER_TASK:
			state.name = action.filter.name;
			state.status = parseInt(action.filter.status,10);
			return state;
		default: 
			return state;
	}
	
};

export default myReducer;