$(document).ready(function() {
    //后台传过来的初始化数据
    var module = [{
            name: "用户简介",               //模块名（在nav里显示标签名、首页内容显示模块名的时候用）
            moduleurl: 'user-info',         //模块的文件路径（加载模块儿时用）
            pageurl: '',                    //模块主页路径（加载模块儿主页时用）
            markid: 'user-info'             //模块的标签的id（需要操作时候查找用，不同地方用时自动加上不同的前缀。例：#module-home,#page-home）
        }, {
            name: "后台用户管理",
            moduleurl: 'back-end-user',
            pageurl: 'backenduser',
            markid: 'back-end-user'
        }, {
            name: "前台用户管理",
            moduleurl: 'front-end-user',
            pageurl: 'frontenduser',
            markid: 'front-end-user'
        }, {
            name: "首页推送管理",
            moduleurl: 'home-push',
            pageurl: 'homepush',
            markid: 'home-push'
        }];

    var pages = ["home"];//存贮当前页面中已存在的页面的id

    var modules = [];    //存储home页已存在的modul，应为每个模块位置可以存一个整的或者两个半个，所以用1表示半个

    //初始化首页
    home.init(module);

    globalVar = {
        focus_page: { //当前显示的页面 与 点击将要显示的页面(为了页面切换动画)
            now: "home",     //当前页面
            target: "home",  //目标页面
            roll: function(url) {
                if (this.target === url) return;
                this.now = this.target;
                this.target = url;
                console.log("now:"+this.now+"\ntarget:"+this.target);
            },
            reset: function() {
                this.now = "home";
                this.target = "home";
            }
        }
    }
});


var home = {
    init: function(module) {
        // 点击激活tag
        $('#navbar-nav').bind('click', function(event) {
            var tname = $(event.target)[0].tagName;
            if (tname === "A") {
                var act = home.paging.ifActive($(event.target).attr("href"));
                if (!act) {
                    $(event.target).parent().addClass('active').siblings().removeClass('active');
                    globalVar.focus_page.roll($(event.target).attr('href'));
                    home.paging.goToPage(globalVar.focus_page);
                }
                return false;
            } else if (tname === "SPAN") {
                home.removeTag(event.target);
                event.stopPropagation();
            }
        });
        //加载时间显示模块
        home.setTime("#timer");
        //自动为传过来的tag信息加事件
        (function() {
            $.each(module, function(n, value) {
                $(value.markid).click(function() {
                    var exi = home.paging.ifExist(value.name);
                    var act = home.paging.ifActive(value.moduleurl);
                    if (exi) {
                        if (!act) {
                            $(exi).parent().addClass('active').siblings().removeClass('active');
                            globalVar.focus_page.roll(value.moduleurl);
                            home.paging.goToPage(globalVar.focus_page);
                        }
                    } else {
                        home.paging.createTag(value.moduleurl, value.name);
                        home.paging.loadPages(value.moduleurl);
                        globalVar.focus_page.roll(value.moduleurl);
                        home.paging.goToPage(globalVar.focus_page);
                    }
                    return false;
                });
            })
        })();
    },
    paging: {
        goToPage: function(el) { //转换到某页
            $('#' + el.now).css({
                'transform': 'translatex(-200%)'
            });
            // // console.log("el:"+el.now);
            // //缩放当前
            // $('#' + el.now).css({
            //     // 'transform': 'scale(.5)'
            //     'transform': 'translatex(-200%)'
            // });
            // //隐藏当前，并放出目标
            // $("#" + el.target).css({
            //     // 'right': 0,
            //     // 'left': 0
            //     'transform': 'translatex(-200%)'
            // });

            //  function a(){
            //     $('#' + el.now).attr('style', '').css({
            //         'position': 'absolute',
            //         'top': 0,
            //         'right': '-200%'
            //     })
            //     $('#' + el.target).attr('style', '');
            // }
        },
        createTag: function(url, name) { //创建tag
            $('#navbar-nav').append('<li><a href="' + url + '">' + name + '</a><span></span></li>');
            $('#navbar-nav a').each(function(index, el) {
                if ($(el).html() === name) {
                    $(el).parent().addClass('active').siblings().removeClass('active');
                }
            });
        },
        loadPages: function(url) { //引入页面
            $('<div id="' + url + '" class="container" style="position: absolute;top: 0;right: -100%;"></div>').load('htm/' + url + '.htm').appendTo("#warpper");
        },
        ifExist: function(who) { //判断tag是否存在
            var tag = false;
            $('#navbar-nav a').each(function(index, el) {
                if ($(el).html() === who) tag = el;
            });
            return tag;
        },
        ifActive: function(who) { //判断是否为当前显示页
            var tag = false;
            $('#navbar-nav a').each(function(index, el) {
                // console.log($(el).attr("href"));
                if ($(el).attr("href") === who && $(el).parent().hasClass('active')) {
                    tag = true;
                }
            });
            return tag;
        }
    },
    setTime: function(who) { //设置首页的时钟
        if (!who) console.error("setTime has no arguments");
        var who = $(who);
        var timer = setInterval(function() {
            var date = new Date();
            var hour = date.getHours();
            var minute = date.getMinutes();
            var second = date.getSeconds();
            if (minute < 10) {
                minute = "0" + minute;
            }
            if (second < 10) {
                second = "0" + second;
            }
            who.text(hour + ":" + minute + ":" + second);
            date = null;
        }, 1000);
    },
    removeTag: function(who) { //关闭tag
        if (!who) console.error("removeTag has no arguments");
        var who = $(who);
        // judge who is closing was an "active"
        if (who.parent().hasClass("active")) {
            who.parent().siblings().eq(0).addClass("active");
            console.log("i am here");
            globalVar.focus_page.roll("home");
            home.paging.goToPage(globalVar.focus_page);
            globalVar.focus_page.reset();
        }
        who.parent().animate({
            width: "0px"
        }, 500, function() {
            $(this).remove();
        });
    },
    loadModuleBox: function() { //加载模块盒子

    }
}
