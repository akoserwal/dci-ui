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

import api from "services/api";
import { stateGo } from "redux-ui-router";
import * as alertsActions from "services/alerts/actions";

class Ctrl {
  constructor($scope, $ngRedux) {
    this.$scope = $scope;
    this.$ngRedux = $ngRedux;
    let unsubscribe = $ngRedux.connect(state => state)(this);
    $scope.$on("$destroy", unsubscribe);
  }

  $onInit() {
    this.$ngRedux.dispatch(api("team").all());
    const id = this.$ngRedux.getState().router.currentParams.id;
    this.$ngRedux.dispatch(api("product").get({ id })).then(response => {
      this.product = response.data.product;
    });
  }

  update() {
    this.$ngRedux.dispatch(api("product").put(this.product)).then(() => {
      this.$ngRedux.dispatch(
        alertsActions.success(
          `product ${this.product.name} updated successfully`
        )
      );
      this.$ngRedux.dispatch(stateGo("auth.products"));
    });
  }
}

Ctrl.$inject = ["$scope", "$ngRedux"];

export default Ctrl;
