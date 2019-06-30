<template>
    <!--个人主页-->
    <main-layout>
        <div class="container">
            <div class="row">
                <div class="col-md-5 col-sm-12">
                    <div class="choose-list">
                        <h4 class="title text-center">个人信息</h4>
                        <div class="padding10">
                            <p>用户名&emsp;&emsp;：{{user.username}}</p>
                            <p>余额&emsp;&emsp;&emsp;：¥ {{user.money}}</p>
                            <p>已购商品数：{{goodsList.length}}</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-7 col-sm-12">
                    <div class="choose-list">
                        <h4 class="title text-center">余额充值</h4>
                        <div class="padding10">
                            <input class="form-control sign-in col-10 offset-1" placeholder="充值的金额"
                                   v-model="chargeMoney"/>
                            <button class="btn btn-true col-4 offset-4" v-on:click="charge()">充值</button>
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <div class="choose-list">
                        <h4 class="title text-center">已购买的宝贝</h4>
                        <div class="goods-list-my row col">
                            <div class="box col-lg-6 col-sm-12" v-for="(item,index) in goodsList">
                                <div class="goods row">
                                    <img class="col-3 image" v-bind:src="item.picture" style="display: block;">
                                    <h5 class="col-9 text-center">{{item.name}} <br>
                                        <b class="money">¥ {{item.price}}.00</b>
                                    </h5>
                                    <!--{{item}}-->
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>

    </main-layout>
</template>

<script>
    import MainLayout from '../layouts/Main.vue'
    import '../css/main.css'
    import '../css/signIn.css'

    export default {
        components: {
            MainLayout
        },
        data() {
            return {
                formData: {
                    username: '',
                    password: ''
                },
                error: {
                    status: true,
                    msg: 'test msg'
                },
                apiUrl: "http://127.0.0.1/user/",
                user: {
                    username: '',
                    money: 0
                },
                page: 0,
                chargeMoney: null,
                goodsList: []
            }
        },
        methods: {
            async getUser() {
                const res = await this.$axios.get('http://127.0.0.1/user/getUser')
                if (res.data !== null) {
                    this.user = res.data
                }
            },
            async getMyGoods() {
                const res = await this.$axios.get('http://127.0.0.1/goods/myGoods/' + this.page)
                this.goodsList = res.data
            },
            async charge() {
                if (this.chargeMoney < 0) {
                    return
                }
                const user = {
                    username: this.user.username,
                    money: parseInt(this.user.money) + parseInt(this.chargeMoney)
                }
                const res = await this.$axios.post(this.apiUrl + 'charge', this.user)
                if (res.status) {
                    this.user.money = parseInt(this.user.money) + parseInt(this.chargeMoney)
                    this.chargeMoney = null
                }

            }
        },
        async created() {
            const res = await this.$axios.get(`http://127.0.0.1/user/logged`)
            const logged = res.data
            if (!logged) {
                this.$router.go(-1)
            }

            this.getUser()
            this.getMyGoods()
        }
    }


</script>
<style scoped>
    .goods-list-my {
        opacity: 1;
    }

    .image {
        width: 100px !important;
        height: 100px !important;
    }

    .money {
        color: #ED705B;
    }
</style>

