import React from 'react';

import { Row } from "reactstrap";
import { Colxx } from "Components/CustomBootstrap";
import { Button } from 'reactstrap';

import { connect } from 'react-redux';
import {
	userList,
	stakeholderList,
	kMapData,
	aoQuestionList,
	driverList,
	submitAoQuestion,
	skipQuestionList,
	teamList,
	shCategoryList
} from "Redux/actions";

import {
	SearchBox,
	StakeholderList,
	KGraph,
	AoSurvey,
	KGraphNavControls
} from "Components/MyMap";

import {
	NewStakeholder
} from "Components/Survey";

import { Droppable } from 'react-drag-and-drop'

const defaultStakeholder = {
	projectuserId: '',
	projectId: '',
	userId: '',
	fullNanme: '',
	teamId: '',
	team: '',
	organization: '',
	show: true
};

class MyMap extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			screen: 'list',
			stakeholderList: [],
			currentSurveyUserId: 0,
			newStakeholder: {},
			viewDropDownOpen: false,
			layoutDropDownOpen: false,
			enableLayout: true,
			layout: 'Standard',
			viewMode: 'Org/ Team/ SH',
			layoutUpdated: false,
			apList: null,
			esList: null,
			shCategoryList: [],
			userList: [],
			teamList: []
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

	handleAddStackholderToGraph = (data, e = {}) => {
		const stakeholder = this.state.stakeholderList[data.stakeholder];
		let newElem = {
			individuals: [
				{
					id: stakeholder.userId,
					name: `${stakeholder.firstName} ${stakeholder.lastName}`,
					color: 'transparent',
					icon: 'fa-user',
					survey_completion: 20,
					iconColor: 'rgb(0, 0, 0)',
					team: {
						current: "PC1",
						changeable: true
					},
					organisation: {
						current: "DoH1",
						changeable: true
					},
					viewCoordinates: Object.keys(e).length > 0 ? {
						clientX: e.clientX,
						clientY: e.clientY
					} : {}
				}],
			teams: [
				{
					id: "PC1",
					name: "Planning Commission",
					icon: "fa-users"
				}
			],
			organisations: [
				{
					id: "DoH1",
					icon: "fa-building",
					name: "Department of Health"
				}
			]
		}
		this.setState({ newStakeholder: newElem });
	}

	componentWillMount() {
		
		const { projectId, userId } = this.props;
		
		this.props.getKMapData(userId, projectId);
		this.props.getShCategoryList();
		this.props.getStakeholderList(projectId);
		this.props.getTeamList();
		this.props.getAoQuestionList();
		this.props.getDriverList();
		this.props.getSkipQuestionList();
	}

	componentWillReceiveProps(props) {

		const { stakeholderList, teamList, shCategoryList, userList, kMapData } = props;

		let architecture = {
			"main": {
				"id": "ap1",
				"name": "ME",
				"icon": "fa-sitemap",
				"color": "#7030a0",
				"iconColor": "#fefefa"
			},
			"sh_categories": []
		};

		let individual = {
			"individuals": [],
			"teams": [],
			"organisations": []
		}

		if (teamList.length > 0 && userList.length > 0 && shCategoryList.length > 0) {
			// Make Architecture
			shCategoryList.forEach(shCategory => {
				architecture.sh_categories.push({
					"id": shCategory.id,
					"name": shCategory.SHCategoryName,
					"icon": "fa-project-diagram",
					"color": "#59a2ad",
					"iconColor": "#fefefa",
					"individualCount": 0,
					"expanded": false
				})
			});

			// Individual -> Team List
			teamList.forEach(team => {
				individual.teams.push({
					"id": team.id,
					"name": team.name,
					"icon": "fa-users"
				})
			});

			// Individual -> Organization
			let organizationList = [];
			userList.forEach(user => {
				if (organizationList.length === 0) {
					organizationList.push({
						"id": user.user.organization.name,
						"icon": "fa-building",
						"name": "Department of Health"
					});
				} else {
					let bExist = false;
					organizationList.forEach(o => {
						if (o.id === user.user.organization.name) {
							bExist = true;
						} 
					});
					if (bExist === false) {
						organizationList.push({
							"id": user.user.organization.name,
							"icon": "fa-building",
							"name": user.user.organization.name
						});
					}
				}
			});

			individual.organisations = organizationList;

			// Individual -> individuals
			/**
			 * {
							"id": "MJ1",
							"name": "Mick Jagger",
							"icon": "fa-user",
							"survey_completion": 100,
							"team": {
									"current": "PC1",
									"changeable": false
							},
							"organisation": {
									"current": "DoH1",
									"changeable": false
							},
							"sh_category": {
									"current": "es1",
									"changeable": false
							}
					},
			*/
			let individualList = [];
			if (kMapData.length > 0) {
				let mapUserList = kMapData[0].projectUser;
				
				mapUserList.forEach(mapUser => {
					let individualUser = {
						"id": "",
						"name": "",
						"icon": "fa-user",
						"survey_completion": 100,
						"team": {
								"current": "",
								"changeable": false
						},
						"organisation": {
								"current": "",
								"changeable": false
						},
						"sh_category": {
								"current": "",
								"changeable": false
						}
					};
					let bAdd = false;
					for (let i = 0; i < userList.length; i++) {
						if (userList[i].id === mapUser) {
							individualUser.id = userList[i].user.id;
							individualUser.name = userList[i].user.first_name + ' ' + userList[i].user.last_name;
							individualUser.team.current = userList[i].team.id;
							individualUser.organisation.current = userList[i].team.organization;
							individualUser.sh_category.current = userList[i].shCategory.id;

							bAdd = true;

							break;
						}
					}
					if (bAdd) {
						individualList.push(individualUser);
					}
				});
			}

			individual.individuals = individualList;
// console.log("*******************");
// console.log(architecture);
// console.log(individual);
// console.log("*******************");
			this.setState({
				stakeholderList,
				apList: architecture,
				esList: individual,
				shCategoryList,
				userList,
				teamList
			});
		}
	}

	handleFilter = (search) => {

		const filter = search;

		this.setState((state) => {

			for (let i = 0; i < state.stakeholderList.length; i++) {
				if (search === '') {
					state.stakeholderList[i].show = true;
					continue;
				}
				const index = state.stakeholderList[i].fullName.indexOf(filter);

				if (index < 0) {

					state.stakeholderList[i].show = false;
				}
			}
			return {
				stakeholderList: state.stakeholderList
			}
		});
	}

	handleStartOtherSurvey = id => {
		this.setState({
			screen: 'aosurvey',
			currentSurveyUserId: id
		})
	}

	handleCancelSurvey = e => {
		this.setState({
			screen: 'list',
			currentSurveyUserId: 0
		})
	}

	handleSubmitSurvey = (e, answerData) => {

		this.props.submitAoQuestion(answerData, this.props.history, this.state.currentSurveyUserId);
	}


	handleToggleMapModeDropdown = () => {
		this.setState({ viewDropDownOpen: !this.state.viewDropDownOpen, layoutUpdated: false, newStakeholder:[] })
	}

	handleToggleLayoutDropdown = (e) => {
		let currentSelection = e.target.parentNode.parentNode.childNodes[0].innerHTML;
		let validUpdate = currentSelection.indexOf('Toggle Dropdown') === 22 || (currentSelection.indexOf('<') === -1 && currentSelection !== this.state.layout);
		this.setState({ layoutDropDownOpen: !this.state.layoutDropDownOpen, layoutUpdated: validUpdate,newStakeholder:[] })
	}

	setMapMode = (selection, option) => {
		this.setState({ [option]: selection, layoutUpdated: option === 'layout' ? true : false,newStakeholder:[] });
	}

	render() {

		const { aoQuestionList, optionList, driverList, skipQuestionList } = this.props;
		const { enableLayout, viewDropDownOpen, layoutDropDownOpen, layout, viewMode, newStakeholder, layoutUpdated, screen, stakeholderList, apList, esList, userList, teamList, shCategoryList } = this.state;
		
		return (
			<div className="map-container">
				<Droppable
					className="map-content"
					types={['stakeholder']} // <= allowed drop types
					onDrop={(data, e) => { this.handleAddStackholderToGraph(data, e) }}>
					<KGraphNavControls enableLayout={enableLayout} viewDropDownOpen={viewDropDownOpen} layoutDropDownOpen={layoutDropDownOpen}
						updateViewDisplay={this.handleToggleMapModeDropdown} updateLayoutDisplay={this.handleToggleLayoutDropdown} updateMap={this.setMapMode} selectedLayout={layout} selectedViewMode={viewMode} />
					{ (userList.length > 0 && teamList.length > 0 && shCategoryList.length > 0) && 
					<KGraph
						setParentState={this.setState.bind(this)} apList={apList} esList={esList}
						newStakeholder={newStakeholder} onClickNode={id => this.handleStartOtherSurvey(id)} layout={layout.toLowerCase()} viewMode={viewMode} layoutUpdated={layoutUpdated} />
					}
				</Droppable>
				<div className="map-tool">
					{screen !== 'aosurvey' &&
						<SearchBox onFilter={search => this.handleFilter(search)} />
					}
					{screen !== 'aosurvey' && shCategoryList.length > 0 &&
						<Row>
							<Colxx xs="12">
								<Button onClick={e => this.handleShowAddPage()}
									className="waves-effect waves-light btn-xs right col-6">Add New</Button>
							</Colxx>
						</Row>
					}
					{screen === 'add' && shCategoryList.length > 0 &&
						<NewStakeholder shCategoryList={shCategoryList} onAddStakeholder={stakeholder => this.handleAddNewStakeholder(stakeholder)} stakeholder={defaultStakeholder} />
					}
					{screen === 'list' && stakeholderList.length > 0 &&
						<StakeholderList stakeholderList={stakeholderList} onAddStakeHolder={stakeholder => this.handleAddStackholderToGraph(stakeholder)} />
					}
					{screen === 'aosurvey' && aoQuestionList.length > 0 && optionList.length > 0 &&
						driverList.length > 0 && skipQuestionList.length > 0 &&
						<AoSurvey
							questions={aoQuestionList}
							options={optionList}
							drivers={driverList}
							skipQuestionList={skipQuestionList}
							onSubmit={(e, answerData) => this.handleSubmitSurvey(e, answerData)}
							onCancel={e => this.handleCancelSurvey()} />
					}
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({ survey, kmap, common, settings, aosurvey, authUser }) => {

	const { projectId, user } = authUser;
	const { surveyId } = survey;
	const { locale } = settings;
	const { kMapData } = kmap
	const { driverList, skipQuestionList, stakeholderList, teamList, shCategoryList, userList } = common;
	const { aoQuestionList, optionList } = aosurvey;

	return {
		userId: user.userId,
		projectId,
		stakeholderList,
		teamList,
		shCategoryList,
		userList,
		skipQuestionList,
		surveyId,
		kMapData,
		aoQuestionList,
		optionList,
		driverList,
		locale
	};
};

export default connect(
	mapStateToProps,
	{
		getUserList: userList,
		getStakeholderList: stakeholderList,
		getKMapData: kMapData,
		getShCategoryList: shCategoryList,
		getAoQuestionList: aoQuestionList,
		getDriverList: driverList,
		getSkipQuestionList: skipQuestionList,
		getTeamList: teamList,
		submitAoQuestion
	}
)(MyMap);
