import Vue from 'vue'
import Vuex from 'vuex'
import vuetify from '@/plugins/vuetify'

Vue.use(Vuex)

const { remote } = require('electron')
const fs = require('fs')

const state = {
  filesList: [],
  entity: {
    'trs:entities': {
      'trs:entity': {
        attr: {
          table: ''
        },
        'trs:attribute': [],
        'trs:relation': [],
        'trs:lookup': []
      }
    }
  },
  currentField: -1,
  currentRelation: -1,
  editMode: null,
  loadingField: false,
  app: {
    searchBar: '',
    config: {
      dark: false
    }
  }
}

const mutations = {
  setEntity (state, entity) {
    state.currentField = -1
    state.currentRelation = -1
    state.currentLookup = -1
    Object.assign(state.entity, entity)
  },
  resetEntity (state) {
    const entity = {
      'trs:entities': {
        'trs:entity': {
          attr: {
            table: ''
          },
          'trs:attribute': [],
          'trs:relation': []
        }
      }
    }
    Object.assign(state.entity, entity)
  },
  updateEntity (state, obj) {
    if (obj.value) {
      state.entity['trs:entities']['trs:entity'].attr[obj.attr] = obj.value
    } else {
      delete state.entity['trs:entities']['trs:entity'].attr[obj.attr]
    }
  },
  updateEntityField (state, obj) {
    if (obj.value) {
      state.entity['trs:entities']['trs:entity']['trs:attribute'][state.currentField].attr[obj.attr] = obj.value
    } else {
      delete state.entity['trs:entities']['trs:entity']['trs:attribute'][state.currentField].attr[obj.attr]
    }
  },
  updateEntityRelation (state, obj) {
    if (obj.value) {
      state.entity['trs:entities']['trs:entity'][`trs:${obj.nodeType}`][state.currentRelation].attr[obj.attr] = obj.value
    } else {
      delete state.entity['trs:entities']['trs:entity'][`trs:${obj.nodeType}`][state.currentRelation].attr[obj.attr]
    }
  },
  updateEntityRelationChild (state, obj) {
    if (obj.value) {
      state.entity['trs:entities']['trs:entity'][`trs:${obj.nodeType}`][state.currentRelation][`trs:${obj.nodeChildType}`]['attr'] = { [obj.attr]: obj.value }
    } else {
      delete state.entity['trs:entities']['trs:entity'][`trs:${obj.nodeType}`][state.currentRelation][`trs:${obj.nodeChildType}`]['attr'][obj.attr]
    }
  },
  updateEntityRelationChildField (state, obj) {
    if (obj.value) {
      state.entity['trs:entities']['trs:entity'][`trs:${obj.nodeType}`][state.currentRelation][`trs:${obj.nodeChildType}`]['trs:field']['attr'][obj.attr] = obj.value
    } else {
      delete state.entity['trs:entities']['trs:entity'][`trs:${obj.nodeType}`][state.currentRelation][`trs:${obj.nodeChildType}`]['trs:field']['attr'][obj.attr]
    }
  },
  addField (state, obj) {
    if (!state.entity['trs:entities']['trs:entity'].hasOwnProperty('trs:attribute')) {
      state.entity['trs:entities']['trs:entity']['trs:attribute'] = []
    } else if (!Array.isArray(state.entity['trs:entities']['trs:entity']['trs:attribute'])) {
      state.entity['trs:entities']['trs:entity']['trs:attribute'] = [state.entity['trs:entities']['trs:entity']['trs:attribute']]
    }
    state.entity['trs:entities']['trs:entity']['trs:attribute'].push({ attr: { name: obj.name, ID: obj.ID } })
    state.currentField++
    state.editMode = 'field'
  },
  setEditMode (state, value) {
    state.editMode = value
  },
  resetCurrentFieldRelation (state) {
    state.currentRelation = -1
    state.currentField = -1
  },
  setCurrentField (state, value) {
    state.currentField = value
    state.currentRelation = -1
  },
  setCurrentRelation (state, value) {
    state.currentRelation = value
    state.currentField = -1
  },
  setCurrentLookup (state, value) {
    state.currentRelation = value
    state.currentField = -1
  },
  setSearchBar (state, value) {
    if (value === null) {
      value = ''
    }
    state.app.searchBar = value
  },
  setConfig (state, obj) {
    state.app.config[obj.prop] = obj.value
  },
  loadConfig (state, value) {
    state.app.config = value
  },
  setLoadingField (state, value) {
    state.loadingField = value
  }
}

const actions = {
  loadConfig (context) {
    let path = remote.app.getPath('userData') + '\\config.json'

    fs.readFile(path, 'utf8', (err, data) => {
      var config = {}
      if (err) {
        config = { dark: true }
        fs.writeFile(path, JSON.stringify({config: config}), (error) => {
          if (error) {
            alert(error)
          }
        })
      }

      if (data !== undefined) {
        config = JSON.parse(data).config
      }

      context.commit('loadConfig', config)
      vuetify.framework.theme.dark = state.app.config.dark
    })
  },
  saveConfig (context, obj) {
    context.commit('setConfig', obj)
    let path = remote.app.getPath('userData') + '\\config.json'

    vuetify.framework.theme.dark = state.app.config.dark
    fs.writeFile(path, JSON.stringify({config: context.state.app.config}), (error) => {
      if (error) {
        alert(error)
      }
    })
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
