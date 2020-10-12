"use strict";

$(function () {
  // 前往注册账号的链接
  $('#link_reg').on('click', function () {
    $('.login-box').hide();
    $('.reg-box').show();
  }); //前往登陆的链接

  $('#link_login').on('click', function () {
    $('.login-box').show();
    $('.reg-box').hide();
  }); //1、从layui中获取form对象

  var form = layui.form; //2、通过for.verify（）函数自定义校验规则

  form.verify({
    //3、自定义一个pwd的校验规则
    pwd: [/^[\S]{6,12}$/, '密码必须是6-12位，且不能出现空格'],
    // 校验两次密码是否一致的规则
    repwd: function repwd(value) {
      //通过形参拿到确认密码框的内容
      //拿到密码框的内容
      //进行一次等号判断
      //判断失败 return一个提示消息
      var pwd = $('.reg-box [name=password]').val();

      if (pwd !== value) {
        return '两次密码不一致';
      }
    }
  }); // 监听注册表单的事件

  $('#form_reg').on('submit', function (e) {
    e.preventDefault();
    var data = {
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val()
    };
    $.post('/api/reguser', data, function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message);
      }

      layer.msg('注册成功，请登录');
      $('#link_login').click();
    });
  }); // 监听登录表单的提交事件

  $('#form_login').submit(function (e) {
    // 阻止默认事件
    e.preventDefault();
    $.ajax({
      method: 'post',
      url: '/api/login',
      data: $(this).serialize(),
      success: function success(res) {
        if (res.status !== 0) {
          return layer.msg('登录失败');
        }

        layer.msg('登录成功'); // 获取到的 token 身份证明字段 需要 保存到本地存储

        localStorage.setItem('token', res.token); // 登陆跳转新的页面

        location.href = '/index.html';
      }
    });
  });
});