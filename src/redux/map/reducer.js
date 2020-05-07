import {
  KMAP_DATA,
  KMAP_DATA_SUCCESS,
  KMAP_SAVE,
  KMAP_SAVE_SUCCESS,
  PROJECTMAP_DATA,
  PROJECTMAP_DATA_SUCCESS,
  PROJECTMAP_SAVE,
  PROJECTMAP_SAVE_SUCCESS,
} from "Constants/actionTypes";

const INIT_STATE = {
  kMapData: {},
  projectMapData: {},
  mapSaveLoading: false,
  mapGetLoading: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case KMAP_DATA:
      return { ...state, mapGetLoading: true };
    case KMAP_DATA_SUCCESS:
      return {
        ...state,
        mapGetLoading: false,
        kMapData: action.payload.kMapData,
      };
    case KMAP_SAVE:
      return { ...state, mapSaveLoading: true };
    case KMAP_SAVE_SUCCESS:
      return { ...state, mapSaveLoading: false };
    case PROJECTMAP_DATA:
      return { ...state, mapGetLoading: true };
    case PROJECTMAP_DATA_SUCCESS:
      return {
        ...state,
        mapGetLoading: false,
        projectMapData: action.payload.projectMapData,
      };
    case PROJECTMAP_SAVE:
      return { ...state, mapSaveLoading: true };
    case PROJECTMAP_SAVE_SUCCESS:
      return { ...state, mapSaveLoading: false };
    default:
      return { ...state };
  }
};
