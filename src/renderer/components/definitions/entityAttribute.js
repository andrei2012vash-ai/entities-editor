import Vue from 'vue'

const entityAttributeDefinition = Vue.mixin({
  name: 'entityAttributeDefinition',
  methods: {
    getAttributeMutationName () {
      return 'updateEntityField'
    },
    getEntityAttributeDefinition () {
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
              'label': 'name',
              'tooltip': 'Name of the field.',
              'rules': 'required'
            },
            {
              'type': 'textline',
              'label': 'field'
            },
            {
              'type': 'textline',
              'label': 'dataType',
              'tooltip': 'Defines Type for the field (System.String, System.Int64, System.Boolen,.).'
            },
            {
              'type': 'dropdown',
              'label': 'transient',
              'tooltip': 'Defines attribute is transient. Note: Will not appear on the table and only accessible via memory.',
              'items': 'bool?'
            },
            {
              'type': 'dropdown',
              'label': 'interface',
              'items': 'bool?'
            },
            {
              'type': 'dropdown',
              'label': 'isLocalizable',
              'items': 'bool?'
            },
            {
              'type': 'textline',
              'label': 'sortOrdinal',
              'tooltip': 'Defines sorting order for an attribute on an entity.',
              'rules': 'intOnly'
            },
            {
              'type': 'textline',
              'label': 'sortDirection',
              'tooltip': 'Defines sorting direction (ASC, DESC) for an attribute on an entity.'
            },
            {
              'type': 'textline',
              'label': 'DisplayName'
            },
            {
              'type': 'textline',
              'label': 'label',
              'tooltip': 'Defines label for this attribute.'
            },
            {
              'type': 'textline',
              'label': 'shortLabel',
              'tooltip': 'Defines another form of label for this attribute.'
            },
            {
              'type': 'textline',
              'label': 'prompt'
            },
            {
              'type': 'textline',
              'label': 'description'
            },
            {
              'type': 'dropdown',
              'label': 'isNullable',
              'tooltip': 'Defines field can contain null value.',
              'items': 'bool?'
            },
            {
              'type': 'dropdown',
              'label': 'required',
              'tooltip': 'Indicates field is required client side even field is not required on the database or server side.',
              'items': 'bool?'
            },
            {
              'type': 'dropdown',
              'label': 'isHtml',
              'tooltip': 'Indicates field stores Html and mush use special editor to view or edit.',
              'items': 'bool?'
            },
            {
              'type': 'dropdown',
              'label': 'hidden',
              'tooltip': 'Indicates field will not show anywhere on screen. It\'s a hidden field and used by system.',
              'items': 'bool?'
            },
            {
              'type': 'textline',
              'label': 'migrationDefaultValue',
              'tooltip': 'Defines default value for a new attribute on an existing entity (* used by CMD Deployer SQL Generation tool, not used by Deployment Service)'
            },
            {
              'type': 'textline',
              'label': 'defaultValue',
              'tooltip': 'Defines the default value for the attribute when a new records is created.'
            },
            {
              'type': 'dropdown',
              'label': 'isFixedLength',
              'tooltip': 'Defines field as a none fixed length \'System.String\'.',
              'items': 'bool?'
            },
            {
              'type': 'textline',
              'label': 'dataLength',
              'tooltip': 'Defines the length for \'System.String\' datatype.',
              'rules': 'intOnly'
            },
            {
              'type': 'textline',
              'label': 'minimumDataLength',
              'tooltip': 'Defines minimumDataLength for fields with System.String dataType.',
              'rules': 'intOnly'
            },
            {
              'type': 'textline',
              'label': 'precision',
              'tooltip': 'Defines the precision for numeric fields.',
              'rules': 'intOnly'
            },
            {
              'type': 'textline',
              'label': 'scale',
              'tooltip': 'Defines scale for numeric fields. Used with precision to build a regex mask for allowable values.',
              'rules': 'intOnly'
            },
            {
              'type': 'textline',
              'label': 'minimumValue',
              'tooltip': 'Defines lowest number can be entered for a numeric field.'
            },
            {
              'type': 'textline',
              'label': 'maximumValue',
              'tooltip': 'Defines highest number can be entered for a numeric field.'
            },
            {
              'type': 'dropdown',
              'label': 'isInline',
              'tooltip': 'Indicates field does not have maximum length and a special control is needed.',
              'items': 'bool?'
            },
            {
              'type': 'textline',
              'label': 'hintMask',
              'tooltip': 'Defines the masking format for attribute.'
            },
            {
              'type': 'textline',
              'label': 'displayMask',
              'tooltip': 'Defines the display mask for encrypted attribute.'
            },
            {
              'type': 'dropdown',
              'label': 'isDBEncrypted',
              'tooltip': 'Defines attribute as encrypted.',
              'items': 'bool?'
            },
            {
              'type': 'textline',
              'label': 'providerID',
              'tooltip': 'Defines provider Guid for an encrypted attribute. Used with scale to build a regex mask for allowable values.',
              'rules': 'validGuid'
            },
            {
              'type': 'textline',
              'label': 'zoneName',
              'tooltip': 'Defines zone name for the provider on an encrypted attribute.'
            },
            {
              'type': 'dropdown',
              'label': 'isPK',
              'tooltip': 'Defines attribute as a primary key on the entity.',
              'items': 'bool?'
            },
            {
              'type': 'dropdown',
              'label': 'isAvailableForWrapper',
              'tooltip': 'Defines attribute has a relationship to another entity.',
              'items': 'bool?'
            },
            {
              'type': 'textline',
              'label': 'validationExpression'
            },
            {
              'type': 'textline',
              'label': 'invalidMessage',
              'tooltip': 'Defines invalid message for attribute that has validation expression.'
            },
            {
              'type': 'textline',
              'label': 'attributeForRelationship',
              'tooltip': 'Defines relationship name for an attribute (must be an System.Int64).'
            },
            {
              'type': 'textline',
              'label': 'aggregateRelationship',
              'tooltip': 'Defines an aggregated attribute from a relationship to the entity or define an attribute from another entity via existing relationship.'
            },
            {
              'type': 'textline',
              'label': 'fieldOrdinal',
              'rules': 'intOnly'
            },
            {
              'type': 'textline',
              'label': 'displayGroup',
              'tooltip': 'Grouping mechanism several fields and relationships on dialog.'
            },
            {
              'type': 'textline',
              'label': 'relatedField',
              'tooltip': 'Strictly Defines relationship between \'System.String\' and \'System.Byte[]\'. This field links for example a file name with the field that actually stores the data.'
            },
            {
              'type': 'dropdown',
              'label': 'naturalKey',
              'items': 'bool?'
            },
            {
              'type': 'dropdown',
              'label': 'searchField',
              'tooltip': 'Indicates field will appear on the search screen.',
              'items': 'bool?'
            },
            {
              'type': 'dropdown',
              'label': 'searchResultField',
              'tooltip': 'Indicates field will appear on the search result.',
              'items': 'bool?'
            },
            {
              'type': 'textline',
              'label': 'popupEditorView'
            },
            {
              'type': 'dropdown',
              'label': 'popupSearchField',
              'tooltip': 'Indicates field will show on ComboBoxSearch and PopupSearch screens.',
              'items': 'bool?'
            },
            {
              'type': 'dropdown',
              'label': 'popupSearchResultField',
              'tooltip': 'Indicates field will show on ComboBoxSearchResult and PopupSearchResult.',
              'items': 'bool?'
            },
            {
              'type': 'dropdown',
              'label': 'liveSearchResult',
              'items': 'bool?'
            },
            {
              'type': 'dropdown',
              'label': 'popupJsonResult',
              'tooltip': 'Indicates emitter to create a GetJson method and include this field in the resulting object.',
              'items': 'bool?'
            },
            {
              'type': 'dropdown',
              'label': 'svDisplayField',
              'tooltip': 'Indicates field will appear on the standard edit static section part of screen.',
              'items': 'bool?'
            },
            {
              'type': 'dropdown',
              'label': 'tocTableField',
              'tooltip': 'Indicates field will appear on the selective edit table partial views.',
              'items': 'bool?'
            },
            {
              'type': 'dropdown',
              'label': 'tocListField',
              'items': 'bool?'
            },
            {
              'type': 'dropdown',
              'label': 'headerField',
              'items': 'bool?'
            },
            {
              'type': 'dropdown',
              'label': 'isPercentage',
              'tooltip': 'Indicates field is a percentage and special css class is set for the control that display this field.',
              'items': 'bool?'
            },
            {
              'type': 'dropdown',
              'label': 'isDateSequence',
              'tooltip': 'Indicates field is part of date range (Date From, Date To).<ul><li><b>dateSeqPathToUpStreamDate</b>: Referring to the start date of sequence</li><li><b>dateSeqUpStreamOperator</b>: Type of operation to perform between this value and the value of dateSeqPathToUpStreamDate</li><li><b>dateSeqPathToDownStreamDate</b>: Referring to the end date of sequence</li><li><b>dateSeqDownStreamOperator</b>: Type of operation to perform between this value and the value of dateSeqPathToDownStreamDate</li></ul>',
              'items': 'bool?'
            },
            {
              'type': 'textline',
              'label': 'dateSeqPathToDownstreamDate'
            },
            {
              'type': 'textline',
              'label': 'dateSeqPathToUpstreamDate'
            },
            {
              'type': 'textline',
              'label': 'pathToCurrency',
              'tooltip': 'Defines path from a Decimal field to the related currency field on entity.'
            },
            {
              'type': 'dropdown',
              'label': 'apiSummaryField',
              'tooltip': 'Indicates emitter to include this attribute in the ATO Summary.',
              'items': 'bool?'
            },
            {
              'type': 'dropdown',
              'label': 'apiDetailedField',
              'tooltip': 'Indicates emitter to include this attribute in the ATO Detail.',
              'items': 'bool?'
            },
            {
              'type': 'dropdown',
              'label': 'excludeFromApi',
              'items': 'bool?'
            },
            {
              'type': 'dropdown',
              'label': 'isUserDefined',
              'tooltip': 'Defines attribute is a user defined attribute.',
              'items': 'bool?'
            },
            {
              'type': 'dropdown',
              'label': 'displayReadOnly',
              'items': 'bool?'
            },
            {
              'type': 'textline',
              'label': 'characteristics'
            },
            {
              'type': 'textline',
              'label': 'resultsOrder',
              'rules': 'intOnly'
            },
            {
              'type': 'textline',
              'label': 'mvcMimeAccept'
            },
            {
              'type': 'dropdown',
              'label': 'get',
              'items': 'bool?'
            },
            {
              'type': 'dropdown',
              'label': 'set',
              'items': 'bool?'
            },
            {
              'type': 'dropdown',
              'label': 'calculated',
              'tooltip': 'Indicates field will only show as read-only on screen and is calculated in the background.',
              'items': 'bool?'
            },
            {
              'type': 'dropdown',
              'label': 'isIdentity',
              'items': 'bool?'
            },
            {
              'type': 'dropdown',
              'label': 'isDBHashed',
              'items': 'bool?'
            },
            {
              'type': 'dropdown',
              'label': 'isMasked',
              'items': 'bool?'
            },
            {
              'type': 'textline',
              'label': 'titledgroup'
            },
            {
              'type': 'dropdown',
              'label': 'shortForm',
              'items': 'bool?'
            },
            {
              'type': 'dropdown',
              'label': 'longForm',
              'items': 'bool?'
            },
            {
              'type': 'textline',
              'label': 'titleresultsGroup'
            },
            {
              'type': 'textline',
              'label': 'resultsGroup'
            },
            {
              'type': 'textline',
              'label': 'dateSeqDownstreamOperator'
            },
            {
              'type': 'textline',
              'label': 'dateSeqUpstreamOperator'
            },
            {
              'type': 'dropdown',
              'label': 'isBK',
              'tooltip': 'Defines attribute as a business key on the entity.',
              'items': 'bool?'
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

export default entityAttributeDefinition
