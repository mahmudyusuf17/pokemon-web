import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import axios from 'axios'

const baseUrl = import.meta.env.VITE_BASEURL;

export const pokemonStore = defineStore("dataPokemon", {
    state: () => ({
      pokemonList: [] as DataPokemon[],
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
          this.pokemonList = [];
          this.nextPage = response.data.next;
          this.previous = response.data.previous;

          var data = response.data.results;
          data.forEach((element: { url: any; name: any; }) => {
            this.getDetail(element.url, element.name)
          });
        })

        return response;
      },

      async getDetail(url: any, name: any){
        await axios.get(url).then((response) => {
          var type = response.data.types

          if(response.data.name == name){
            var data = {
              url: url,
              name: name,
              type: type
            }

            this.pokemonList.push(data)
          }
        })
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

  interface DataPokemon {
    name: string,
    url: string,
    type: Array<number>
  }