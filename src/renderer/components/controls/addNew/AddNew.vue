<template>
  <div>
    <component 
      :is="getAddType()"
      v-bind:value="value"
      @closeDialog="handleCloseDialog"
    ></component>
  </div>
</template>

<script>
  import AddNewField from './AddNewField'
  // import AddNewRelation from './AddNewRelation'

  export default {
    name: 'addNew',
    props: [ 'type', 'value' ],
    components: { AddNewField }, //, AddNewRelation },
    data () {
      return {
        component: this.type
      }
    },
    methods: {
      handleCloseDialog (type) {
        this.$emit('closeDialog', type)
      },
      getAddType () {
        switch (this.type) {
          case 'field':
            return 'AddNewField'
        }
      }
    }
  }
</script>