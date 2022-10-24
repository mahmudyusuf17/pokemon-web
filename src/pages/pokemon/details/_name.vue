<template>
  <div class="pm-detail-page">
    <img src="@/assets/image/logo-pokemon.png" class="pm-logo__pokemon"/>
        <div class="pm-pokemon__detail mb-5">
            <img class="pm-image__pokemon" :src="pokemonDetail.sprites?.front_default" alt="image description">
            <h2 class="text-4xl font-bold">{{ pokemonDetail.name }}</h2>
        </div>
        <div class="flex flex-row md:block">
          <div class="pm-detail__left basis-1/2">
            <div class="pm-detail__karakter text-xl">
              <span class="font-bold">Weight: </span>
              <span class="ml-3">{{ pokemonDetail.weight }}</span>
            </div>
            <div class="pm-detail__karakter text-xl">
              <span class="font-bold">Height: </span>
              <span class="ml-3">{{ pokemonDetail.height }}</span>
            </div>
            <div class="pm-detail__karakter text-xl">
              <span class="font-bold">Species: </span>
              <span class="ml-3">{{ pokemonDetail.species?.name }}</span>
            </div>
            <div class="text-xl mb-2">
              <span class="font-bold">Moves: </span>
              <div class="flex ml-3" v-for="(move, indexMove) in pokemonDetail.moves" :key="indexMove">
                - {{ move.move?.name }}
              </div>
            </div>
          </div>
            
          <div class="pm-detail__right basis-1/2">
            <div class="pm-detail__karakter text-xl">
              <span class="font-bold">Base Experience: </span>
              <span class="ml-3">{{ pokemonDetail.base_experience }}</span>
            </div>
            <div class="d-block text-xl mb-2">
              <span class="font-bold">Types: </span>
              <div class="ml-3" v-for="(type, indexType) in pokemonDetail.types" :key="indexType">
                - {{ type.type?.name }}
              </div>
            </div>
            <div class="d-block text-xl mb-2">
              <span class="font-bold">Abilities: </span>
              <div class="ml-3" v-for="(ability, indexAbility) in pokemonDetail.abilities" :key="indexAbility">
                - {{ ability.ability?.name }}
              </div>
            </div>
            <div class="d-block text-xl mb-2">
              <span class="font-bold">Stats: </span>
              <div class="ml-3" v-for="(stat, indexStat) in pokemonDetail.stats" :key="indexStat">
                - {{ stat.stat?.name }}
              </div>
            </div>
            <div class="d-block text-xl mb-2">
              <span class="font-bold">Forms: </span>
              <div class="ml-3" v-for="(form, indexForm) in pokemonDetail.forms" :key="indexForm">
                - {{ form.name }}
              </div>
            </div>
          </div>
        </div>
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