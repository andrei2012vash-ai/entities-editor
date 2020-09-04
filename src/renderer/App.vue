<template>
  <v-app>
    <splitpanes>
      <pane min-size="20">
        <p class="text-md-center mt-2" v-if="files == null">
          Empty files list...
        </p>

        <div v-else>
          <v-text-field v-model="fileFilter"
            flat
            placeholder="Filter"
            hide-details
            prepend-inner-icon="filter_list"
            class="filter-text-field"
            clearable />

          <v-list class="file-list" >
            <v-list-group
              v-for="file in filteredFiles"
              :key="file[0]"
              no-action
            >

              <template v-slot:activator>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>{{ file[0] }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>

              <v-list-item
                v-for="subItem in file[1]"
                :key="subItem.name"
                @click="editFile(subItem)"
              >
                <v-tooltip left open-delay="1000">
                  <template v-slot:activator="{ on }">                  
                    <v-list-item-content v-on="on">
                      <v-tooltip bottom>
                        <template v-slot:activator>
                          <v-list-item-title>{{ subItem.name }}</v-list-item-title>
                        </template>
                      <span>{{ subItem.name }}</span>
                      </v-tooltip>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-icon color="green">{{ subItem.edited ? 'edit' : '' }}</v-icon>
                    </v-list-item-action>

                  </template>
                  <span>{{ subItem.name }}</span>
                </v-tooltip>
              </v-list-item>
            </v-list-group>
          </v-list>
        </div>
      </pane>
      <pane min-size="50">
        <!-- <v-content class="content-scroll"> -->
        <editor-page class="content-maring"></editor-page>
        <!-- </v-content> -->
      </pane>
      <pane min-size="15">
        <fields-list v-if="isFileEdited === true"></fields-list>
      </pane>
    </splitpanes>
  
    
    <div>
      <v-app-bar id="drag-region" :color="$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-3'" 
        app dense flat clipped-left clipped-right fixed>
        <img src="./assets/icon.png" class="no-drag app-icon" />
        <menu-bar title="File" :menuItems="menuItems.file" :isFileEdited="isFileEdited" @itemClicked="handleMenuItemClicked"></menu-bar>
        <span class="title ml-3 mr-5">Entities<span class="font-weight-light">Editor <span class="body-1">v{{ ver }}</span></span></span>
        <v-text-field
          solo
          flat
          hide-details
          label="Search"
          prepend-inner-icon="search"
          class="no-drag square"
          clearable
          v-model="search"
          @input="setSearch"
          :disabled="editMode === null"
          ref="search"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn class="no-drag control-btn" height="100%" tile text v-on:click="minimizeApp">
          &#xE921;
        </v-btn>
        <v-btn class="no-drag control-btn" height="100%" tile text v-on:click="maximizeApp">
          <span v-if="!windowIsMaximized">&#xE922;</span>
          <span v-else>&#xE923;</span>
        </v-btn>
        <v-btn class="no-drag close-btn control-btn" height="100%" tile text v-on:click="closeApp">
          &#xE8BB;
        </v-btn>
      </v-app-bar>
    </div>

    <v-dialog
      v-model="loading"
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          Loading...
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <options :show="preferencesShow" @itemClicked="handleMenuItemClicked"></options>

    <v-snackbar
      v-model="savedSuccessfully"
      color="success"
      :bottom="true"
      :right="true"
      :timeout="3000"
    >
      Saved successfully
    </v-snackbar>

  </v-app>
</template>

<script>
  import store from './store/modules/entity'
  import { mapState } from 'vuex'

  import EditorPage from './components/EditorPage'
  import FieldsList from './components/EditorPage/FieldsList'
  import MenuBar from './components/AppPage/MenuBar'
  import Options from './components/AppPage/Options'
  import { Splitpanes, Pane } from 'splitpanes'
  import 'splitpanes/dist/splitpanes.css'

  const { remote } = require('electron')
  const glob = require('glob')
  const fs = require('fs')
  const parser = require('fast-xml-parser')
  const J2xParser = require('fast-xml-parser').j2xParser

  let mainWindow = require('electron').remote.getCurrentWindow()
  const electronLocalshortcut = require('electron-localshortcut')

  export default {
    store,
    name: 'entitieseditor',
    components: { EditorPage, FieldsList, MenuBar, Options, Splitpanes, Pane },
    data () {
      return {
        search: '',
        files: null,
        fileFilter: '',
        isFileEdited: false,
        editedFile: null,
        loading: false,
        menu: true,
        preferencesShow: false,
        filesList: false,
        fieldsList: false,
        savedSuccessfully: false,
        ver: remote.app.getVersion(),
        windowIsMaximized: false,
        menuItems: {
          file: [
            { title: 'Open...', icon: 'folder_open', action: 'openDialog', shortcut: 'Ctrl+O' },
            { title: 'Save', icon: 'save', action: 'saveFile', disableOnFileEdit: true, shortcut: 'Ctrl+S' },
            { divider: true },
            { title: 'Preferences...', icon: 'settings', action: 'showPreferences', shortcut: 'Ctrl+P' }
          ]
        }
      }
    },
    mounted () {
      electronLocalshortcut.register(mainWindow, 'Ctrl+O', () => {
        this.openDialog()
      })

      electronLocalshortcut.register(mainWindow, 'Ctrl+P', () => {
        this.showPreferences()
      })

      electronLocalshortcut.register(mainWindow, 'Ctrl+F', () => {
        this.$nextTick(() =>
          this.$refs.search.$el.querySelector('input').focus()
        )
      })

      electronLocalshortcut.register(mainWindow, 'Ctrl+S', () => {
        this.saveFile()
      })

      this.$nextTick(function () {
        mainWindow.on('maximize', () => {
          this.windowIsMaximized = mainWindow.isMaximized()
        })

        mainWindow.on('unmaximize', () => {
          this.windowIsMaximized = mainWindow.isMaximized()
        })

        store.dispatch('loadConfig')
      })
    },
    methods: {
      handleMenuItemClicked (action) {
        this[action]()
      },
      openDialog () {
        var model = this
        model.loading = true

        var path = remote.dialog.showOpenDialog({
          properties: ['openDirectory']
        })

        glob(path + '/**/*.entities', function (er, files) {
          var filesGroup = new Map()
          for (let file of files) {
            let pieces = file.split('/')
            var name = pieces[pieces.length - 1].replace(/\.entities$/, '')
            var group = pieces[pieces.length - 4]

            if (!filesGroup.has(group)) {
              filesGroup.set(group, [{name: name, path: file}])
            } else {
              var currentItems = filesGroup.get(group)
              currentItems.push({name: name, path: file, edited: false})
              filesGroup.set(group, currentItems)
            }
          }

          model.files = [ ...filesGroup ]
          setTimeout(() => {
            model.loading = false
            model.menu = false
            model.filesList = true
          }, model.files.length * 40)
        })
      },
      editFile (item) {
        if (this.isFileEdited) {
          let editedItem = this.files.map(x => x[1]).reduce((a, c) => a.concat(c)).filter(f => f.edited)[0]
          if (editedItem) {
            editedItem.edited = false
          }
        }

        var options = {
          attributeNamePrefix: '',
          attrNodeName: 'attr', // default is 'false'
          textNodeName: '#text',
          ignoreAttributes: false,
          ignoreNameSpace: false,
          allowBooleanAttributes: true,
          parseNodeValue: true,
          parseAttributeValue: true,
          trimValues: true,
          cdataTagName: '__cdata', // default is 'false'
          cdataPositionChar: '\\c',
          localeRange: '', // To support non english character in tag/attribute values.
          parseTrueNumberOnly: false
        }
        fs.readFile(item.path, 'utf8', (err, data) => {
          if (err) throw err

          var obj = parser.parse(data, options)
          store.commit('setEntity', obj)
        })

        item.edited = true
        this.isFileEdited = true
        this.editedFile = item
        this.fieldsList = true

        store.commit('setEditMode', 'entity')
      },
      saveFile () {
        var filePath = this.editedFile.path

        fs.access(filePath, fs.constants.W_OK, (err) => {
          if (err) {
            remote.dialog.showErrorBox('File is not writeable.', 'Check if file is not used by another process.')
          } else {
            var options = {
              attributeNamePrefix: '',
              attrNodeName: 'attr', // default is 'false'
              textNodeName: '#text',
              ignoreAttributes: false,
              ignoreNameSpace: false,
              allowBooleanAttributes: true,
              parseNodeValue: true,
              parseAttributeValue: true,
              trimValues: true,
              format: true,
              supressEmptyNode: true,
              cdataTagName: '__cdata', // default is 'false'
              cdataPositionChar: '\\c',
              localeRange: '', // To support non english character in tag/attribute values.
              parseTrueNumberOnly: false
            }

            var j2xparser = new J2xParser(options)
            var xml = ('<?xml version="1.0" encoding="utf-8"?>\n' + j2xparser.parse(this.entity, options)).replace(/"\/>/g, '" />')

            fs.writeFile(filePath, xml, (err) => {
              if (err) {
                remote.dialog.showErrorBox('Error during saving file.', err.toString())
              } else {
                this.savedSuccessfully = true
              }
            })
          }
        })
      },
      setSearch () {
        this.$store.commit('setSearchBar', this.search)
      },
      showPreferences () {
        this.preferencesShow = true
      },
      closePreferences () {
        this.preferencesShow = false
      },
      minimizeApp () {
        mainWindow.minimize()
      },
      maximizeApp () {
        mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize()
        this.windowIsMaximized = mainWindow.isMaximized()
      },
      closeApp () {
        let shouldClose = remote.dialog.showMessageBox(
          {
            type: 'question',
            buttons: ['Yes', 'No'],
            title: 'Entities Editor',
            message: 'Are you sure you want to quit?'
          }
        )

        if (shouldClose === 0) {
          window.close()
        }
      },
      updateConfig (prop, e) {
        var value = e !== null ? e : false
        store.dispatch('saveConfig', { prop: prop.toString(), value })
      }
    },
    computed: {
      ...mapState({
        entity: state => state['entity'],
        editMode: state => state.editMode,
        config: state => state.app.config
      }),
      filteredFiles: function () {
        let filteredFiles = []
        let filter = this.fileFilter

        if (filter === '' || filter === null) {
          return this.files
        }

        for (let file of this.files) {
          let filteredEntites = []
          let entites = file[1]
          for (let entity of entites) {
            if (entity.name.toLowerCase().includes(filter)) {
              filteredEntites.push(entity)
            }
          }
          if (filteredEntites.length > 0) {
            filteredFiles.push([file[0], filteredEntites])
          }
        }

        return filteredFiles
      }
    }
  }
</script>

<style lang="scss">
  html {
    overflow-y: hidden;
  }

  .content-scroll {
    position: absolute;
    top: 48px;
    bottom: 0;
    right: 0;
    left: 0;    
    overflow: auto;
  }

  .content-maring {
    margin-top: -48px;
  }

  .floating-btn {
    margin-bottom: 48px;
  }

  .app-icon {
    height: 35px;
    width: 35px;
    margin-left: -11px;
    margin-right: 11px;
  }

  #drag-region {
    -webkit-app-region: drag;
  }

  .no-drag {
    -webkit-app-region: no-drag;
  }

  .square {
    border-radius: 0;
  }

  .close-btn {
    margin-right: -16px !important;
    &:hover {
      background: #E72536;
      color: white;
    }

    &:active {
      background: #F1707A;
      color: white;
    }
  }

  .control-btn {    
    height: 48px;
    width: 75px;
    min-width: 0;
    font-family: "Segoe MDL2 Assets";
    margin-top: 0;
    margin-bottom: 0;
    margin-left: 0;
    margin-right: 0;
    padding-right: 0;
    padding-left: 0;

    div.v-btn__content {
      padding: 0;
    }
  }

  .v-list .v-list-group {
    .v-list-item {
        overflow: hidden;
      }  
    .v-list-group__items{
      .v-list-item {
        padding-left: 48px;
      }
    }
  }

  .filter-text-field {
    padding-top: 0;
  }

  $scrollbar-size: 12px;

  .theme--dark {
    ::-webkit-scrollbar {
      width: $scrollbar-size;      
      height: $scrollbar-size;
    }
    
    ::-webkit-scrollbar-thumb {
      background: rgb(102, 102, 102);
    }

    ::-webkit-scrollbar-thumb:hover {
      background: darken(rgb(102, 102, 102), 20);
    }

    ::-webkit-scrollbar-track {
      background: rgb(66, 66, 66);
    }

    .splitpanes--vertical > .splitpanes__splitter {
      background-color: rgb(66, 66, 66);
    }

    .splitpanes--horizontal > .splitpanes__splitter {
      background-color: rgb(66, 66, 66)
    }
  }

  .theme--light {
    ::-webkit-scrollbar {
      width: $scrollbar-size;
      height: $scrollbar-size;
    }
    
    ::-webkit-scrollbar-thumb {
      background: rgb(175, 175, 175);
    }

    ::-webkit-scrollbar-thumb:hover {
      background: darken(rgb(175, 175, 175), 20);
    }

    ::-webkit-scrollbar-track {
      background: rgb(235, 235, 235);
    }

    .splitpanes--vertical > .splitpanes__splitter {
      background-color: rgb(235, 235, 235);
    }

    .splitpanes--horizontal > .splitpanes__splitter {
      background-color: rgb(235, 235, 235)
    }
  }

  .splitpanes--vertical > .splitpanes__splitter {
    min-width: 6px;
    background-color: rgb(235, 235, 235);
  }

  .splitpanes--horizontal > .splitpanes__splitter {
    min-height: 6px;
    background-color: rgb(235, 235, 235)
  }

  .splitpanes {
    margin-top: 48px;
  }

  .splitpanes__pane {
    overflow-y: auto;
    height: calc(100vh - 48px);
  }


</style>
