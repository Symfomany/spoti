<template>
  <v-card class="mx-auto" min-width="350" width="450" color="teal lighten-5">
    <v-img height="250" :src="require('../assets/images/' + current.cover)" />
    <div class="px-6 py-4">
      <v-row class="d-flex justify-center">
        <v-col cols="3" class="d-flex justify-center flex-column align-center">
          <KnobControl
            :min="0"
            :max="1"
            :stepSize="0.1"
            :stroke-width="10"
            primary-color="#66BB6A"
            secondary-color="#C8E6C9"
            text-color="#43A047"
            v-model="current.volume"
            @input="updateVolume"
          ></KnobControl>
        </v-col>
        <v-col
          cols="6"
          class="d-flex justify-center flex-column align-center text-center"
        >
          <router-link class="headline teal--text font-weight-bold" :to="`/artist/${current.id}`">{{
            current.artist
          }}</router-link>
          <span class="title">{{ current.title }}</span>
        </v-col>
        <v-col cols="3">
          <v-card-actions class="flex-column">
            <v-btn class="my-2" fab small @click="backSong">
              <v-icon> mdi-skip-backward </v-icon>
            </v-btn>

            <!-- play-->
            <v-btn v-if="!isPlay" class="my-2 mx-0" fab small @click="playSong">
              <v-icon> mdi-play </v-icon>
            </v-btn>

            <v-btn v-else class="my-2 mx-0" fab small @click="stopSong">
              <v-icon> mdi-pause </v-icon>
            </v-btn>

            <!--stop -->
            <v-btn class="my-2 mx-0" fab small @click="nextSong">
              <v-icon> mdi-skip-forward </v-icon>
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </div>
    <v-progress-linear
      height="10"
      color="green lighten-1"
      v-model="trackProgression"
    />
    <p v-if="current.trackDuration" class="title">
      {{ current.currentTrackDuration }} / {{ current.trackDuration }}
    </p>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import KnobControl from "vue-knob-control";
export default {
  components: {
    KnobControl,
  },
  data() {
    return {
      isPlay: false,
      indexPlaylist: 0,
      dialog: false,
      player: new Audio(),
      current: {
        sound: "",
        artist: "",
        volume: 0.5,
        cover: "",
        title: "",
        trackDuration: "",
        currentTrackDuration: 0,
        playerTimer: 0,
      },
    };
  },
  computed: {
    ...mapState(["playlist", "isFavorite"]),
    filterList() {
      if (this.isFavorite) {
        return this.playlist.filter((item) => item.favorite === true);
      }
      return this.playlist;
    },
    trackProgression() {
      return (this.current.playerTimer / this.player.duration) * 100;
    },
  },
  watch: {
    indexPlaylist(val) {
      this.current.id = this.playlist[val].id;
      this.current.artist = this.playlist[val].artist;
      this.current.title = this.playlist[val].title;
      this.current.cover = this.playlist[val].cover;
      this.current.sound = require("@/assets/" + this.playlist[val].url);
      this.current.currentTrackDuration = 0;
      this.playSong();
    },
  },
  created() {
    this.current.id = this.playlist[this.indexPlaylist].id;
    this.current.artist = this.playlist[this.indexPlaylist].artist;
    this.current.title = this.playlist[this.indexPlaylist].title;
    this.current.cover = this.playlist[this.indexPlaylist].cover;
    this.current.sound = require("@/assets/" +
      this.playlist[this.indexPlaylist].url);
  },
  destroyed() {
    this.stopSong();
  },
  methods: {
    playSong() {
      if (this.current.sound !== undefined) {
        this.isPlay = false;
        this.player.src = this.current.sound;
      }
      this.player.play();
      this.isPlay = true;
      this.listenersWhenPlay();
    },
    listenersWhenPlay() {
      this.player.addEventListener("timeupdate", () => {
        this.current.playerTimer = this.player.currentTime;
        this.current.trackDuration = this.formatTimer(this.player.duration);
        this.current.currentTrackDuration = this.formatTimer(
          this.current.playerTimer
        );
        this.current.percent =
          (this.current.playerTimer * 100) / this.current.trackDuration;
        this.isPlaying = true;
      });
      this.player.addEventListener(
        "ended",
        function () {
          this.nextSong();
        }.bind(this)
      );
    },
    formatTimer(seconds) {
      let minutes = parseInt(seconds / 60).toString();
      seconds = parseInt(seconds % 60).toString();
      let output = minutes >= 10 ? `${minutes}` : `0${minutes}`;
      output += seconds >= 10 ? `:${seconds}` : `:0${seconds}`;
      return output;
    },
    stopSong() {
      this.player.pause();
      this.isPlay = false;
    },
    nextSong() {
      this.indexPlaylist += 1;
      if (this.indexPlaylist >= this.playlist.length) {
        this.indexPlaylist -= 1;
      }
    },
    backSong() {
      this.indexPlaylist -= 1;
      if (this.indexPlaylist < 0) {
        this.indexPlaylist += 1;
      }
    },
    updateVolume() {
      this.player.volume = this.current.volume;
    },
  },
};
</script>
