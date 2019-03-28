<template>
    <v-container fluid pa-0>
        <v-layout row>
            <v-flex xs12>
                <v-toolbar dark color="primary">
                    <v-toolbar-side-icon></v-toolbar-side-icon>
                    <v-toolbar-title class="white--text">Title</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                        <v-icon>search</v-icon>
                    </v-btn>
                    <v-btn icon>
                        <v-icon>more_vert</v-icon>
                    </v-btn>
                </v-toolbar>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  export default {
    name: 'navigation'
  }
</script>

<style lang="scss" scoped>

</style>