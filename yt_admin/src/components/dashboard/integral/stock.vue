<template>
  <div class="tab-content">
    <div role="tabpanel" class="tab-pane active" id="basic">
      <form class="form-horizontal">
        <div class="row bw">
          <div class="col-md-8">
            <div class="box-body">
              <div class="form-group">
                <label for="inputPassword3" class="col-sm-2 control-label">库存</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control" v-model="sku.bar_code">
                </div>
              </div>
              <div class="form-group">
                <label for="inputPassword3" class="col-sm-2 control-label"></label>

                <div class="col-sm-10">
                  <button type="submit" class="btn btn-danger pull-left" @click.prevent="submit">保存</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>

  </div>
</template>

<script>
    export default {
    }
</script>

<style scoped>
  .tab-content{
    background: white;
    margin: 0px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  }
</style>
