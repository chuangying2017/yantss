<template lang="html">
  <article id="views-gift">
    <div class="gift-header">
      <header>
        优鲜卡列表
      </header>
      <ul class="navigation">
        <li :class="{ active: isShowUnused }" @click="toggleList">未使用</li>
        <li :class="{ active: !isShowUnused }" @click="toggleList">已使用</li>
      </ul>
    </div>
    <ul class="cardList" v-if="currentList.length > 0">
      <li class="cardItem" v-for="item in currentList">
        <div class="imgWrap">
          <img :src="item.giftcard.cover_image" alt="">
        </div>
        <div class="desc">
          {{item.giftcard.content}}
          <i class="iconfont fr">&#xe603;</i>
        </div>
      </li>
    </ul>
    <p class="cardList-none" v-else>- 当前列表为空 -</p>
    <footer class="gift-footer">
      <a class="toGift" v-link="{ path: '/subscribe/orders/create' }">马上使用优鲜卡</a>
    </footer>
  </article>
</template>

<script>
// import Auth from '../../../auth/index'
// import {loginSuccess, userinfoSuccess} from '../../../vuex/actions'
export default {
  data(){
    return {
      isShowUnused: true,
      useableCards: [],
      usedCards: []
    }
  },
  computed: {
    currentList(){
      if(this.isShowUnused){
        return this.useableCards
      }
      return this.usedCards
    }
  },
  methods: {
    toggleList(){
      this.isShowUnused = !this.isShowUnused
    }
  },
  route: {
    data(){
      let self = this
      return Promise.all([
        this.$http.get('/promotions/giftcards'),
        this.$http.get('/promotions/giftcards?status=1')
      ]).then(function([useableCards, usedCards]){
        return {
          useableCards: useableCards.data.data,
          usedCards: usedCards.data.data
        }
      },function(){
        window.alert('获取优鲜卡数据失败')
      })
    }
    // activate: function(){
    //   let self = this
    //   this.$http.get('/promotions/giftcards').then(
    //     function (data) {
    //       self.useableCards = data.data.data
    //     },
    //     function () {
    //       // 获取用户数据失败
    //       window.alert('获取优鲜卡数据失败')
    //     }
    //   )
    //
    //   this.$http.get('/promotions/giftcards?status=1').then(
    //     function (data) {
    //       self.usedCards = data.data.data
    //     },
    //     function () {
    //       // 获取用户数据失败
    //       window.alert('获取优鲜卡数据失败')
    //     }
    //   )
    // }
  }
}
</script>

<style lang="scss" scoped>
#views-gift{
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 8.5rem 0 11rem;
  background-color: #f4f4f4;
  .gift-header{
    position: fixed;
    z-index: 900;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    header{
      width: 100%;
      height: 4rem;
      font-size: 1.5rem;
      text-align: center;
      color: #000;
      line-height: 4rem;
      background-color: #fff;
      margin-bottom: 0.5rem;
    }
    .navigation{
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      height: 4rem;
      background-color: #fff;
      &::before{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateY(-50%);
        display: block;
        content: '';
        width: 0.1rem;
        height: 2.5rem;
        background-color: #f4f4f4;
      }
      li{
        display: inline-block;
        font-size: 1.4rem;
        line-height: 3.8rem;
        color: #9d9d9d;
        border-bottom: 1px solid transparent;
        &.active{
          color: #000;
          border-bottom: 1px solid #c40042;
        }
      }
    }
  }
  .gift-footer{
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 900;
    width: 100%;
    height: 10rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f4f4f4;
    .toGift{
      display: block;
      width: 20rem;
      height: 5rem;
      line-height: 5rem;
      text-align: center;
      font-size: 1.65rem;
      border-radius: 0.5rem;
      border: 1px solid #c40042;
      color: #fff;
      background-color: #c40042;
      &:active{
        color: #c40042;
        background-color: #fff;
      }
    }
  }
  .cardList{
    display: block;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 15px;
    overflow-x: hidden;
    overflow-y: scroll;
    & .cardItem:nth-child(1){
      margin-top: 0;
    }
    & .cardItem:nth-child(even){
      .desc{
        &::before{
          background-image: linear-gradient( 0deg, rgb(109,205,38) 0%, rgba(109,205,38,0) 100%);
        }
      }
    }
    .cardItem{
      margin-top: 1.5rem;
      display: block;
      width: 100%;
      transform: rotate(0deg);
      border-radius: 10px;
      box-shadow: 0px 0px 10px 0px rgba(103, 103, 103, 0.23);
      overflow: hidden;
      .imgWrap{
        position: relative;
        width: 100%;
        height: 17rem;
        overflow: hidden;
        background-color: #f4f4f4;
        img{
          position: absolute;
          display: block;
          top: 50%;
          left: 0;
          width: 100%;
          transform: translateY(-50%);
        }
      }
      .desc{
        position: relative;
        width: 100%;
        height: 4rem;
        line-height: 4rem;
        box-sizing: border-box;
        color: #656565;
        font-size: 1.3rem;
        padding: 0 0.75rem 0 1.75rem;
        i{
          color: #656565;
        }
        &::before{
          position: absolute;
          display: block;
          content: '';
          top: 50%;
          left: 0.85rem;
          transform: translateY(-50%);
          width: 2px;
          height: 1.5rem;
          background-image: linear-gradient( 0deg, rgb(255,225,0) 0%, rgba(255,225,0,0) 100%);
        }
      }
    }
  }
  .cardList-none{
    display: block;
    width: 100%;
    text-align: center;
    font-size: 1.4rem;
    line-height: 8rem;
    color: rgba(0, 0, 0, 0.7);
  }
}
</style>
