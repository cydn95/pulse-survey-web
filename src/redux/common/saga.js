
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { 
    teamListAPI,
    shgroupListAPI,
    optionListAPI,
    driverListAPI,
    skipQuestionListAPI,
    stakeholderListAPI,
    shCategoryListAPI,
    addUserAPI,
    addStakeholderAPI
} from '../../services/axios/api';

import {
    TEAM_LIST,
    SHGROUP_LIST,
    OPTION_LIST,
    DRIVER_LIST,
    SKIP_QUESTION_LIST,
    STAKEHOLDER_LIST,
    SHCATEGORY_LIST,
    ADD_STAKEHOLDER
} from 'Constants/actionTypes';

import {
    teamListSuccess,
    shgroupListSuccess,
    optionListSuccess,
    driverListSuccess,
    skipQuestionListSuccess,
    stakeholderList,
    stakeholderListSuccess,
    shCategoryListSuccess,
} from './actions';

import { uuid } from 'uuidv4';

const getTeamListAysnc = async () =>
    await teamListAPI()
        .then(data => data)
        .catch(error => error);

function* getTeamList() {
    try {
        const result = yield call(getTeamListAysnc);

        if (result.status === 200) {
            yield put(teamListSuccess(result.data));
        }

    } catch (error) {
        console.log('error : ', error)
    }
}

const getShgroupListAysnc = async () =>
    await shgroupListAPI()
        .then(data => data)
        .catch(error => error);

function* getShgroupList() {
    try {
        const result = yield call(getShgroupListAysnc);

        if (result.status === 200) {
            yield put(shgroupListSuccess(result.data));
        }

    } catch (error) {
        console.log('error : ', error)
    }
}

const getOptionListAysnc = async () =>
    await optionListAPI()
        .then(data => data)
        .catch(error => error);

function* getOptionList() {
    try {
        const result = yield call(getOptionListAysnc);

        if (result.status === 200) {
            yield put(optionListSuccess(result.data));
        }

    } catch (error) {
        console.log('error : ', error)
    }
}

const getDriverListAysnc = async () =>
    await driverListAPI()
        .then(data => data)
        .catch(error => error);

function* getDriverList() {
    try {
        const result = yield call(getDriverListAysnc);

        if (result.status === 200) {
            yield put(driverListSuccess(result.data));
        }

    } catch (error) {
        console.log('error : ', error)
    }
}

const getSkipQuestionListAysnc = async () =>
    await skipQuestionListAPI()
        .then(data => data)
        .catch(error => error);

function* getSkipQuestionList() {
    try {
        const result = yield call(getSkipQuestionListAysnc);

        if (result.status === 200) {
            yield put(skipQuestionListSuccess(result.data));
        }

    } catch (error) {
        console.log('error : ', error)
    }
}

const getStakeholderListAysnc = async (projectId) =>
    await stakeholderListAPI(projectId)
        .then(data => data)
        .catch(error => error);

function* getStakeholderList({ payload }) {
    try {
        const { projectId } = payload;
        const result = yield call(getStakeholderListAysnc, projectId);

        let stakeholderList = [];
        if (result.status === 200) {
            console.log(result.data);
            result.data.forEach(sh => {
                if (sh.shCategory == null) return;
                stakeholderList.push({
                    projectUserId: sh.id,
                    projectId: sh.project,
                    userId:  'S_' + sh.user.id,
                    fullName: sh.user.first_name + ' ' + sh.user.last_name,
                    teamId: 'T_' + sh.team.id,
                    team: sh.team.name,
                    organisationId: 'O_' + sh.user.organization.name,
                    organisation: sh.user.organization.name,
                    shCategory: 'SHC_' + sh.shCategory.id,
                    show: true
                });
            });
            yield put(stakeholderListSuccess(stakeholderList, result.data));
        }

    } catch (error) {
        console.log('error : ', error)
    }
}

const getShCategoryListAsync = async () =>
    await shCategoryListAPI()
        .then(data => data)
        .catch(error => error);

function* getShCategoryList() {
    try {
        const result = yield call(getShCategoryListAsync);

        if (result.status === 200) {
            yield put(shCategoryListSuccess(result.data));
        }

    } catch (error) {
        console.log('error : ', error)
    }
}

const addUserAsync = async (user) =>
    await addUserAPI(user)
        .then(data => data)
        .catch(error => error);

const addStakeholderAsync = async (projectUser) =>
    await addStakeholderAPI(projectUser)
        .then(data => data)
        .catch(error => error);

function* addStakeholder({ payload }) {
    try {
        const { projectId, stakeholder } = payload;
        
        const user = {
            "user": {
                "username": uuid(),
                "first_name": stakeholder.firstName,
                "last_name": stakeholder.lastName,
                "email": stakeholder.email
            },
            "name": stakeholder.organisationId
        };

        const result = yield call(addUserAsync, user);

        if (result.status === 201) {
            const userId = result.data;
            const projectUser = {
                "project": parseInt(projectId, 10),
                "user": parseInt(userId, 10),
                "team": parseInt(stakeholder.teamId, 10),
                "shCategory": parseInt(stakeholder.shCategory, 10),
                "userPermission": [97]
            };

            const result2 = yield call(addStakeholderAsync, projectUser);

            if (result2.status === 201) {
                yield put(stakeholderList(projectId));
            }
        }

    } catch (error) {
        console.log('error : ', error)
    }
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

export default function* rootSaga() {
    yield all([
        fork(watchTeamList),
        fork(watchShgroupList),
        fork(watchDriverList),
        fork(watchOptionList),
        fork(watchSkipQuestionList),
        fork(watchStakeholderList),
        fork(watchShCategoryList),
        fork(watchAddStakeholder)
    ]);
}