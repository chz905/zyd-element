<template>
  <div class="fence">
    {{ radius }}
    <baidu-map
      class="map"
      :center="map.center"
      :zoom="map.zoom"
      ak="9X9lGGBXZA0D8AuQlP0u6Od7URQeua9l"
      :scroll-wheel-zoom="true"
      @ready="handler"
      @click="aaa"
    >
      <bm-navigation></bm-navigation>
      <bm-scale></bm-scale>
      <bm-overview-map></bm-overview-map>

      <bm-marker :position="map.center" animation>
        <bm-circle
          :center="map.center"
          :radius="map.radius"
          stroke-color="blue"
          :stroke-opacity="0.5"
          :stroke-weight="2"
          @lineupdate="updateCirclePath"
          :editing="true"
        ></bm-circle>
      </bm-marker>
    </baidu-map>
  </div>
</template>

<script>
import {
  BaiduMap,
  BmNavigation,
  BmScale,
  BmOverviewMap,
  BmMarker,
  BmLabel,
  BmCircle
} from "vue-baidu-map";
export default {
  name: "Fence",
  data() {
    return {
      BMap: null,
      map: {
        center: { lng: 118.802422, lat: 32.065631 }, //'南京市',
        zoom: 15,
        radius: 500
      },
      radius:""
    };
  },
  components: {
    BaiduMap, //地图
    BmNavigation, //
    BmScale,
    BmOverviewMap,
    BmMarker,
    BmLabel,
    BmCircle
  },
  created() {},
  mounted() {},
  methods: {
    handler({ BMap, map }) {
      console.log(BMap, map);
      this.BMap = BMap;
    },
    aaa(a) {
      console.log(a.point.lng, a.point.lat);
      this.map.center.lng = a.point.lng;
      this.map.center.lat = a.point.lat;
    },
    dragging(data) {
      // console.log(data,'132131313')
      // this.map.center.lng = data.point.lng;
      // this.map.center.lat = data.point.lat;
    },
    updateCirclePath(e) {
      console.log(e.target.getCenter());
      console.log(e.target.getRadius());
      this.map.center = e.target.getCenter();
      //   this.map.radius = e.target.getRadius()
      this.radius = e.target.getRadius()
    }
  }
};
</script>

<style scoped>
.fence {
  height: 100%;
}
.map {
  width: 100%;
  height: 100%;
}
</style>