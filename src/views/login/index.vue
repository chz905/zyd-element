<template>
  <div class="login">
    <div class="landing">
      <div class="login_logo">
        <img src="../../assets/images/login_logo.png" alt />
      </div>
      <div class="inputG">
        <div class="input">
          <el-input
            placeholder="请输入账号"
            prefix-icon="el-icon-user-solid"
            v-model="account"
            @blur="accountBlur"
          ></el-input>
          <span v-if="accountError" class="error">请输入正确的账号</span>
        </div>
        <div class="input">
          <el-input
            placeholder="输入密码"
            prefix-icon="el-icon-lock"
            v-model="password"
            show-password
            @blur="passwordBlur"
          ></el-input>
          <span v-if="passwordError" class="error">密码错误</span>
        </div>
        <div class="land" :class="{active: disabled}">
          <el-button :loading="loading" @click="handlogin" :disabled="disabled">登陆</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      account: "",
      accountError: false,
      password: "",
      passwordError: false,
      loading: false
    };
  },
  created() {},
  methods: {
    accountBlur() {
      if (this.account !== "admin") {
        this.accountError = true;
      } else {
        this.accountError = false;
      }
    },
    passwordBlur() {
      if (this.password !== "admin") {
        this.passwordError = true;
      } else {
        this.passwordError = false;
      }
    },
    handlogin() {
      if (this.account == "admin" && this.password == "admin") {
        localStorage.setItem("token", true);
        this.loading = true;
        this.$router.push({ name: "home" });
      } else {
      }
    }
  },
  computed: {
    disabled() {
      if (!this.account || !this.password) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  background: url(../../assets/images/login_bg.png) no-repeat center center;
  background-size: cover;
}
.landing {
  position: fixed;
  right: 220px;
  top: 181px;
  width: 500px;
  height: 600px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 24px rgba(210, 66, 75, 0.5);
}
.login_logo {
  margin-top: 37px;
  text-align: center;
}
.inputG {
  margin: 60px auto 0;
  width: 440px;
}
.input {
  height: 50px;
  margin-bottom: 40px;
}
.input >>> .el-input__inner {
  height: 50px;
  background: #eee;
}
.land >>> .el-button {
  width: 100%;
  height: 50px;
  font-size: 16px;
  background: #e70012;
  color: #fff;
  letter-spacing: 2px;
  box-shadow: 0 6px 22px rgba(210, 66, 75, 0.5);
  border-radius: 8px;
}
.active >>> .el-button {
  background: #e27e86 !important;
}
.error {
  font-size: 14px;
  color: #ff6e6e;
  line-height: 26px;
}
</style>