<template>
    <div class="index">
        <Header></Header>
        <LeftMenu></LeftMenu>
        <div class="rightContainer" :class="{'content-collapse':collapse}">
            <Tags/>
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/header'
import LeftMenu from '@/components/leftmenu'
import bus from '@/common/bus'
import Tags from '@/components/tags'
export default {
    name:'index',
    data() {
        return {
            tagList:[],
            collapse:false
        }
    },
    components:{
        Header,
        LeftMenu,
        Tags
    },
    created() {
        //内容区域跟随变化
        bus.$on("collapse",msg =>{
            console.log(msg)
            this.collapse = msg
        })
        //只有标签页列表里的页面才使用keep-alive，即关闭标签后就不保存到内存中了。
        bus.$on("tags",msg =>{
            let arr = []
            for(let i = 0 ,len = msg.length; i< len; i ++){
                msg[i].name && arr.push(msg[i].name)
            }
            this.tagList = arr 
            console.log(tags)
        })
    },
}
</script>

<style lang="stylus" scoped>
.index
    width auto 
    height 100%
    overflow hidden 
    .rightContainer 
        position absolute
        left 180px
        right 0
        height 100%
        overflow-y scroll 
        padding-bottom 30px
        transition left 0.3s ease-in-out  
    .rightContainer.content-collapse
        left 64px 
    .content 
        width auto 
        height 100% 
        padding 10px 
        overflow-y scroll 
        box-sizing border-box
</style>
