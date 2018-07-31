<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div v-if="this.imglist.length!=0" class="pic-box">
                                <ProductZoomer
                                    :baseImages="images"
                                    :base-zoomer-options="zoomerOptions"
                                    
                                >
                                   
                                </ProductZoomer>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <div class="el-input-number el-input-number--small">
                                                    <span @click='buyNum==1?1:buyNum--' role="button" class="el-input-number__decrease " :class="{'is-disabled' : buyNum==1}">
                                                        <i class="el-icon-minus"></i>
                                                    </span>
                                                    <span  @click='buyNum<goodsinfo.stock_quantity?buyNum++:buyNum' role="button" class="el-input-number__increase"  :class="{'is-disabled' : buyNum==goodsinfo.stock_quantity}" >
                                                        <i class="el-icon-plus"></i>
                                                    </span>
                                                    <div class="el-input el-input--small">
                                                        <!---->
                                                        <input v-model="buyNum" autocomplete="off" size="small" type="text" rows="2" max="60" min="1" validateevent="true" class="el-input__inner" role="spinbutton" aria-valuemax="60" aria-valuemin="1" aria-valuenow="1" aria-disabled="false">
                                                        <!---->
                                                        <!---->
                                                        <!---->
                                                    </div>
                                                </div>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button  class="buy">立即购买</button>
                                                <button  @click='cartAdd' class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                             <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a @click='isShowDesc = true' href="javascript:;" :class="{selected: isShowDesc}">商品介绍</a>
                                        </li>
                                        <li>
                                            <a @click='isShowDesc = false' href="javascript:;"  :class="{selected: !isShowDesc}">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>    
                            <div v-html="goodsinfo.content" class="tab-content entry" :style="{display: isShowDesc? 'block' : 'none'}">
                                
                            </div>
                            <div class="tab-content" :style="{display: !isShowDesc? 'block' : 'none'}">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" v-model.trim="commentContainer" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit" @click='submitContainer'>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-if="messageList.length==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item, index) in messageList" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <div id="pagination" class="digg">
                                            <Page :total="totalcount" :page-size='pageSize' placement='top' show-elevator show-sizer @on-change='pageChange($event)' @on-page-size-change='pageChangeSize($event)' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item, index) in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="`/goodsInfo/`+item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                             <router-link :to="`/goodsInfo/`+item.id">{{item.title}}</router-link>
                                            <span>{{item.add_time | cutTime}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <BackTop></BackTop>
        <img  class='moveImg' style='display :none;' v-if="imglist.length!=0" :src="imglist[0].original_path" alt="">
    </div>
</template>

<script>
//引入放大镜包
import ProductZoomer from "vue-product-zoomer";
import $ from 'jquery';

export default {
  name: "goodsinfo",
  data: function() {
    return {
      goodsinfo: {},
      imglist: [],
      hotgoodslist: [],
      //显示哪块区域
      isShowDesc: true,
      //购买数量
      buyNum:1,
      
      //放大镜预览图
      images: {
        normal_size: [],
      },
      zoomerOptions: {
        zoomFactor: 2,
        pane: "container-round",
        hoverDelay: 300,
        namespace: "inline-zoomer",
        move_by_click: true,
        scroll_items: 5,
        choosed_thumb_border_color: "#bbdefb"
      },
      //评论数量
      messageList:[],
      //当前页
      pageIndex:1,
      //几条数据
      pageSize:5,
      //总条数
      totalcount:0,
      //内容
      commentContainer:''
    }
  },
  //注册组件
  components: {
    ProductZoomer
  },
  methods: {
    // 封装到公共的方法 通过id获取数据
    getgoodsInfo() {
        //强制初始化
        this.imglist = [];
        //清空预览图片的数组
        this.images.normal_size = [];
      this.axios
        .get(`site/goods/getgoodsinfo/${this.$route.params.id}`)
        .then(response => {
          // console.log(response);

          this.goodsinfo = response.data.message.goodsinfo;
          this.imglist = response.data.message.imglist;
          this.hotgoodslist = response.data.message.hotgoodslist;

          this.imglist.forEach((v,i)=>{
              this.images.normal_size.push({
                  id:v.id,
                  url:v.original_path
              })
          })
        });
    },
    //提取评论数据 方便调用
    getmessageList(){
        this.axios
            .get(`site/comment/getbypage/goods/${this.$route.params.id}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`)
            .then(response=>{
                // console.log(response);
                this.messageList = response.data.message;
                // console.log(response.data.message)
                // console.log(this.messageList)
                this.totalcount = response.data.totalcount;
                // console.log(this.totalcount)
            })
            .catch(response=>{
                console.log(response);
            })
    },
    submitContainer(){
        if(this.commentContainer == ''){
            
            this.$Message.error({
                content: "对方不想理你,并且想你抛出了世界上最好的语言",
                closable: true
            });

            return
            
        }
        this.axios
            .post(`site/validate/comment/post/goods/${this.$route.params.id}`,{
                commenttxt:this.commentContainer
            })
            .then(response=>{
                // console.log(response)
                //返回的状态码为0 代表评论成功
                if(response.data.status == 0) {
                    this.$Message.success('发表成功')
                }

                //回到第一页
                this.pageIndex = 1
                // 重新渲染
                this.getmessageList()
                //清空评论输入框
                this.commentContainer = '';
            })
    },
    //页码改变
    pageChange(page){
        // console.log('页数')
        // console.log(page)
        this.pageIndex = page;
        this.getmessageList();
    },
    //页容量改变
    pageChangeSize(page){
        // console.log('每页条数')
        // console.log(page)
        this.pageSize = page;
        this.getmessageList();
    },
    //点击购物车
    cartAdd(){
        
        let offset = $("#buyButton .add").offset();
        let cartoffset = $('.icon-cart').offset();

        $('.moveImg').show().addClass('move').css(offset).stop().animate(cartoffset,1000,()=>{
            $('.moveImg').removeClass('move').hide()
        })

        this.$store.commit("buyGood",{
            goodId: this.$route.params.id,
            goodNum: this.buyNum
        })
        // console.log(this.$store);
        // console.log(1)
    }
  },
  beforeCreate: function() {},
  // 在实例创建完成后被立即调用。
  created() {
    this.getgoodsInfo();
    this.getmessageList();
  },
  //监听属性发生变化 改变是自动调用
  watch: {
    //这里监听的是id的变化
    // to 是新值 from 是旧值
    $route(to, from) {
      // console.log(to)
      // console.log(from)
      this.getgoodsInfo();

      this.getmessageList();
    }
  }
};
</script>

<style>
@import url('../../node_modules/font-awesome/css/font-awesome.min.css');
    .inline-zoomer-zoomer-box{
        width: 369px;
    }
    .pic-box .control-box .thumb-list {
  display: flex;
}
.thumb-list img {
  height: 78px;
  width: 78px;
  margin: 2px;
}
.control i {
  text-align: center;
}

.moveImg{
    width: 40px;
    position: absolute;
    top: 0;
    right: 50px;
}
.moveImg.move{
    
    opacity: 0.3;
    transform: scale(.5,.5) rotateZ(360deg);
    transition: transform 1s , opacity 1s;
}
</style>


