<template>
  <div class="pm-homepage">
    <img src="@/assets/image/logo-pokemon.png" class="pm-logo__pokemon"/>
        <div class="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 pb-4">
            <div class="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer pm-card__pokemon" v-for="(pokemon, index) in pokemonList" :key="index">
                <RouterLink :to="`/detail/${pokemon.name}`">
                <img class="w-full" :src="`${urlImage}/${index+1}.png`" :alt="pokemon.name">
                <div class="px-6 py-4 text-center">
                    <div class="font-bold text-xl mb-2">{{ pokemon.name }}</div>
                </div>
                 </RouterLink>
            </div>
        </div>
    <Pagination/>
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

    // const urlImage = ref()

    const store = pokemonStore()
    
    store.offset = offset
    store.limit = limit

    store.getPokemon()

    return{
      store,
    }
  },

  data(){
      return{
          urlImage: import.meta.env.VITE_URLIMAGE
      }
  },

  components:{
      Pagination,
  },

  computed:{
      ...mapState(pokemonStore, ['pokemonList']),
  },

  methods:{
        increment() {
            offset.value = 20;
            console.log(offset.value)
    }
  },
}

</script>