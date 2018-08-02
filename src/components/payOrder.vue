<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
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
                                <li class="active">
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
                    <div class="cart-box">
                        <el-form status-icon :model="orderInfo" ref='orderInfo' :rules="rules" label-width="100px" class="demo-ruleForm">
                            <h2 class="slide-tit">
                                <span>1、收货地址</span>
                            </h2>
                            <div id="orderForm" name="orderForm" url="">
                                <!-- 自己新增的表单元素 element-ui中的 -->
                                <el-form-item label="收货人姓名" prop="accept_name">
                                    <el-input style='width:500px' v-model="orderInfo.accept_name"></el-input>
                                </el-form-item>
                                <el-form-item label="所属地区" prop="accept_name">
                                   <VDistpicker  @selected='selected($event)' :province='orderInfo.area.province.value' :city='orderInfo.area.city.value' :area='orderInfo.area.area.value'></VDistpicker>
                                </el-form-item>
                                <el-form-item label="收货地址" prop="address">
                                    <el-input style='width:500px' v-model="orderInfo.address"></el-input>
                                </el-form-item>
                                <el-form-item label="手机号" prop="mobile">
                                    <el-input style='width:500px' v-model="orderInfo.mobile"></el-input>
                                </el-form-item>
                                <el-form-item label="邮箱" prop="email">
                                    <el-input style='width:500px' v-model="orderInfo.email"></el-input>
                                </el-form-item>
                                <el-form-item label="邮政编码" prop="post_code">
                                    <el-input style='width:500px' v-model="orderInfo.post_code"></el-input>
                                </el-form-item>
                                
                                
                                <h2 class="slide-tit">
                                    <span>2、支付方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <label>
                                            
                                            <el-radio v-model="orderInfo.payment_id" label="6" >在线支付</el-radio>
                                            &nbsp;<em>手续费：0.00元</em>
                                        </label>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>3、配送方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <label>
                                            <el-radio-group v-model="orderInfo.express_id" @change='expressChange($event)'>
                                                <el-radio label="1">顺丰快递&nbsp;<em>20元</em></el-radio>
                                                <el-radio label="2">圆通快递&nbsp;<em>12元</em></el-radio>
                                                <el-radio label="3">韵达快递&nbsp;<em>8元</em></el-radio>
                                            </el-radio-group>
                                        </label>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>4、商品清单</span>
                                </h2>
                                <div class="line15"></div>
                                <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                    <tbody>
                                        <tr>
                                            <th colspan="2" align="left">商品信息</th>
                                            <th width="84" align="left">单价</th>
                                            <th width="84" align="center">购买数量</th>
                                            <th width="104" align="left">金额(元)</th>
                                        </tr>
                                        <tr v-for="(item, index) in goodslist" :key="item.id">
                                            <td width="68">
                                                <a target="_blank" href="/goods/show-89.html">
                                                    <img :src="item.img_url" class="img">
                                                </a>
                                            </td>
                                            <td>
                                                <a target="_blank" href="/goods/show-89.html">{{item.title}}</a>
                                            </td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.sell_price}}
                                                </span>
                                            </td>
                                            <td align="center">{{item.buycount}}</td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.buycount*item.sell_price}}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="line15"></div>
                                <h2 class="slide-tit">
                                    <span>5、结算信息</span>
                                </h2>
                                <div class="buy-foot clearfix">
                                    <div class="left-box">
                                        <dl>
                                            <dt>订单备注(100字符以内)</dt>
                                            <dd>
                                                <textarea name="message" class="input" style="height:35px;">{{orderInfo.message}}</textarea>
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="right-box">
                                        <p>
                                            商品
                                            <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                            <label id="goodsAmount" class="price">{{totalPrice}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                        </p>
                                        <p>
                                            运费：￥
                                            <label id="expressFee" class="price">{{orderInfo.expressMoment}}</label> 元
                                        </p>
                                        <p class="txt-box">
                                            应付总金额：￥
                                            <label id="totalAmount" class="price">{{orderInfo.goodsAmount}}</label>
                                        </p>
                                        <p class="btn-box">
                                            <router-link to="/buycart">
                                                <button class="btn button">返回购物车</button>
                                            </router-link>
                                            <a @click="submitForm('orderInfo')" id="btnSubmit" class="btn submit">确认提交</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import VDistpicker from 'v-distpicker'

export default {
  name: "payOrder",
  data: function() {
    // 自定义的验证规则
    // value 输入的值
    // rule 规则
    // callback 回调
    var validateMobile = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        // 定义正则规则
        let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        // 验证
        if (reg.test(value)) {
          // 对
          callback();
        } else {
          // 错
          callback(new Error("请输入正确的手机号"));
        }
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("邮箱不能为空"));
      } else {
        // 定义正则规则
        let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        // 验证
        if (reg.test(value)) {
          // 对
          callback();
        } else {
          // 错
          callback(new Error("请输入正确的邮箱地址"));
        }
      }
    };
    var validatePostCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("邮编"));
      } else {
        // 定义正则规则
        let reg = /^[1-9]\d{5}(?!\d)$/;
        // 验证
        if (reg.test(value)) {
          // 对
          callback();
        } else {
          // 错
          callback(new Error("请输入正确的邮编"));
        }
      }
    };

    return {
        //商品数据
        goodslist:[],
        //表单数据
      orderInfo: {
        accept_name: "尼姑拉丝赵四",
        address: "甲岸桥底4号下水道5号床铺下铺",
        mobile: 18888888888,
        email: "nigulasi@github.com",
        post_code: "518000",
        area: {
          province: {
            code: "530000",
            value: "云南省"
          },
          city: {
            code: "532300",
            value: "楚雄彝族自治州"
          },
          area: {
            code: "532325",
            value: "姚安县"
          }
        },
        // 支付方式
        payment_id:'6',
        //快递选择
        express_id:'1',
        //快递费
        expressMoment:20,
        //总金额
        goodsAmount:0,
        //订单备注消息
        message:'快一点!!! 快一点!!!',
        //商品id
        goodsids:'',
        //购买商品对象 键是id 值是数量
        cargoodsobj:''
      },
      rules: {
        accept_name: [
          { required: true, message: "请输入收件人姓名", trigger: "blur" },
          { min: 2, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入收货地址", trigger: "change" },
          { min: 2, message: "请输入的详细一些哦", trigger: "change" }
        ],
        mobile: [{ validator: validateMobile, trigger: "change" }],
        email: [{ validator: validateEmail, trigger: "change" }],
        post_code: [{ validator: validatePostCode, trigger: "change" }]
      }
    };
  },
  methods:{
      //省市联动 这个方法可以放回 省市区的值
      selected(value){
          //赋值给原本的area
        this.orderInfo.area = value;
        
      },
      //选择快递
      expressChange(value){
        //   console.log(value)
        switch (value) {
            case '1':
                this.orderInfo.expressMoment = 20            
            break;
            case '2':
                this.orderInfo.expressMoment = 12            
            break;
            case '3':
                this.orderInfo.expressMoment = 8           
            break;
           
        }
        //当选不同快递的时候重新选赋值
         this.orderInfo.goodsAmount = this.totalPrice + this.orderInfo.expressMoment; 
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.axios.post('site/validate/order/setorder',this.orderInfo)
                .then(response=>{
                    // console.log(response);
                    //提交订单之后应该把存在本地购物车对应的数据删除
                    //拿到id 
                    let idsAdd = this.orderInfo.goodsids.split(',');
                    // console.log(idsAdd);  ["88", "90", "92", "93", "94"]
                    idsAdd.forEach(v=>{
                        this.$store.commit('delGoodById',v)
                    })
                    //跳转到订单详情页面
                    this.$router.push('/orderInfo/' + response.data.message.orderid)
                })
          } else {
            this.$Message.error('信息不完整')
            return false;
          }
        });
      }
  },
  //创建完毕
  created(){
      //传过来的id
      //console.log(this.$route.params.ids);
    this.axios.get('site/validate/order/getgoodslist/'+this.$route.params.ids)
        .then(response=>{
            //获取vuex中的购买数量
            let buyList = this.$store.state.buyList;
            console.log(buyList)
            //处理数据
            response.data.message.forEach(v => {
                v.buycount = buyList[v.id];
            });
            //赋值给页面中的数据
            this.goodslist = response.data.message;
            //加上运费的总金额
            this.orderInfo.goodsAmount = this.totalPrice + this.orderInfo.expressMoment; 
            //商品id
            this.orderInfo.goodsids = this.$route.params.ids;
            //购买商品对象
            let temObj ={};
            this.goodslist.forEach(v=>{
                temObj[v.id] = v.buycount;
            })
            this.orderInfo.cargoodsobj = temObj;
        })
  },
  //计算属性
  computed:{
      //计算总件数
      totalCount(){
          let con = 0;
          this.goodslist.forEach(v=>{
              con += v.buycount
          })
          return con
      },

      //计算金额
      totalPrice(){
          let pic = 0;
          this.goodslist.forEach(v=>{
              pic += v.buycount * v.sell_price
            //   console.log(pic)
          })
          return pic;
      }
  },
    //注册组件
    components: { VDistpicker }
};
</script>

<style scoped>
</style>

