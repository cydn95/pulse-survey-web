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

export const kMapData = (userId, projectId) => ({
  type: KMAP_DATA,
  payload: { userId, projectId },
});

export const kMapDataSuccess = (kMapData) => ({
  type: KMAP_DATA_SUCCESS,
  payload: { kMapData },
});

export const kMapSave = (mapData) => ({
  type: KMAP_SAVE,
  payload: { mapData },
});

export const kMapSaveSuccess = () => ({
  type: KMAP_SAVE_SUCCESS,
});

export const projectMapData = (userId, projectId) => ({
  type: PROJECTMAP_DATA,
  payload: { userId, projectId },
});

export const projectMapDataSuccess = (projectMapData) => ({
  type: PROJECTMAP_DATA_SUCCESS,
  payload: { projectMapData },
});

export const projectMapSave = (mapData) => ({
  type: PROJECTMAP_SAVE,
  payload: { mapData },
});

export const projectMapSaveSuccess = () => ({
  type: PROJECTMAP_SAVE_SUCCESS,
});
