<template>

  <v-dialog v-bind:value="value" @change="resetForm" persistent max-width="450">
    <v-card>
      <v-card-title class="headline">Add new field</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form v-model="newElement.valid" ref="newElementForm">
          <v-text-field
            v-model="newElement.name"
            label="name"
            :rules="[rules.required]"
          ></v-text-field>

          <v-text-field
            v-model="newElement.ID"
            label="ID"
            :rules="[rules.validGuid]"
          >       
            <template v-slot:append-outer>     
              <v-btn flat icon color="light-blue darken-2" @click="refreshGuid">
                  <v-icon>refresh</v-icon>
              </v-btn>
            </template>
          </v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn dark color="green darken-1" flat v-on:click="addNewElement">Add</v-btn>
        <v-btn dark color="red darken-1" flat v-on:click="closeDialog">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>
  
<script>
  import guid from '../../utilities/guid.js'

  export default {
    name: 'addNewField',
    mixin: [ guid ],
    props: [ 'value' ],
    data () {
      return {
        addNew: false,
        newElement: {
          name: '',
          ID: null
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
    mounted: function () {
      this.$nextTick(() => {
        this.$refs.newElementForm.reset()
        this.newElement.name = ''
        this.newElement.ID = this.generateGuid()
      })
    },
    methods: {
      addNewElement () {
        if (this.$refs.newElementForm.validate()) {
          this.$store.commit('setEditMode', 'field')
          this.$store.commit('addField', this.newElement)
          this.$emit('closeDialog', 'field')
          this.resetForm()
        }
      },
      refreshGuid () {
        this.newElement.ID = this.generateGuid()
      },
      closeDialog () {
        this.$nextTick(() => {
          this.$emit('closeDialog', { type: 'field' })
          this.resetForm()
        })
      },
      resetForm () {
        this.$refs.newElementForm.reset()
        this.newElement.name = ''
        this.newElement.ID = this.generateGuid()
      }
    }
  }
</script>