import Vue from 'vue';
import Vuex from 'vuex';
import { vuexfireMutations } from 'vuexfire'
import { db } from '../components/connexion.js'


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    favoris: [],
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
     ...vuexfireMutations,
    ADD_TO_FAVORITE(state, key) {
      state.playlist[key].favorite = true;
    },
    REMOVE_TO_FAVORITE(state, key) {
      state.playlist[key].favorite = false;
    },
    ADD_PLAYLIST(state, song) {
      state.playlist = [...state.playlist, { ...song, id: state.playlist.length }]
    },
    LOAD_FAVORITES ( state, datas )
    {
      state.favoris = [...datas]
    }
  },
  actions: {
    loadFavoris ( { commit } )
    {
      db.ref( '/favoris' ).on( 'value', (snap) =>
      {
        const data = snap.val();
        console.log(data)
         commit('LOAD_FAVORITES', data);
      })
      
     
    },
    addToFavorite ( { commit }, payload )
    {
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
