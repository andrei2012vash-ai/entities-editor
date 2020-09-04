<template>
  <div>
    <v-form ref="form" v-if="entity!== null">
      <div v-for="category in entityFields" :key="category.name">

        <h2>{{ category.name }}</h2>
        <field v-for="field in category.data" :key="field.label"
          :type="field.type"
          :value="entity[field.label]"
          :label="field.label"
          :change="mutation"
          :tooltip="field.tooltip"
          :items="field.items"
          :defrules="field.rules"
        ></field>

      </div>

      <div v-if="unsupportedAttributes && unsupportedAttributes.length > 0">

        <h2>Unsupported Attributes</h2>
        <field v-for="attr in unsupportedAttributes" :key="attr"
          type="textline"
          :value="entity[attr]"
          :label="attr"
          :change="mutation"
        ></field>

      </div>
    </v-form>
    <div v-else>
      <h2>
        <i>Unsuported entity file.</i>
      </h2>
    </div>
  </div>
</template>

<script>
import store from '../../store/modules/entity'
import { mapState } from 'vuex'
import entityDefinition from '../definitions/entity.js'
import field from '../controls/input/Field'

export default {
  store,
  name: 'entity',
  components: { field },
  mixins: [ entityDefinition ],
  data () {
    return {
      mutation: this.getEntityMutationName(),
      entityFields: this.getEntityDefinition(),
      unsupportedAttributes: []
    }
  },
  mounted () {
    this.loadUnsupportedAttributes()
  },
  methods: {
    loadUnsupportedAttributes () {
      let entityFields = Object.getOwnPropertyNames(this.entity).filter(f => f !== '__ob__')
      let entityFieldDefs = this.entityFields[0].data.map(e => e.label)
      this.unsupportedAttributes = entityFields.filter(e => entityFieldDefs.indexOf(e) === -1)
    }
  },
  watch: {
    entityID (value) {
      if (this.entity !== null) {
        this.unsupportedAttributes = []
        this.loadUnsupportedAttributes()
      }
    }
  },
  computed: {
    ...mapState({
      entity: state => {
        let entity = ((state.entity['trs:entities'] || {})['trs:entity'] || {}).attr
        if (entity === undefined) {
          return null
        } else {
          return (((state.entity['trs:entities'] || {})['trs:entity'] || {}).attr)
        }
      },
      entityID: state => {
        let entityID = (((state.entity['trs:entities'] || {})['trs:entity'] || {}).attr || {}).ID || 0
        return entityID
      }
    })
  }
}
</script>

<style scoped>
</style>