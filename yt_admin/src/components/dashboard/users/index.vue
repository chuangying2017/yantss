<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1>
        用户
        <small>Users</small>
      </h1>
      <ol class="breadcrumb">
        <li><a v-link="{path: '/dashboard/home'}"><i class="fa fa-dashboard"></i> 概况</a></li>
        <li class="active">用户</li>
      </ol>
    </section>
    <section class="content">
      <router-view></router-view>
    </section>
</template>
