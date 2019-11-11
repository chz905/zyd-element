<template>
  <div class="tracking">
    <div class="car_list">
      <div class="list_btn">
        <el-input v-model="carName" placeholder="请输入内容" size="small" suffix-icon="el-icon-search"></el-input>
        <el-button type="primary" size="small" style="margin-left: 10px;">添加</el-button>
      </div>
      <div class="list">
        <h3>车辆列表</h3>
        <ul>
          <li
            v-for="(item,index) in search"
            :key="index"
            :class="{color: isActive == index}"
            @click="checkTrack(index,item.id)"
          >
            <p>{{ item.ownername }}</p>
            <el-popover placement="top" trigger="hover">
              <p>确定要删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button
                  type="primary"
                  size="mini"
                  @click.stop="delet(index)"
                >确定</el-button>
              </div>
              <i class="el-icon-delete" slot="reference"></i>
            </el-popover>
            
          </li>
        </ul>
      </div>
    </div>
    <div class="map_con">
      <baidu-map
        class="map"
        :center="map.center"
        :zoom="map.zoom"
        ak="9X9lGGBXZA0D8AuQlP0u6Od7URQeua9l"
        :scroll-wheel-zoom="true"
        @ready="handler"
      >
        <bm-navigation></bm-navigation>
        <bm-scale></bm-scale>
        <bm-overview-map></bm-overview-map>
        <bm-marker
          :position="map.center"
          :dragging="false"
          @dragging="dragging"
          animation="BMAP_ANIMATION_BOUNCE"
        ></bm-marker>
      </baidu-map>
    </div>
  </div>
</template>

<script>
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
import BmNavigation from "vue-baidu-map/components/controls/Navigation";
import BmScale from "vue-baidu-map/components/controls/Scale";
import BmOverviewMap from "vue-baidu-map/components/controls/OverviewMap";
import BmMarker from "vue-baidu-map/components/overlays/Marker";
import { findCar, findTrackNewOne, carList } from "@/utils/api";
import { request } from 'http';
export default {
  name: "Tracking",
  data() {
    return {
      carName: "",
      carList: [],
      isActive: 0,
      map: {
        center: { lng: 118.802422, lat: 32.065631 }, //'南京市',
        zoom: 15,
        radius: 500
      }
    };
  },
  components: {
    BaiduMap,
    BmNavigation,
    BmScale,
    BmOverviewMap,
    BmMarker
  },
  created() {
    this.query();
  },
  methods: {
    query() {
      carList({}).then(res => {
          console.log(res)
          this.carList = res.data
      })
      // findCar({
      //   ownername: "",
      //   cardid: "",
      //   vinno: "",
      //   tagcode: "",
      //   currentPage: 1,
      //   pageSize: 50
      // }).then(res => {
      //   this.carList = res.data.items;
      // });
    },
    checkTrack(index, id) {
      this.isActive = index;
      //   console.log(index, id);
      findTrackNewOne({ id: id }).then(res => {
        console.log(res);
        this.map.center.lng = res.data.longitude;
        this.map.center.lat = res.data.latitudes;
      });
    },
    delet(index) {
      console.log(index);
    },
    on_no() {},
    on_ok() {},
    handler({ BMap, map }) {
      console.log(BMap, map);
    },
    dragging(data) {}
  },
  computed: {
    search() {
      return this.carList.filter(item => {
        return item.ownername.match(this.carName);
      });
    }
  }
};
</script>

<style scoped>
.tracking {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 8px;
  box-sizing: border-box;
}
.car_list {
  width: 280px;
  height: 100%;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  background: #ffffff;
}
.list_btn {
  display: flex;
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #ddd;
}
.list {
  flex: 1;
  height: 100%;
}
.list h3 {
  background: #f4f4f4;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  color: #333;
  padding-left: 18px;
  border-bottom: 1px solid #ddd;
}
.list ul {
  height: calc(100% - 40px);
  overflow: auto;
}
.list ul li {
  padding: 12px 9px;
  font-size: 14px;
  color: #666;
  border-bottom: 1px solid #ddd;
  display: flex;
  color: #666;
  cursor: pointer;
}
.list ul li:nth-child(odd) {
  background: #fbfbfb;
}
.color {
  background: rgb(234, 243, 253) !important;
}
.list ul li:hover {
  background: rgb(234, 243, 253);
}
.list ul li p {
  flex-grow: 1;
}
.map_con {
  flex: 1;
  margin-left: 14px;
  border: 1px solid #ddd;
  box-shadow: 0 0 20px rgba(170, 170, 170, 0.5);
}
.map {
  width: 100%;
  height: 100%;
}
</style>