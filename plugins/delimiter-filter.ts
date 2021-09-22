import Vue from 'vue'

Vue.filter('delimiter', (value: number | null) => {
  if (!value) {
    return '0'
  }
  return value.toLocaleString()
})
