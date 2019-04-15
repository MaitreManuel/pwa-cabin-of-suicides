<template>
    <v-layout row nav-layout>
        <v-flex xs12>
            <v-toolbar>
                <v-toolbar-side-icon @click.stop="drawer = !drawer" />
            </v-toolbar>

            <v-navigation-drawer
                    v-model="drawer"
                    absolute
                    dark
                    temporary
            >
                <v-list class="pa-1">
                    <v-list-tile avatar tag="div">
                        <v-list-tile-content>
                            <v-list-tile-title>John Leider</v-list-tile-title>
                        </v-list-tile-content>

                        <v-list-tile-action>
                            <v-btn icon @click.stop="drawer = !drawer">
                                <v-icon>close</v-icon>
                            </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>

                <v-list class="pt-0" dense>
                    <v-divider dark></v-divider>

                    <v-list-tile
                            v-for="item in items"
                            :key="item.title"
                            @click="console.log('caca')"
                    >
                        <v-list-tile-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>

                        <v-list-tile-content>
                            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-navigation-drawer>
        </v-flex>
    </v-layout>
</template>

<script>
  export default {
    name: 'navigation',
    data () {
      return {
        drawer: null,
        items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' }
        ],
        right: null
      }
    }
  }
</script>

<style lang="scss" scoped>
    .nav-layout {
        position: relative;
        z-index: 999999;
    }

    .v-navigation-drawer {
        height: 100vh !important;
    }

    .v-toolbar {
        background: transparent;
        box-shadow: none;

        i {
            color: #212121;
            font-size: 30px;
        }
    }
</style>

<style>
    .v-overlay {
        height: 100vh;
    }
</style>