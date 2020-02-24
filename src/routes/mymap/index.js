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

	render() {
		return (
			<h1>
				In progressing...
			</h1>
		)
	}
}

export default MyMap
