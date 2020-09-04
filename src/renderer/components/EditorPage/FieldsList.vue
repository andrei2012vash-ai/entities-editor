<template>
  <v-list v-if="entity !== undefined">

    <add-new :value="showMenu" :type="addType" @closeDialog="handleCloseDialog"></add-new>

    <v-list-item
        @click="select(0, 'entity')"
        active-class
      >
      <v-list-item-content>
        <v-list-item-title v-text="entity.title !== '' && entity.title !== null && entity.title !== undefined ? entity.title : entity.table"></v-list-item-title>
      </v-list-item-content> 

        <v-list-item-action>
          <v-icon color="green">{{ editMode === 'entity' ? 'edit' : '' }}</v-icon>
        </v-list-item-action>

    </v-list-item>

    <v-menu
      v-model="contextMenu.show"
      :position-x="contextMenu.x"
      :position-y="contextMenu.y"
      absolute
      offset-y
      min-width="250"
    >
      <v-list
        dense
      >
        <v-list-item
          v-for="(menuItem, index) in contextMenu.items"
          :key="index"
          @click="contextMenuAddNew($event)"
        >
          <v-list-item-title>{{ menuItem.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-list-group
      :prepend-icon="getTypeEditIcon('field')"
      no-action
    >
      <template v-slot:activator>
        <v-list-item v-if="fields !== null" @contextmenu.native.prevent="showContextMenu">
          <v-list-item-content>    
            <v-list-item-title>Fields</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-list-item
          v-for="(itemChild, index) in fields"
          :key="itemChild.name"
          @click="select(index, 'field')"
        >

        <v-list-item-title v-text="itemChild.name">
        </v-list-item-title>

        <v-list-item-action>          
          <v-icon color="green">{{ getEditIcon('field', index) }}</v-icon>
        </v-list-item-action>

      </v-list-item>

    </v-list-group>

    <v-list-group
      :prepend-icon="getTypeEditIcon('relation')"
      no-action
    >
      <template v-slot:activator>
        <v-list-item v-if="[...relations, ...lookups] !== null" @contextmenu.native.prevent="showContextMenu">
          <v-list-item-content>    
            <v-list-item-title>Relations</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-list-item
          v-for="(item, index) in [...relations, ...lookups]"
          :key="item.data.name"
          @click="select(index % relations.length, item.type)"
        >

        <v-list-item-title v-text="item.data.name">
        </v-list-item-title>

        <v-list-item-action>          
          <v-icon color="green">{{ getEditIcon(item.type, index) }}</v-icon>
        </v-list-item-action>

      </v-list-item>

    </v-list-group>
  </v-list>
</template>

<script>
  import store from '../../store/modules/entity'
  import { mapState } from 'vuex'
  import guid from '../utilities/guid.js'

  import addNew from '../controls/addNew/AddNew'

  export default {
    store,
    name: 'fieldsList',
    components: { addNew },
    mixin: [ guid ],
    data () {
      return {
        contextMenu: {
          show: false,
          x: 0,
          y: 0,
          items: [
            { title: 'Add new...' }
          ]
        },
        showMenu: false,
        addType: null,
        newElement: {
          name: '',
          ID: null,
          title: ''
        },
        rules: {
          required: value => !!value || 'Required.',
          validGuid: value => {
            const pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
            return pattern.test(value.toLowerCase() || '') || 'Invalid guid.'
          }
        }
      }
    },
    methods: {
      handleCloseDialog (type) {
        this.showMenu = false
        var index = ((type) => {
          switch (type) {
            case 'field':
              return this.fields.length - 1
          }
        })(type)
        this.select(index, type)
      },
      select (index, type) {
        if (type === 'entity') {
          this.$store.commit('setEditMode', 'entity')
          this.$store.commit('resetCurrentFieldRelation')
        } else if (type === 'field') {
          this.$store.commit('setCurrentField', index)
          this.$store.commit('setEditMode', 'field')
        } else if (type === 'relation') {
          this.$store.commit('setCurrentRelation', index)
          this.$store.commit('setEditMode', 'relation')
        } else if (type === 'lookup') {
          this.$store.commit('setCurrentRelation', index)
          this.$store.commit('setEditMode', 'lookup')
        }
      },
      getTypeEditIcon (type) {
        if ((type === 'field' && this.editMode === 'field') || (type === 'relation' && this.editMode === 'relation')) {
          return 'edit'
        }
        return ''
      },
      getEditIcon (type, index) {
        if ((type === 'field' && this.editMode === 'field' && index === this.currentField) || (type === 'relation' && this.editMode === 'relation' && index === this.currentRelation)) {
          return 'edit'
        }
        return ''
      },
      showContextMenu (e) {
        e.preventDefault()
        this.newElement.title = this.addType = e.target.textContent.toLowerCase().replace(/s$/, '')
        this.contextMenu.show = false
        this.contextMenu.x = e.clientX
        this.contextMenu.y = e.clientY
        this.$nextTick(() => {
          this.contextMenu.show = true
        })
      },
      contextMenuAddNew (e) {
        e.preventDefault()
        this.showMenu = true
      },
      addNewElement () {
        if (this.$refs.newElementForm.validate()) {
          if (this.newElement.title === 'field') {
            this.$store.commit('addField', this.newElement)
          }
          this.showMenu = false
        }
      },
      refreshGuid () {
        this.newElement.ID = this.generateGuid()
      }
    },
    computed: {
      ...mapState({
        entity: state => {
          return ((state.entity['trs:entities'] || {})['trs:entity'] || {}).attr
        },
        fields: state => {
          if (Array.isArray(state.entity['trs:entities']['trs:entity']['trs:attribute'])) {
            return state.entity['trs:entities']['trs:entity']['trs:attribute'].map(x => x.attr)
          } else if (state.entity['trs:entities']['trs:entity']['trs:attribute'] !== null &&
            state.entity['trs:entities']['trs:entity']['trs:attribute'] !== undefined) {
            return [state.entity['trs:entities']['trs:entity']['trs:attribute'].attr]
          }
        },
        relations: state => {
          var relations = []

          if (Array.isArray(state.entity['trs:entities']['trs:entity']['trs:relation'])) {
            relations = state.entity['trs:entities']['trs:entity']['trs:relation'].map(x => ({ type: 'relation', data: x.attr }))
          } else if (state.entity['trs:entities']['trs:entity']['trs:relation'] !== null &&
            state.entity['trs:entities']['trs:entity']['trs:relation'] !== undefined) {
            relations = [{ type: 'relation', data: state.entity['trs:entities']['trs:entity']['trs:relation'].attr }]
          }

          return relations
        },
        lookups: state => {
          var lookups = []

          if (Array.isArray(state.entity['trs:entities']['trs:entity']['trs:lookup'])) {
            lookups = state.entity['trs:entities']['trs:entity']['trs:lookup'].map(x => ({ type: 'lookup', data: x.attr }))
          } else if (state.entity['trs:entities']['trs:entity']['trs:lookup'] !== null &&
            state.entity['trs:entities']['trs:entity']['trs:lookup'] !== undefined) {
            lookups = { type: 'lookup', data: state.entity['trs:entities']['trs:entity']['trs:lookup'].attr }
          }
          return lookups
        },
        currentField: state => state.currentField,
        currentRelation: state => state.currentRelation,
        editMode: state => state.editMode
      })
    }
  }
</script>

<style scoped>

</style>