<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <!-- <div>
        <img src="../../../static/image/common/logo.png" class="logo" />
      </div> -->
      <div class="title-container">
        <div class="logo"><img src="../../../static/image/common/logo.png" alt="" /></div>
        <h3 class="title">{{ $t('login.title') }}</h3>
        <!-- <lang-select class="set-language" /> -->
      </div>
      <!-- <div class="divider">
        <div class="line" />
        <span class="welcome">欢迎</span>
        <div class="lineTwo" />
      </div> -->
      <!-- <el-form-item prop="tenant">
        <span class="svg-container">
          <svg-icon icon-class="cloud" />
        </span>
        <el-input ref="tenant" v-model="loginForm.tenant" :placeholder="$t('login.tenant')" name="tenant" type="text" />
      </el-form-item> -->
      <div class="content">
        <span>账号</span>
        <el-form-item prop="username">
          <!-- <span class="svg-container">
          <svg-icon icon-class="user" />
        </span> -->
          <!-- <i class="iconfont icon-yonghu" style="color: red; fontsize: 18px" /> -->
          <el-input
            ref="username"
            v-model="loginForm.username"
            class="username"
            :placeholder="$t('login.username')"
            name="username"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>
        <span>密码</span>
        <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
          <el-form-item prop="password">
            <!-- <span class="svg-container">
            <svg-icon icon-class="password" />
          </span> -->
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              class="password"
              :type="passwordType"
              :placeholder="$t('login.password')"
              name="password"
              tabindex="2"
              autocomplete="on"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
        </el-tooltip>
        <!-- <span>验证码</span>
        <el-row :gutter="10">
          <el-col :span="16">
            <el-form-item prop="icode">
              <el-input
                ref="username"
                v-model="code"
                class="username"
                :placeholder="$t('login.code')"
                name="verifyCode"
                type="text"
                tabindex="1"
                autocomplete="on"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <div class="login-code" @click="refreshCode">
              <s-identify :identify-code="identifyCode" />
            </div>
          </el-col>
        </el-row> -->
      </div>
      <el-button
        :loading="loading"
        type="primary"
        style="
          width: 100%;
          margin-bottom: 30px;
          background: rgb(0, 0, 0);
          border: 1px solid #000;
          font-family: myfont;
          font-size: 18px;
        "
        @click.native.prevent="handleLogin"
      >
        {{ $t('login.logIn') }}
      </el-button>
    </el-form>
  </div>
</template>

<script>
import LangSelect from '@/components/LangSelect'
import SIdentify from './components/sidentify'
// import SocialSign from './components/SocialSignin'

export default {
  name: 'Login',
  components: { LangSelect, SIdentify },
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        tenant: undefined,
        username: '',
        password: '',
        client_id: window.globalConfig.client.client_id,
        client_secret: window.globalConfig.client.client_secret,
        grant_type: window.globalConfig.client.grant_type
      },
      loginRules: {
        username: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      identifyCodes: '1234567890',
      identifyCode: '',
      code: '' // text框输入的验证码
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  },
  created() {
    this.refreshCode()
    // window.addEventListener('storage', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },

    refreshCode() {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
      }
      // console.log(this.identifyCode)
    },
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z'
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // if (this.code === '') {
          //   this.$message({
          //     message: '请输入验证码！',
          //     type: 'warning'
          //   })
          //   return
          // }
          // if (this.identifyCode !== this.code) {
          //   this.code = ''
          //   this.refreshCode()
          //   this.$message({
          //     message: '请输入正确的验证码！',
          //     type: 'warning'
          //   })
          //   return
          // }
          this.loading = true
          this.$store
            .dispatch('user/userLogin', this.loginForm)
            .then(() => {
              this.$router.push({
                path: this.redirect || '/',
                query: this.otherQuery
              })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss">
@import '../../../static/image/fonts/font.css';
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #666666;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 30px;
      caret-color: rgb(0, 0, 0);
      // background: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $cursor inset !important;
        -webkit-text-fill-color: $light_gray !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgb(0, 0, 0);
    background: #fff;
    border-radius: 5px;
    color: #454545;
    // box-shadow: 0 3px 7px 0px #c7c7cd6b;
    margin-bottom: 30px;
    height: 42px;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #333333;

.login-container {
  font-family: myfont;
  min-height: 100%;
  width: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url('../../../static/image/common/bg.png') no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  .login-form {
    // position: relative;
    width: 500px;
    height: 620px;
    padding: 20px 100px 20px;
    border-radius: 25px;
    margin: 9% auto;
    overflow: hidden;
    background: rgb(255, 255, 255);
    box-shadow: 0 0 7px 0px #ffffff;

    // .logo {
    //   width: 100px;
    //   position: absolute;
    //   top: 50px;
    //   left: 70px;
    // }
    .content {
      margin-top: 50px;

      span {
        display: block;
        margin-bottom: 10px;
      }
    }
  }

  .tips {
    font-size: 14px;
    color: $dark_gray;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    .logo {
      width: 121px;
      margin: 25px auto;
      img {
        width: 139px;
        height: 83px;
      }
    }
    .title {
      font-family: myfont;
      font-size: 36px;
      font-weight: 400;
      color: rgb(51, 51, 51);
      margin: 30px auto 50px auto;
      text-align: center;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  .divider {
    display: flex;
    justify-content: center;

    .line {
      width: 40%;
      height: 1px;
      background-color: rgb(22, 119, 255);
    }

    span {
      display: block;
      width: 28px;
      height: 21px;
      font-size: 14px;
      margin-top: -5px;
    }

    .lineTwo {
      width: 40%;
      height: 1px;
      background-color: rgb(22, 119, 255);
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
