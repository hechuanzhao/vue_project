<template>
    <header class="header-nav">
        <el-row class="row">
            <el-col :span="6" class="logo-container">
                <!-- 折叠按钮 -->
                <div class="collapse-btn" @click="collapseChange">
                    <i class="el-icon-menu icon-btn"></i>
                </div>
                <span class="title">后台管理系统</span>
            </el-col>
            <el-col :span="6" class="user">
                <!-- <div class="btn-fullscreen icon-font"></div> -->
                <div class="userinfo">
                    <div class="btn-fullscreen icon-font">
                        <el-tooltip class="item" effect="dark" content="锁屏" placement="bottom">
                            <i class="iconfont icon-bofangqi-suoping" @click="handleLockScreen"></i>
                        </el-tooltip>
                    </div>
                    <div class="btn-fullscreen icon-font">
                        <el-tooltip class="item" effect="dark" content="跳转到">
                            <a href="http://" target="_blank" rel="noopener noreferrer">
                                <i class="iconfont icon-github"></i>
                            </a>
                        </el-tooltip>
                    </div>
                    <!-- 换色 -->
                    <div class="btn-fullscreen icon-font">
                        <el-tooltip class="item" effect="dark" content="换色" placement="bottom">
                            <theme/>
                        </el-tooltip>
                    </div>
                    <!-- 全屏显示 -->
                    <div class="btn-fullscreen" @click="handleFullScreen">
                        <el-tooltip effect="dark" :content="fullscreen ? '取消全屏' : '全屏' " placement="bottom">
                            <i class="el-icon-rank"></i>
                        </el-tooltip>
                    </div>
                    <img :src="users.avatar" class="avatar">
                    <div class="welcome">
                        <p class="name comename">欢迎</p>
                        <p class="name avatarname">{{users.name}}</p>
                    </div>
                    <span class="username">
                        <el-dropdown trigger="click" @command="setDialogInfo">
                            <span class="el-dropdown-link">
                                <i class="el-icon-caret-bottom el-icon-right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                                <el-dropdown-item command="logout">退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </span>
                </div>
            </el-col>
        </el-row>
    </header>
</template>
<script>
import theme from '@/components/theme'
import bus from '@/common/bus'
//import Aplayer from 'vue-player'
export default {
    name:'header',
    data() {
        return {
            collapse:false,
            fullscreen:false,
            showlrc:true
        }
    },
    computed: {
        users(){
            return this.$store.getters.user
        }
    },
    methods:{
        setDialogInfo(cmditem){
            switch(cmditem){
                case 'info':
                    this.showInfoList()
                    break
                case 'logout':
                    this.loginout()
                    break
            }
        },
        handleLockScreen(){
            this.$confirm("是否要进行锁屏","提示",{
                confirmBottonText:"确定",
                cancelBottonText:"取消",
                type:"warning"
            }).then(()=>{
                this.$message({
                    type:"success",
                    message:"锁屏成功"
                })
                setTimeout(()=>{
                    this.$router.push("/lock")
                },100)
            }).catch(()=>{
                this.$message({
                    type:"error",
                    message:"锁屏失败"
                })
            })
        },
        showInfoList(){
            this.$router.push("/InfoShow")
        },
        loginout(){
            localStorage.removeItem("eleToken")
            this.$store.dispatch("createUser")
            this.$router.push("/login")
        },
        collapseChange(){
            this.collapse = !this.collapse
            bus.$emit("collapse",this.collapse)
        },
        handleFullScreen(){
            let element = document.documentElement
            console.log(element)
            if(this.fullscreen){
                if(document.exitFullscreen){
                    document.exitFullscreen()
                }else if(document.webkitCancelFullScreen){
                    document.webkitCancelFullScreen()
                }else if(document.mozCancelFullScreen){
                    document.mozCancelFullScreen()
                }else if(document.msExitlFullscreen){
                    document.msExitFullscreen()
                }
            }else{
                if(element.requestFullscreen){
                    element.requestFullscreen()
                }else if(element.webkitRequestFullScreen){
                    element.webkitRequestFullScreen()
                }else if(element.mozRequestFullScreen){
                    element.mozRequestFullScreen()
                }else if(element.msRequestFullscreen){
                    element.msExitFullscreen()
                }
            }
            this.fullscreen = !this.fullscreen
        }
    },
    components:{
        theme,
        //Aplayer,
    }
}
</script>


<style lang="stylus" scoped>
.header-nav
  width 100% 
  height 60px 
  background #324057
  color #fff 
  border-bottom 1px solid #1f2d3d 
  overflow  hidden 
  padding 5px 0
  .row
    .logo-container
      line-height 60px 
      min-width 400px 
      padding 0 5px
      .collapse-btn 
        width 50px
        margin-left 20px 
        display inline-block
        .icon-btn 
          font-size 36px 
          vertical-align middle 
          cursor pointer 
    .user 
      line-height 60px 
      text-align right
      float right
      padding-right 10px
      .userinfo
        display inline-block
        line-height 6px
        .btn-fullscreen
          display inline-block
          font-size 24px 
          vertical-align middle 
          margin-right 20px 
          transform rotate(45deg)
          display inline-block
          line-height 6px
          .item 
            display inline-block
        .icon-font 
          transform none
        .avatar
          width 40px 
          height 40px 
          border-radius 50% 
          vertical-align middle 
          display inline-block
        .welcome 
          display inline-block
          width auto 
          vertical-align middle 
          padding 0 5px
</style>
