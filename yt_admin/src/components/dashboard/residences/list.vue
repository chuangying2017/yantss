<template>
  <div class="row">
    <div class="col-md-6">
      <a v-link="{path: '/dashboard/stations/residences/create'}" class="btn btn-social btn-google btn-sm mb20">
        <i class="fa fa-plus"></i> 添加小区
      </a>
    </div>
  </div>

  <div class="row">
    <div class="col-xs-12">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">小区管理</h3>
          <!--<div class="box-tools">-->
          <!--<div class="input-group input-group-sm" style="width: 150px;">-->
          <!--<input type="text" name="table_search" class="form-control pull-right" placeholder="微信昵称">-->

          <!--<div class="input-group-btn">-->
          <!--<button type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>-->
          <!--</div>-->
          <!--</div>-->
          <!--</div>-->
        </div>
        <!-- /.box-header -->
        <div class="box-body table-responsive no-padding">
          <table class="table table-hover table-striped">
            <tbody>
            <tr>
              <th>NO.</th>
              <th>行政区</th>
              <th>名称</th>
              <th>别名</th>
              <th>完成/目标</th>
              <th>操作</th>
            </tr>
            <tr v-for="residence in residences">
              <td>{{residence.id}}</td>
              <td>{{residence.district}}</td>
              <td>{{residence.name}}</td>
              <td>{{residence.aliases}}</td>

              <td>{{residence.complete}}/{{residence.goal}}单</td>
              <td>
                <a v-link="{path: '/dashboard/stations/residences/edit/' + residence.id}">编辑</a>
                <!--<a href="" v-if="residence.active" @click.prevent="update(residence, 0)">隐藏</a>-->
                <!-- <a v-link="{path: '/dashboard/stations/residences/detail/' + residence.id}">查看</a> -->
                <!--<a href="" @click.prevent="delete(residence, $index)">删除</a>-->
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <!-- /.box-body -->
        <div class="box-footer">
          <select name="" id="" v-model="goTo" v-on:change="changePage">
            <option value="{{n + 1}}" v-for="n in pagination.total_pages">{{n + 1}}</option>
          </select>
        </div>
      </div>
      <!-- /.box -->
    </div>
  </div>
</template>
<script>
  import api from 'api/index.js'
  export default {
    name: 'ListResidences',
    data () {
      return {
        goTo: 1,
        residences: [],
        pagination: {}
      }
    },
    route: {
      data () {
        return this.getResidences()
      }
    },
    methods: {
      getResidences (query) {
        console.log(query)
        var self = this
        api.residences.getAll(query).then(function ({residences, pagination}) {
          self.residences = residences
          self.pagination = pagination
        })
      },
      delete (residence) {
        var self = this
        if (window.confirm('确定删除此小区 ?')) {
          api.residences.delete(residence.id).then(function (data) {
            self.residences.$remove(residence)
          })
        }
      },
      update (residence, status) {
        api.residences.update(residence.id, status).then(function (data) {
          window.alert('更新成功')
          window.location.reload()
        })
      },
      changePage () {
        this.getResidences({
          page: this.goTo
        })
      }
    }
  }
</script>
