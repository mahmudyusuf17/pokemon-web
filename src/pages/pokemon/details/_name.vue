<template>
  <div class="pm-detail-page">
    <img src="@/assets/image/logo-pokemon.png" class="pm-logo__pokemon"/>
        <div class="pm-pokemon__detail" v-if="pokemonDetail != null">
            <img class="max-w-full h-auto" :src="pokemonDetail.sprites.front_default" alt="image description">
        </div>
        <!-- <pre>{{pokemonDetail}}</pre> -->
  </div>
</template>

<script>
import { pokemonStore } from '@/stores/pokemon'
import { mapState } from 'pinia'
import { useRoute } from 'vue-router'

export default{
  setup(){
    const route = useRoute()
    const store = pokemonStore()

    store.getPokemonDetail(route.params.name)

    return{
      store,
    }
  },

  computed:{
      ...mapState(pokemonStore, ['pokemonDetail']),
  },
}

</script>