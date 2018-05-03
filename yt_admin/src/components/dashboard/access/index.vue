<template>
  <div class="content-wrapper">
    <section class="content-header">
      <h1>
        管理员
        <small>Administrators</small>
      </h1>
      <ol class="breadcrumb">
        <li><a v-link="{path: '/dashboard/home'}"><i class="fa fa-dashboard"></i> 概况</a></li>
        <li class="active">管理员</li>
      </ol>
    </section>
    <section class="content">
      <router-view></router-view>
    </section>
</template>
