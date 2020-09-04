<template>
  <div>
    Loading...
  </div>
</template>

<script>
import store from '../../store/modules/entity'

export default {
  store,
  name: 'loading',
  mounted () {
    this.$store.commit('setLoadingField', false)
  }
}
</script>