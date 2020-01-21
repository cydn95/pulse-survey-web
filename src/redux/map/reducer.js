import {
  KMAP_DATA,
  KMAP_DATA_SUCCESS
} from "Constants/actionTypes";

const INIT_STATE = {
  kMapData: {},
  loading: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case KMAP_DATA:
        return { ...state, loading: false };
    case KMAP_DATA_SUCCESS:
      return { ...state, loading: true, kMapData: action.payload.kMapData };
    default:
      return { ...state };
  }
};
