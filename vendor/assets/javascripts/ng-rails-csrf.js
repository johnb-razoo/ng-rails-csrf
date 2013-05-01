angular.module('ng-rails-csrf', [] ).config(['$httpProvider', function($httpProvider) {    
    var getToken = function() { 
        // Rails 3+
        //var el = document.querySelector('meta[name="csrf-token"]');
        //return el && el.getAttribute('content');
        // Rails 2
        return document.querySelector('input[name="authenticity_token"]').value;
    };
    var updateToken = function() {
        var headers = $httpProvider.defaults.headers.common, token = getToken();
        if (token) {
            headers['X-CSRF-TOKEN'] = getToken();
            headers['X-Requested-With'] = 'XMLHttpRequest';            
        } 
    };    
    updateToken();    
    if (window['Turbolinks']) {
      $(document).bind('page:change', updateToken); 
    }
}]);
