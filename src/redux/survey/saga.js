
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import {
    pageListAPI
} from '../../services/axios/api';

import {
  PAGE_LIST
} from 'Constants/actionTypes';

import {
  pageListSuccess
} from './actions';

const getPageListAsync = async () =>
    await pageListAPI()
      .then(result => result)
      .catch(error => error);

function* getPageList() {
   
  try {
    const result = yield call(getPageListAsync);

    if (result.status === 200) {

      // get only page which have page_order
      let validPageList = result.data.results.filter(item => {
        return item.page_order && item.pages
      });

      // Order by PageOrder Asscend
      let orderedPageList = validPageList.sort(
        (a, b) => (a.page_order.order > b.page_order.order) ? 1 : -1);
      
      for (let i = 0; i < orderedPageList.length; i++) {
        
        for (let j = 0; j < orderedPageList[i].pages.ampagesetting.length; j++) {
          orderedPageList[i].pages.ampagesetting[j] = {
            ...orderedPageList[i].pages.ampagesetting[j],
            answer: {
              answer: '',
              skip: false,
              skipeReason: 0,
              comment: false,
              commentText: '',
              status: false,
              pageNum: -1,
              questionNum: -1,
              type: 'me'
            }
          }
        }


        for (let j = 0; j < orderedPageList[i].pages.aopagesetting.length; j++) {
          orderedPageList[i].pages.aopagesetting[j] = {
            ...orderedPageList[i].pages.aopagesetting[j],
            answer: {
              answer: '',
              skip: false,
              skipeReason: 0,
              comment: false,
              commentText: '',
              status: false,
              pageNum: -1,
              questionNum: -1,
              type: 'other'
            }
          }
        }
      }

      console.log(orderedPageList);
      
      yield put(pageListSuccess(orderedPageList));
        
    } else {
      console.log('login failed :', result.statusText)
    }
  } catch (error) {
    console.log('survey error : ', error)
  }
}

export function* watchPageList() {
  yield takeEvery(PAGE_LIST, getPageList);
}

export default function* rootSaga() {
  yield all([
    fork(watchPageList)
  ]);
}