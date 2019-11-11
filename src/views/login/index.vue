<template>
  <div class="login">
    <div class="landing">
      <div class="login_logo">
        <img src="../../assets/images/login_logo.png" alt />
      </div>
      <div class="inputG">
        <div class="input">
          <el-input
            placeholder="请输入手机号"
            prefix-icon="el-icon-user-solid"
            v-model="account"
            @blur="accountBlur"
          >
            <template slot="append">
              <el-button :disabled="code_dis" @click="getCode">{{ btnTitle }}</el-button>
            </template>
          </el-input>
          <span v-if="accountError" class="error">账号不能为空</span>
        </div>
        <div class="input">
          <el-input
            placeholder="输入密码"
            prefix-icon="el-icon-lock"
            v-model="password"
            show-password
            @blur="passwordBlur"
          ></el-input>
          <span v-if="passwordError" class="error">验证码不能为空</span>
        </div>
        <div class="land" :class="{active: disabled}">
          <el-button :loading="loading" @click="handlogin" :disabled="disabled">登陆</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { pcLogin, smsCode } from "@/utils/api";
export default {
  name: "Login",
  data() {
    return {
      btnTitle: "获取验证码",
      verificativon: "", //验证码
      code_dis: false,
      account: "",
      accountError: false,
      password: "",
      passwordError: false,
      loading: false
    };
  },
  created() {},
  methods: {
    getCode() {
      console.log("a");
      let phones = { mobile: this.account };
      if (!this.account) {
        // this.accountError = true;
        this.$message.error("手机号不能为空");
      } else if (!/^1[3|5|7|8|][0-9]{9}$/.test(this.account)) {
        this.$message.error("请输入正确的手机号");
      } else {
        this.validataBtn();
        console.log(phones);
        smsCode(phones).then(res => {
          localStorage.setItem("verificativon", res.data.code);
          console.log(res);
        });
      }
    },
    validataBtn() {
      // console.log('a')
      let time = 60;
      let timer = setInterval(() => {
        if (time == 0) {
          clearInterval(timer);
          this.btnTitle = "获取验证码";
          this.code_dis = false;
        } else {
          this.btnTitle = time + "秒后重试";
          this.code_dis = true;
          time--;
        }
      }, 1000);
    },
    accountBlur() {
      if (this.account == "") {
        // this.accountError = true;
        this.$message.error("手机号不能为空");
      } else {
        this.accountError = false;
      }
    },
    passwordBlur() {
      if (this.password == "") {
        this.$message.error("验证码不能为空");
        // this.passwordError = true;
      } else {
        this.passwordError = false;
      }
    },
    handlogin() {
      console.log(localStorage.verificativon);
      if (!/^1[3|5|7|8|][0-9]{9}$/.test(this.account)) {
        this.$message.error("请输入正确的手机号");
        return;
      } else if (this.password !== localStorage.verificativon) {
        this.$message.error("验证码错误");
        return;
      } else if (this.password == localStorage.verificativon) {
        let id = { mobile: this.account, smscode: this.password };
        pcLogin(id).then(res => {
          if (res.retCode == 1) {
            localStorage.setItem("token", true);
            localStorage.setItem("userid", res.data[0].id);
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            this.loading = true;
            this.$router.push({ name: "home" });
          }
          console.log(res);
        });
        // localStorage.setItem("token", true);
        // localStorage.setItem("userid", 1);
        // this.loading = true;
        // this.$router.push({ name: "home" });
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