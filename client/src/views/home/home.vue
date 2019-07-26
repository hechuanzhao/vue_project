<template>
    <div class="home">
        <div class="container">
            <HomeTop></HomeTop>
            <BaseCharts/>
        </div>
    </div>
</template>
<script>
import HomeTop from '@/views/home/home-top'
import BaseCharts from '@/views/home/base-chart'
export default {
    name:'home',
    components:{
        HomeTop,
        BaseCharts
    },
}
</script>
<style lang="stylus" scoped>
.home 
    width 100% 
    .container 
        width 100% 
        height 100% 
        box-sizing border-box
        background-color white
        text-align center
</style>
