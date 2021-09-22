<template>
  <div class="status">
    <p class="label">
      {{ context.type }}(特訓レベル: {{ context.level | delimiter }})
    </p>
    <div class="parameter">
      <span>{{ context.value | delimiter }}</span>
      <button @click="onLevelUpRequest()">
        特訓レベルUP ({{ context.level ** 2 | delimiter }}) 🍣
      </button>
      <div class="bar" :style="{ width: 100 * (context.value / 999999) + '%' }" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export const SLIME_PARAMETER_TYPE = {
  ATK: 'こうげき',
  DEF: 'ぼうぎょ',
  HP: 'HP',
  AGL: 'すばやさ'
} as const
export type SlimeParameterType = typeof SLIME_PARAMETER_TYPE[keyof typeof SLIME_PARAMETER_TYPE]

export default Vue.extend({
  props: {
    context: {
      type: Object,
      default: () => {
        return {
          type: SLIME_PARAMETER_TYPE.HP,
          value: 0,
          level: 1
        }
      }
    }
  },
  methods: {
    onLevelUpRequest () {
      this.$emit('onLevelUpRequest')
    }
  }
})
</script>

<style scoped>
  .status {
    margin: 8px 0;
  }
  .label {
    margin: 0;
    font-size: 10px
  }
  .parameter {
    position: relative;
    height: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;

  }
  .parameter > span, button {
    z-index: 20;
  }
  .parameter > span{
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    letter-spacing: 2px;
    color: #333;
  }
  .parameter > button {
    height: 32px;
    padding: 0 16px;
    border-radius: 16px;
    border: none;
    color: #333;
  }
  .parameter > button:active {
    opacity: .8;
  }
  .parameter > .bar {
    position: absolute;
    top: 0;
    height: 32px;
    background-color: blue;
    opacity: 0.2;
  }
</style>
