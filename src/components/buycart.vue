<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <router-link to="/index">首页</router-link> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <!-- 没有商品的时候显示 -->
                                <tr v-if="message.length == 0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <!-- 有商品的时候显示 -->
                                <tr v-for="(item, index) in message" :key="item.id">
                                    <td width="48" align="center">
                                        <el-switch v-model="item.selected" active-color="#409eff" inactive-color="#555555">
                                        </el-switch>
                                    </td>
                                    <td align="left" colspan="2">
                                        <div class="shopInfo"><img :src='item.img_url' alt="" style="width: 50px; height: 50px; margin-right: 10px;">
                                            <span>{{item.title}}</span>
                                        </div>
                                    </td>
                                    <td width="84" align="left">{{item.sell_price}}</td>
                                    <td width="104" align="center">
                                        <el-input-number v-model="item.buycount" @change="countChange($event,index)" size="mini" :min="1" :max="10" label="描述文字"></el-input-number>
                                    </td>
                                    <td width="104" align="left">{{item.sell_price * item.buycount}}</td>
                                    <td width="54" align="center">
                                        <a  href="javascript:void(0)" @click='delIndex=index;isShowModal = !isShowModal'>删除</a>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{selectCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{totalPrice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
                            <!-- <router-link to="/payOrder">
                                <button class="submit" >立即结算</button>
                            </router-link> -->
                            <button class="submit" @click='toPayOrder' >立即结算</button>
                            
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
        <Modal v-model="isShowModal" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>删除</span>
            </p>
            <div style="text-align:center">
                <p>确定要删除吗?</p>
            </div>
            <div slot="footer">
                <Row>
                    <Col span="12">
                        <Button type="success" size="large" long @click='isShowModal = !isShowModal'>取消</Button>
                    </Col>
                    <Col span="12">
                        <Button type="error" size="large" long @click='del'>确认</Button>                        
                    </Col>
                </Row>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
  name: "buycart",
  data: function() {
    return {
      message: [],
      isShowModal: false,
      delIndex: 0
    };
  },
  created() {
      //进来显示loging界面
      this.$Spin.show();
    // console.log(this.$store.state.buyList);
    //获取需要传递的数据id
    let buyList = this.$store.state.buyList;
    let ids = "";
    for (const key in buyList) {
      ids += key;
      ids += ",";
    }

    //如果没有数据
    if(ids == ''){
        setTimeout(() => {
            this.$Spin.hide();
        }, 500)
        return
    }

    ids = ids.slice(0, -1);


    // console.log(ids)
    //获取购物车数据
    this.axios.get(`site/comment/getshopcargoods/${ids}`).then(response => {
      // console.log(response)
      //先处理好数据在赋值 这样就不会出现vue不跟踪数据
      response.data.message.forEach((v, i) => {
        //把存在vuex里面公用的数据 购买的数量 取出来赋值给 buycount
        v.buycount = buyList[v.id];
        //selected 是我们后加的属性所以要处理 在赋值 这样vue才会跟踪
        v.selected = true;
      });
      this.message = response.data.message;
      // console.log(this.message)
      //关闭logging
        setTimeout(() => {
            this.$Spin.hide();
        }, 500)
    });
  },
  //计算属性
  computed: {
    //商品总金额
    totalPrice() {
      let price = 0;
      //非空判断
      if(this.message == undefined) return price;
      //遍历数据
      this.message.forEach(v => {
        //判断选中的
        if (v.selected) {
          //选中的件数乘以价格
          price += v.buycount * v.sell_price;
        }
      });

      return price;
    },
    //选中总件数
    selectCount() {
      //定义变量
      let totalCount = 0;
      if(this.message == undefined) return totalCount;
      this.message.forEach(v => {
        if (v.selected) {
          totalCount += v.buycount;
        }
      });

      return totalCount;
    }
  },
  methods: {
      countChange(value,index){
          this.$store.commit("changeCount",{
              goodId:this.message[index].id,
              goodNum: value,
          })
      },
      del(){
          console.log(this.delIndex)
          //删除只用拿到id就好了
          this.$store.commit("delGoodById",this.message[this.delIndex].id);
          //获取当前数据index 删除这条数据
          this.message.splice(this.delIndex,1);
          //模态框取消显示
          this.isShowModal = false;
      },
      toPayOrder(){
        //声明一个变量接收id
        let ids = '';
        //拿到选中的id
        this.message.forEach(v=>{
            if(v.selected) {
                ids += v.id;
                ids +=',';
            }
        })
        //如果为空 提示用户 并返回
        if(ids == ''){
            this.$message({
                message:'不要吝啬你的钱包选一个吧',
                duration:1000
            })
            return
        }

        //多于的逗号去掉
        ids = ids.slice(0,-1);

        this.$router.push('/payOrder/'+ids)
      }
  }
};
</script>

<style scoped>
</style>
