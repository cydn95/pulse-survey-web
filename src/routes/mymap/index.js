import React from 'react';

import { Row } from "reactstrap";
import { Colxx } from "Components/CustomBootstrap";
import { Button } from 'reactstrap';

import { connect } from 'react-redux';
import {
	userList,
	projectUserList,
	kMapData,
	shgroupList,
	aoQuestionList,
	driverList,
	submitAoQuestion,
	skipQuestionList
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
	first_name: '',
	last_name: '',
	shType: 0,
	email: '',
	phone: '',
	organization: 0,
	team: '',
	show: true,
	projectId: Date.now(),
	userId: Date.now(),
	organization: ''
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
			enableLayout: false,
			layout: 'Standard',
			viewMode: 'Org/ Team/ SH',
			layoutUpdated: false
			// graph: {
			// 	style: {
			// 		flex: 1, 
			// 		width: '100%',
			// 		height: '100%'
			// 	},
			// 	items: [],
			// 	options: {
			// 		iconFontFamily: 'Font Awesome 5 Free'
			// 	},
			// 	positions: {},
			// 	selection: {},
			// 	animation: {
			// 			animate: false
			// 	},
			// 	openCombos: {}
			// }
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
			id: 'node-' + stakeholder.projectId,
			name: `${stakeholder.firstName} ${stakeholder.lastName}`,
			color: 'transparent',
			icon: 'fa-user',
			iconColor: 'rgb(0, 0, 0)',
			d: {
				organization: stakeholder.organization || '',
				team: stakeholder.team || ''
			},
			viewCoordinates: Object.keys(e).length > 0 ? {
				clientX: e.clientX,
				clientY: e.clientY
			} : {}
		}
		this.setState({ newStakeholder: newElem });
	}

	componentWillMount() {
		this.props.getUserList();
		this.props.getProjectUserList();
		this.props.getKMapData();
		this.props.getShgroupList();
		this.props.getAoQuestionList();
		this.props.getDriverList();
		this.props.getSkipQuestionList();
	}

	componentWillReceiveProps(props) {

		const { projectUserList, userList, kMapData, surveyId, driverList } = props;

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
							userId: project.user,
							organization: ''
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

		try {
			// console.log(kMapData);
			// if (kMapData.vertex !== 'undefined' && kMapData.edge != 'undefined') {

			// 	var data = {};
			// 	Array.prototype.forEach.call(kMapData.vertex.result.data['@value'], function (object) {

			// 		if ( (object['@value']['id'].indexOf('user') < 0) && (object['@value']['id'].indexOf('category') < 0) &&  (object['@value']['id'].indexOf('stakeholder') < 0)) {
			// 			return;
			// 		}

			// 		if (object['@value']['id'].indexOf('user') >= 0) {
			// 			if (object['@value']['id'] !== ('user-' + surveyId)) return;
			// 		}

			// 		let fontIcon =  {};
			// 		if (object['@value']['id'].indexOf('user') >= 0) {
			// 			fontIcon = {
			// 				text: 'fa-user',
			// 				color: 'rgb(255, 0, 0)'
			// 			}
			// 		} else if (object['@value']['id'].indexOf('category') >= 0) {
			// 			fontIcon = {
			// 				text: 'fa-university',
			// 				color: 'rgb(0, 153, 255)'
			// 			}
			// 		} else if (object['@value']['id'].indexOf('stakeholder') >= 0) {
			// 			fontIcon = {
			// 				text: 'fa-user',
			// 				color: 'rgb(0, 0, 0)'
			// 			}
			// 		}

			// 		data = {
			// 			...data,
			// 			['node-' + object['@value']['id']]: { 
			// 				type: 'node',
			// 				origin: '1',
			// 				id: 'node-' + object['@value']['id'],
			// 				label: { 
			// 					text: object['@value']['properties']['text'][0]['@value']['value'],
			// 					center: false
			// 				},
			// 				'fontIcon': {
			// 					...fontIcon,
			// 					fontFamily: 'Font Awesome 5 Free'
			// 				},
			// 				color: 'transparent',
			// 				"glyphs": [
			// 					{
			// 						fontIcon: { 
			// 							text: 'fa-plus-circle', 
			// 							color: 'rgb(0, 0, 0)' 
			// 						},
			// 						color: 'transparent',
			// 						"angle": 30,
			// 						"size": 2
			// 					}
			// 				]
			// 			},
			// 		}
			// 	});

			// 	Array.prototype.forEach.call(kMapData.edge.result.data['@value'], function (object) {
			// 		data = {
			// 			...data,
			// 			['link-' + object['@value']['objects']['@value'][1]['@value'][1]] : {
			// 					id1: 'node-' + object['@value']['objects']['@value'][0],
			// 					id2: 'node-' + object['@value']['objects']['@value'][2],
			// 					type: 'link',
			// 					origin: 1,
			// 					label: {
			// 						text: object['@value']['objects']['@value'][1]['@value'][7]
			// 					}
			// 			}
			// 		};
			// 	});

			// 	this.setState((state) => ({
			// 		graph: {
			// 			...state.graph,
			// 			items: data
			// 		}
			// 	}));
			// }
		} catch (e) {

		}
	}

	handleFilter = (search) => {

		const filter = search;

		this.setState((state) => {

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
		this.setState({ viewDropDownOpen: !this.state.viewDropDownOpen, layoutUpdated: false })
	}

	handleToggleLayoutDropdown = () => {
		this.setState({ layoutDropDownOpen: !this.state.layoutDropDownOpen, layoutUpdated: false  })
	}

	setMapMode = (selection, option) => {
		this.setState({ [option]: selection, layoutUpdated: option==='layout' ? true : false });
	}

	render() {

		const { shgroupList, aoQuestionList, optionList, driverList, skipQuestionList } = this.props;
		const {enableLayout} = this.state;
		return (
			<div className="map-container">
				<Droppable
					className="map-content"
					types={['stakeholder']} // <= allowed drop types
					onDrop={(data, e) => { this.handleAddStackholderToGraph(data, e) }}>
					<KGraphNavControls enableLayout={enableLayout} viewDropDownOpen={this.state.viewDropDownOpen} layoutDropDownOpen={this.state.layoutDropDownOpen}
						updateViewDisplay={this.handleToggleMapModeDropdown} updateLayoutDisplay={this.handleToggleLayoutDropdown} updateMap={this.setMapMode} selectedLayout={this.state.layout} selectedViewMode={this.state.viewMode} />
					<KGraph
					setParentState ={this.setState.bind(this)}
					 newStakeholder={this.state.newStakeholder} onClickNode={id => this.handleStartOtherSurvey(id)} layout={this.state.layout.toLowerCase()} viewMode={this.state.viewMode} layoutUpdated={this.state.layoutUpdated}/>
				</Droppable>
				<div className="map-tool">
					{this.state.screen !== 'aosurvey' &&
						<SearchBox onFilter={search => this.handleFilter(search)} />
					}
					{this.state.screen !== 'aosurvey' && shgroupList.length > 0 &&
						<Row>
							<Colxx xs="12">
								<Button onClick={e => this.handleShowAddPage()}
									className="waves-effect waves-light btn-xs right col-6">Add New</Button>
							</Colxx>
						</Row>
					}
					{this.state.screen === 'add' && shgroupList.length > 0 &&
						<NewStakeholder shgroup={shgroupList} onAddStakeholder={stakeholder => this.handleAddNewStakeholder(stakeholder)} stakeholder={defaultStakeholder} />
					}
					{this.state.screen === 'list' && this.state.stakeholderList.length > 0 &&
						<StakeholderList projectUserList={this.state.stakeholderList} onAddStakeHolder={stakeholder => this.handleAddStackholderToGraph(stakeholder)} />
					}
					{this.state.screen === 'aosurvey' && aoQuestionList.length > 0 && optionList.length > 0 &&
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

const mapStateToProps = ({ survey, kmap, common, settings, aosurvey }) => {

	const { surveyId } = survey;
	const { locale } = settings;
	const { userList, projectUserList, kMapData } = kmap
	const { shgroupList, driverList, skipQuestionList } = common;
	const { aoQuestionList, optionList } = aosurvey;

	return {
		userList,
		projectUserList,
		shgroupList,
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
		getProjectUserList: projectUserList,
		getKMapData: kMapData,
		getShgroupList: shgroupList,
		getAoQuestionList: aoQuestionList,
		getDriverList: driverList,
		getSkipQuestionList: skipQuestionList,
		submitAoQuestion
	}
)(MyMap);
