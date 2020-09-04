import Vue from 'vue'

const entityRelationDefinition = Vue.mixin({
  name: 'entityAttributeDefinition',
  methods: {
    getRelationMutationName () {
      return 'updateEntityRelation'
    },
    getRelationChildMutationName () {
      return 'updateEntityRelationChild'
    },
    getRelationChildFieldMutationName () {
      return 'updateEntityRelationChildField'
    },
    getEntityRelationDefinition () {
      return [
        {
          'code': 'nodeType',
          'name': 'Relation node type',
          'data': [
            {
              'type': 'dropdown',
              'label': 'node type',
              'tooltip': `Use the <b>lookup</b> for Glossary and <b>relation</b> for relationships to other entities other than Glossary.`,
              'items': 'relationNodeType'
            }
          ]
        },
        {
          'code': 'base',
          'name': 'Relation attributes',
          'data': [
            {
              'type': 'textline',
              'label': 'name',
              'tooltip': `Defines name of the relationship or lookup.`
            },
            {
              'type': 'textline',
              'label': 'description',
              'tooltip': `Defines description for this relationship.`
            },
            {
              'type': 'textline',
              'label': 'ID',
              'tooltip': `Defines Guid representable for this relationship.`,
              'rules': 'validGuid'
            },
            {
              'type': 'dropdown',
              'label': 'interface',
              'items': 'bool?'
            },
            {
              'type': 'textline',
              'label': 'aggregated',
              'tooltip': `Defines relationship has a property that is used on this entity only in the entity level and not table level.`
            },
            {
              'type': 'textline',
              'label': 'aggregatedRelationship',
              'tooltip': `Defines an aggregated relation from a relationship to entity or defines an attribute from another entity via existing relationship.`
            },
            {
              'type': 'textline',
              'label': 'apiDetailedRelationship',
              'tooltip': `Indicates emitter to include this attribute in the ATO Detailed.`
            },
            {
              'type': 'textline',
              'label': 'apiSummaryRelationship',
              'tooltip': `Indicates emitter to include this relationship in the ATO Summary.`
            },
            {
              'type': 'textline',
              'label': 'cascade',
              'tooltip': `Defines type (NHibernate cascade types: All, Default, DeleteOrphan, None, AllDeleteOrphan, SaveUpdate) of cascade action necessary for relationship. When not defined, "Default" is used.<br />Here is what each cascade option means:<ul><li>none - do not do any cascades, let the users handles them by themselves.</li><li>save-update - when the object is saved/updated, check the associations and save/update any object that require it (including save/update the associations in many-to-many scenario).</li><li>delete - when the object is deleted, delete all the objects in the association.</li><li>delete-orphan - when the object is deleted, delete all the objects in the association. In addition to that, when an object is removed from the association and not associated with another object (orphaned), also delete it.</li><li>all - when an object is save/update/delete, check the associations and save/update/delete all the objects found.</li><li>all-delete-orphan - when an object is save/update/delete, check the associations and save/update/delete all the objects found. In additional to that, when an object is removed from the association and not associated with another object (orphaned), also delete it.</li></ul>`
            },
            {
              'type': 'textline',
              'label': 'context',
              'tooltip': `Defines relationship is context for the entity.`
            },
            {
              'type': 'textline',
              'label': 'dataType',
              'tooltip': `Defines entity this relationship or lookup is related to.`
            },
            {
              'type': 'textline',
              'label': 'defaultValue',
              'tooltip': `Defines default value for this relationship and this only applies to the ManyToOne relationship type.`
            },
            {
              'type': 'textline',
              'label': 'set',
              'tooltip': `When set to false, emitter will not generate CUD methods for this relationship.`
            },
            {
              'type': 'textline',
              'label': 'hierarchyPart',
              'tooltip': `Defines type of hierarchy between to relationships (None, Parent, Child, Owner, OwnedItems) to the same entity.`
            },
            {
              'type': 'textline',
              'label': 'isAnchor',
              'tooltip': `Caches the entity in the dataType for relationships that have this flag set to true.`
            },
            {
              'type': 'textline',
              'label': 'isFK',
              'tooltip': `When set to true, emitter creates a Foreign Key in the SQL script for this field.`
            },
            {
              'type': 'dropdown',
              'label': 'isObsolete',
              'tooltip': `Defines relationship is no longer valid and does not exist anymore.`,
              'items': 'bool?'
            },
            {
              'type': 'textline',
              'label': 'isUserDefined',
              'tooltip': `Indicates relationship is user defined.`
            },
            {
              'type': 'textline',
              'label': 'label',
              'tooltip': `Defines label for the attribute.`
            },
            {
              'type': 'dropdown',
              'label': 'relationship',
              'tooltip': `Defines type of relationship (ManyToOne, OneToMany or ManyToMany).`,
              'items': 'relationshipType'
            },
            {
              'type': 'textline',
              'label': 'shortLabel',
              'tooltip': `Defines an alternative label for abbreviation if needed.`
            },
            {
              'type': 'textline',
              'label': 'aggregated',
              'tooltip': `Defines relationship has a property that is used on this entity only in the entity level and not table level.`
            },
            {
              'type': 'textline',
              'label': 'aggregatedRelationship',
              'tooltip': `Defines an aggregated relation from a relationship to entity or defines an attribute from another entity via existing relationship.`
            },
            {
              'type': 'textline',
              'label': 'apiDetailedRelationship',
              'tooltip': `Indicates emitter to include this attribute in the ATO Detailed.`
            },
            {
              'type': 'textline',
              'label': 'apiSummaryRelationship',
              'tooltip': `Indicates emitter to include this relationship in the ATO Summary.`
            },
            {
              'type': 'textline',
              'label': 'cascade',
              'tooltip': `Defines type (NHibernate cascade types: All, Default, DeleteOrphan, None, AllDeleteOrphan, SaveUpdate) of cascade action necessary for relationship. When not defined, "Default" is used.`
            },
            {
              'type': 'textline',
              'label': 'context',
              'tooltip': `Defines relationship is context for the entity.`
            },
            {
              'type': 'textline',
              'label': 'dataType',
              'tooltip': `Defines entity this relationship or lookup is related to.`
            },
            {
              'type': 'textline',
              'label': 'defaultValue',
              'tooltip': `Defines default value for this relationship and this only applies to the ManyToOne relationship type.`
            },
            {
              'type': 'textline',
              'label': 'set',
              'tooltip': `When set to false, emitter will not generate CUD methods for this relationship.`
            },
            {
              'type': 'textline',
              'label': 'hierarchyPart',
              'tooltip': `Defines type of hierarchy between to relationships (None, Parent, Child, Owner, OwnedItems) to the same entity.`
            },
            {
              'type': 'textline',
              'label': 'isAnchor',
              'tooltip': `Caches the entity in the dataType for relationships that have this flag set to true.`
            },
            {
              'type': 'textline',
              'label': 'isFK',
              'tooltip': `When set to true, emitter creates a Foreign Key in the SQL script for this field.`
            },
            {
              'type': 'textline',
              'label': 'isUserDefined',
              'tooltip': `Indicates relationship is user defined.`
            },
            {
              'type': 'textline',
              'label': 'label',
              'tooltip': `Defines label for the attribute.`
            },
            {
              'type': 'textline',
              'label': 'name',
              'tooltip': `Defines name of the relationship or lookup.`
            },
            {
              'type': 'textline',
              'label': 'shortLabel',
              'tooltip': `Defines an alternative label for abbreviation if needed.`
            },
            {
              'type': 'textline',
              'label': 'transient',
              'tooltip': `Defines a relationship that is only in memory and does not exist at the table level.`
            }
          ]
        },
        {
          'code': 'm2m',
          'name': 'ManyToMany relationship attribute',
          'data': [
            {
              'type': 'textline',
              'label': 'table',
              'tooltip': `Defines intersection table name for ManyToMany reltionships.`
            }
          ]
        },
        {
          'code': 'o2m',
          'name': 'OneToMany relationship attribute',
          'data': [
            {
              'type': 'textline',
              'label': 'OwnerMember',
              'tooltip': `Represents type of the entity this relationship does belongs to.`
            }
          ]
        },
        {
          'code': 'm2o',
          'name': 'ManyToOne relationship attribute',
          'data': [
            {
              'type': 'textline',
              'label': 'OwnedMember'
            }
          ]
        },
        {
          'code': 'child',
          'name': 'Child fields attributes',
          'data': [
            {
              'type': 'textline',
              'label': 'MyOwnerId'
            },
            {
              'type': 'textline',
              'label': 'OwnerPropertyId'
            },
            {
              'type': 'textline',
              'label': 'ID',
              'rules': 'validGuid'
            },
            {
              'type': 'textline',
              'label': 'defaultValue'
            }
          ]
        }
      ]
    }
  }
})

export default entityRelationDefinition
