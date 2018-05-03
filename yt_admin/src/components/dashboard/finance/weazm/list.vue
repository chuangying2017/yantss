<template>
  <div class="row">
    <div class="col-md-6"></div>
  </div>
  <div class="row" v-if="!$loadRouteData">
    <div class="col-xs-6">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">销售提成</h3>
        </div>
        <!-- /.box-header -->
        <div class="box-body table-responsive">
          <div class="dataTables_wrapper form-inline dt-bootstrap">
            <table class="table table-hover">
              <tbody>
              <tr>
                <th>No.</th>
                <th>月份</th>
                <th>操作</th>
              </tr>
              <tr v-for="item in items">
                <td>{{$index + 1}}</td>
                <td>{{item}}</td>
                <td><a href="" target="_blank" @click.prevent="download(item)">下载</a></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- /.box-body -->
        <!--<div class="box-footer">-->
        <!--<ul class="pagination pagination-sm no-margin pull-right">-->
        <!--<li><a href="#">«</a></li>-->
        <!--<li><a href="#">1</a></li>-->
        <!--<li><a href="#">2</a></li>-->
        <!--<li><a href="#">3</a></li>-->
        <!--<li><a href="#">»</a></li>-->
        <!--</ul>-->
        <!--</div>-->
      </div>
      <!-- /.box -->
    </div>
  </div>
</template>
<script>
  import api from 'api/index.js'
  export default {
    name: 'ListStations',
    data () {
      return {
        items: []
      }
    },
    route: {
      data () {
        return {
          items: api.invoice.listBonus()
        }
      }
    },
    methods: {
      download (date) {
        var token = window.localStorage.getItem('jwt-token')
        var url = api.invoice.getBonusDownload(date) + '&token=' + token
        window.open(
          url,
          '_blank'
        )
      }
    }
  }
</script>
