<template>
    <div class="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
        <div class="flex flex-1 justify-between">
            <a href="#" @click="onClick(previous)" class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
            <a href="#" @click="onClick(nextPage)" class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
        </div>
    </div>
</template>
<script>
import { pokemonStore } from '@/stores/pokemon'

export default {
    props: {
        nextPage: String,
        previous: String,
    },

    methods:{
        onClick(url){
            pokemonStore().getPokemonData(url)
        }
    }
}
</script>