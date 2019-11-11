<template>
  <div class="index">
    <div class="navigation" :class="{navigationActive:isCollapse}">
      <navigation :isCollapse="isCollapse" :router="router"/>
    </div>
    <div class="content">
      <Content @click="open" :navList="navList" :isCollapse="isCollapse" :userInfo="userInfo"/>
    </div>
  </div>
</template>

<script>
import navigation from "./components/navigation";
import Content from "./components/content";
export default {
  name: "Index",
  data() {
    return {
      isCollapse: false,
      router: [
        {
          text: "数据统计",
          icon: "el-icon-data-line",
          path: "/policeStatistics",
          children:[
            {
              path: "/policeStatistics",
              text: "报警统计"
            },
            {
              path: "/runStatistics",
              text: "运行数据统计"
            }
          ]
        },
        {
          text: "车辆监控",
          icon: "el-icon-cpu",
          path: "/carTracking",
          children:[
            {
              path: "/carTracking",
              text: "车辆跟踪"
            },
            {
              path: "/carTrajectory",
              text: "车辆轨迹"
            }
          ]
        },
        {
          text: "车辆管理",
          icon: "el-icon-truck",
          path: "/carmanagement",
          children:[
            {
              path: "/carmanagement",
              text: "车辆管理"
            }
          ]
        },
        {
          text: "围栏管理",
          icon: "el-icon-full-screen",
          path: "/fencemanagement",
          children:[
            {
              path: "/fencemanagement",
              text: "围栏管理"
            }
          ]
        },
        {
          text: "保险管理",
          icon: "el-icon-document-remove",
          path: "/insurancePlan",
          children:[
            {
              path: "/insurancePlan",
              text: "保险套餐"
            },
            {
              path: "/carInsurance",
              text: "车辆保险"
            }
          ]
        },
        {
          text: "修车管理",
          icon: "el-icon-bangzhu",
          path: "/storeManagement",
          children:[
            {
              path: "/storeManagement",
              text: "门店管理"
            },
            {
              path: "/trailerRecord",
              text: "拖车记录"
            }
          ]
        },
        {
          text: "系统设置",
          icon: "el-icon-setting",
          path: "/user",
          children:[
            {
              path: "/user",
              text: "用户管理"
            },
            {
              path: "/trailer",
              text: "拖车管理"
            }
          ]
        }
      ],
      navList: [],
      userInfo: ''
    };
  },
  components: {
    navigation,
    Content
  },
  created() {
    this.navList = this.$route.matched; //路由变化
    this.userInfo = JSON.parse(localStorage.userInfo)
  },
  mounted() {
    this.monitorWindowSize();
  },
  methods: {
    open() {
      this.isCollapse = !this.isCollapse;
    },
    monitorWindowSize() {
      let w = document.documentElement.clientWidth || document.body.clientWidth;
      if (w < 1300) {
        this.isCollapse = true;
      }
    }
  },
  watch: {
    $route() {
      // 监听路由变化
      this.navList = [];
      this.navList = this.$route.matched;
    }
  }
};
</script>

<style scoped>
.index {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
}
.navigation {
  width: 210px;
  transition: all 0.2s;
  background: #263238;
}
.navigationActive {
  width: 64px;
  transition: all 0.2s;
}
.content {
  flex-grow: 1;
  width: 86%;
  position: relative;
  box-shadow: 0 -10px 20px rgb(160, 160, 160);
  background: #eeeff1;
  overflow-x: hidden;
}
</style>