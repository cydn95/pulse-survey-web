import {
  PAGE_LIST,
  PAGE_LIST_SUCCESS,
  SELECT_PAGE,
  CONTINUE_SURVEY
} from "Constants/actionTypes";

// const INIT_STATE = {
//   pageList: [
//     {
//       "id": 5,
//       "pages": {
//         "url": "http://3.15.16.117/pagesettings/5/",
//         "page_id": 5,
//         "pageType": "PG_WELCOME1",
//         "ampagesetting": [],
//         "aopagesetting": []
//       },
//       "page_order": {
//         "page": 5,
//         "order": 1
//       },
//       "created_by": "admin",
//       "changed_by": "admin",
//       "creation_date": "2019-10-14T12:11:52.759868-07:00",
//       "changed_date": "2019-10-14T12:11:52.759885-07:00",
//       "publication_date": "2019-10-14T12:11:52.759561-07:00",
//       "publication_end_date": null,
//       "in_navigation": true,
//       "soft_root": false,
//       "reverse_id": null,
//       "navigation_extenders": null,
//       "template": "INHERIT",
//       "login_required": false,
//       "limit_visibility_in_menu": null,
//       "is_home": false,
//       "application_urls": null,
//       "application_namespace": null,
//       "publisher_is_draft": false,
//       "languages": "en",
//       "xframe_options": 0,
//       "is_page_type": false,
//       "publisher_public": 3,
//       "node": 2,
//       "placeholders": [
//         17,
//         18,
//         19
//       ]
//     },
//     {
//       "id": 6,
//       "pages": {
//         "url": "http://3.15.16.117/pagesettings/6/",
//         "page_id": 6,
//         "pageType": "PG_SURVEY",
//         "ampagesetting": [
//           {
//             "id": 5,
//             "subdriver": "s",
//             "questionText": "Second Question",
//             "sliderTextLeft": "Left",
//             "sliderTextRight": "Right",
//             "skipOptionYN": true,
//             "skipResponses": "res",
//             "questionSequence": 5,
//             "topicPrompt": "topic",
//             "commentPrompt": "comment",
//             "survey": 1,
//             "driver": 1,
//             "controlType": 3,
//             "PageSetting": 6
//           },
//           {
//             "id": 4,
//             "subdriver": "sub",
//             "questionText": "First Question?",
//             "sliderTextLeft": "Row",
//             "sliderTextRight": "High",
//             "skipOptionYN": true,
//             "skipResponses": "Skip",
//             "questionSequence": 10,
//             "topicPrompt": "topic",
//             "commentPrompt": "comment",
//             "survey": 1,
//             "driver": 1,
//             "controlType": 1,
//             "PageSetting": 6
//           }
//         ],
//         "aopagesetting": []
//       },
//       "page_order": {
//         "page": 6,
//         "order": 2
//       },
//       "created_by": "admin",
//       "changed_by": "admin",
//       "creation_date": "2019-10-14T12:11:56.703610-07:00",
//       "changed_date": "2019-10-14T12:11:56.703637-07:00",
//       "publication_date": "2019-10-14T12:11:56.703331-07:00",
//       "publication_end_date": null,
//       "in_navigation": true,
//       "soft_root": false,
//       "reverse_id": null,
//       "navigation_extenders": null,
//       "template": "INHERIT",
//       "login_required": false,
//       "limit_visibility_in_menu": null,
//       "is_home": false,
//       "application_urls": null,
//       "application_namespace": null,
//       "publisher_is_draft": false,
//       "languages": "en",
//       "xframe_options": 0,
//       "is_page_type": false,
//       "publisher_public": 4,
//       "node": 3,
//       "placeholders": [
//         20,
//         21,
//         22
//       ]
//     }
//   ],
//   // pageList: [],
//   pageIndex: 0,
//   loading: false
// };

const INIT_STATE = {
  pageList: [],
  answerList: [],
  percentage: 0,
  pageIndex: 0,
  loading: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case PAGE_LIST:
      return { ...state, loading: true };
    case PAGE_LIST_SUCCESS:
      return { ...state, loading: false, pageIndex: 0, pageList: action.payload };
    case SELECT_PAGE:
      return { ...state, pageIndex: action.payload.pageIndex };
    case CONTINUE_SURVEY:
        return { ...state, pageIndex: action.payload.pageIndex, percentage: action.payload.percentage };
    default:
      return { ...state };
  }
};
