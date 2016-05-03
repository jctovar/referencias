angular.module('ui.gravatar').config([
  'gravatarServiceProvider', function(gravatarServiceProvider) {
    gravatarServiceProvider.defaults = {
      size     : 100,
      "default": 'mm'  // Mystery man as default for missing avatars
    };

    // Use https endpoint
    gravatarServiceProvider.secure = true;

    // Force protocol
    //gravatarServiceProvider.protocol = 'my-protocol';

    // Override URL generating function
    //gravatarServiceProvider.urlFunc = function(options) {
      // Code to generate custom URL
    //};
  }
]);