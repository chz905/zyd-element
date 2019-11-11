<template>
  <div class="tracking">
    <div class="car_list">
      <div class="list_btn">
        <el-input v-model="carName" placeholder="请输入内容" size="small" suffix-icon="el-icon-search"></el-input>
        <el-button type="primary" size="small" style="margin-left: 10px;" @click="add_fence">添加</el-button>
      </div>
      <div class="list">
        <h3>车辆列表</h3>
        <ul>
          <li
            v-for="(item,index) in search"
            :key="index"
            :class="{color: isActive == index}"
            @click="checkTrack(index,item)"
          >
            <p>{{ item.railname }}</p>
            <el-popover placement="top" trigger="hover">
              <p>确定要删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button type="primary" size="mini" @click.stop="delet(item.id)">确定</el-button>
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
        <bm-circle
          :center="map.center"
          :radius="map.radius"
          stroke-color="blue"
          :stroke-opacity="0.5"
          :stroke-weight="2"
          @mouseover="mouseoverCircle"
          @mouseout="mouseoutCircle"
        ></bm-circle>
        <!-- map.show -->
        <bm-info-window :position="map.center" title="围栏信息" :show="map.show">
          <ul class="fenceinfo">
            <li>围栏名称：{{ map.railname }}</li>
            <li>围栏半径：{{ map.radius }}米</li>
            <li>报警类型：{{ map.railtype | railtype}}</li>
            <br />
          </ul>
        </bm-info-window>
      </baidu-map>
    </div>

    <!-- 对话框 -->
    <div class="dialog">
      <el-dialog title="添加围栏" :visible.sync="dialogVisible">
        <div class="dialog_con">
          <div class="dialog_form">
            <div class="text">
              <h3>围栏设置</h3>
              <div>
                <el-input v-model="fence.railname" placeholder="请输入围栏名称" size="small"></el-input>
                <div class="radius">
                  <span>围栏半径：</span>
                  <el-input v-model="fence.radius" placeholder="围栏半径" size="small"></el-input>
                  <span>（米）</span>
                </div>
              </div>
            </div>
            <div class="type">
              <div>
                <h3>报警类型</h3>
                <div class="type_radio">
                  <ul>
                    <li>
                      <el-radio v-model="fence.railtype" label="0">出围栏报警</el-radio>
                    </li>
                    <li>
                      <el-radio v-model="fence.railtype" label="1">入围栏报警</el-radio>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="dialog_save">
                <el-button type="primary" size="small" style="width: 100%" @click="fenceConfirm">保存</el-button>
              </div>
            </div>
          </div>
          <div class="dialog_map">
            <baidu-map
              class="map"
              :center="onMap.center"
              :zoom="onMap.zoom"
              ak="9X9lGGBXZA0D8AuQlP0u6Od7URQeua9l"
              :scroll-wheel-zoom="true"
              @ready="handler"
              @click="on_map"
            >
              <bm-navigation></bm-navigation>
              <bm-scale></bm-scale>
              <bm-overview-map></bm-overview-map>

              <bm-marker :position="onMap.center" :dragging="false" @dragging="dragging" animation>
                <bm-circle
                  :center="onMap.center"
                  :radius="fence.radius"
                  stroke-color="blue"
                  :stroke-opacity="0.5"
                  :stroke-weight="2"
                  @lineupdate="updateCirclePath"
                  :editing="true"
                ></bm-circle>
              </bm-marker>
            </baidu-map>
          </div>
        </div>
      </el-dialog>
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
  BmInfoWindow,
  BmLabel,
  BmCircle
} from "vue-baidu-map";
import { findTrackNewOne, addFence, listFence, deleteFence } from "@/utils/api";
import { showLoading, hideLoading } from "@/utils/loading";
export default {
  name: "Tracking",
  data() {
    return {
      carName: "",
      carList: [],
      isActive: 0,
      visible: null,
      map: {
        center: { lng: 118.802422, lat: 32.065631 }, //'南京市',
        zoom: 15,
        radius: "", //半径
        show: false, //是否展示信息框
        railtype: "", //报警类型
        railname: "" //围栏名称
      },
      dialogVisible: false,
      fence: {
        railname: "",
        radius: 200,
        longitude: "",
        latitude: "",
        railtype: "0"
      },
      onMap: {
        center: { lng: 118.802422, lat: 32.065631 }, //'南京市',
        zoom: 15
      }
    };
  },
  components: {
    BaiduMap,
    BmNavigation,
    BmScale,
    BmOverviewMap,
    BmMarker,
    BmInfoWindow,
    BmLabel,
    BmCircle
  },
  created() {
    this.query();
  },
  methods: {
    query() {
      listFence({}).then(res => {
        console.log(res, "围栏");
        this.carList = res.data;
      });
    },
    add_fence() {
      this.dialogVisible = true;
      this.fence.longitude = this.map.center.lng;
      this.fence.latitude = this.map.center.lat;
    },
    checkTrack(index, item) {
      this.isActive = index;
      // console.log(index, item);
      this.map.center.lng = item.longitude;
      this.map.center.lat = item.latitude;
      this.map.radius = item.radius;
      this.map.railtype = item.railtype;
      this.map.railname = item.railname;
    },
    delet(index) {
      // console.log(index);
      let id = { id: index };
      // console.log(id, "123145");
      deleteFence(id).then(res => {
        console.log(res);
        this.query();
      });
    },
    on_no() {},
    on_ok() {},
    handler({ BMap, map }) {
      console.log(BMap, map);
    },
    dragging(data) {},
    on_map(data) {
      console.log(data);
      this.onMap.center.lng = data.point.lng;
      this.onMap.center.lat = data.point.lat;
    },
    updateCirclePath(e) {
      // console.log(e.target.getCenter());
      // console.log(e.target.getRadius());
      this.onMap.center = e.target.getCenter();
      this.fence.radius = parseInt(e.target.getRadius());
      this.fence.longitude = String(e.target.getCenter().lng);
      this.fence.latitude = String(e.target.getCenter().lat);
    },
    fenceConfirm() {
      if (!this.fence.railname) {
        this.$message.error("围栏名称不能为空");
      } else {
        // let a = document.getElementsByClassName("map");
        console.log(this.fence);
        addFence(this.fence).then(res => {
          console.log(res);
          this.dialogVisible = false;
          this.query();
        });
      }
    },
    mouseoverCircle() {
      this.map.show = true;
    },
    mouseoutCircle() {
      this.map.show = false;
    }
  },
  computed: {
    search() {
      return this.carList.filter(item => {
        return item.railname.match(this.carName);
      });
    }
  },
  filters: {
    railtype(type) {
      switch (type) {
        case "1":
          return "入围栏报警";
        case "0":
          return "出围栏报警";
        default:
          return "";
      }
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
.dialog >>> .el-dialog {
  border-radius: 4px;
  overflow: hidden;
  width: 1080px;
}
.dialog >>> .el-dialog__header {
  padding: 0 10px;
  height: 40px;
  line-height: 40px;
  background: #f1f1f1;
  border-bottom: 1px solid #ddd;
  display: flex;
}
.dialog >>> .el-dialog__header span {
  font-size: 14px;
  line-height: 40px;
  flex-grow: 1;
}
.dialog >>> .el-dialog__header .el-dialog__headerbtn {
  position: static;
}
.dialog >>> .el-dialog__body {
  padding: 10px;
}
.dialog_con {
  border: 1px solid #d9d9d9;
  display: flex;
  height: 569px;
}
.dialog_form {
  flex: 2;
  display: flex;
  flex-direction: column;
}
.dialog_map {
  width: 75%;
  height: 100%;
  overflow: hidden;
}
.text {
  border-bottom: 1px solid #d9d9d9;
}
.text h3,
.type div h3 {
  height: 30px;
  line-height: 30px;
  padding-left: 15px;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
  background-color: #f7f7f7;
  border: 1px solid #d9d9d9;
  border-left: none;
  border-top: none;
}
.text > div {
  padding: 30px 20px 20px;
  box-sizing: border-box;
}
.radius {
  display: flex;
  height: 32px;
  line-height: 32px;
  padding-top: 20px;
}
.radius span {
  font-size: 12px;
}
.radius div {
  width: 50%;
}
.type_radio {
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid #d9d9d9;
}
.type_radio ul li {
  height: 30px;
  line-height: 30px;
}
.dialog_save {
  text-align: center;
  padding: 20px;
}
.map_con >>> .BMap_bubble_title {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #333;
}
.fenceinfo li {
  line-height: 30px;
  height: 24px;
  font-size: 12px;
  color: #666;
}
</style>