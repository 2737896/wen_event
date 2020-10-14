$(function () {
    // 获取用户的基本信息 调用获取函数
    getUserInfo()
    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        layer.confirm('是否退出', { icon: 3, title: '提示' }, function (index) {
            //do something
            //清空本地存储 中的 token
            localStorage.removeItem('token')
            //重新跳转到登陆页面
            location.href = '/login.html'
            //关闭弹出询问框
            layer.close(index)
        })
    })
})
  // 封装获取用户基本信息函数
  function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // 调用renderAvater 渲染用户的头像
            renderAvater(res.data)
        },
        //不论成功还是失败 最终都会调用complete函数
        // complete: function (res) {
        //     //在complete回调函数中 可以使用res.responseJSON拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         //清除本地token
        //         localStorage.removeItem('token')
        //         //跳转回首页
        //         location.href = '/login.html'
        //     }
        // }
    })
}
    // 渲染用户的头像
    function renderAvater(user) {
        // 渲染用户信息 有优先级
        var name = user.nickname || user.username
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 判断头像 如果有user_pic 就渲染
        if (user.user_pic !== null) {
            // .layui-nav-img拿到的是两个头像 隐式迭代
            $('.layui-nav-img').attr('src', user.user_pic).show()
            $('.text-avatar').hide()
        } else {
            $('.layui-nav-img').hide()
            var first = name[0].toUpperCase()
            $('.text-avatar').html(first)
        }
    }


