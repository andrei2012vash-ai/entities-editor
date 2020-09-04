<template>
  <v-text-field
    v-bind:value="value"
    :label="label"
    :rules="defrules && defrules !== '' ? defrules.split(',').map(r => rules[r]) : null"
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
  </v-text-field>
</template>

<script>
  export default {
    name: 'textline',
    data () {
      return {
        rules: {
          required: value => !!value || 'Required.',
          validGuid: value => {
            const pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
            return pattern.test(value.toLowerCase() || '') || 'Invalid guid.'
          },
          intOnly: value => parseInt(value) || 'Value can be only a number.'
        }
      }
    },
    props: [ 'value', 'label', 'tooltip', 'change', 'defrules', 'nodeType', 'nodeChildType' ],
    methods: {
      update (attr) {
        this.$store.commit(this.change, { attr, value: event.target.value, nodeType: this.nodeType, nodeChildType: this.nodeChildType })
      }
    }
  }
</script>

<style scoped>

</style>