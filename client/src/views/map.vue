<template>
  <div class="list">
    <div class="amap-page-container">
      <el-amap vid="amap" :plugin="plugin" class="amap-demo" :center="center"></el-amap>
      <div class="toolbar">
        <span v-if="loaded">location:lng = {{lng}} lat = {{lat}}</span>
        <span v-else>正在定位</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "map",
  data() {
    return {
      center: [115.89, 28.68],
      lng: 0,
      lat: 0,
      loaded: false,
      plugin: [
        {
          pName: "Geolocation",
          events: {
            init(o) {
              o.getCurrentPosition((status, result) => {
                if (result&&result.position) {
                  this.lng = result.position.lng;
                  this.lat = result.position.lat;
                  this.center = [this.lng, this.lat];
                  this.loaded = true;
                  this.$nextTick();
                }
                console.log(status, result);
              });
            }
          }
        }
      ],
      ip: "114.247.50.2",
      key: "3f5bdc7cb6cfffbafe7fbbb18528d7bb"
    };
  }
};
</script>
<style lang="stylus" scoped>
.amap-page-container 
    width 100%;
    height 100%;
.amap-demo 
    width: 100%;
    height: 800px;
    display: block
</style>


