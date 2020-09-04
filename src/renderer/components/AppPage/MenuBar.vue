<template>
  <v-menu bottom offset-y>
    <template v-slot:activator="{ on }">
      <v-btn 
        depressed
        v-on="on"
        height="100%"
        tile
        class="menu-item no-drag"
        :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-3'"
      >
        {{ title }}
      </v-btn>
    </template>

    <v-list dense v-for="(item, i) in menuItems" :key="i" class="pa-0">
      <v-list-item
        v-on:click="itemClicked(item.action)"
        v-if="!item.divider"
        :disabled="item.disableOnFileEdit && !isFileEdited"
      >
        <v-list-item-action v-if="item.icon">
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content align-center>
          <v-list-item-title>{{ item.title }}&emsp;</v-list-item-title>
        </v-list-item-content>
        <v-list-item-avatar v-if="item.shortcut" width="44px">
          <span>{{ item.shortcut }}</span>
        </v-list-item-avatar>
      </v-list-item>
      <v-divider v-else></v-divider>
    </v-list>
  </v-menu>
</template>

<script>
  export default {
    name: 'menu-bar',
    props: [ 'title', 'menuItems', 'isFileEdited' ],
    methods: {
      itemClicked (action) {
        this.$emit('itemClicked', action)
      }
    }
  }
</script>

<style lang="scss" scoped>  
  .v-menu__content {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
</style>