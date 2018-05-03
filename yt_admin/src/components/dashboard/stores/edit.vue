<template>
  <div class="row">
    <div class="col-xs-12">
      <div class="box box-danger">
        <div class="box-header with-border">
          <h3 class="box-title">门店详情</h3>
        </div>
        <form class="form-horizontal">
          <div class="row">
            <div class="col-md-8">
              <div class="box-body">
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">门店名称</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">所属区域</label>
                  <div class="col-sm-6">
                    <select name="" id="" class="form-control">
                      <option value="">天河</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">门店地址</label>
                  <div class="col-sm-6">
                    <textarea type="text" class="form-control"></textarea>
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">负责人</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">负责人手机</label>

                  <div class="col-sm-6">
                    <input type="number" class="form-control">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">门店电话</label>
                  <div class="col-sm-6">
                    <input type="tel" class="form-control">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputPassword3" class="col-sm-2 control-label">店面图片</label>
                  <div class="col-sm-6">
                    <button type="button" class="btn btn-danger mb20">上传图片</button>
                    <div class="row">
                      <div class="col-xs-6 col-md-3">
                        <div href="#" class="thumbnail thumbnail-mask">
                          <img src="http://o7tep4eu1.bkt.clouddn.com/yt_milk.jpg" alt="" width="64">
                              <span class="cover-delete"><span class="glyphicon glyphicon-remove"
                                                               aria-hidden="true"></span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /.box-body -->
          <div class="box-footer">
            <button type="submit" class="btn btn-danger pull-right">保存</button>
          </div>
          <!-- /.box-footer -->
        </form>
      </div>
      <!-- /.box -->
    </div>
  </div>
</template>
