<template>
  <input type="date" @blur="dateChange" v-model="date">
</template>

<script>
  export default{
    name: 'DatePicker',

    props: {
      min: Number,
      max: Number,
      date: String
    },

    created: function () {
      this.date = this.addDay(this.min + 1)
    },

    methods: {
      dateChange: function () {
        var minDate = Date.parse(this.addDay(this.min + 1))
        var maxDate = Date.parse(this.addDay(this.max))
        var current = Date.parse(this.date)
        if (current < minDate || current > maxDate) {
          window.alert('请选择' + this.min + '天后, ' + this.max + '天内的日期')
          this.date = this.addDay(this.min + 1)
        }
      },
      addDay: function (days) {
        var someDate = new Date()
        var numberOfDaysToAdd = days
        someDate.setDate(someDate.getDate() + numberOfDaysToAdd)
        var dd = someDate.getDate()
        var mm = someDate.getMonth() + 1
        var yyyy = someDate.getFullYear()
        return yyyy + '-' + (('0' + mm).slice(-2)) + '-' + (('0' + dd).slice(-2))
      }
    }
  }
</script>
