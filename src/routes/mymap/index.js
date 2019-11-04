import React from 'react';

import { Row } from "reactstrap";
import { Colxx } from "Components/CustomBootstrap";
import { Button } from 'reactstrap';

import { connect } from 'react-redux';
import {
  userList,
	projectUserList,
	kMapData,
	shgroupList
} from "Redux/actions";

import {
	SearchBox,
	StakeholderList,
	KGraph
} from "Components/MyMap";

import {
  NewStakeholder
} from "Components/Survey";

import { Draggable, Droppable } from 'react-drag-and-drop'

const defaultStakeholder = {
	first_name: '',
	last_name: '',
	shType: 0,
	email: '',
	phone: '',
	organization: 0,
	team: '',
	show: true
};

class MyMap extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			screen: 'list',
			stakeholderList: [],
			chart: [],
			userList: []
		}
	}

	handleAddNewStakeholder = stakeholder => {
		
		this.setState({
			'stakeholderList': [
				...this.state.stakeholderList,
				stakeholder
			],
			'screen': 'list'
		});
	}

	handleShowAddPage = () => {
		this.setState({
			screen: 'add'
		});
	}

	handleAddStackholderToGraph = (data) => {
		const stakeholder = this.state.stakeholderList[data];
		
		this.setState({
			'chart': [
				...this.state.chart,
				stakeholder
			]
		});
	}

	componentWillMount() {
    this.props.getUserList();
		this.props.getProjectUserList();
		this.props.getKMapData();
		this.props.getShgroupList();
  }

	componentWillReceiveProps(props) {
		this.setState({
			stakeholderList: props.projectUserList,
			userList: props.userList
		})
	}

	render() {

		const { shgroupList } = this.props;
		
		return (
			<div className="map-container">
				<Droppable
						className="map-content"
						types={['stakeholder']} // <= allowed drop types
						onDrop={data => this.handleAddStackholderToGraph(data)}>
						<KGraph data={this.state.chart} />
				</Droppable>
				<div className="map-tool">
					{/* <SearchBox />
					<Row>
						<Colxx xs="12">
							<Button onClick={e => this.handleShowAddPage() }
									className="waves-effect waves-light btn-xs right col-6">Add New</Button>
						</Colxx>
					</Row> */}
					
					{this.state.screen === 'add' &&
						<NewStakeholder shgroup={shgroupList} onAddStakeholder={stakeholder => this.handleAddNewStakeholder(stakeholder)} stakeholder={defaultStakeholder} />
					}		
					{this.state.screen === 'list' && this.state.stakeholderList.length > 0 && this.state.userList.length > 0 &&
						<StakeholderList projectUserList={this.state.stakeholderList} userList={this.state.userList} />
					}			
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({ survey, kmap, common, settings }) => {

  const { pageList, pageIndex } = survey;
	const { locale } = settings;
	const { userList, projectUserList } = kmap
	const { shgroupList } = common;

  return {
		surveyList : pageList,
		userList,
		projectUserList,
		shgroupList,
    pageIndex,
    locale
  };
};

export default connect(
  mapStateToProps,
  {
		getUserList: userList,
		getProjectUserList: projectUserList,
		getKMapData: kMapData,
		getShgroupList: shgroupList
  }
)(MyMap);
