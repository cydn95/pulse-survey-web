import {
  KMAP_DATA,
  KMAP_DATA_SUCCESS
} from 'Constants/actionTypes';

export const kMapData = (userId, projectId) => ({
  type: KMAP_DATA,
  payload: { userId, projectId }
});

export const kMapDataSuccess = (kMapData) => ({
  type: KMAP_DATA_SUCCESS,
  payload: { kMapData }
});