<template>
  <v-combobox
      :value="value"
      :items="items"
      :label="label"
      @input="update(label)"
    >
    <template v-slot:append-outer>
      <v-tooltip right color="blue lighten-1"
        v-if="!(!tooltip || tooltip.length == 0)"
        max-width="300"
      >
        <template v-slot:activator="{ on }">
          <v-icon right v-on="on" color="blue">help</v-icon>
        </template>
        <span v-html="tooltip"></span>
      </v-tooltip>
    </template>
  </v-combobox>
</template>

<script>
  export default {
    name: 'dropdown',
    props: [ 'value', 'items', 'label', 'tooltip', 'change', 'nodeType', 'nodeChildType' ],
    methods: {
      update (attr) {
        this.$store.commit(this.change, { attr, value: event.target.textContent, nodeType: this.nodeType, nodeChildType: this.nodeChildType })
      }
    }
  }
</script>

<style scoped>

</style>