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
            @click="checkTrack(index,item.tagcode)"
          >
            <p>{{ item.ownername }}</p>
            <el-popover placement="top" trigger="hover">
              <p>确定要删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button type="primary" size="mini" @click.stop="delet(index)">确定</el-button>
              </div>
              <i class="el-icon-delete" slot="reference"></i>
            </el-popover>
          </li>
        </ul>
      </div>
    </div>
    <div class="map_con">
      <div class="queryTracking">
        <div class="queryTime">
          <div>
            <span>开始时间：</span>
            <el-date-picker
              v-model="findTrack.startTime"
              type="datetime"
              placeholder="选择开始时间"
              size="small"
            ></el-date-picker>
          </div>
          <div>
            <span>结束时间：</span>
            <el-date-picker
              v-model="findTrack.endTime"
              type="datetime"
              placeholder="选择结束时间"
              size="small"
            ></el-date-picker>
          </div>
          <div>
            <el-button type="primary" size="small" @click="queryTrack">查询</el-button>
          </div>
        </div>
        <div>
          <!-- <el-button type="primary" size="small" @click="start">开始</el-button>
          <el-button type="success" size="small" @click="stop">暂停</el-button>
          <el-button type="info" size="small" @click="pause">重置</el-button> -->
        </div>
      </div>
      <baidu-map
        class="map"
        :center="map.center"
        :zoom="map.zoom"
        ak="9X9lGGBXZA0D8AuQlP0u6Od7URQeua9l"
        :scroll-wheel-zoom="true"
        @ready="handler"
      >
        <!-- 控件 -->
        <bm-navigation></bm-navigation>
        <bm-scale></bm-scale>
        <bm-overview-map></bm-overview-map>
        <!-- 控件 -->
        <bm-marker
          :position="map.start"
          :icon="{url: 'http://developer.baidu.com/map/jsdemo/img/fox.gif', size: {width: 300, height: 157}}"
        ></bm-marker>
        <bm-marker
          :position="map.end"
          :icon="{url: 'http://developer.baidu.com/map/jsdemo/img/fox.gif', size: {width: 300, height: 157}}"
        ></bm-marker>
        <bm-marker
          :position="map.center"
          :dragging="false"
          @dragging="dragging"
          animation="BMAP_ANIMATION_BOUNCE"
        >
          <bm-polyline
            @stop="stop"
            @start="start"
            @pause="pause"
            :path="polylinePath"
            stroke-color="#18a45b"
            :stroke-opacity="0.8"
            :stroke-weight="5"
          ></bm-polyline>
          <bml-lushu
            :path="polylinePath"
            :icon="icon"
            :play="play"
            :rotation="true"
            :autoView="true"
          ></bml-lushu>
        </bm-marker>
      </baidu-map>
    </div>
  </div>
</template>

<script>
import {
  BaiduMap,
  BmNavigation,
  BmScale,
  BmOverviewMap,
  BmMarker,
  BmPolyline,
  BmlLushu
} from "vue-baidu-map";
import { findCar, findTrack, carList } from "@/utils/api";
export default {
  name: "Tracking",
  data() {
    return {
      carName: "",
      carList: [],
      isActive: 0,
      visible: null,
      map: {
        center: { lng: 116.404, lat: 39.915 },
        start: {},
        end: {},
        zoom: 15,
        radius: 500
      },
      polylinePath: [],
      play: true, //是否进行
      icon: {
        url: "http://api.map.baidu.com/library/LuShu/1.2/examples/car.png",
        size: { width: 52, height: 26 },
        opts: { anchor: { width: 27, height: 13 } }
      },
      findTrack: {
        tagcode: "",
        startTime: "",
        endTime: ""
      }
    };
  },
  created() {
    this.query();
  },
  components: {
    BaiduMap,
    BmNavigation,
    BmScale,
    BmOverviewMap,
    BmMarker,
    BmlLushu,
    BmPolyline
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
      //   console.log(res);
      // });
    },
    queryTrack() {
      console.log(this.findTrack);
      this.polylinePath = [];
      findTrack(this.findTrack).then(res => {
        if (res.status == -1) {
          this.$message.error(res.data);
        }
        console.log(res);
        this.map.center.lng = res.data[0].longitude;
        this.map.center.lat = res.data[0].latitudes;
        for (let index in res.data) {
          //   console.log(res.data[index]);
          if (index == 0) {
            this.map.start = new BMap.Point(
              Number(res.data[index].longitude),
              Number(res.data[index].latitudes)
            );
          }
          if (index == res.data.length-1) {
            this.map.end = new BMap.Point(
              Number(res.data[index].longitude),
              Number(res.data[index].latitudes)
            );
          }
          this.polylinePath.push(
            new BMap.Point(
              Number(res.data[index].longitude),
              Number(res.data[index].latitudes)
            )
          );
        }
      });
    },
    checkTrack(index, tagcode) {
      this.isActive = index;
      //   console.log(index, id);
      this.polylinePath = [];
      this.findTrack.tagcode = tagcode;
    },
    delet(index) {
      console.log(index);
    },
    on_no() {},
    on_ok() {},
    handler({ BMap, map }) {
      console.log(BMap, map);
    },
    dragging(data) {},
    start() {
      console.log("跑完了");
      this.play = true;
    },
    stop(e) {
      console.log("停止本次移动", e);
      this.play = true;
    },
    pause() {}
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
.queryTracking {
  height: 50px;
  border-bottom: 1px solid #ddd;
  display: flex;
  box-sizing: border-box;
  padding: 10px 16px;
}
.map {
  width: 100%;
  height: calc(100% - 50px);
}
.queryTracking .queryTime {
  display: flex;
  color: #666;
  font-size: 14px;
  flex-grow: 1;
}
.queryTracking .queryTime div {
  margin-right: 10px;
}
</style>