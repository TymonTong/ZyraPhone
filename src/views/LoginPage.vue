<template>
  <div class="login-page">
    <div class="login-bg" aria-hidden="true">
      <div class="login-bg__stage">
        <div class="login-bg__layer login-bg__bg" />
        <div class="login-bg__layer login-bg__middle" />
        <div class="login-bg__layer login-bg__overlay" />
      </div>
    </div>

    <header class="login-header">
      <div class="login-header__inner">
        <router-link to="/" class="login-logo-link">
          <img :src="assetUrl('/img/logo.png')" alt="ZyraPhone" class="login-logo" width="160" height="40" />
        </router-link>
      </div>
    </header>

    <div class="login-body">
    <main class="login-main">
      <section class="login-promo">
        <div class="login-promo__intro">
          <span class="login-promo__tag">新用户享30天免费试用</span>
          <h1 class="login-promo__title">
            <span>一站式</span>
            <span>MCN跨境社媒运营基础设施</span>
          </h1>
          <p class="login-promo__desc">
            为你提供更智能的方式，管理、规模化运营并变现全球TikTok账号，平台支持官方API接入、防关联隔离技术，系统稳定性高达99.8%。
          </p>
        </div>
        <ul class="login-promo__features">
          <li v-for="text in features" :key="text" class="login-promo__feature">
            <LoginFeatureIcon class="login-promo__feature-icon" />
            <span>{{ text }}</span>
          </li>
        </ul>
      </section>

      <!-- Figma Frame 2147231448：520×698，padding 64/32，内容宽 456 -->
      <section class="login-card" aria-labelledby="login-card-title">
        <h2 id="login-card-title" class="login-card__title">欢迎使用</h2>

        <div class="login-card__panel">
          <!-- Figma Tabs-horizontal 3145:61722：高 56，项间距 24（OT 未交付 Tabs，用稿面结构） -->
          <div class="login-card__tabs" role="tablist" aria-label="登录方式">
            <button
              type="button"
              role="tab"
              class="login-card__tab"
              :class="{ 'is-active': loginTab === 'phone' }"
              :aria-selected="loginTab === 'phone'"
              @click="loginTab = 'phone'"
            >
              手机登录
            </button>
            <button
              type="button"
              role="tab"
              class="login-card__tab"
              :class="{ 'is-active': loginTab === 'email' }"
              :aria-selected="loginTab === 'email'"
              @click="loginTab = 'email'"
            >
              邮箱登录
            </button>
          </div>

          <div class="login-card__content">
            <div class="login-card__main">
              <div class="login-card__fields">
                <div class="login-card__inputs">
                  <el-input
                    v-if="loginTab === 'phone'"
                    v-model="form.phone"
                    placeholder="输入您的手机号"
                    size="large"
                    clearable
                  />
                  <el-input
                    v-else
                    v-model="form.email"
                    type="email"
                    placeholder="输入您的邮箱"
                    size="large"
                    clearable
                  />
                  <el-input
                    v-model="form.password"
                    type="password"
                    placeholder="输入您的密码"
                    size="large"
                    show-password
                  />
                </div>

                <div class="login-card__actions">
                  <div class="login-form__row">
                    <el-checkbox v-model="form.remember">记住密码</el-checkbox>
                    <el-link :underline="false" href="#">忘记密码？</el-link>
                  </div>
                  <div class="login-card__btn-stack">
                    <div class="login-card__btn-wrap">
                      <el-button type="primary" size="large">登录</el-button>
                    </div>
                    <div class="login-card__btn-wrap">
                      <el-button size="large">企业用户登录</el-button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="login-card__social">
                <div class="login-divider">
                  <span class="login-divider__line" aria-hidden="true" />
                  <span class="login-divider__text">或者</span>
                  <span class="login-divider__line" aria-hidden="true" />
                </div>
                <div class="login-card__btn-wrap login-card__btn-wrap--google">
                  <el-button size="large">
                    <img
                      class="login-btn-google__img"
                      :src="assetUrl('/img/login/google.png')"
                      alt=""
                      width="14"
                      height="14"
                    />
                    继续使用Google
                  </el-button>
                </div>
              </div>
            </div>

            <p class="login-register">
              没有账号？
              <el-link type="primary" :underline="false" href="#">立即注册</el-link>
            </p>
          </div>
        </div>
      </section>
    </main>

    <footer class="login-footer">
      <span>ZyraPhone</span>
      <span class="login-footer__dot" aria-hidden="true" />
      <el-link :underline="false" href="#">服务条款</el-link>
      <span class="login-footer__dot" aria-hidden="true" />
      <el-link :underline="false" href="#">隐私政策</el-link>
    </footer>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import LoginFeatureIcon from '../components/LoginFeatureIcon.vue'
import { assetUrl } from '../utils/assetUrl.js'

const loginTab = ref('email')

const form = reactive({
  phone: '',
  email: '',
  password: '',
  remember: true,
})

const features = [
  '万级账号集群管理能力',
  '99.8% 高系统稳定性',
  '专为 MCN 与跨境电商团队打造',
  '账号即时激活，开箱即用',
  '服务超 200 家企业客户信赖',
]
</script>
