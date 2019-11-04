<template>
  <div class="nav">
    <div class="logo" :class="{active: isCollapse}">
      <img src="../../../assets/images/logo1.png" v-if="!isCollapse" alt="中远达公司logo" />
      <img src="../../../assets/images/logo.png" v-else style="width: 40px;" alt="中远达公司logo" />
    </div>
    <div class="dsj" v-if="!isCollapse">
      <router-link to="/bigdata">
        <i class="el-icon-data-line"></i>
        大数据展示板
      </router-link>
    </div>
    <el-menu
      :default-active="this.$route.path"
      router
      class="el-menu-vertical-demo"
      background-color="#263238"
      text-color="rgb(187, 187, 187)"
      active-text-color="#4093ff"
      :collapse="isCollapse"
      unique-opened
    >
      <el-submenu v-for="(item,index) in router" :key="index" :index="item.path">
        <template slot="title">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.text }}</span>
        </template>
        <el-menu-item v-for="(v,i) in item.children" :key="i" :index="v.path">{{ v.text }}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "navigation",
  props: {
    isCollapse: Boolean,
    router: Array
  },
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<style scoped>
.nav {
  height: 100%;
}
.logo {
  width: 100%;
  background: #263238;
  text-align: center;
  padding: 20px 0;
}
.logo img {
  width: 150px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100%;
  height: 100%;
}
.el-menu--collapse {
  height: 100%;
}
.el-menu {
  border: 0;
}
.el-menu-vertical-demo >>> .el-submenu__title:hover > i,
.el-menu-item:hover > i {
  color: #f6f6f6;
}
.el-menu-vertical-demo >>> .el-submenu__title:hover,
.el-menu-item:hover {
  color: #f6f6f6 !important;
}
.dsj {
  background: #444d52;
  border: 2px solid #475156;
  width: 70%;
  margin: 0 auto;
  text-align: center;
  height: 34px;
  line-height: 34px;
  border-radius: 20px;
  font-size: 14px;
  margin-bottom: 10px;
  transition: all 0.3s;
  cursor: pointer;
  overflow: hidden;
}
.dsj a{
  transition: all 0.3s;
  display: block;
  text-decoration: none;
  color: #abb1b7;
}
.dsj a:hover {
  color: #fff;
  background: #50575a;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
}
</style>