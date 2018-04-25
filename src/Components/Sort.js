import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as ActiveType from './../constants/ActionType';
import * as actions from './../actions/index';
class Sort extends Component {

	constructor(props){
		super(props);
		this.state ={
			SortName: 'name',
			SortValue: -1
		}
	}

	onSort = (SortName, SortValue) => {
		this.setState({
			SortName: SortName,
			SortValue: SortValue
		});
		this.props.onSortTask({SortName, SortValue});
	}

	render() {
		return (
			<div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
				<div className="dropdown">
					<button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
						 <i className="fas fa-sort mr-5"></i>Sort
					</button>
					<ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
						<li onClick={() => this.onSort('name',ActiveType.SORT_NAME_ASC)}>
							<a role="button" className="sort_selected">
								<i className="fas fa-sort-alpha-down mr-5"></i>
								A-Z 
							</a>
						</li>
						<li onClick={() => this.onSort('name', ActiveType.SORT_NAME_DESC)}>
							<a role="button">
								<i className="fas fa-sort-alpha-up mr-5"></i>
								Z-A
							</a>
						</li>
						<li role="separator" className="divider"></li>
						<li onClick={() => this.onSort('status', ActiveType.SORT_STATUS_ACTIVED)}>
							<a role="button">Active</a>
						</li>
						<li onClick={() => this.onSort('status', ActiveType.SORT_STATUS_DEACTIVED)}>
							<a role="button">Deactive</a>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		onSortTask: (sort) => {
			dispatch(actions.onSortTask(sort));
		}
	}
}

export default connect(null, mapDispatchToProps) (Sort);