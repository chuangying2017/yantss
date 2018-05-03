<template>
  <tr>
    <td>{{index + 1}}</td>
    <td>{{station.name}}</td>
    <td v-if="editing">
      <input id="inputEditor" type="text" v-model="kpi" number @keyup.enter="saveEditing" v-on:blur="saveEditing">
    </td>
    <td v-else @dblclick="startEditing">{{station.counter.user_count_kpi}}</td>
    <td>{{districtslist[station.district_id]['name']}}</td>
    <td>{{station.director}}</td>
    <td>{{station.phone}}</td>
    <td>{{station.tel}}</td>
    <td>{{station.address}}</td>
    <td>
      <div class="btn-group">
        <a v-link="{ path: '/dashboard/stations/' + station.id }" type="button" class="btn btn-default btn-sm">详情</a>
        <a v-link="{ path: '/dashboard/stations/edit/' + station.id }" type="button"
           class="btn btn-default btn-sm">编辑</a>
        <!--<a @click.prevent="remove(station)" type="button" class="btn btn-default btn-sm">删除</a>-->
      </div>
    </td>
  </tr>
</template>
<script>
  import api from 'api/index'
  export default {
    name: 'StationListItem',
    props: ['station', 'index', 'districtslist'],
    data () {
      return {
        editing: false
        // kpi: this.station.counter.user_count_kpi
      }
    },
    computed: {
      kpi () {
        if (this.station.counter) {
          return this.station.counter.user_count_kpi
        }
      }
    },
    methods: {
      startEditing () {
        this.editing = true
        window.setTimeout(function () {
          document.getElementById('inputEditor').focus()
        }, 0)
      },
      saveEditing () {
        var self = this
        if (this.kpi === this.station.counter.user_count_kpi) {
          this.editing = false
          return
        } else {
          console.log('here')
          api.stations.updateKpi(this.station, this.kpi).then(function () {
            console.log('there')
            self.station.counter.user_count_kpi = self.kpi
            self.editing = false
          }, function () {
            window.alert('出现错误，请重试！')
            return
          })
        }
      }
    }
  }
</script>
