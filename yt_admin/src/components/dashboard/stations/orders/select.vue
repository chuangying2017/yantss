<template>
  <div class="modal" style="display: block;" v-if="status === 'open'">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click.prevent="close">
            <span aria-hidden="true">×</span></button>
          <h4 class="modal-title">订单重新分配服务部</h4>
          <p></p>
          <p>订单号: {{order.order_no}} - 当前服务部: {{stations[this.order.station.id]['name']}}</p>
        </div>
        <div class="modal-body">
          <input type="text" v-model="search" class="form-control" placeholder="关键字搜索">
          <ul style="height: 300px;overflow: scroll;">
            <li style="list-style: none" v-for="station in stations | filterBy search in 'name'"
                v-if="station.id !== order.station.id">
              <div class="radio">
                <label>
                  <input type="radio" v-model="stationId" value="{{station.id}}">
                  {{station.name}}
                </label>
              </div>
            </li>
          </ul>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary pull-left" @click.prevent="changeStation"
                  :disabled="stationId == null">
            确定
          </button>
        </div>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>
  <!-- /.modal -->
</template>
<script>
  import api from 'api/index.js'
  export default {
    name: 'StationSelect',
    props: ['stations'],
    data () {
      return {
        search: '',
        stationId: null,
        order: null,
        status: 'close'
      }
    },
    methods: {
      changeStation () {
        if (window.confirm('确定执行此操作?')) {
          api.stations.orders.reassign(this.order.id, this.stationId).then(function () {
            window.alert('重新分配成功!')
            window.location.reload()
          })
        }
      },
      reset () {
        this.search = ''
        this.stationId = null
        this.order = null
      },
      close () {
        this.reset()
        this.status = 'close'
      }
    },
    events: {
      'changeStation' (order) {
        this.status = 'open'
        this.order = order
      }
    }
  }
</script>
