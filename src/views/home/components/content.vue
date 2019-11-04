<template>
  <div class="con">
    <div class="content_nav">
      <div class="nav_icon">
        <div class="nav_icon_group" @click="$emit('click')">
          <i class="el-icon-s-fold" :class="{active: isCollapse}"></i>
          <!-- <i class="el-icon-s-unfold" v-else></i> -->
        </div>
      </div>
      <ul class="nav_user">
        <li>
          <img src="../../../assets/images/user.png" alt />
        </li>
        <li>
          <el-dropdown @command="exit">
            <span class="el-dropdown-link">
              管理员
              <i class="el-icon-arrow-down"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>我的</el-dropdown-item>
              <el-dropdown-item divided command="exit">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </div>
    <div class="center">
      <!-- 面包屑 -->
      <div class="bread_cut">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item
            v-for="(item,index) in navList"
            :key="index"
            :to="{ path: '/' }"
          >{{ item.meta.name }}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="returnHome">
          <router-link to="/">返回首页</router-link>
        </div>
      </div>
      <div class="center_cen">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "con",
  props: {
    navList: Array,
    isCollapse: Boolean
  },
  data() {
    return {};
  },
  methods: {
    exit(command){
      if(command == 'exit'){
        localStorage.token = ''
        this.$router.push("/login");
      }
    }
  },
};
</script>

<style scoped>
.con {
  height: 100%;
}
.content_nav {
  display: flex;
  padding: 6px 20px;
  /* box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3); */
}
.content_nav .nav_icon {
  line-height: 31px;
  font-size: 24px;
  flex-grow: 1;
  color: #666;
}
.el-icon-s-fold {
  cursor: pointer;
  transition: all 0.2s;
}
.active {
  transform: rotate(-180deg);
}
.nav_user {
  display: flex;
}
.nav_user li {
  line-height: 30px;
  margin: 0 6px;
}
.nav_user li:nth-child(1) {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #c7c7c7;
  justify-content: center;
  align-items: center;
  line-height: 30px;
  display: flex;
  overflow: hidden;
}
.nav_user li:nth-child(1) img {
  width: 80%;
  align-items: center;
}
.nav_user li:nth-child(2) {
  cursor: pointer;
}
.center {
  height: calc(100% - 60px);
  /* margin-top: 9px; */
  /* background: #fff; */
}
.bread_cut {
  height: 40px;
  line-height: 40px;
  display: flex;
  background: #f7f7f7;
  padding: 0 24px;
  box-sizing: border-box;
  /* box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04); */
  box-shadow: 0 16px 10px rgba(0, 0, 0, 0.03);
  font-size: 14px;
  overflow: hidden;
}
.bread_cut .el-breadcrumb {
  flex-grow: 1;
}
.el-breadcrumb {
  line-height: 40px;
}
.nav_icon_group {
  width: 26px;
}
.center_cen {
  width: 97%;
  height: calc(100% - 56px);
  background: #f7f7f7;
  margin: 10px auto;
  border-radius: 8px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.07);
  overflow: hidden;
  /* padding: 12px 0 44px; */
  box-sizing: border-box;
}
.returnHome a {
  color: #333;
  text-decoration: none;
  font-weight: bold;
  font-size: 14px;
  letter-spacing: 1px;
}
</style>