<template>
  <v-dialog v-model="show" persistent max-width="450">
    <v-card>
      <v-card-title class="headline">Preferences</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-switch :label="config.dark ? 'Dark theme' : 'Light theme'" :value="config.dark" @change="updateConfig('dark', $event)"></v-switch>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click.native="close">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import store from '../../store/modules/entity'
  import { mapState } from 'vuex'

  export default {
    store,
    name: 'options',
    props: [ 'show' ],
    mounted () {
      store.dispatch('loadConfig')
    },
    methods: {
      updateConfig (prop, e) {
        var value = e !== null ? e : false
        store.dispatch('saveConfig', { prop: prop.toString(), value })
      },
      close () {
        this.$emit('itemClicked', 'closePreferences')
      }
    },
    computed: {
      ...mapState({
        config: state => state.app.config
      })
    }
  }
</script>

<style lang="scss" scoped>

</style>
