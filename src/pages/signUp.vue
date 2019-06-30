<template>
    <!--注册页-->
    <main-layout>
        <div class="container">
            <div class="row justify-content-center sign ">
                <form name="signInForm" id="signInForm" class="form col-lg-4 col-sm-10" ng-submit="submit()">
                    <div class="col-12 text-center">
                        <img class="col-8 logo" src="/static/img/logo.png" alt="">
                        <h4 class="logo-text">童心未泯</h4>
                    </div>
                    <div class="title col-xs-12">
                        <router-link class="label-"to="/signIn">登录</router-link>
                        <b class="divider">·</b>
                        <b class="label- label-active" >注册</b>
                    </div>
                    <fieldset class="col-xs-12">
                        <!--从服务器获取的错误信息-->
                        <div class="alert alert-warning alert-dismissable col-xs-12"
                             v-show="!error.status">
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span
                                    aria-hidden="true">&times;</span></button>
                            <p class="text-center">{{error.msg}}</p>
                        </div>
                        <input class="form-control sign-in col-xs-12" type="text" name="username"
                               placeholder="username" v-model="formData.username" required title="username is required">
                        <input class="form-control sign-in col-xs-12" type="password" name="password" placeholder="password" v-model="formData.password" required title="password is required">
                        <button type="button"v-on:click="submit()"
                                class="btn btn-true col-sm">注册天狐
                        </button>
                    </fieldset>
                </form>
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
                apiUrl:"http://127.0.0.1/user/"
            }
        },
        methods: {
            submit:async function () {
                const data={
                    username:this.formData.username,
                    password:this.formData.password
                }
                const res=await this.$axios.post(`${this.apiUrl}register`,this.formData,{emulateJSON:true})

                console.log(res.data)

                if (!res.data.status){
                    //出错
                    this.error =res.data
                }
                else {
                    this.$localStorage.set("username",this.formData.username)
                    console.log(this.$localStorage.get("username"))
                    this.$router.push({path:'/'})
                }
            }
        }
    }



</script>

