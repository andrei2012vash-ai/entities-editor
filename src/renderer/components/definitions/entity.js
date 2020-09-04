import Vue from 'vue'

const entityDefinition = Vue.mixin({
  name: 'entityDefinition',
  methods: {
    getEntityMutationName () {
      return 'updateEntity'
    },
    getEntityDefinition () {
      return [
        {
          'name': 'Definition attributes',
          'data':
          [
            {
              'type': 'textline',
              'label': 'ID',
              'rules': 'validGuid'
            },
            {
              'type': 'textline',
              'label': 'type',
              'tooltip': 'Defines name for this definition.'
            },
            {
              'type': 'textline',
              'label': 'table',
              'tooltip': 'Defines actual SQL table name associated with this entity.'
            },
            {
              'type': 'textline',
              'label': 'parentType',
              'tooltip': 'Almost all our entities parent type is Business Object unless and entity has a parent which entity is an extension of another entity. If you define a entity that has a parentType other than Business Object additional fields and relations for your new entity will be added the parent table.'
            },
            {
              'type': 'dropdown',
              'label': 'partial',
              'items': 'bool?'
            },
            {
              'type': 'dropdown',
              'label': 'serializable',
              'items': 'bool?'
            },
            {
              'type': 'textline',
              'label': 'implements',
              'tooltip': 'Defines the type of entity.'
            },
            {
              'type': 'dropdown',
              'label': 'interface',
              'items': 'bool?'
            },
            {
              'type': 'dropdown',
              'label': 'shared',
              'items': 'bool?'
            },
            {
              'type': 'textline',
              'label': 'description',
              'tooltip': 'Description about this entity.'
            },
            {
              'type': 'textline',
              'label': 'title',
              'tooltip': 'Title for entity as it shows on screens.'
            },
            {
              'type': 'textline',
              'label': 'displayMode',
              'tooltip': 'Indicates type of paradigm (Base, List, Standard) is used to access this entity. <ul><li><b>Base</b>: Indicates entity can only be accessed via a relationship to other entities and cannot be access directly.</li><li><b>List</b>: Indicates entity can be access via Detail controller.</li><li><b>Standard</b>: Indicates entity can be accessed via Search controller.</li></ul>'
            },
            {
              'type': 'dropdown',
              'label': 'showSuperstructure',
              'items': 'bool?'
            },
            {
              'type': 'dropdown',
              'label': 'showObsolete',
              'items': 'bool?'
            },
            {
              'type': 'textline',
              'label': 'cacheName'
            },
            {
              'type': 'textline',
              'label': 'typeValue',
              'tooltip': 'Once an entity has a parentType and typeField, we need to define the value that represent this '
            },
            {
              'type': 'textline',
              'label': 'schema'
            },
            {
              'type': 'dropdown',
              'label': 'ownsTable',
              'items': 'bool?'
            },
            {
              'type': 'dropdown',
              'label': 'cachedByPK',
              'items': 'bool?'
            },
            {
              'type': 'textline',
              'label': 'toStringMethod',
              'tooltip': 'Emitter create a method (ToString()) that returns a string representation of record in this entity.'
            },
            {
              'type': 'dropdown',
              'label': 'cloneable',
              'items': 'bool?'
            },
            {
              'type': 'textline',
              'label': 'entityCode',
              'rules': 'intOnly'
            },
            {
              'type': 'dropdown',
              'label': 'showSimpleAudit',
              'items': 'bool?'
            },
            {
              'type': 'textline',
              'label': 'typeField',
              'tooltip': 'Once an entity has a parentType, we need to classify the field that represent this entity.'
            },
            {
              'type': 'dropdown',
              'label': 'isParentEntity',
              'tooltip': 'Indicates entity is used as parentType for other entities.',
              'items': 'bool?'
            },
            {
              'type': 'dropdown',
              'label': 'excludeFromApi',
              'tooltip': 'Indicates emitter will not create an API controller for entity.',
              'items': 'bool?'
            },
            {
              'type': 'dropdown',
              'label': 'excludeFromMvc',
              'items': 'bool?'
            },
            {
              'type': 'textline',
              'label': 'managementGrouping'
            },
            {
              'type': 'textline',
              'label': 'menuModule',
              'tooltip': 'Indicates default module for this entity shows on module menu.'
            },
            {
              'type': 'textline',
              'label': 'menuGrouping',
              'tooltip': 'Allows entity to show on menu referenced by the module menu Guid.'
            },
            {
              'type': 'textline',
              'label': 'menuLocation',
              'tooltip': 'Defines location (Front, Back) this entity shows on module menu'
            },
            {
              'type': 'dropdown',
              'label': 'noValidation',
              'tooltip': 'Indicates emitter to not emit validation method for this entity.',
              'items': 'bool?'
            },
            {
              'type': 'textline',
              'label': 'pilotType'
            },
            {
              'type': 'textline',
              'label': 'characteristics'
            },
            {
              'type': 'dropdown',
              'label': 'isUserDefined',
              'tooltip': 'Indicates entity is user defined. Entity was designed and implemented ',
              'items': 'bool?'
            },
            {
              'type': 'textline',
              'label': 'pathToContact',
              'tooltip': 'String that defines the path to the related contact for this entity.'
            },
            {
              'type': 'textline',
              'label': 'detailsColumnCnt',
              'rules': 'intOnly'
            },
            {
              'type': 'dropdown',
              'label': 'detailsColumnDynamic',
              'items': 'bool?'
            },
            {
              'type': 'dropdown',
              'label': 'showCreatedResults',
              'items': 'bool?'
            },
            {
              'type': 'dropdown',
              'label': 'parentInTOC',
              'items': 'bool?'
            },
            {
              'type': 'textline',
              'label': 'parentType',
              'tooltip': 'Almost all our entities parent type is Business Object unless and entity has a parent which entity is an extension of another entity. If you define a entity that has a parentType other than Business Object additional fields and relations for your new entity will be added the parent table.'
            },
            {
              'type': 'dropdown',
              'label': 'action',
              'items': 'action'
            }
          ]
        }
      ]
    }
  }
})

export default entityDefinition
