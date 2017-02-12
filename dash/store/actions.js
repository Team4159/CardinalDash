import { createAction } from "redux-actions";

import * as c from "./constants.js";

// Saga Controllers
export const robotConnect = createAction(c.ROBOT_CONNECT);

// Form Reducers
export const setDashboardForm = createAction(c.DASHBOARD_FORM_SET);
export const resetDashboardForm = createAction(c.DASHBOARD_FORM_RESET);
