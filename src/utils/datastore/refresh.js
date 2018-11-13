import { createMetaModule, withMeta, metaStatuses } from '@/utils/datastore/helpers'

export default {
  namespaced: true,
  modules: { meta: createMetaModule() },
  getters: {
    ...metaStatuses['refresh'],
  },
  actions: {
    ...withMeta({
      async refresh ({ dispatch, rootGetters }, done) {
        const activeState = {
          groupId: rootGetters['currentGroup/id'],
          placeId: rootGetters['places/activePlaceId'],
          userId: rootGetters['user/activeUserId'],
        }
        await Promise.all([
          dispatch('users/refresh', {}, { root: true }),
          dispatch('places/fetch', null, { root: true }),
          dispatch('pickups/refresh', null, { root: true }),
          dispatch('pickupSeries/fetchListForActivePlace', null, { root: true }),
          dispatch('invitations/refresh', null, { root: true }),
          dispatch('history/fetch', activeState, { root: true }),
          dispatch('groups/fetch', null, { root: true }),
          dispatch('conversations/refresh', null, { root: true }),
          dispatch('feedback/fetch', activeState, { root: true }),
          dispatch('currentGroup/refresh', null, { root: true }),
          dispatch('currentThread/refresh', null, { root: true }),
          dispatch('auth/refresh', null, { root: true }),
          dispatch('latestMessages/fetch', {}, { root: true }),
          dispatch('notifications/fetch', null, { root: true }),
        ])

        if (done) done()
      },
    }),

    maybeRefresh ({ dispatch, getters }) {
      if (getters.refreshStatus.pending) return
      dispatch('refresh')
    },
  },
}
