"use strict";

$(function () {
  var form = layui.form;
  form.verify({
    nickname: function nickname(value) {
      if (value.length > 6) {
        return '昵称长度必须在 1 ~ 6 个字符之间！';
      }
    }
  });
  initUserInfo(); // 初始化用户的基本信息 

  function initUserInfo() {
    $.ajax({
      method: 'get',
      url: '/my/userinfo',
      // hraders
      success: function success(res) {
        if (res.status !== 0) {
          return layer.msg('获取用户信息失败！');
        }

        console.log(res); // 调用form.val()快速给表单赋值

        form.val('formUserInfo', res.data);
      }
    });
  } // 重置表单的数据


  $('#btnReset').on('click', function (e) {
    //阻止表单默认事件
    e.preventDefault();
    initUserInfo();
  });
}); //监听表单的提交事件

$('.layui-form').on('submit', function (e) {
  //阻止表单的默认提交行为
  e.preventDefault(); //发起ajax数据请求

  $.ajax({
    method: 'POST',
    url: '/my/userinfo',
    data: $(this).serialize(),
    success: function success(res) {
      if (res.status !== 0) {
        return layer.msg('更新用户信息失败');
      }

      layer.msg('更新用户信息成功'); //调用父页面中的方法渲染用户头像信息

      window.parent.getUserInfo();
    }
  });
});