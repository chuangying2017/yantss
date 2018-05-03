<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1>
        服务部
        <small>Stations</small>
      </h1>
      <ol class="breadcrumb">
        <li><a v-link="{path: '/dashboard/home'}"><i class="fa fa-dashboard"></i> 概况</a></li>
        <li class="active">服务部</li>
      </ol>
    </section>
    <section class="content">
      <router-view keep-alive></router-view>
    </section>
  </div>
</template>
