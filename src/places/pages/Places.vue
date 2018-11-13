<template>
  <q-card>
    <PlaceList
      class="white-background"
      :group-id="groupId"
      :places="places"
      :archived="archived"
    />
  </q-card>
</template>

<script>
import PlaceList from '@/places/components/PlaceList'
import { mapGetters } from 'vuex'
import { QCard } from 'quasar'

export default {
  components: {
    PlaceList, QCard,
  },
  computed: {
    ...mapGetters({
      groupId: 'currentGroup/id',
      places: 'places/byCurrentGroup',
      archived: 'places/byCurrentGroupArchived',
    }),
  },
}
</script>
