var myModule = vx.module('ui.libraries')

myModule.filter('hello', function () {
    return function (name) {
        return 'Hello' + name + '!';
    };
}); 