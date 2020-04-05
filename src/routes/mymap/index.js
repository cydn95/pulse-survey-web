import React from 'react';

import TopNav from 'Containers/TopNav';

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
	KGraph,
	AoSurvey,
	KGraphNavControls
} from "Components/MyMap";

import {
	NewStakeholder
} from "Components/Survey";

import SearchBar from "Components/search-bar";

import Button from "Components/Button";

import { Droppable } from 'react-drag-and-drop'

import ReactLoading from 'react-loading';

import styles from "./styles.scss";

import classnames from "classnames";

const searchKey = "";

class MyMap extends React.Component {

	constructor(props) {
		super(props);
		
		this.projectUserList = [];

		this.state = {
			screen: 'list',
			stakeholderList: [],
			currentSurveyUserId: 0,
			currentSurveyUser: '',
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
			decisionMakerList: [],
			mapSaveLoading: false,
			mapGetLoading: false,

			toggleGraph: true,
			search: ''
		};

		this.defaultStakeholder = {
      projectUserId: "",
      projectId: this.props.projectId,
      projectUserTitle: "",
      projectUserRoleDesc: "",
      userId: this.props.userId,
      fullName: "",
      teamId: "",
      team: "",
      organisationId: "",
      organisation: "",
      shCategory: "",
      show: true,
      firstName: "",
      lastName: "",
      email: ""
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
					id: projectUser.userId,
					name: projectUser.fullName,
					color: 'transparent',
					icon: 'fa-user',
					avatar: projectUser.userAvatar,
					survey_completion: 40,
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
		
		const { projectId, projectUserId, userId } = this.props;
		
		this.props.getKMapData(userId, projectId);
		this.props.getShCategoryList();
		this.props.getStakeholderList(projectId);
		this.props.getTeamList();
		this.props.getAoQuestionList(projectUserId);
		this.props.getDriverList();
		this.props.getSkipQuestionList();
	}

	componentWillReceiveProps(props) {

		const { stakeholderList, teamList, shCategoryList, userList, kMapData, mapSaveLoading, mapGetLoading } = props;

		let architecture = {
			"main": {
				"id": "ap1",
				"name": "ME",
				"icon": "http://3.17.57.137/media/uploads/shcategory/me.svg",
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
					"icon": shCategory.icon,
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
						"survey_completion": 40,
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
							individualUser.id = 'S_' + userList[i].user.id;
							individualUser.avatar = userList[i].user.avatar == null ? '' : userList[i].user.avatar.name ;
							individualUser.name = userList[i].user.first_name + ' ' + userList[i].user.last_name;
							individualUser.team.current = 'T_' + userList[i].team.id;
							individualUser.organisation.current = 'O_' + userList[i].user.organization.name;
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

			let decisionMakerList = [];
			if (kMapData.length > 0 && stakeholderList.length > 0) {
				let mapUserList = kMapData[0].projectUser;
				for (let i = 0; i < mapUserList.length; i++) {
					for (let j = 0; j < stakeholderList.length; j++) {
						if (mapUserList[i] == stakeholderList[j].projectUserId) {
							decisionMakerList.push(stakeholderList[j]);
							break;
						}
					}
				}
			}

			this.setState({
				stakeholderList,
				decisionMakerList,
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

		if (id.startsWith('S_')) {

			let user = {};
			for (let i = 0; i < this.state.decisionMakerList.length; i++) {
				if (this.state.decisionMakerList[i].userId === id) {
					user = this.state.decisionMakerList[i];
					break;
				}
			}

			this.setState({
				screen: 'aosurvey',
				currentSurveyUserId: id,
				currentSurveyUser: user
			})
		}
	}

	handleCancelSurvey = e => {
		this.setState({
			screen: 'list',
			currentSurveyUserId: 0,
			currentSurveyUser: {}
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

	toggleGraph = e => {
		this.setState({
			'toggleGraph': !this.state.toggleGraph
		});
	}

	render() {

		const { 
			aoQuestionList,
			optionList,
			driverList, 
			skipQuestionList,
			history
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
			decisionMakerList,
			teamList,
			userList,
			mapSaveLoading,
			mapGetLoading,
			toggleGraph,
			currentSurveyUser
		} = this.state;

		const mapHeaderVisible = toggleGraph ? classnames(styles['map-header']) : classnames(styles['map-header'], styles['mobile-hide']);
		const mapContentVisible = toggleGraph ? classnames(styles['map-content']) : classnames(styles['map-content'], styles['mobile-hide']);
		const stakeholderVisible = !toggleGraph ? classnames(styles['map-stakeholder']) : classnames(styles['map-stakeholder'], styles['mobile-hide']);

		return (
			<div className={ styles.root}>
				<div className={styles.topbar }>
          <TopNav history={ history } menuTitle="My Map" >
						<div className={ styles.section }>
							<h2 className={ styles['project-name'] }>Alpha Project</h2>
							<div className={styles['graph-toggle']}>
								<Button onClick={ e => this.toggleGraph(e) }>{ !toggleGraph ? 'GRAPH VIEW' : 'STAKEHOLDER' }</Button>
							</div>
						</div>
					</TopNav>
        </div>
				<div className={ styles['map-container'] }>
					<div className={ classnames(mapHeaderVisible) }>
						<div className={ styles['map-title'] }>
							<svg className={ styles.icon } viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
								<g>
									<rect x="-1" y="-1" width="22" height="22" fill="none"/>
								</g>
								<g stroke="null">
									<path d="m2.642 9.5924c0.50308 0 0.94019 0.18144 1.3031 0.55257s0.55257 0.79998 0.55257 1.3031-0.18144 0.94019-0.55257 1.3031-0.79998 0.55257-1.3031 0.55257-0.94019-0.18144-1.3031-0.55257-0.55257-0.79998-0.55257-1.3031 0.18144-0.94019 0.55257-1.3031 0.79998-0.55257 1.3031-0.55257zm2.5484 2.3257v-0.93194h1.3938v0.93194h-1.3938zm12.066 1.3855c0.57731 0 1.0721 0.20618 1.4763 0.6103s0.6103 0.89895 0.6103 1.4763-0.20618 1.0721-0.6103 1.4763-0.89895 0.6103-1.4763 0.6103-1.0721-0.20618-1.4763-0.6103-0.6103-0.89895-0.6103-1.4763l0.032989-0.28865-2.3752-1.3608c-0.3134 0.3134-0.65978 0.54432-1.0474 0.70926s-0.79998 0.24742-1.2453 0.24742c-0.57731 0-1.1216-0.14845-1.6247-0.4371s-0.89895-0.68452-1.1876-1.1876-0.4371-1.0474-0.4371-1.6247c0-0.51958 0.11546-1.0062 0.34638-1.4515s0.54432-0.82473 0.93194-1.1299l-0.95668-2.0618h-0.09072c-0.57731 0-1.0721-0.20618-1.4763-0.6103s-0.6103-0.89895-0.6103-1.4763 0.20618-1.0721 0.6103-1.4763 0.89895-0.6103 1.4763-0.6103 1.0721 0.20618 1.4763 0.6103 0.6103 0.89895 0.6103 1.4763c0 0.61854-0.23917 1.1381-0.72576 1.567l0.95668 2.0041c0.23092-0.057731 0.46185-0.09072 0.69277-0.09072 0.57731 0 1.1216 0.14845 1.6247 0.4371s0.89895 0.68452 1.1876 1.1876 0.4371 1.0474 0.4371 1.6247c0 0.37113-0.065978 0.74225-0.20618 1.1299l2.2598 1.3113c0.40412-0.38762 0.88246-0.58556 1.4268-0.58556zm-9.7483-7.8844c0.18969 0 0.35463-0.065978 0.49484-0.20618s0.20618-0.2969 0.20618-0.49484-0.065978-0.35463-0.20618-0.49484-0.2969-0.20618-0.49484-0.20618-0.35463 0.065978-0.49484 0.20618-0.20618 0.2969-0.20618 0.49484 0.065978 0.35463 0.20618 0.49484 0.30515 0.20618 0.49484 0.20618zm3.0185 7.8844c0.50308 0 0.94019-0.18144 1.3031-0.55257s0.55257-0.79998 0.55257-1.3031-0.18144-0.94019-0.55257-1.3031-0.79998-0.55257-1.3031-0.55257-0.94019 0.18144-1.3031 0.55257-0.55257 0.79998-0.55257 1.3031 0.18144 0.94019 0.55257 1.3031 0.79998 0.55257 1.3031 0.55257zm5.1628-4.7834-1.3938 1.0474-0.57731-0.7505 1.3938-1.0474 0.57731 0.7505zm1.7979-0.3134c-0.50308 0-0.94019-0.18144-1.3031-0.55257s-0.55257-0.79998-0.55257-1.3031 0.18144-0.94019 0.55257-1.3031 0.79998-0.55257 1.3031-0.55257 0.94019 0.18144 1.3031 0.55257 0.55257 0.79998 0.55257 1.3031-0.18144 0.94019-0.55257 1.3031-0.79998 0.55257-1.3031 0.55257zm-0.23092 7.8844c0.18969 0 0.35463-0.065978 0.49484-0.20618s0.20618-0.2969 0.20618-0.49484-0.065978-0.35463-0.20618-0.49484-0.2969-0.20618-0.49484-0.20618-0.35463 0.065978-0.49484 0.20618-0.20618 0.2969-0.20618 0.49484 0.065978 0.35463 0.20618 0.49484 0.2969 0.20618 0.49484 0.20618z" stroke="null"/>
								</g>
							</svg>
							<h2 className={ styles['title'] }>Click to choose a Category</h2>
						</div>
						<div className={ styles['map-control'] }>
							<KGraphNavControls 
								enableLayout={enableLayout} 
								viewDropDownOpen={viewDropDownOpen} 
								layoutDropDownOpen={layoutDropDownOpen}
								updateViewDisplay={this.handleToggleMapModeDropdown} 
								updateLayoutDisplay={this.handleToggleLayoutDropdown} 
								updateMap={this.setMapMode} 
								saveGraph={e => this.handleSaveGraph(e)} saveLoading={mapSaveLoading}
								selectedLayout={layout} 
								selectedViewMode={viewMode} 
							/>
						</div>
					</div>
					<div className={ styles['map-content-section']}>
						<Droppable
							className={ mapContentVisible }
							types={ ['stakeholder'] } // <= allowed drop types
							onDrop={ (data, e) => { this.handleAddStackholderToGraph(data, e) } }>
							{ (userList.length > 0 && teamList.length > 0 && shCategoryList.length > 0 && mapGetLoading === false) && 
							<KGraph
								setParentState={ this.setState.bind(this) } 
								apList={ apList }
								esList={ esList }
								newStakeholder={ newStakeholder } 
								onClickNode={ id => this.handleStartOtherSurvey(id) } 
								layout={ layout.toLowerCase() } 
								viewMode={ viewMode } 
								layoutUpdated={ layoutUpdated } 
							/>
							}
						</Droppable>
						<div className={ stakeholderVisible }>
						{screen === 'list' && shCategoryList.length > 0 &&
							<SearchBar
								searchKey={searchKey} 
								decisionMakers={decisionMakerList}
								onClickDecisionMaker={ id => this.handleStartOtherSurvey(id) } 
								allStakeholders={stakeholderList}
								addNewStakeholder={e => this.handleShowAddPage(e)}
								list={shCategoryList}
							/>
						}
						{screen === 'add' && shCategoryList.length > 0 &&
						<NewStakeholder shCategoryList={shCategoryList} teamList={teamList} 
								onCancel={e => this.handleCancelSurvey()}
								onAddStakeholder={data => this.handleAddNewStakeholder(data)} stakeholder={this.defaultStakeholder} />
						}
						{screen === 'aosurvey' && aoQuestionList.length > 0 && optionList.length > 0 &&
						driverList.length > 0 && skipQuestionList.length > 0 &&
						<AoSurvey
							questions={aoQuestionList}
							options={optionList}
							drivers={driverList}
							user={currentSurveyUser}
							skipQuestionList={skipQuestionList}
							onSubmit={(e, answerData) => this.handleSubmitSurvey(e, answerData)}
							onCancel={e => this.handleCancelSurvey()} />
					}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({ survey, kmap, common, settings, aosurvey, authUser }) => {

	const { projectId, projectUserId, user } = authUser;
	const { surveyId } = survey;
	const { locale } = settings;
	const { kMapData, mapSaveLoading, mapGetLoading } = kmap
	const { driverList, skipQuestionList, stakeholderList, teamList, shCategoryList, userList } = common;
	const { aoQuestionList, optionList } = aosurvey;

	return {
		userId: user.userId,
		projectId,
		projectUserId,
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
