<template>
    <!--管理员界面-->
    <main-layout>
        <div class="col-md-6 offset-lg-3 col-sm-12 adminBtns row" v-show="!chosen.status">
            <div class="col">
                <button class="col btn btn-true" v-on:click="choose('创建商品')">创建商品</button>
            </div>
            <div class="col">
                <button class="col btn btn-true" v-on:click="choose('修改商品')">修改商品</button>
            </div>
        </div>
        <div class="col-md-6 offset-lg-3 col-sm-12" v-show="chosen.status">
            <div class="choose-list">
                <h4 class="title text-center">{{chosen.type}}</h4>
                <div class="padding10">
                    <input placeholder="请输入商品ID以获取数据" class="form-control sign-in col-10 offset-1"
                           v-show="(chosen.type ==='修改商品')" v-model="goodsId"/>
                    <input placeholder="商品名" class="form-control sign-in col-10 offset-1" v-model="goods.name"/>
                    <input placeholder="种类" class="form-control sign-in col-10 offset-1" v-model="goods.assort"/>
                    <textarea spellcheck="false" placeholder="描述" class="form-control sign-in col-10 offset-1" v-model="goods.desc"></textarea>
                    <input placeholder="图片地址" class="form-control sign-in col-10 offset-1" v-model="goods.picture"/>
                    <input placeholder="价格" class="form-control sign-in col-10 offset-1" v-model="goods.price"/>
                    <input placeholder="数量" class="form-control sign-in col-10 offset-1" v-model="goods.quantity"/>
                    <button class="btn btn-true col col-6 offset-3" v-on:click="submit()">提交</button>
                </div>
            </div>
        </div>

    </main-layout>
</template>

<script>
    import MainLayout from '../layouts/Main.vue'
    import '../css/main.css'

    export default {
        components: {
            MainLayout
        },
        data() {
            return {
                chosen: {
                    status: false,
                    type: ''
                },
                goods: {},
                apiUrl: "http://127.0.0.1/goods/",
                goodsId: null
            }
        },
        methods: {
            async getUser() {
                const res = await this.$axios.get('http://127.0.0.1/user/getUser')
                if (res.data !== null) {
                    this.user = res.data
                }
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

            },
            async checkAdmin() {
                let res = await this.$axios.get(`http://127.0.0.1/user/logged`)
                const logged = res.data
                if (!logged) {
                    this.$router.push('/')
                }
                res = await this.$axios.get('http://127.0.0.1/user/getUser')
                if (res.data.type === "admin") ;
                else {
                    this.$router.push('/')
                }
            },
            choose(type) {
                this.chosen = {
                    status: true,
                    type: type
                }
            },
            async submit() {
                if (this.chosen.type === '创建商品') {
                    const res=await this.$axios.post(this.apiUrl+'create',this.goods)
                    alert(res.data.msg)

                    if (res.data.status){
                        location.reload()
                    }
                }
                else {
                    const res=await this.$axios.post(this.apiUrl+'update/'+this.goodsId,this.goods)
                    alert(res.data.msg)
                    if (res.data.status){
                        location.reload()
                    }
                }
            },
            async getGoods(id) {
                const res = await this.$axios.get(`${this.apiUrl}get/${id}`)
                this.goods = res.data
            }
        },
        async created() {
            this.checkAdmin()
        },
        watch: {
            'goodsId'(to, from) {
                this.getGoods(to)
            }
        }
    }


</script>
<style scoped>
    .adminBtns{
        margin-top: 200px;

    }
</style>

