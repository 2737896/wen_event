$(function () {
    var form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须是6-12位'],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同'
            }
        },
        rePwd: function (value) {
            if (value === $('[name=samePwd]').val()) {
                return '密码不相同'
            }
        }
    })


    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新密码失败')
                }
                layui.layer.msg('更新密码成功')
                $('.layui-form')[0].reset()
                //清空本地存储 中的 token
                localStorage.removeItem('token')
                //重新跳转到登陆页面
                window.parent.location.href = '/login.html'
            }



        })
    })

})