$(function() {
    //滑动解锁
    var slider = new SliderUnlock("#slider", {
        successLabelTip: "验证通过"
    }, function() {
        $('#labelTip').css({
            'color': '#99ff99'
        })
        confirmi = true;
    });
    slider.init();

    var confirmi = false;

    //输入验证
    function loginChack() {

        $('#loginbutton').click(function() {
            if ($('#username').val() == '') {
                alert('请输入用户名');
            } else if ($('#password').val() == '') {
                alert('请输入密码');
            } else if (!confirmi) {
                alert('请验证');
            } else {
                window.location.href = 'home.html';
            }
            return false;
        });
        $('#regbutton').click(function() {
            alert('this.工程师还没弄这一页╮(╯▽╰)╭');
            return false;
        });
    }
    loginChack();
})
