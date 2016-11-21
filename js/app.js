"use strict";


angular.module("grumblr", ["ui.router", "ngResource"])
  .config([
    "$stateProvider",
    RouterFunction
  ])
  .controller("GrumbleIndexController", ["GrumbleFactory",
    GrumbleIndexControllerFunction
  ])
  .factory("GrumbleFactory", ["$resource", GrumbleFactoryFunction])
  .controller("GrumbleShowController", ["GrumbleFactory", "$stateParams", GrumbleShowControllerFunction])

function GrumbleFactoryFunction($resource){
  return $resource("http://localhost:3000/grumbles/:id")
}

function GrumbleShowControllerFunction(GrumbleFactory, $stateParams){

    this.grumble = GrumbleFactory.get({id: $stateParams.id});
  }

function RouterFunction($stateProvider){

  $stateProvider
  .state("grumbleIndex", {
    url: "/grumbles",
    templateUrl: "js/ng-views/index.html",
    controller: "GrumbleIndexController",
    controllerAs: "GrumbleIndexViewModel"
  })
  // .state("grumbleShow", {
  //   url: "/grumbles/:id",
  //   templateUrl: "js/ng-views/show.html",
  //   controller: "GrumbleShowController",
  //   controllerAs: "vm"
  // });
}

function GrumbleIndexControllerFunction(GrumbleFactory){
  GrumbleFactory.query().$promise.then(grumbles => {
    console.log(grumbles)
  });
}
