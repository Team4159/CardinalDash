import { createAction } from "redux-actions";

import * as c from "./constants.js";

// Saga Controllers
export const robotConnect = createAction(c.ROBOT_CONNECT);

export const setData = createAction(c.DATA_SET);
export const resetData = createAction(c.DATA_RESET);

// Form Reducers
export const setDashboardForm = createAction(c.DASHBOARD_FORM_SET);
export const resetDashboardForm = createAction(c.DASHBOARD_FORM_RESET);

export const setStatus = createAction(c.STATUS_SET);

export const setError = createAction(c.ERROR_SET);
export const resetError = createAction(c.ERROR_RESET);
