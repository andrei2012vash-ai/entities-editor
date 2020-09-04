<template>
  <div>
    <component 
      :is="type"
      v-bind:value="value"
      :label="label"
      :tooltip="tooltip"
      :change="change"
      :items="getItems(items)"
      :defrules="defrules"
      :nodeType="nodeType"
      :nodeChildType="nodeChildType"
      v-show="label.toLowerCase().indexOf(search.toLowerCase()) > -1"
    ></component>
  </div>
</template>

<script>
import store from '../../../store/modules/entity'
import { mapState } from 'vuex'

import Dropdown from './Dropdown'
import Textline from './Textline'
import Textbox from './Textbox'

export default {
  store,
  name: 'field',
  props: [ 'type', 'value', 'items', 'label', 'tooltip', 'change', 'defrules', 'nodeType', 'nodeChildType' ],
  components: { Dropdown, Textline, Textbox },
  data () {
    return {
      component: this.type
    }
  },
  methods: {
    getItems (items) {
      switch (items) {
        case 'bool?': {
          return ['', 'true', 'false', '1', '0']
        }
        case 'displayMode': {
          return ['', 'Base', 'List', 'Standard']
        }
        case 'action': {
          return ['', 'remove']
        }
        case 'relationNodeType': {
          return ['lookup', 'relation']
        }
        case 'relationshipType': {
          return ['ManyToOne', 'OneToMany', 'ManyToMany']
        }
      }
    }
  },
  computed: {
    ...mapState({
      search: state => state.app.searchBar
    })
  }
}
</script>

<style scoped>

</style>