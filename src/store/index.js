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
        favorite: false,
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
  },
  mutations: {
    ADD_TO_FAVORITE(state, key) {
      state.playlist[key].favorite = true;
    },
    REMOVE_TO_FAVORITE(state, key) {
      state.playlist[key].favorite = false;
    },
    ADD_PLAYLIST(state, song) {
      state.playlist = [...state.playlist, { ...song, id: state.playlist.length }]
    },
  },
  actions: {
    addToFavorite({ commit }, payload) {
      commit('ADD_TO_FAVORITE', payload);
    },
    removeToFavorite({ commit }, payload) {
      commit('REMOVE_TO_FAVORITE', payload);
    },
    addToPlaylist({ commit }, song) {
      commit('ADD_PLAYLIST', song);
    },
  },
});
