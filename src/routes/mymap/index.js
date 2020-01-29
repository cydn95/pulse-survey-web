import React from 'react';

import { Row } from "reactstrap";
import { Colxx } from "Components/CustomBootstrap";
import { Button } from 'reactstrap';

import { connect } from 'react-redux';

import {
	userList,
	stakeholderList,
	kMapData,
	kMapSave,
	aoQuestionList,
	driverList,
	submitAoQuestion,
	skipQuestionList,
	teamList,
	shCategoryList,
	addStakeholder
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

import ReactLoading from 'react-loading';

class MyMap extends React.Component {

	constructor(props) {
		super(props);
		
		this.projectUserList = [];

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
			teamList: [],
			userList: [],
			shCategoryList: [],
			mapSaveLoading: false,
			mapGetLoading: false
		};

		this.defaultStakeholder = {
			projectUserId: '',
			projectId: this.props.projectId,
			userId: this.props.userId,
			fullName: '',
			teamId: '',
			team: '',
			organisationId: '',
			organisation: '',
			shCategory: '',
			show: true,
			firstName: '',
			lastName: '',
			email: ''
		};
	}

	handleAddNewStakeholder = stakeholder => {

		const { projectId } = this.props;

		this.props.addStakeholder(projectId, stakeholder);
	}

	handleShowAddPage = () => {
		this.setState({
			screen: 'add'
		});
	}

	handleAddStackholderToGraph = (data, e = {}) => {
		
		const projectUserId = data.stakeholder;
		const { stakeholderList } = this.state;

		let projectUser = stakeholderList.filter( e => {
			return e.projectUserId == projectUserId;
		});

		if (projectUser.length === 0) return;

		projectUser = projectUser[0];

		let newElem = {
			individuals: [
				{
					id: projectUser.projectUserId,
					name: projectUser.fullName,
					color: 'transparent',
					icon: 'fa-user',
					survey_completion: 100,
					iconColor: 'rgb(0, 0, 0)',
					team: {
						current: projectUser.teamId,
						changeable: true
					},
					organisation: {
						current: projectUser.organisationId,
						changeable: true
					},
					viewCoordinates: Object.keys(e).length > 0 ? {
						clientX: e.clientX,
						clientY: e.clientY
					} : {}
				}],
			teams: [
				{
					id: projectUser.teamId,
					name: projectUser.team,
					icon: "fa-users"
				}
			],
			organisations: [
				{
					id: projectUser.organisationId,
					icon: "fa-building",
					name: projectUser.organisation
				}
			]
		}

		let bExist = false;
		for (let i = 0; i < this.projectUserList.length; i++) {
			if (this.projectUserList[i] == projectUser.projectUserId) {
				bExist = true;
				break;
			}
		}

		if (! bExist) {
			this.projectUserList.push(projectUser.projectUserId);
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

		const { stakeholderList, teamList, shCategoryList, userList, kMapData, mapSaveLoading, mapGetLoading } = props;

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
					"id": 'SHC_' + shCategory.id,
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
					"id": 'T_' + team.id,
					"name": team.name,
					"icon": "fa-users"
				})
			});

			// Individual -> Organization
			let organizationList = [];
			userList.forEach(user => {
				if (organizationList.length === 0) {
					organizationList.push({
						"id": 'O_' + user.user.organization.name,
						"icon": "fa-building",
						"name": user.user.organization.name
					});
				} else {
					let bExist = false;
					organizationList.forEach(o => {
						if (o.id === 'O_' + user.user.organization.name) {
							bExist = true;
						} 
					});
					if (bExist === false) {
						organizationList.push({
							"id": 'O_' + user.user.organization.name,
							"icon": "fa-building",
							"name": user.user.organization.name
						});
					}
				}
			});

			individual.organisations = organizationList;

			let individualList = [];
			if (kMapData.length > 0) {
				let mapUserList = kMapData[0].projectUser;
			
				mapUserList.forEach(mapUser => {

					let bExist = false;
					for (let i = 0; i < this.projectUserList.length; i++) {
						if (this.projectUserList[i] == mapUser) {
							bExist = true;
							break;
						}
					}
					if (! bExist) {
						this.projectUserList.push(mapUser);
					}

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
							individualUser.id = 'S_' + userList[i].id;
							individualUser.name = userList[i].user.first_name + ' ' + userList[i].user.last_name;
							individualUser.team.current = 'T_' + userList[i].team.id;
							individualUser.organisation.current = 'O_' + userList[i].team.organization;
							individualUser.sh_category.current = 'SHC_' + userList[i].shCategory.id;

							bAdd = true;

							break;
						}
					}
					if (bAdd) {
						individualList.push(individualUser);
						// update SHCategory individual Count
						for (let i = 0; i < architecture.sh_categories.length; i++) {
							if (architecture.sh_categories[i].id == individualUser.sh_category.current) {
								architecture.sh_categories[i].individualCount++;
								break;
							}
						}
					}
				});
			}
			
			individual.individuals = individualList;

			this.setState({
				stakeholderList,
				teamList,
				userList,
				shCategoryList,
				apList: architecture,
				esList: individual,
				'screen': 'list',
				mapSaveLoading,
				mapGetLoading
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

	handleSaveGraph = (e) => {

		const { userId, projectId } = this.props;

		const newMapData = {
			user: userId,
			project: projectId,
			projectUser: this.projectUserList,
			layout_json: {}
		}

		this.props.saveKMapData(newMapData);
	}

	render() {

		const { 
			aoQuestionList,
			optionList,
			driverList, 
			skipQuestionList
		} = this.props;
		
		const { 
			enableLayout, 
			viewDropDownOpen,
			layoutDropDownOpen,
			layout,
			viewMode,
			newStakeholder,
			layoutUpdated,
			screen,
			stakeholderList,
			apList,
			esList,
			shCategoryList,
			teamList,
			userList,
			mapSaveLoading,
			mapGetLoading
		} = this.state;
		
		return (
			<div className="map-container">
				<Droppable
					className="map-content"
					types={['stakeholder']} // <= allowed drop types
					onDrop={(data, e) => { this.handleAddStackholderToGraph(data, e) }}>
					<KGraphNavControls enableLayout={enableLayout} viewDropDownOpen={viewDropDownOpen} layoutDropDownOpen={layoutDropDownOpen}
						updateViewDisplay={this.handleToggleMapModeDropdown} updateLayoutDisplay={this.handleToggleLayoutDropdown} updateMap={this.setMapMode} 
						saveGraph={e => this.handleSaveGraph(e)} saveLoading={mapSaveLoading}
						selectedLayout={layout} selectedViewMode={viewMode} />
					{ (userList.length > 0 && teamList.length > 0 && shCategoryList.length > 0 && mapGetLoading == false) && 
					<KGraph
						setParentState={this.setState.bind(this)} apList={apList} esList={esList}
						newStakeholder={newStakeholder} onClickNode={id => this.handleStartOtherSurvey(id)} layout={layout.toLowerCase()} viewMode={viewMode} layoutUpdated={layoutUpdated} />
					}
				</Droppable>
				<div className="map-tool">
					{screen === 'list' &&
						<SearchBox onFilter={search => this.handleFilter(search)} />
					}
					{screen === 'list' && shCategoryList.length > 0 &&
						<Row>
							<Colxx xs="12">
								<Button onClick={e => this.handleShowAddPage()}
									className="waves-effect waves-light btn-xs right col-6">Add New</Button>
							</Colxx>
						</Row>
					}
					{screen === 'add' && shCategoryList.length > 0 &&
						<NewStakeholder shCategoryList={shCategoryList} teamList={teamList} 
							onCancel={e => this.handleCancelSurvey()}
							onAddStakeholder={data => this.handleAddNewStakeholder(data)} stakeholder={this.defaultStakeholder} />
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
	const { kMapData, mapSaveLoading, mapGetLoading } = kmap
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
		locale,
		commonLoading: common.loading,
		mapSaveLoading,
		mapGetLoading
	};
};

export default connect(
	mapStateToProps,
	{
		getUserList: userList,
		getStakeholderList: stakeholderList,
		getKMapData: kMapData,
		saveKMapData: kMapSave,
		getShCategoryList: shCategoryList,
		getAoQuestionList: aoQuestionList,
		getDriverList: driverList,
		getSkipQuestionList: skipQuestionList,
		getTeamList: teamList,
		submitAoQuestion,
		addStakeholder
	}
)(MyMap);
