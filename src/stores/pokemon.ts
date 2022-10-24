import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import axios from 'axios'

const baseUrl = import.meta.env.VITE_BASEURL;

export const pokemonStore = defineStore("dataPokemon", {
    state: () => ({
      pokemonList: [],
      detailList: [],
      pokemonDetail: [],
      typeList: [],
      nextPage: "",
      previous: "",
      offset: 0,
      limit: 20,
    }),

    actions: {
      async getPokemonData(api: any) {
        var urlApi = `${baseUrl}pokemon?offset=${this.offset}&limit=${this.limit}`;
        
        if(api != null){
          urlApi = api
        }

        const response = await axios.get(urlApi).then((response) => {
          this.pokemonList = response.data.results;
          this.nextPage = response.data.next;
          this.previous = response.data.previous;
        })

        return response;
      },

      async getPokemonDetail(name: any){
        const api = `${baseUrl}pokemon/${name}`

        await axios.get(api).then((response) => {
          this.pokemonDetail = response.data;
        })
      },


      async getType(){
        const api = `${baseUrl}type`

        await axios.get(api).then((response) => {
          this.typeList = response.data.results;
        })
      }
    },
  });