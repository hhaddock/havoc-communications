$(function() {
    let baseURL = 'https://dev.baked.kitty:12345/';

    $.post(baseURL + 'user/login', {
        username: 'test',
        password: '1234'
    }, function(data, status) {
        console.log(data);
        console.log(status);
    });
});