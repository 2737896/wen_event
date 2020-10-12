// 注意：每次调用$.get()  或者$.post() 或者$.ajax()的时候
//会调用ajaxPrefilter()这个函数
// 这个函数中 可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // 在发起真正的ajax请求之前 统一拼接请求的跟路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    console.log(options.url);

})

// 依赖 jquery 文件  所以写在 jquery.js 后面
// 在 发起真正请求之前执行 所以放在自己封装的请求js 之前
