"use strict";

$(function () {
  var layer = layui.layer;
  initArtCateList(); //获取文章分类列表

  function initArtCateList() {
    $.ajax({
      method: 'get',
      url: '/my/article/cates',
      success: function success(res) {
        var htmlstr = template('tpl-table', res);
        console.log(res);
        $('tbody').html(htmlstr);
      }
    });
  } //为添加类别按钮绑定事件


  var indexAdd = null;
  $('#btnAddCate').on('click', function () {
    indexAdd = layer.open({
      type: 1,
      area: ['530px', '250px'],
      title: '添加文章分类',
      content: $('#dialog-add').html()
    });
  }); //通过代理的形式 给form-add 表单绑定submit事件

  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'post',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function success(res) {
        if (res.status !== 0) {
          return layer.msg('新增分类失败');
        }

        initArtCateList();
        layer.msg('新增分类成功'); //根据索引关闭弹出层

        layer.close(indexAdd);
      }
    });
  });
});