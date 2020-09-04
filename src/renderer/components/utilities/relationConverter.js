import Vue from 'vue'

const relationConverter = Vue.mixin({
  name: 'relationConvert',
  methods: {
    convertO2M_M2O (relation) {
      var childFields = relation['trs:child']['trs:field']
      relation['trs:owner'] = {}
      relation['trs:owner']['trs:field'] = childFields
      delete relation['trs:child']

      return relation
    },
    convertM2O_O2M (relation) {
      var ownerFields = relation['trs:owner']['trs:field']
      relation['trs:child'] = {}
      relation['trs:child']['trs:field'] = ownerFields
      delete relation['trs:owner']

      return relation
    }
  }
})

export default relationConverter
