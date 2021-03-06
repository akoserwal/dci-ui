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
import { stateGo } from "redux-ui-router";
import localStorage from "services/localStorage";

class Ctrl {
  constructor($scope, $ngRedux, keycloak) {
    this.$ngRedux = $ngRedux;
    this.keycloak = keycloak;
    let unsubscribe = $ngRedux.connect(state => state)(this);
    $scope.$on("$destroy", unsubscribe);
  }

  logout() {
    try {
      this.keycloak.logout({
        redirectUri: window.location.origin + "/login"
      });
    } catch (error) {
      console.error(error);
      this.$ngRedux.dispatch(stateGo("login"));
    } finally {
      localStorage.remove();
    }
  }
}

Ctrl.$inject = ["$scope", "$ngRedux", "keycloak"];

export default Ctrl;
