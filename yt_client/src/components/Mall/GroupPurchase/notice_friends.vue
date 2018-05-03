<template lang="html">
  <section class="components--notice_friends" @click="$emit('close')">
    <div class="shade_modal">
          <div class="common_modals-notice_modal">
            <div class="modal">
              <img src="http://oodqt1zhd.bkt.clouddn.com/notic_cow.png">
              <div class="notice_cow_box">
                <p>健康小区，优鲜特权</p>
                <p>号召小伙伴们一起助力!</p>
                <div class="cow_box_text">
                  <p>1.点击右上角</p>
                    <p>2.点击 <img src="../../../assets/wx_shar.png">或
                    <img src="../../../assets/wx_friends.png"></p>
                </div>
                <img class="notice_point" src="../../../assets/point.png">
              </div>
            </div>
          </div>
    </div>

  </section>

</template>

<script>
export default {
  name: 'notice_friends'
}
</script>

<style lang="scss" scoped>
.components--notice_friends{
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  overflow: hidden;
}
    .shade_modal{
      width: 100%;
      height: 100%;
    }
    .common_modals-notice_modal{
      width: 100%;
      height: 100%;
      .modal{
        position: absolute;
        top: 5.416rem;
        left: 0.833rem;
        img{
          height: 17.79rem;
          z-index: 10;
        }
        .notice_cow_box{
          p{
            font-size: 1.9rem;
            font-family: "PingFang SC";
            color: rgb(90, 90, 90);

          }
          .notice_point{
            position: absolute;
            width: 6.66rem;
            height: 6rem;

            top: -7rem;
            left:14.04rem;
          }
          width: 22rem;
          height: 14.04rem;

          padding:0.83rem;
          position: absolute;
          left:11.375rem;
          top:3.5rem;
          border-radius: 0.416rem;
          z-index: 11;
          background-color: white;
          .cow_box_text{

            margin-top: 0.833rem;
            p{
              font-size: 1.2rem;
              img{
                width: 2.95rem;
                height: 2.95rem;
                margin:0.416rem 0.416rem 0 0.416rem;
              }
            }

          }
        }

      }
    }

</style>
