webpackJsonp([1],{Klb1:function(t,s,i){t.exports=i.p+"static/img/interribbon.1f0740f.png"},U3Qx:function(t,s){},VXVi:function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a={data:function(){return{currentDay:1,currentMonth:1,currentYear:1970,currentWeek:1,days:[],arrDate:[1,2,10,12,,30,31,32],ruluepop:!1,sucpop:!1}},created:function(){console.log(this.days),this.initData(null)},methods:{siginrule:function(){this.ruluepop=!this.ruluepop},knowrule:function(){this.ruluepop=!this.ruluepop},signin:function(){this.sucpop=!this.sucpop},knowsiginin:function(){this.sucpop=!this.sucpop},initData:function(t){var s;if(t)console.log(t),s=new Date(t);else{var i=new Date;(r=new Date(this.formatDate(i.getFullYear(),i.getMonth(),1))).setDate(42),s=new Date(this.formatDate(r.getFullYear(),r.getMonth()+1,1))}this.currentDay=s.getDate(),this.currentYear=s.getFullYear(),this.currentMonth=s.getMonth()+1,this.currentWeek=s.getDay(),0==this.currentWeek&&(this.currentWeek=7);var a=this.formatDate(this.currentYear,this.currentMonth,this.currentDay);this.days.length=0;for(var e=this.currentWeek;e>=0;e--){(r=new Date(a)).setDate(r.getDate()-e);var n={};n={day:r,isSign:this.isVerDate(r.getDate())},this.days.push(n)}for(e=1;e<=42-this.currentWeek-1;e++){var r;(r=new Date(a)).setDate(r.getDate()+e);n={};n={day:r,isSign:this.isVerDate(r.getDate())},this.days.push(n)}},isVerDate:function(t){return this.arrDate.includes(t)},pickPre:function(t,s){var i=new Date(this.formatDate(t,s,1));i.setDate(0),this.initData(this.formatDate(i.getFullYear(),i.getMonth()+1,1))},pickNext:function(t,s){var i=new Date(this.formatDate(t,s,1));i.setDate(42),this.initData(this.formatDate(i.getFullYear(),i.getMonth()+1,1))},formatDate:function(t,s,i){var a=s;a<10&&(a="0"+a);var e=i;return e<10&&(e="0"+e),t+"-"+a+"-"+e}}},e={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"intergralin"},[a("div",{staticClass:"siginhead"},[a("img",{attrs:{src:i("ohwi"),alt:""}}),t._v(" "),t._m(0),t._v(" "),a("div",{staticClass:"signinbtn",on:{click:t.signin}},[t._v("签到")])]),t._v(" "),a("div",{staticClass:"month"},[a("ul",[a("li",{staticClass:"arrow iconfont",on:{click:function(s){t.pickPre(t.currentYear,t.currentMonth)}}},[t._v("")]),t._v(" "),a("li",{staticClass:"year-month"},[a("span",{staticClass:"choose-year"},[t._v(t._s(t.currentYear)+"年")]),t._v(" "),a("span",{staticClass:"choose-month"},[t._v(t._s(t.currentMonth)+"月")])]),t._v(" "),a("li",{staticClass:"arrow iconfont",on:{click:function(s){t.pickNext(t.currentYear,t.currentMonth)}}},[t._v("")])])]),t._v(" "),a("div",{staticClass:"contwrap"},[a("div",{staticClass:"contsignin"},[t._m(1),t._v(" "),t._m(2),t._v(" "),a("ul",{staticClass:"days"},t._l(t.days,function(s){return a("li",[s.day.getMonth()+1!=t.currentMonth?a("span",{staticClass:"other-month"},[t._v(t._s(s.day.getDate()))]):a("span",[!0===s.isSign?a("span",{staticClass:"active"},[t._v(t._s(s.day.getDate()))]):a("span",[t._v(t._s(s.day.getDate()))])])])})),t._v(" "),a("div",{staticClass:"seerulebtn",on:{click:t.siginrule}},[t._v("\n\t\t    \t签到规则\n\t\t    ")])]),t._v(" "),t._m(3)]),t._v(" "),a("transition",{attrs:{name:"fade"}},[t.ruluepop?a("div",{staticClass:"pop rulecont"},[a("div",{staticClass:"rconts"},[a("img",{attrs:{src:i("Klb1"),alt:""}}),t._v(" "),a("i",{staticClass:"rulet"},[t._v("签到规则")]),t._v(" "),a("ul",[a("li",[a("i",{staticClass:"role"}),t._v("每天签到，奖励 7 积分；")]),t._v(" "),a("li",[a("i",{staticClass:"role"}),t._v("连续签到 "),a("i",{staticClass:"ruleday"},[t._v("7")]),t._v("天，另外奖励 7 积分；  ")]),t._v(" "),a("li",[a("i",{staticClass:"role"}),t._v("连续签到"),a("i",{staticClass:"ruleday"},[t._v("7")]),t._v("天，另外奖励 14 积分；")]),t._v(" "),a("li",[a("i",{staticClass:"role"}),t._v("连续签到 "),a("i",{staticClass:"ruleday"},[t._v("7")]),t._v("天；另外奖励 21 积分；")]),t._v(" "),a("li",[a("i",{staticClass:"role"}),t._v("每个月的签到，到下一个自然月自动清零；")]),t._v(" "),a("li",[a("i",{staticClass:"role"}),t._v("满168积分后，即可到积分商城兑换礼品。")])]),t._v(" "),a("div",{staticClass:"rulebtn",on:{click:t.knowrule}},[t._v("\n\t\t\t\t\t我知道了\n\t\t\t\t")])])]):t._e()]),t._v(" "),a("transition",{attrs:{name:"fade"}},[t.sucpop?a("div",{staticClass:"pop rulecont"},[a("div",{staticClass:"rconts succonts"},[a("img",{attrs:{src:i("Klb1"),alt:""}}),t._v(" "),a("i",{staticClass:"rulet"},[t._v("获得奖励")]),t._v(" "),a("p",{staticClass:"sucmsg"},[t._v("恭喜你获得积分 "),a("i",{staticClass:"sucmsginter"},[t._v("+7")])]),t._v(" "),a("div",{staticClass:"rulebtn knowsucbtn",on:{click:t.knowsiginin}},[t._v("\n\t\t\t\t\t我知道了\n\t\t\t\t")])])]):t._e()])],1)},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"rinfo"},[s("p",{staticClass:"username"},[this._v("天下第一刀")]),this._v(" "),s("p",{staticClass:"selfintergral"},[this._v("我的积分："),s("i",{staticClass:"myinter"},[this._v("8869分")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"signinday"},[this._v("\n    \t\t\t您已签到"),s("i",{staticClass:"signinnum"},[this._v("14")]),this._v("天啦！连续签到"),s("i",{staticClass:"continu"},[this._v("7")]),this._v("天\n\t    \t")])},function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("ul",{staticClass:"weekdays"},[i("li",{staticStyle:{color:"#999"}},[t._v("日")]),t._v(" "),i("li",[t._v("一")]),t._v(" "),i("li",[t._v("二")]),t._v(" "),i("li",[t._v("三")]),t._v(" "),i("li",[t._v("四")]),t._v(" "),i("li",[t._v("五")]),t._v(" "),i("li",{staticStyle:{color:"#999"}},[t._v("六")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"continuwrap"},[a("div",{staticClass:"continutit"},[a("p",{staticClass:"continul"},[a("i",{staticClass:"iconfont gift"},[t._v("")]),a("i",{staticClass:"continutxtl"},[t._v("连续签到有礼")])]),t._v(" "),a("p",{staticClass:"continur"},[a("i",{staticClass:"continutxtr"},[t._v("连续签到即可领取")])])]),t._v(" "),a("div",{staticClass:"siginshow"},[a("div",{staticClass:"siginlist"},[a("p",{staticClass:"integralnum"},[t._v("+7积分")]),t._v(" "),a("img",{attrs:{src:i("av9W"),alt:""}}),t._v(" "),a("p",{staticClass:"haveday"},[t._v("签到7天")])]),t._v(" "),a("div",{staticClass:"siginlist"},[a("p",{staticClass:"integralnum"},[t._v("+7积分")]),t._v(" "),a("img",{attrs:{src:i("av9W"),alt:""}}),t._v(" "),a("p",{staticClass:"haveday"},[t._v("签到14天")])]),t._v(" "),a("div",{staticClass:"siginlist"},[a("p",{staticClass:"integralnum"},[t._v("+7积分")]),t._v(" "),a("img",{attrs:{src:i("av9W"),alt:""}}),t._v(" "),a("p",{staticClass:"haveday"},[t._v("签到21天")])]),t._v(" "),a("img",{attrs:{src:i("ioJO"),alt:""}})])])}]};var n=i("vSla")(a,e,!1,function(t){i("U3Qx")},"data-v-1e75f8b6",null);s.default=n.exports},av9W:function(t,s,i){t.exports=i.p+"static/img/ylqgift.079ad41.png"},ioJO:function(t,s,i){t.exports=i.p+"static/img/interline.a8b1404.png"}});