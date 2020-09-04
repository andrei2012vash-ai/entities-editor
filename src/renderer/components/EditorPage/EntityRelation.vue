<template>
  <v-form ref="form">
      <h2>{{ relationNodeType.name }}</h2>
      <field v-for="attr in relationNodeType.data" :key="attr.label"
        :type="attr.type"
        :value="editMode"
        :label="attr.label"
        :change="attr.change || mutation"
        :tooltip="attr.tooltip"
        :items="attr.items"
      ></field>

      <h2>{{ relationBaseFields.name }}</h2>
      <field v-for="attr in relationBaseFields.data" :key="attr.label"
        :type="attr.type"
        :value="relation['attr'][attr.label]"
        :label="attr.label"
        :change="attr.change || mutation"
        :tooltip="attr.tooltip"
        :items="attr.items"
        :nodeType="editMode"
      ></field>

      <div v-if="relation['attr'].relationship === 'ManyToMany'">
        <h2>{{ m2mRelationFields.name }}</h2>
        <field v-for="attr in m2mRelationFields.data" :key="attr.label"
          :type="attr.type"
          :value="getRelationValue('owner', attr.label)"
          :label="attr.label"
          :change="attr.change || mutation"
          :tooltip="attr.tooltip"
          :items="attr.items"
          :nodeType="editMode"
        ></field>
      </div>

      <div v-if="relation['attr'].relationship === 'OneToMany'">
        <h2>{{ o2mRelationFields.name }}</h2>
        <field v-for="attr in o2mRelationFields.data" :key="attr.label"
          :type="attr.type"
          :value="getRelationValue('child', attr.label)"
          :label="attr.label"
          :change="attr.change || childMutation"
          :tooltip="attr.tooltip"
          :items="attr.items"
          :nodeType="editMode"
          :nodeChildType="getNodeChildName()"
        ></field>
      </div>

      <div v-if="relation['attr'].relationship === 'ManyToOne'">
        <h2>{{ m2oRelationFields.name }}</h2>
        <field v-for="attr in m2oRelationFields.data" :key="attr.label"
          :type="attr.type"
          :value="getRelationValue('owner', attr.label)"
          :label="attr.label"
          :change="attr.change || childMutation"
          :tooltip="attr.tooltip"
          :items="attr.items"
          :nodeType="editMode"
          :nodeChildType="getNodeChildName()"
        ></field>
      </div>

      <h2>{{ relationChildFields.name }}</h2>
      <field v-for="attr in relationChildFields.data" :key="attr.label"
        :type="attr.type"
        :value="getRelationChildValue(attr.label)"
        :label="attr.label"
        :change="attr.change || fieldMutation"
        :tooltip="attr.tooltip"
        :items="attr.items"
        :nodeType="editMode"
        :nodeChildType="getNodeChildName()"
      ></field>
  </v-form>
</template>

<script>
import field from '../controls/input/Field'
import store from '../../store/modules/entity'
import entityRelationDefinition from '../definitions/EntityRelation.js'
import { mapState } from 'vuex'

export default {
  store,
  name: 'entityrelation',
  components: { field },
  mixins: [ entityRelationDefinition ],
  data () {
    return {
      mutation: this.getRelationMutationName(),
      childMutation: this.getRelationChildMutationName(),
      fieldMutation: this.getRelationChildFieldMutationName(),
      relationNodeType: this.getEntityRelationDefinition().filter(e => e.code === 'nodeType')[0],
      relationBaseFields: this.getEntityRelationDefinition().filter(e => e.code === 'base')[0],
      m2mRelationFields: this.getEntityRelationDefinition().filter(e => e.code === 'm2m')[0],
      o2mRelationFields: this.getEntityRelationDefinition().filter(e => e.code === 'o2m')[0],
      m2oRelationFields: this.getEntityRelationDefinition().filter(e => e.code === 'm2o')[0],
      relationChildFields: this.getEntityRelationDefinition().filter(e => e.code === 'child')[0]
    }
  },
  methods: {
    getRelationValue (nodeType, attrName) {
      return (this.relation[`trs:${nodeType}`] && this.relation[`trs:${nodeType}`]['attr'] && this.relation[`trs:${nodeType}`]['attr'][attrName]) || ''
    },
    getRelationChildValue (attrName) {
      let nodeType = this.getNodeChildName()
      return (this.relation[`trs:${nodeType}`] && this.relation[`trs:${nodeType}`][`trs:field`] && this.relation[`trs:${nodeType}`][`trs:field`]['attr'] && this.relation[`trs:${nodeType}`][`trs:field`]['attr'][attrName]) || ''
    },
    getNodeChildName () {
      let relationshipType = this.relation['attr'].relationship
      return (relationshipType === 'ManyToMany' || relationshipType === 'ManyToOne') ? 'owner' : 'child'
    }
  },
  watch: {
    currentRelation (value) {
      this.$store.commit('setCurrentRelation', value)
      this.$store.commit('setLoadingField', true)
    }
  },
  computed: {
    ...mapState({
      editMode: state => state.editMode,
      currentRelation: state => state.currentRelation,
      relation: state => {
        if (state.editMode === 'relation') {
          if (Array.isArray(state.entity['trs:entities']['trs:entity']['trs:relation'])) {
            return state.entity['trs:entities']['trs:entity']['trs:relation'][state.currentRelation]
          } else {
            return state.entity['trs:entities']['trs:entity']['trs:relation']
          }
        } else {
          if (Array.isArray(state.entity['trs:entities']['trs:entity']['trs:lookup'])) {
            return state.entity['trs:entities']['trs:entity']['trs:lookup'][state.currentRelation]
          } else {
            return state.entity['trs:entities']['trs:entity']['trs:lookup']
          }
        }
      }
    })
  }
}
</script>

<style scoped>

</style>