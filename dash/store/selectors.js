import { createSelector } from "reselect";

import { getStore } from "./reducers/kvs.js";
import { getStatus, getData } from "./reducers/fetch.js";

export const getDashboardForm = createSelector(
  (state) => state.dashboardForm,
  getStore
);
