// 注意：每次调用$.get()  或者$.post() 或者$.ajax()的时候
//会调用ajaxPrefilter()这个函数
// 这个函数中 可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {

    //1、 在发起真正的ajax请求之前 统一拼接请求的跟路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    // console.log(options.url);
    // ajax请求头中的headers 属性 判断地址是否需要验证指令
    //options 是所有设置

    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {

            Authorization: localStorage.getItem('token') || ''

        }
    }
    //3、全局挂载complete函数

    options.complete = function (res) {
        //在complete回调函数中 可以使用res.responseJSON拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //清除本地token
            localStorage.removeItem('token')
            //跳转回首页
            location.href = '/login.html'
        }
    }



})

// 依赖 jquery 文件  所以写在 jquery.js 后面
// 在 发起真正请求之前执行 所以放在自己封装的请求js 之前
