import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import axios from 'axios'

const baseUrl = import.meta.env.VITE_BASEURL;

export const pokemonStore = defineStore("dataPokemon", {
    state: () => ({
      pokemonList: [],
      pokemonDetail: [],
      nextPage: "",
      previous: "",
      offset: 0,
      limit: 20,
    }),

    actions: {
      async getPokemon() {
        const api = `${baseUrl}?offset=${this.offset}&limit=${this.limit}`;

        const response = await axios.get(api).then((response) => {
          this.pokemonList = response.data.results;
          this.nextPage = response.data.next;
          this.previous = response.data.previous;
        })

        return response;
      },

      async getPokemonDetail(name: any){
        const api = `${baseUrl}/${name}`

        await axios.get(api).then((response) => {
          this.pokemonDetail = response.data;
        })
      }
    },
  });