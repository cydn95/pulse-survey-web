import {
  KMAP_DATA,
  KMAP_DATA_SUCCESS,
  KMAP_SAVE,
  KMAP_SAVE_SUCCESS
} from 'Constants/actionTypes';

export const kMapData = (userId, projectId) => ({
  type: KMAP_DATA,
  payload: { userId, projectId }
});

export const kMapDataSuccess = (kMapData) => ({
  type: KMAP_DATA_SUCCESS,
  payload: { kMapData }
});

export const kMapSave = (mapData) => ({
  type: KMAP_SAVE,
  payload: { mapData }
});

export const kMapSaveSuccess = () => ({
  type: KMAP_SAVE_SUCCESS
})