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

export const kMapData = (projectUserId, userId = 0) => ({
  type: KMAP_DATA,
  payload: { projectUserId, userId },
});

export const kMapDataSuccess = (kMapData) => ({
  type: KMAP_DATA_SUCCESS,
  payload: { kMapData },
});

export const kMapSave = (mapData, projectUserId, userId = 0) => ({
  type: KMAP_SAVE,
  payload: { mapData, projectUserId, userId },
});

export const kMapSaveSuccess = () => ({
  type: KMAP_SAVE_SUCCESS,
});

export const projectMapData = (projectUserId, userId = 0) => ({
  type: PROJECTMAP_DATA,
  payload: { projectUserId, userId },
});

export const projectMapDataSuccess = (projectMapData) => ({
  type: PROJECTMAP_DATA_SUCCESS,
  payload: { projectMapData },
});

export const projectMapSave = (mapData, projectUserId, userId = 0) => ({
  type: PROJECTMAP_SAVE,
  payload: { mapData, projectUserId, userId },
});

export const projectMapSaveSuccess = () => ({
  type: PROJECTMAP_SAVE_SUCCESS,
});
