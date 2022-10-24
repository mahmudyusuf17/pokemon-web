<template>
  <div class="pm-homepage">
    <img src="@/assets/image/logo-pokemon.png" class="pm-logo__pokemon"/>
    <div class="md:flex flex-row-reverse block mb-4">
      <div class="basis-1/4 mb-4 md:mb-0">
        <select v-model="filterPokemon" placeholder="Filter" class="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option disabled value="">Select type</option>
          <option value="">All</option>
          <option v-for="(type, indexType) in typeList" :key="indexType" :value="type.name">{{ type.name }}</option>
        </select>
      </div>
      <div class="relative basis-3/4 mr-0 md:mr-3">
          <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input v-model="search" type="search" id="default-search" class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Pokemon">
          <button type="button" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 pb-4">
        <div class="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer pm-card__pokemon" v-for="(pokemon, index) in filteredPokemons" :key="index">
            <RouterLink :to="`/detail/${pokemon.name}`">
            <img class="w-full" :src="`${urlImage}${getId(pokemon)}.png`" :alt="pokemon.name">
            <div class="px-6 py-4 text-center">
                <div class="font-bold text-xl mb-2">{{ pokemon.name }}</div>
            </div>
            </RouterLink>
        </div>
    </div>
    <Pagination :nextPage="nextPage" :previous="previous" />
  </div>
</template>

<script>
import { pokemonStore } from '@/stores/pokemon'
import { mapState } from 'pinia'
import { ref } from 'vue'
import Pagination from '@/components/shared/pagination.vue'
import { RouterLink } from 'vue-router'

export default{
  setup(){
    const offset = ref(0)
    const limit = ref(20)

    const store = pokemonStore()
    
    store.offset = offset
    store.limit = limit

    store.getPokemonData()
    store.getType()

    return{
      store,
    }
  },

  data(){
      return{
          urlImage: import.meta.env.VITE_URLIMAGE,
          search: "",
          filterPokemon: ""
      }
  },

  components:{
      Pagination,
  },

  computed:{
      ...mapState(pokemonStore, ['pokemonList', "nextPage", 'previous', 'detailList', 'typeList']),

      filteredPokemons() {
        return this.pokemonList.filter((item) => {
            return item.type.filter((data) => {
            return data.type.name.includes(this.filterPokemon);
          }).length>0;
          // }
        }).filter((item)=> {
          return item.name.includes(this.search);
        })
      },
  },

  methods:{
    getId(pokemon) {
      return Number(pokemon.url.split("/")[6]);
    },
  },
}

</script>