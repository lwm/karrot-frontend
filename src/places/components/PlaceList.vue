<template>
  <q-list
    highlight
    no-border
    class="no-padding"
  >
    <q-item
      v-for="place in places"
      :key="place.id"
      link
      :to="linkParamsFor(place)"
    >
      <q-item-side class="text-center">
        <q-icon
          :name="place.ui.icon"
          :color="place.ui.color"
          :title="$t(place.ui.label)"
        />
      </q-item-side>
      <q-item-main>
        <q-item-tile label>
          {{ place.name }}
        </q-item-tile>
      </q-item-main>
    </q-item>

    <q-item
      v-if="!hasPlaces && isEditor"
      link
      :to="{ name: 'placeCreate', params: { groupId } }"
      class="bg-secondary"
      multiline
    >
      <q-item-main class="text-center">
        <q-item-tile
          icon="add circle"
          class="text-white"
        />
        <q-tooltip v-t="'BUTTON.CREATE'" />
      </q-item-main>
    </q-item>

    <q-item-separator v-if="archived.length > 0" />

    <q-collapsible
      v-if="archived.length > 0 && isEditor"
      icon="fas fa-trash-alt"
      :label="`${$t('STORESTATUS.ARCHIVED')} (${archived.length})`"
    >
      <q-item
        v-for="place in archived"
        :key="place.id"
        link
        :to="linkParamsFor(place)"
      >
        <q-item-main>
          <q-item-tile label>
            {{ place.name }}
          </q-item-tile>
        </q-item-main>
      </q-item>
    </q-collapsible>
  </q-list>
</template>

<script>
import { QList, QListHeader, QItem, QItemMain, QItemTile, QItemSide, QIcon, QTooltip, QCollapsible, QItemSeparator } from 'quasar'
import { mapGetters } from 'vuex'

export default {
  components: { QList, QListHeader, QItem, QItemMain, QItemTile, QItemSide, QIcon, QTooltip, QCollapsible, QItemSeparator },
  props: {
    groupId: { default: null, type: Number },
    places: { required: true, type: Array },
    archived: { default: () => [], type: Array },
    linkTo: { default: 'place', type: String },

  },
  computed: {
    hasPlaces () {
      return this.places && this.places.length > 0
    },
    ...mapGetters({
      isEditor: 'currentGroup/isEditor',
    }),
  },
  methods: {
    linkParamsFor (place) {
      return {
        name: this.linkTo,
        params: {
          groupId: place.group.id,
          placeId: place.id,
        },
      }
    },
  },
}
</script>
