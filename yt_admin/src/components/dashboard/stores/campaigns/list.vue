<template>
  <div class="row">
    <div class="col-md-6">
      <a v-link="{path: '/dashboard/stores/campaigns/create'}" class="btn btn-social btn-google btn-sm mb20">
        <i class="fa fa-plus"></i> 新增活动
      </a>
    </div>
  </div>
  <div class="row">
    <div class="col-md-6"></div>
  </div>
  <div class="row">
    <div class="col-xs-12">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">营销活动列表</h3>
        </div>
        <!-- /.box-header -->
        <div class="box-body table-responsive">
          <div class="dataTables_wrapper form-inline dt-bootstrap">
            <div class="row">
              <div class="col-sm-6 col-md-3" v-for="campaign in campaigns">
                <div class="thumbnail">
                  <img style="height: 200px;" :src="campaign.cover_image" alt="">
                  <div class="caption">
                    <h4>{{campaign.name}}</h4>
                    <p>{{campaign.desc}}</p>
                    <p><a href="#" class="btn btn-danger btn-sm" role="button">查看详情</a>
                      <a @click.prevent="remove(campaign)" class="btn btn-default btn-sm" role="button">删除</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /.box-body -->
        <div class="box-footer">
          <ul class="pagination pagination-sm no-margin pull-right">
            <li><a href="#">«</a></li>
            <li><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">»</a></li>
          </ul>
        </div>
      </div>
      <!-- /.box -->
    </div>
  </div>
</template>
<script>
  import api from 'api/index.js'
  export default {
    name: 'ListCampaign',
    data () {
      return {
        campaigns: [],
        pagination: {}
      }
    },
    route: {
      data () {
        return api.campaigns.getAll().then(function ({data: {data: campaigns, meta: {pagination: pagination}}}) {
          return {
            campaigns: campaigns,
            pagination: pagination
          }
        })
      }
    },
    methods: {
      remove (campaign) {
        var self = this
        if (window.confirm('确定要删除此活动?')) {
          api.campaigns.delete(campaign.id).then(function () {
            self.campaigns.$remove(campaign)
          })
        }
      }
    }
  }
</script>
