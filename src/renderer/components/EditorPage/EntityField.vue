<template>
  <v-form ref="form">
    <div v-for="category in entityAttributeFields" :key="category.name">

      <h2>{{ category.name }}</h2>
      <field v-for="attr in category.data" :key="attr.label"
        :type="attr.type"
        :value="field[attr.label]"
        :label="attr.label"
        :change="mutation"
        :tooltip="attr.tooltip"
        :items="attr.items"
        :defrules="attr.rules"
      ></field>

    </div>

    <div v-if="unsupportedAttributes && unsupportedAttributes.length > 0">

      <h2>Unsupported Attributes</h2>
      <field v-for="attr in unsupportedAttributes" :key="attr"
        type="textline"
        :value="field[attr]"
        :label="attr"
        :change="mutation"
      ></field>

    </div>
  </v-form>
</template>

<script>
import store from '../../store/modules/entity'
import { mapState } from 'vuex'
import entityAttributeDefinition from '../definitions/entityAttribute.js'
import field from '../controls/input/Field'

export default {
  store,
  name: 'entityfield',
  components: { field },
  mixins: [ entityAttributeDefinition ],
  data () {
    return {
      mutation: this.getAttributeMutationName(),
      entityAttributeFields: this.getEntityAttributeDefinition(),
      unsupportedAttributes: []
    }
  },
  mounted () {
    let entityAttributeFields = Object.getOwnPropertyNames(this.field).filter(f => f !== '__ob__')
    let entityAttributeFieldDefs = this.entityAttributeFields[0].data.map(e => e.label)
    this.unsupportedAttributes = entityAttributeFields.filter(e => entityAttributeFieldDefs.indexOf(e) === -1)
  },
  watch: {
    currentField (value) {
      this.$store.commit('setCurrentField', value)
      this.$store.commit('setLoadingField', true)
    }
  },
  computed: {
    ...mapState({
      field: state => {
        if (Array.isArray(state.entity['trs:entities']['trs:entity']['trs:attribute'])) {
          return state.entity['trs:entities']['trs:entity']['trs:attribute'][state.currentField]['attr']
        } else {
          return state.entity['trs:entities']['trs:entity']['trs:attribute']['attr']
        }
      },
      currentField: state => state.currentField
    })
  }
}
</script>

<style scoped>
  #titlebar{
    width: 100%;
    height: 100%;    
    -webkit-app-region: drag;
  }
</style>