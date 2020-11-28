import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    playlist: [
      {
        id: 1,
        artist: 'Currents',
        title: 'Monsters',
        url: 'musics/Monsters.mp3',
        cover: 'Currents.jpg',
        favorite: false,
      },
      {
        id: 2,
        artist: 'Architects',
        title: 'Black Lungs',
        url: 'musics/Black Lungs.mp3',
        cover: 'Architects.jpg',
        favorite: true,
      },
      {
        id: 3,
        artist: 'Bring Me The Horizon',
        title: '1x1 (feat. Nova Twins)',
        url: 'musics/1x1 (feat. Nova Twins).mp3',
        cover: 'BMTH.jpg',
        favorite: false,
      },
    ],
    isFavorite: false,
    item: {},
  },
  mutations: {
    ADD_TO_FAVORITE(state, key) {
      state.playlist[key].favorite = true;
    },
    REMOVE_TO_FAVORITE(state, key) {
      state.playlist[key].favorite = false;
    },
    CHECKED_IS_FAVORITE(state, isFavorite) {
      state.isFavorite = isFavorite;
    },
    SET_ITEM(state, key) {
      state.item = state.playlist[key];
    },
  },
  actions: {
    addToFavorite({ commit }, payload) {
      commit('ADD_TO_FAVORITE', payload);
    },
    removeToFavorite({ commit }, payload) {
      commit('REMOVE_TO_FAVORITE', payload);
    },
    isFavoriteCheck({ commit }, isFavorite) {
      commit('CHECKED_IS_FAVORITE', isFavorite);
    },
    setItem({ commit }, key) {
      commit('SET_ITEM', key);
    },
  },
});
