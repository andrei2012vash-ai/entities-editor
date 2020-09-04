<template>
  <v-textarea
    :value="value"
    :label="label"    
    rows="1"
    auto-grow
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
  </v-textarea>
</template>

<script>
  export default {
    name: 'textbox',
    props: [ 'value', 'label', 'tooltip', 'change', 'nodeType', 'nodeChildType' ],
    methods: {
      update (attr) {
        this.$store.commit(this.change, { attr, value: event.target.value, nodeType: this.nodeType, nodeChildType: this.nodeChildType })
      }
    }
  }
</script>

<style scoped>

</style>