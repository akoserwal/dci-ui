// Copyright 2017 Red Hat, Inc.
//
// Licensed under the Apache License, Version 2.0 (the 'License'); you may
// not use this file except in compliance with the License. You may obtain
// a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.

import * as constants from "./constants";

export default function(state = {}, action) {
  switch (action.type) {
    case constants.SET_CURRENT_USER:
      const role = action.payload.role;
      const shortcuts = {
        isSuperAdmin: role.label === "SUPER_ADMIN",
        hasProductOwnerRole:
          role.label === "SUPER_ADMIN" || role.label === "PRODUCT_OWNER",
        hasAdminRole:
          role.label === "SUPER_ADMIN" ||
          role.label === "PRODUCT_OWNER" ||
          role.label === "ADMIN",
        hasReadOnlyRole:
          role.label === "SUPER_ADMIN" ||
          role.label === "PRODUCT_OWNER" ||
          role.label === "READ_ONLY_USER",
        isReadOnly: role.label === "READ_ONLY_USER"
      };
      return Object.assign({}, state, action.payload, shortcuts);
    default:
      return state;
  }
}
