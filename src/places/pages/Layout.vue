<template>
  <div v-if="place && place.status === 'archived'">
    <q-card>
      <k-banner
        color="info"
        icon="fas fa-trash-alt"
        :actions="isEditor ? [{ label: $t('STOREEDIT.RESTORE'), handler: restore }] : []"
      >
        {{ $t('STOREDETAIL.ARCHIVED') }}
      </k-banner>
    </q-card>
  </div>
  <router-view v-else/>
</template>

<script>

import { mapGetters } from 'vuex'
import Markdown from '@/utils/components/Markdown'
import PlaceOptions from '@/sidenav/components/PlaceOptions'

import { QCard, QTabs, QRouteTab, QScrollArea, QBtn, QIcon } from 'quasar'
import KBanner from '@/alerts/components/KBanner'

export default {
  components: { QCard, QTabs, QRouteTab, QScrollArea, KBanner, QBtn, QIcon, PlaceOptions, Markdown },
  computed: {
    ...mapGetters({
      place: 'places/activePlace',
      isEditor: 'currentGroup/isEditor',
    }),
  },
  methods: {
    restore () {
      this.$datastore.dispatch('places/save', { id: this.place.id, status: 'created' })
    },
  },
}
</script>

<style scoped lang="stylus">
@import '~variables'
.place-banner
  margin: 8px 8px -13px 8px
  > span
    display: block
    height 5vw
    min-height 30px
    max-height 48px
    overflow hidden

body.mobile .place-banner
  margin: 0px 0px -13px 0px
  border 0
  max-height: 30px
  overflow: hidden
</style>
