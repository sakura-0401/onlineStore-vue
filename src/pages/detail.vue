<template>
    <main-layout>

        <!--商品详情页-->
        <div class="container">
            <div class="detail row">
                <div class="col-md-6 col-sm-12">
                    <img class="img-fluid" v-bind:src="goods.picture"/>
                </div>
                <div class="col-md-6 col-sm-12 msg row">
                    <div class="col-12 nopadding">
                        <h4 class="title">{{goods.name}}</h4>
                        <div>
                            原价&emsp;：<b class="price-useless">¥ {{getPrice() + 99}}.00</b>
                        </div>
                        <div class="">
                            <b>促销价：</b><b class="price">¥ {{goods.price}}.00</b>
                        </div>
                        <p>库存&emsp;：{{goods.quantity}} 件</p>
                        &emsp;&emsp;{{goods.desc}}
                    </div>
                    <div class="col-12 row btns align-items-end justify-content-center">
                        <div class="col-4 nopadding">
                            <button class="col btn btn-true" type="button" v-on:click="buy()">立即购买</button>
                        </div>
                    </div>


                </div>
            </div>
        </div>

        <div>
            <!-- Modal Component -->
            <b-modal id="modal1" v-bind:title="modal.title" v-model="modalShow" hide-footer>
                <p class="my-4">{{modal.content}}</p>
                <b-btn class="mt-3 btn-true " block @click="hideModal">{{modal.btnMsg}}</b-btn>
            </b-modal>
        </div>

    </main-layout>
</template>

<script>
    import MainLayout from '../layouts/Main.vue'
    import '../css/main.css'
    import '../css/detail.css'

    export default {
        components: {
            MainLayout
        },
        data() {
            return {
                apiUrl: 'http://127.0.0.1/goods/',
                goods: {},
                modalShow: false,
                logged: '',
                modal: {}
            }
        },
        methods: {
            hideModal() {
                this.modalShow=false;
                if (!this.logged){
                    this.$router.push("/signIn")
                }
            },
            getDetail: async function () {
                const res = await this.$axios.get(`${this.apiUrl}get/${this.$route.params.id}`)
                this.goods = res.data
                if (res.data === null) {
                    this.$router.go(-1)
                }
            },
            buy: async function () {
                const res = await this.$axios.get(`http://127.0.0.1/user/logged`)
                const logged=res.data
                this.logged = logged
                console.log(logged)
                if (!logged) {
                    this.modal = {
                        title: "出了一点小问题",
                        content:"购物前请先登录",
                        btnMsg:"去登录"
                    }
                    this.modalShow = true
                } else {
                    const data = {
                        username: this.$localStorage.get("username"),
                        goodsId: this.goods.id
                    }
                    const res = await this.$axios.post(this.apiUrl + 'buy', data)
                    if (res.data.status) {
                        this.modal = {
                            title: "购买成功！",
                            content:"您购买的商品将在三个工作日内送达",
                            btnMsg:"确定"
                        }
                        this.modalShow = true
                        this.goods.quantity-=1
                    } else {
                        this.modal = {
                            title: "出了一点小问题",
                            content:res.data.msg,
                            btnMsg:"确定"
                        }
                        this.modalShow = true
                    }
                }
            },
            getPrice:function(){
                const add=[103,122,145,167,180,200]
                return parseInt(this.goods.price)+add[this.goods.id%6]
            }
        },
        created() {
            this.getDetail()
        }
    }
</script>
