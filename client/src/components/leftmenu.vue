<template>
  <div class="sidebar">
    <el-row class="menu_page">
      <el-col>
        <el-menu
          mode="vertical"
          :collapse="collapse"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <router-link to='/home'>
            <el-menu-item index="0"> 
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </el-menu-item>
          </router-link>
          <router-link to="/staff">
            <el-menu-item index="1">
              <i class="el-icon-service"></i>
              <span slot="title">用户信息</span>
            </el-menu-item>
          </router-link>
          <router-link to="/listUser">
            <el-menu-item>
              <i class="el-icon-mobile-phone"></i>
              <span slot="title">信息列表</span>
            </el-menu-item>
          </router-link>
          <template v-for="item in items">
              <el-submenu v-if='item.children' :index= 'item.path' :key='item.path'>
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span slot="title">{{item.name}}</span>
                </template>
                <router-link v-for="(citem,cindex) in item.children" :to="citem.path" :key="cindex">
                  <el-menu-item :index='citem.path'>
                    <span slot="title">{{citem.name}}</span>
                  </el-menu-item>
                </router-link>
              </el-submenu>
          </template>
          <router-link to="map">
            <el-menu-item index="3">
              <i class="el-icon-location-outline"></i>
              <span slot="title">地图展示</span>
            </el-menu-item>
          </router-link>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import bus from '../common/bus'
export default {
  name:'leftMenu',
  data() {
    return {
      collapse:false,
      items:[
        {
          icon:'el-icon-document',
          name:'资金流水',
          path:'fund',
          children:[
            {
              path:'FundList',
              name:'资金流水'
            },
            {
              path:'PayList',
              name:'支付单据'
            }
          ],
        },
        {
          icon:'el-icon-setting',
          name:'信息管理',
          path:'info',
          children:[
            {
              path:'infoShow',
              name:'infoShow',
            },
            {
              // path:'editor',
              // name:'editor',
            },
            {
              path:'markdown',
              name:'markdown'
            }
          ]
        }
      ]
    }
  },
    created() {
    bus.$on('collapse',msg=>{
      this.collapse = msg
      })
    },
};
</script>


<style lang="stylus" scoped>

.sidebar
  width 0
  .menu_page
    position fixed 
    top 71px 
    left 0
    min-height 100% 
    background rgb(84, 92, 100);
    z-index 99
    .el-menu-vertical-demo:not(.el-menu--collapse)
      width 180px
      height 100%
      .el-submenu
        .el-menu-item 
          min-width 180px           
a
  text-decoration none
.el-menu 
  border none
</style>