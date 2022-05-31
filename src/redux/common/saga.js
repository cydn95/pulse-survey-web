import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  userListAPI,
  teamListAPI,
  organizationListAPI,
  shgroupListAPI,
  optionListAPI,
  driverListAPI,
  skipQuestionListAPI,
  stakeholderListAPI,
  shCategoryListAPI,
  addUserAPI,
  addStakeholderAPI,
  updateStakeholderAPI,
} from "../../services/axios/api";

import {
  ORGANIZATION_LIST,
  TEAM_LIST,
  SHGROUP_LIST,
  OPTION_LIST,
  DRIVER_LIST,
  SKIP_QUESTION_LIST,
  STAKEHOLDER_LIST,
  SHCATEGORY_LIST,
  ADD_STAKEHOLDER,
  UPDATE_STAKEHOLDER,
} from "Constants/actionTypes";

import { defaultPassword } from "Constants/defaultValues";

import {
  organizationListSuccess,
  teamListSuccess,
  shgroupListSuccess,
  optionListSuccess,
  driverListSuccess,
  skipQuestionListSuccess,
  stakeholderList,
  stakeholderListSuccess,
  shCategoryListSuccess,
} from "./actions";

const getOrganizationListAysnc = async (surveyId) =>
  await organizationListAPI(surveyId)
    .then((data) => data)
    .catch((error) => error);

function* getOrganizationList({payload}) {
  try {
    const {surveyId} = payload;

    const result = yield call(getOrganizationListAysnc, surveyId);
    if (result.status === 200) {
      let temp = result.data.map(d => d.name)
      temp = [...new Set(temp)]
      yield put(organizationListSuccess(temp));
    }
  } catch(error) {
    console.log('error', error)
  }
}

const getTeamListAysnc = async (projectId, surveyId) =>
  await teamListAPI(projectId, surveyId)
    .then((data) => data)
    .catch((error) => error);

function* getTeamList({ payload }) {
  try {
    const { projectId, surveyId } = payload;

    const result = yield call(getTeamListAysnc, projectId, surveyId);

    if (result.status === 200) {
      yield put(teamListSuccess(result.data));
    }
  } catch (error) {
    console.log("error : ", error);
  }
}

const getShgroupListAysnc = async (surveyId) =>
  await shgroupListAPI(surveyId)
    .then((data) => data)
    .catch((error) => error);

function* getShgroupList({ payload }) {
  try {
    const { surveyId } = payload;
    const result = yield call(getShgroupListAysnc, surveyId);

    if (result.status === 200) {
      yield put(shgroupListSuccess(result.data));
    }
  } catch (error) {
    console.log("error : ", error);
  }
}

const getOptionListAysnc = async () =>
  await optionListAPI()
    .then((data) => data)
    .catch((error) => error);

function* getOptionList() {
  try {
    const result = yield call(getOptionListAysnc);

    if (result.status === 200) {
      yield put(optionListSuccess(result.data));
    }
  } catch (error) {
    console.log("error : ", error);
  }
}

const getDriverListAysnc = async (surveyId) =>
  await driverListAPI(surveyId)
    .then((data) => data)
    .catch((error) => error);

function* getDriverList({ payload }) {
  try {
    const { surveyId } = payload;
    const result = yield call(getDriverListAysnc, surveyId);

    if (result.status === 200) {
      let driverList = [];
      result.data.forEach((driver) => {
        driverList.push({
          driverId: driver.id,
          driverName: driver.driverName,
          icon: driver.iconPath,
          percentage: 0,
          progress: 0,
        });
      });
      // console.log(driverList);
      yield put(driverListSuccess(driverList));
    }
  } catch (error) {
    console.log("error : ", error);
  }
}

const getSkipQuestionListAysnc = async () =>
  await skipQuestionListAPI()
    .then((data) => data)
    .catch((error) => error);

function* getSkipQuestionList() {
  try {
    const result = yield call(getSkipQuestionListAysnc);

    if (result.status === 200) {
      yield put(skipQuestionListSuccess(result.data));
    }
  } catch (error) {
    console.log("error : ", error);
  }
}

const getStakeholderListAysnc = async (projectUserId, surveyId) =>
  await stakeholderListAPI(projectUserId, surveyId)
    .then((data) => data)
    .catch((error) => error);

function* getStakeholderList({ payload }) {
  try {
    const { projectUserId, surveyId, callback } = payload;
    const result = yield call(getStakeholderListAysnc, projectUserId, surveyId);

    const stakeholderList = [];
    const userList = [];
    if (result.status === 200) {
      result.data.forEach((sh) => {
        if (parseInt(sh.id, 10) === parseInt(projectUserId, 10)) {
          return; // logged user must not shown on the stackholder list
        }

        const shAoResponse = sh.ao_response;
        const filteredAoResponse = shAoResponse.filter((item, index) => {
          return shAoResponse.indexOf(item) === index;
        });

        // console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^');
        // console.log(shAoResponse);
        // console.log(filteredAoResponse);
        // console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^");

        if (sh.team === null || sh.user.organization === null) {
          return;
        }

        userList.push(sh);

        stakeholderList.push({
          projectUserId: sh.id,
          projectUserTitle: sh.projectUserTitle,
          projectUserRoleDesc: sh.projectUserRoleDesc,
          projectId: sh.survey.project,
          userId: "S_" + sh.user.id,
          userAvatar: sh.user.avatar === null ? "" : sh.user.avatar.name,
          userTeam: sh.user.userteam === null ? "" : sh.user.userteam.name,
          userTitle: sh.user.usertitle === null ? "" : sh.user.usertitle.name,
          email: sh.user.email,
          fullName: sh.user.first_name + " " + sh.user.last_name,
          teamId: "T_" + (sh.team === null ? "0" : sh.team.id),
          team: sh.team === null ? "" : sh.team.name,
          organisationId: "O_" + sh.user.organization.name,
          organisation: sh.user.organization.name,
          projectOrganization: sh.projectOrganization,
          shCategory: sh.shCategory == null ? [] : sh.shCategory,
          show: true,
          amTotal: sh.am_total,
          amAnswered: sh.am_answered,
          aoTotal: sh.ao_total,
          aoAnswered: filteredAoResponse.length,
          aoResponse: filteredAoResponse,
        });
      });

      if (callback) {
        callback(stakeholderList);
      } else {
        yield put(stakeholderListSuccess(stakeholderList, userList));
      }
    }
  } catch (error) {
    console.log("error : ", error);
  }
}

const getShCategoryListAsync = async (surveyId, mapType) =>
  await shCategoryListAPI(surveyId, mapType)
    .then((data) => data)
    .catch((error) => error);

function* getShCategoryList({ payload }) {
  const { surveyId, mapType } = payload;
  try {
    const result = yield call(getShCategoryListAsync, surveyId, mapType);

    if (result.status === 200) {
      yield put(shCategoryListSuccess(result.data));
    }
  } catch (error) {
    console.log("error : ", error);
  }
}

const addUserAsync = async (user, callback) =>
  await addUserAPI(user)
    .then((data) => data)
    .catch((error) => {
      callback(error.response.status);
    });

const addStakeholderAsync = async (projectUser) =>
  await addStakeholderAPI(projectUser)
    .then((data) => data)
    .catch((error) => error);

const getUserListAsync = async (email) =>
  await userListAPI(email)
    .then((data) => data)
    .catch((error) => error);

function* addStakeholder({ payload }) {
  try {
    const { addByProjectUser_id, projectId, surveyId, stakeholder, callback } = payload;

    let userId = 0;

    const userResult = yield call(getUserListAsync, stakeholder.email);

    if (userResult.status == 200) {
      const userList = userResult.data;
      if (userList.length > 0) {
        userId = userList[0].id;
      }
    }

    if (userId == 0) {
      const user = {
        user: {
          username: stakeholder.email,
          first_name: stakeholder.firstName,
          last_name: stakeholder.lastName,
          email: stakeholder.email,
          password: defaultPassword
        },
        name: stakeholder.organisationId,
      };

      const result = yield call(addUserAsync, user, callback);

      if (result.status == 201) {
        userId = result.data;
      }
    }

    if (userId > 0) {
      const projectUser = {
        project: parseInt(projectId, 10),
        survey: parseInt(surveyId, 10),
        user: parseInt(userId, 10),
        team: parseInt(stakeholder.teamId, 10),
        shMyCategory: stakeholder.myCategoryList,
        shProjectCategory: stakeholder.projectCategoryList,
        projectUserTitle: stakeholder.projectUserTitle,
        projectUserRoleDesc: stakeholder.projectUserRoleDesc,
        projectOrganization: stakeholder.organisationId,
        shGroup: null,
        myProjectUser: stakeholder.myProjectUser,
        addByProjectUser: stakeholder.myProjectUser,
        projectAdmin: false,
      };

      const result2 = yield call(addStakeholderAsync, projectUser);
      console.log(result2);

      callback(result2.status);
    }

  } catch (error) {
    // console.log(error);
  }
}

const updateStakeholderAsync = async (projectUserId, projectUser) =>
  await updateStakeholderAPI(projectUserId, projectUser)
    .then((data) => data)
    .catch((error) => error);

function* updateStakeholder({ payload }) {
  try {
    const { projectId, surveyId, stakeholder, callback } = payload;
    console.log('updated')

    const projectUser = {
      project: parseInt(projectId, 10),
      survey: parseInt(surveyId, 10),
      id: parseInt(stakeholder.projectUserId, 10),
      user: parseInt(stakeholder.userId, 10),
      team: parseInt(stakeholder.teamId, 10),
      shMyCategory: stakeholder.myCategoryList,
      shProjectCategory: stakeholder.projectCategoryList,
      projectUserTitle: stakeholder.projectUserTitle,
      // shGroup: null,
      myProjectUser: stakeholder.myProjectUser,
    };


    const result = yield call(
      updateStakeholderAsync,
      parseInt(stakeholder.projectUserId, 10),
      projectUser
    );


    if (result.status.toString() === "200") {
      yield put(stakeholderList(stakeholder.myProjectUser, surveyId));
      if (callback) {
        callback();
      }
    }
  } catch (error) {
    console.log("error : ", error);
  }
}

export function* watchOrganizationList() {
  yield takeEvery(ORGANIZATION_LIST, getOrganizationList);
}

export function* watchTeamList() {
  yield takeEvery(TEAM_LIST, getTeamList);
}

export function* watchShgroupList() {
  yield takeEvery(SHGROUP_LIST, getShgroupList);
}

export function* watchOptionList() {
  yield takeEvery(OPTION_LIST, getOptionList);
}

export function* watchDriverList() {
  yield takeEvery(DRIVER_LIST, getDriverList);
}

export function* watchSkipQuestionList() {
  yield takeEvery(SKIP_QUESTION_LIST, getSkipQuestionList);
}

export function* watchStakeholderList() {
  yield takeEvery(STAKEHOLDER_LIST, getStakeholderList);
}

export function* watchShCategoryList() {
  yield takeEvery(SHCATEGORY_LIST, getShCategoryList);
}

export function* watchAddStakeholder() {
  yield takeEvery(ADD_STAKEHOLDER, addStakeholder);
}

export function* watchUpdateStakeholder() {
  yield takeEvery(UPDATE_STAKEHOLDER, updateStakeholder);
}

export default function* rootSaga() {
  yield all([
    fork(watchOrganizationList),
    fork(watchTeamList),
    fork(watchShgroupList),
    fork(watchDriverList),
    fork(watchOptionList),
    fork(watchSkipQuestionList),
    fork(watchStakeholderList),
    fork(watchShCategoryList),
    fork(watchAddStakeholder),
    fork(watchUpdateStakeholder),
  ]);
}
