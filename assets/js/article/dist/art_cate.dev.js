"use strict";

$(function () {
  var layer = layui.layer;
  var form = layui.form;
  initArtCateList(); //获取文章分类列表

  function initArtCateList() {
    $.ajax({
      method: 'get',
      url: '/my/article/cates',
      success: function success(res) {
        var htmlstr = template('tpl-table', res);
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
  // $('body').on('submit', '#form-add', function (e) {
  //     e.preventDefault()
  //     $.ajax({
  //         method: 'post',
  //         url: '/my/article/addcates',
  //         data: $(this).serialize(),
  //         success: function (res) {
  //             if (res.status !== 0) {
  //                 return layer.msg('新增分类失败')
  //             }
  //             initArtCateList()
  //             layer.msg('新增分类成功')
  //             //根据索引关闭弹出层
  //             layer.close(indexAdd)
  //         }
  //     })
  // })

  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'post',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function success(res) {
        if (res.status !== 0) {
          return layer.msg('新增类别失败！');
        }

        initArtCateList();
        layer.msg('新增类别成功！');
        layer.close(indexAdd);
      }
    });
  }); //通过代理的形式为btn-edit 按钮绑定点击事件

  var indexEdit = null;
  $('tbody').on('click', '.btn-edit', function () {
    //弹出一个修改文章分类的信息层
    indexEdit = layer.open({
      type: 1,
      area: ['530px', '250px'],
      title: '修改文章分类',
      content: $('#dialog-edit').html()
    });
    var id = $(this).attr('data-id');
    var name = $(this).attr('data-name');
    var alias = $(this).attr('data-alias');
    console.log(id, name, alias);
    form.val('form-edit', {
      Id: id,
      name: name,
      alias: alias
    });
  }); // 通过代理的形式 为修改的表单绑定 submit事件

  $('body').on('submit', '#form-edit', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'post',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: function success(res) {
        if (res.status !== 0) {
          return layer.msg('更新分类数据失败');
        }

        layer.msg('更新分类数据成功');
        layer.close(indexEdit);
        initArtCateList();
      }
    });
  }); //代理删除 btn-delete

  $('tbody').on('click', '.btn-delete', function () {
    var id = $(this).attr('data-id');
    layer.confirm('确认删除?', {
      icon: 3,
      title: '提示'
    }, function (index) {
      $.ajax({
        method: 'get',
        url: '/my/article/deletecate/' + id,
        success: function success(res) {
          if (res.status !== 0) {
            return layer.msg(res.message);
          }

          layer.msg('删除分类成功');
          layer.close(index);
          initArtCateList();
        }
      });
    });
  });
});