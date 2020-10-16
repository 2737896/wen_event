"use strict";

$(function () {
  var layer = layui.layer;
  var form = layui.form;
  var laypage = layui.laypage;

  template.defaults.imports.dataFormat = function (date) {
    var dt = new Date(date);
    var y = dt.getFullYear();
    var m = padZero(dt.getMonth() + 1);
    var d = padZero(dt.getDate());
    var hh = padZero(dt.getHours());
    var mm = padZero(dt.getMinutes());
    var ss = padZero(dt.getSeconds());
    return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss;
  };

  function padZero(n) {
    return n > 9 ? n : '0' + n;
  } // var q = {
  //     pagenum: 1,
  //     pagesize: 2,
  //     cate_id: '',
  //     state: ''
  // }
  // initTable()
  // function initTable() {
  //     $.ajax({
  //         method: 'get',
  //         url: '/my/article/list',
  //         data: q,
  //         success: function (res) {
  //             if (res.status !== 0) {
  //                 return layer.msg(res.message)
  //             }
  //             var htmlStr = template('tpl-table', res)
  //             $('tbody').html(htmlStr)
  //         }
  //     })
  // }
  // 定义一个查询的参数对象，将来请求数据的时候，
  // 需要将请求参数对象提交到服务器


  var q = {
    pagenum: 1,
    // 页码值，默认请求第一页的数据
    pagesize: 2,
    // 每页显示几条数据，默认每页显示2条
    cate_id: '',
    // 文章分类的 Id
    state: '' // 文章的发布状态

  };
  var curretData = null;
  initTable();
  initCate(); // 获取文章列表数据的方法

  function initTable() {
    $.ajax({
      method: 'GET',
      url: '/my/article/list',
      data: q,
      success: function success(res) {
        if (res.status !== 0) {
          return layer.msg('获取文章列表失败！');
        } // 使用模板引擎渲染页面的数据


        var htmlStr = template('tpl-table', res);
        $('tbody').html(htmlStr); // 调用渲染分页的方法

        renderPage(res.total);
        curretData = res.data;
      }
    });
  } //初始化获取文章分类


  function initCate() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function success(res) {
        if (res.status !== 0) {
          return layer.msg("获取分类数据失败");
        }

        var htmlStr = template('tpl-cate', res);
        $('[name=cate_id]').html(htmlStr);
        form.render();
      }
    });
  } //为筛选表单绑定submit事件


  $('#form-search').on('submit', function (e) {
    e.preventDefault();
    var cate_id = $('[name=vate_id]').val();
    var state = $('[name=state]').val();
    q.cate_id = cate_id;
    q.state = state;
    initTable();
  }); //定义分页的方法

  function renderPage(total) {
    // 调用laypage.render函数来渲染分页结构
    laypage.render({
      elem: 'pageBox',
      //注意，这里的 test1 是 ID，不用加 # 号
      count: total,
      //数据总数，从服务端得到
      limit: q.pagesize,
      curr: q.pagenum,
      //分页显示多少条目
      layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
      limits: [2, 3, 5, 10],
      //分页发生切换的时候 触发
      jump: function jump(obj, first) {
        //可以通过first的值 判断是通过哪种方式 触发的jump回调
        //如果first值为true 证明是方式2触发的
        //否则就是方式1触发的
        //把最新的页码值 数值到q 这个查询参数对象中
        // console.log(obj);
        q.pagenum = obj.curr; //把最新的条目数，赋值给q这个查询参数对象中的pagesize属性中

        q.pagesize = obj.limit; //根据最新的q 获取对应的数据列表并渲染表格

        if (!first) {
          initTable();
        }
      }
    });
  }

  $('tbody').on('click', '.btn-delete', function () {
    var len = $('.btn-delete').length;
    var id = $(this).attr('data-id');
    layer.confirm('确认删除?', {
      icon: 3,
      title: '提示'
    }, function (index) {
      $.ajax({
        method: 'get',
        url: '/my/article/delete/' + id,
        success: function success(res) {
          if (res.status !== 0) {
            return layer.msg('删除文章失败');
          }

          layer.msg('删除文章成功'); //当数据删除完成后 需要判断当前页中是否还有剩余数据 
          // 如果没有剩余的数据后 页码-1 然后重新调用

          if (len === 1) {
            q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1;
          }

          initTable();
        }
      });
      layer.close(index);
    });
  });
});