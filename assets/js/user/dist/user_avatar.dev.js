"use strict";

$(function () {
  var layer = layui.layer; // 1.1 获取裁剪区域的 DOM 元素

  var $image = $('#image'); // 1.2 配置选项

  var options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }; // 1.3 创建裁剪区域

  $image.cropper(options); // 为上传按钮绑定点击事件

  $('#btnChooseImage').on('click', function () {
    $('#file').click();
  }); //为文件选择框绑定change事件

  $('#file').on('change', function (e) {
    // e.preventDefault()
    var filelist = e.target.files;
    console.log(filelist);

    if (filelist.length === 0) {
      return layer.msg('请选择照片！');
    } // 1. 拿到用户选择的文件


    var file = e.target.files[0]; // 2. 将文件，转化为路径

    var imgURL = URL.createObjectURL(file); // 3. 重新初始化裁剪区域

    $image.cropper('destroy') // 销毁旧的裁剪区域
    .attr('src', imgURL) // 重新设置图片路径
    .cropper(options); // 重新初始化裁剪区域
  }); //为确定按钮绑定事件

  $('#btnUpload').on('click', function () {
    var dataURL = $image.cropper('getCroppedCanvas', {
      // 创建一个 Canvas 画布
      width: 100,
      height: 100
    }).toDataURL('image/png');
    console.log(dataURL);
    $.ajax({
      method: 'post',
      url: '/my/update/avatar',
      data: {
        avatar: dataURL
      },
      success: function success(res) {
        if (res.status !== 0) {
          return layer.msg('失败');
        }

        layer.msg('成功');
        window.parent.getUserInfo();
      }
    });
  });
});