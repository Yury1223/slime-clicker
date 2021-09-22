<template>
  <div>
    <div class="slime-area" @click="onClickCookie()">
      <div class="stats">
        <div>経験値: <span class="numeric">{{ exp | delimiter }}</span></div>
        <div>経験値/秒: <span class="numeric">{{ expPerSec | delimiter }}</span></div>
      </div>
      <img id="slime" src="~/static/slime.png" alt="slime">
    </div>
    <div class="wrapper">
      <SlimeParameter :context="hpContext" @onLevelUpRequest="levelUp(hpContext)" />
      <SlimeParameter :context="atkContext" @onLevelUpRequest="levelUp(atkContext)" />
      <SlimeParameter :context="defContext" @onLevelUpRequest="levelUp(defContext)" />
      <SlimeParameter :context="aglContext" @onLevelUpRequest="levelUp(aglContext)" />
    </div>
    <div class="footer">
      <button class="footer-menu" @click="reset()">
        リセット
      </button>
      <button class="footer-menu">
        スライム闘技場(準備中)
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SlimeParameter, { SlimeParameterType } from '../components/SlimeParameter.vue'
import { SLIME_PARAMETER_TYPE } from '~/components/SlimeParameter.vue'

export default Vue.extend({
  components: {
    SlimeParameter
  },
  data () {
    return {
      totalTime: 0,
      intervalId: 0,
      exp: 0,
      expPerSec: 0,
      hpContext: {
        type: SLIME_PARAMETER_TYPE.HP,
        value: 1,
        level: 1
      },
      atkContext: {
        type: SLIME_PARAMETER_TYPE.ATK,
        value: 1,
        level: 1
      },
      defContext: {
        type: SLIME_PARAMETER_TYPE.DEF,
        value: 1,
        level: 1
      },
      aglContext: {
        type: SLIME_PARAMETER_TYPE.AGL,
        value: 1,
        level: 1
      }
    }
  },
  mounted () {
    const parametersJson = localStorage.getItem('parameters') || '[]'

    if (parametersJson) {
      const parameters = JSON.parse(parametersJson)
      if (parameters.length === 5) {
        this.hpContext = parameters[0]
        this.atkContext = parameters[1]
        this.defContext = parameters[2]
        this.aglContext = parameters[3]
        this.exp = parameters[4]
      }
    }

    this.intervalId = window.setInterval(() => {
      const nowDateMs = Date.now()
      const lastUpdateAtMs = Number(localStorage.getItem('lastUpdatedAt'))

      const nowDateSec = Math.round(nowDateMs / 1000)
      const lastUpdateAtSec = Math.round(lastUpdateAtMs / 1000)

      if (lastUpdateAtSec > 0) {
        this.clock(nowDateSec - lastUpdateAtSec)
      }

      localStorage.setItem('lastUpdatedAt', `${nowDateMs}`)
    }, 1000)
  },
  beforeDestroy () {
    window.clearInterval(this.intervalId)
  },
  methods: {
    clock (sec: number) {
      this.totalTime = Number(localStorage.getItem('totalTime')) + sec
      localStorage.setItem('totalTime', `${this.totalTime}`)

      this.hpContext.value = Math.round((this.hpContext.value + 2 * this.hpContext.level * sec) * 1000) / 1000
      this.atkContext.value = Math.round((this.atkContext.value + 2 * this.atkContext.level * sec) * 1000) / 1000
      this.defContext.value = Math.round((this.defContext.value + 2 * this.defContext.level * sec) * 1000) / 1000
      this.aglContext.value = Math.round((this.aglContext.value + 2 * this.aglContext.level * sec) * 1000) / 1000

      this.calcExpPerSec()
      this.exp += this.expPerSec * sec

      localStorage.setItem('parameters', `[
        ${JSON.stringify(this.hpContext)},
        ${JSON.stringify(this.atkContext)},
        ${JSON.stringify(this.defContext)},
        ${JSON.stringify(this.aglContext)},
        ${this.exp}
      ]`)
    },
    levelUp (context: {
      type: SlimeParameterType,
      value: number,
      level: number
    }) {
      if (this.exp >= context.level ** 2) {
        this.exp -= context.level ** 2
        context.level += 1
        this.calcExpPerSec()
      }
    },
    calcExpPerSec () {
      this.expPerSec = Math.round(
        (
          this.hpContext.level +
          this.atkContext.level +
          this.defContext.level +
          this.aglContext.level
        ) / 2
      )
    },
    reset () {
      if (window.confirm('全てのデータが消去されます。リセットしても良いですか？')) {
        localStorage.removeItem('parameters')
        localStorage.removeItem('totalTime')
        localStorage.removeItem('lastUpdatedAt')

        this.exp = 0

        this.hpContext.value = 1
        this.atkContext.value = 1
        this.defContext.value = 1
        this.aglContext.value = 1

        this.hpContext.level = 1
        this.atkContext.level = 1
        this.defContext.level = 1
        this.aglContext.level = 1
      }
    },
    onClickCookie () {
      this.exp += Math.round(this.expPerSec / 2)
      const slimeElem = document.getElementById('slime')

      slimeElem?.classList.add('slime-animate')
      slimeElem?.addEventListener('animationend', () => {
        slimeElem?.classList.remove('slime-animate')
      })
    }
  }
})
</script>

<style>
  body {
    margin: 0;
  }
</style>

<style scoped>
  @keyframes slime-animate {
      0% {
          transform: scale(1);
      }
      50% {
          transform: scale(0.8);
      }
      100% {
          transform: scale(1);
      }
  }
  .slime-animate {
    animation: slime-animate 0.25s;
  }
  .slime-area {
    position: relative;
    width: 100vw;
    height: 40vh;
    overflow: hidden;
    background-color: rgb(231, 228, 228);
    color: #333;
    text-align: center;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  }
  #slime {
    width: 60vw;
  }
  .slime-area .numeric {
    letter-spacing: 2px;
  }
  .stats {
    width: 80vw;
    max-width: 240px;
    padding: 16px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  .wrapper {
    padding: 16px;
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 15vh;
    display: flex;
    overflow: hidden;
  }
  .footer-menu {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: lightgray;
    border: 1px solid darkgrey;
  }
  .footer-menu:not(:first-child) {
    border-left: none;
  }
  .footer-menu:active {
    opacity: .8;
  }
</style>
