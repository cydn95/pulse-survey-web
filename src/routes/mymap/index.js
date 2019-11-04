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
	show: true,
	projectId: Date.now(),
	userId: Date.now()
};

class MyMap extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			screen: 'list',
			stakeholderList: [],
			chart: []
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
	
		const { projectUserList, userList, kMapData } = props;
		
		if (projectUserList.length > 0 && userList.length > 0) {
			var stakeholderList = [];

			for (let i = 0; i < projectUserList.length; i++) {
				const project = projectUserList[i]
				for (let j = 0; j < userList.length; j++) {
					const user = userList[j];
					
					if (user.first_name === '' && user.last_name === '') continue;
					// if (user.is_superuser === true) continue;

					let matchUser = false;
					// if (project.user === user.id && user.is_superuser !== true) {
					if (project.user === user.id) {
						const stakeholder = {
							firstName: user.first_name,
							lastName: user.last_name,
							shType: project.shGroup,
							email: user.email,
							phone: '',
							organization: 1,
							team: project.team,
							show: true,
							projectId: project.id,
							userId: project.user
						};
						
						stakeholderList.push(stakeholder);
						matchUser = true;
					}

					if (matchUser) {
						break;
					}
				}
			}
			
			this.setState({
				stakeholderList,
			});
		}
		
		try{
			if (kMapData.vertex !== 'undefined' && kMapData.edge != 'undefined') {
				var data = {};
				Array.prototype.forEach.call(kMapData.vertex.result.data['@value'], function (object) {
					data = {
						...data,
						['node-' + object['@value']['id']]: { 
							type: 'node',
							id: 'node-' + object['@value']['id'],
							label: { 
								text: object['@value']['label']
							}
						},
					}
				});

				Array.prototype.forEach.call(kMapData.edge.result.data['@value'], function (object) {
					data = {
						...data,
						['link-' + object['@value']['objects']['@value'][1]['@value'][1]] : {
								id1: 'node-' + object['@value']['objects']['@value'][0],
								id2: 'node-' + object['@value']['objects']['@value'][2],
								label: {
									text: object['@value']['objects']['@value'][1]['@value'][7]
								}
						}
					};
				});

				this.setState({
					chart: data
				});
			}
		} catch (e) {

		}
	}

	render() {

		const { shgroupList } = this.props;
		
		return (
			<div className="map-container">
				<Droppable
						className="map-content"
						types={['stakeholder']} // <= allowed drop types
						onDrop={data => this.handleAddStackholderToGraph(data)}>
						<KGraph chart={this.state.chart} />
				</Droppable>
				<div className="map-tool">
					<SearchBox />
					<Row>
						<Colxx xs="12">
							<Button onClick={e => this.handleShowAddPage() }
									className="waves-effect waves-light btn-xs right col-6">Add New</Button>
						</Colxx>
					</Row>
					
					{this.state.screen === 'add' &&
						<NewStakeholder shgroup={shgroupList} onAddStakeholder={stakeholder => this.handleAddNewStakeholder(stakeholder)} stakeholder={defaultStakeholder} />
					}		
					{this.state.screen === 'list' && this.state.stakeholderList.length > 0 &&
						<StakeholderList projectUserList={this.state.stakeholderList} />
					}			
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({ survey, kmap, common, settings }) => {

  const { pageList, pageIndex } = survey;
	const { locale } = settings;
	const { userList, projectUserList, kMapData } = kmap
	const { shgroupList } = common;

  return {
		surveyList : pageList,
		userList,
		projectUserList,
		shgroupList,
		pageIndex,
		kMapData,
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
