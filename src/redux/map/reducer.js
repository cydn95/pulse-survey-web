import {
  KMAP_DATA,
  KMAP_DATA_SUCCESS,
  KMAP_SAVE,
  KMAP_SAVE_SUCCESS
} from "Constants/actionTypes";

const INIT_STATE = {
  kMapData: {},
  mapSaveLoading: false,
  mapGetLoading: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case KMAP_DATA:
        return { ...state, mapGetLoading: true };
    case KMAP_DATA_SUCCESS:
      return { ...state, mapGetLoading: false, kMapData: action.payload.kMapData };
    case KMAP_SAVE:
        return { ...state, mapSaveLoading: true};
    case KMAP_SAVE_SUCCESS:
      return { ...state, mapSaveLoading: false };
    default:
      return { ...state };
  }
};
