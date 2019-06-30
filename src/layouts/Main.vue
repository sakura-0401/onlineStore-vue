<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light navbar-light mynav">
            <a class="navbar-brand" href="#"><img style="width: 50px" src="/static/img/logo.png" alt=""></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <router-link class="nav-link" to="/">主页 <span class="sr-only">(current)</span></router-link>
                    </li>
                    <li class="nav-item" v-show="!logged">
                        <router-link class="nav-link" to="/signIn">登录</router-link>
                    </li>
                    <li class="nav-item" v-show="!logged">
                        <router-link class="nav-link" to="/signUp">注册</router-link>
                    </li>
                    <li class="nav-item dropdown" v-show="logged">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {{username}}
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <router-link class="dropdown-item" to="/profile">个人主页</router-link>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" v-on:click="logout()">登出</a>
                        </div>
                    </li>
                </ul>
                <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="search" v-model="searchName" placeholder="商品"
                           aria-label="Search">
                    <button class="btn btn-true my-2 my-sm-0" v-on:click="search()" type="button">搜索</button>
                </form>
            </div>
        </nav>
        <slot></slot>
    </div>
</template>

<script>
    import VLink from '../components/VLink.vue'

    export default {
        components: {
            VLink
        },
        data() {
            return {
                username: '',
                logged: false,
                apiUrl: "http://127.0.0.1/user/",
                searchName: ''
            }
        },
        methods: {
            getLogged: async function () {
                const res = await this.$axios.get(`${this.apiUrl}logged`);
                this.logged = res.data
                if (this.logged) {
                    this.username = this.$localStorage.get("username")
                }
                //console.log("logged="+this.logged)
            },
            logout: async function () {
                const res = await this.$axios.get(this.apiUrl + 'logout')
                this.logged = false
                this.$localStorage.remove("username")
                //console.log("logged="+this.logged)
            },
            search: async function () {
//                const res=await this.$axios.get(`http://127.0.0.1/goods/search/${this.searchName}`)
//                this.$localStorage.set("sr",res.data)
                //console.log(this.$localStorage.set("sr",res.data))

                this.$router.push({path: "/search/" + this.searchName})
            }
        },
        created() {
            this.getLogged()
        }
    }
</script>

<style scoped>

</style>