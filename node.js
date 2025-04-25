// este arquivo é o começo do meu node, por isso você deve estranhar ele estar aqui


const express = require('express')

const app = express()

async function getPokemonData(pokemonData){ // usando de uma função assíncrona para conseguir usar o await (meio q avisando que vai ter await?)
    try{ // adiciono try porque se der erro eu vou receber o porque dele
        const resData = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonData}`) // somente aqui uso o await
        const dataPokemon = await resData.json()
        return dataPokemon
    } catch(err){
        console.error(err)
    }
    
}

app.get('/', async (req, res) => { // espero o get antes de executar o q tá dentro do try
    try{ // adiciono try porque se der erro eu vou receber o porque dele
        const pokemonData = await getPokemonData('charizard')
        const _abilities = pokemonData.abilities.map(abilities => abilities.ability.name)
        res.json({pokemonName: pokemonData.name, pokemonId: pokemonData.id, pokemonAbilities: _abilities})
    }catch(err){ // pega o erro
        console.error(err) // mostra o erro
    }
})

app.listen(5000)
    