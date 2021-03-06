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
    this.$ngRedux = $ngRedux;
    let unsubscribe = $ngRedux.connect(state => state)(this);
    $scope.$on("$destroy", unsubscribe);
  }

  $onInit() {
    this.topic = {
      name: "",
      component_types: [],
      next_topic: null,
      product_id: null
    };
  }

  create() {
    if (!this.topic.next_topic) {
      this.topic.next_topic = null;
    }
    this.$ngRedux.dispatch(api("topic").post(this.topic)).then(() => {
      this.$ngRedux.dispatch(
        alertsActions.success(`topic ${this.topic.name} created successfully`)
      );
      this.$ngRedux.dispatch(stateGo("auth.topics"));
    });
  }
}

Ctrl.$inject = ["$scope", "$ngRedux"];

export default Ctrl;
