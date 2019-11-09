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
		
		const stakeholder = this.state.stakeholderList[data.stakeholder];
		
		var chart = {
			type: 'node',
			id: 'node-' + stakeholder.projectId,
			label: { 
				text: stakeholder.firstName + " " + stakeholder.lastName,
				center: false
			},
			color: 'transparent',
			'fontIcon': {
				text: 'fa-user', 
				color: 'rgb(0, 0, 0)',
				fontFamily: 'Font Awesome 5 Free'
			},
			data: {
				group: stakeholder.team
			},
			"glyphs": [
				{
					fontIcon: { 
						text: 'fa-plus-circle', 
						color: 'rgb(0, 0, 0)' 
					},
					color: 'transparent',
					"angle": 30,
					"size": 2
				}
			]
		}
		
		this.setState({
			'chart': {
				...this.state.chart,
				['node-' + stakeholder.projectId] : chart
			}
		});
	}

	componentWillMount() {
    this.props.getUserList();
		this.props.getProjectUserList();
		this.props.getKMapData();
		this.props.getShgroupList();
  }

	componentWillReceiveProps(props) {
	
		const { projectUserList, userList, kMapData, surveyId } = props;
		
		if (projectUserList.length > 0 && userList.length > 0) {
			var stakeholderList = [];

			// for (let i = 0; i < projectUserList.length; i++) {
			for (let i = projectUserList.length - 1; i >= 0; i--) {
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
						
						let bDuplicate = false;
						for (let k = 0; k < stakeholderList.length; k++) {
							if (stakeholderList[k].userId === project.user) {
								bDuplicate = true;
								break;
							}
						}
						if (bDuplicate === false) {
							stakeholderList.push(stakeholder);
							matchUser = true;
						}
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
				
				console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
				console.log(kMapData.vertex.result);
				console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");

				var data = {};
				Array.prototype.forEach.call(kMapData.vertex.result.data['@value'], function (object) {
					
					if ( (object['@value']['id'].indexOf('user') < 0) && (object['@value']['id'].indexOf('category') < 0) &&  (object['@value']['id'].indexOf('stakeholder') < 0)) {
						return;
					}

					if (object['@value']['id'].indexOf('user') >= 0) {
						if (object['@value']['id'] !== ('user-' + surveyId)) return;
					}
					
					let fontIcon =  {};
					if (object['@value']['id'].indexOf('user') >= 0) {
						fontIcon = {
							text: 'fa-user',
							color: 'rgb(255, 0, 0)'
						}
					} else if (object['@value']['id'].indexOf('category') >= 0) {
						fontIcon = {
							text: 'fa-university',
							color: 'rgb(0, 153, 255)'
						}
					} else if (object['@value']['id'].indexOf('stakeholder') >= 0) {
						fontIcon = {
							text: 'fa-user',
							color: 'rgb(0, 0, 0)'
						}
					}

					data = {
						...data,
						['node-' + object['@value']['id']]: { 
							type: 'node',
							id: 'node-' + object['@value']['id'],
							label: { 
								text: object['@value']['properties']['text'][0]['@value']['value'],
								center: false
							},
							'fontIcon': {
								...fontIcon,
								fontFamily: 'Font Awesome 5 Free'
							},
							color: 'transparent',
							"glyphs": [
								{
									fontIcon: { 
										text: 'fa-plus-circle', 
										color: 'rgb(0, 0, 0)' 
									},
									color: 'transparent',
									"angle": 30,
									"size": 2
								}
							]
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

	handleFilter = (search) => {

		const filter = search;

		this.setState( (state) => {
			
			for (let i = 0; i < state.stakeholderList.length; i++) {
				if (search == '') {
						state.stakeholderList[i].show = true;
						continue;
				}
				const fullName = state.stakeholderList[i].firstName + ' ' + state.stakeholderList[i].lastName;
				const index = fullName.indexOf(filter);

				if (index < 0) {
					
					state.stakeholderList[i].show = false;
				}
			}
			return {
				stakeholderList: state.stakeholderList
			}
		});
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
					<SearchBox onFilter={search => this.handleFilter(search)}/>
					<Row>
						{shgroupList.length > 0 && <Colxx xs="12">
							<Button onClick={e => this.handleShowAddPage() }
									className="waves-effect waves-light btn-xs right col-6">Add New</Button>
						</Colxx>}
					</Row>
					
					{this.state.screen === 'add' && shgroupList.length > 0 && 
						<NewStakeholder shgroup={shgroupList} onAddStakeholder={stakeholder => this.handleAddNewStakeholder(stakeholder)} stakeholder={defaultStakeholder} />
					}		
					{this.state.screen === 'list' && this.state.stakeholderList.length > 0 &&
						<StakeholderList projectUserList={this.state.stakeholderList} onAddStakeHolder={ stakeholder => this.handleAddStackholderToGraph(stakeholder) }/>
					}			
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({ survey, kmap, common, settings }) => {

  const { surveyId } = survey;
	const { locale } = settings;
	const { userList, projectUserList, kMapData } = kmap
	const { shgroupList } = common;

  return {
		userList,
		projectUserList,
		shgroupList,
		surveyId,		
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
