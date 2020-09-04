<template>
  <v-container>
    <main>
      <loading v-if="loadingField"></loading>
      <entity v-if="editMode === 'entity' && !loadingField"></entity>
      <entity-field v-else-if="editMode === 'field' && !loadingField"></entity-field>
      <entity-relation v-else-if="(editMode === 'relation' || editMode === 'lookup') && !loadingField"></entity-relation>
    </main>
  </v-container>
</template>

<script>
import store from '../store/modules/entity'
import { mapState } from 'vuex'

import Entity from './EditorPage/Entity'
import EntityField from './EditorPage/EntityField'
import EntityRelation from './EditorPage/EntityRelation'
import FieldsList from './EditorPage/FieldsList'
import Loading from './EditorPage/Loading'

export default {
  store,
  name: 'editor-page',
  components: { Entity, EntityField, EntityRelation, FieldsList, Loading },
  computed: {
    ...mapState({
      editMode: state => state.editMode,
      loadingField: state => state.loadingField
    })
  }
}
</script>

<style>

</style>