'use client'
import { Button, Flex, Img, Input, Text } from "@chakra-ui/react";
import { useState } from "react";

import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

import Pokedex from '../imgs/pokedex.png'

interface Pokemon{
  name: string;
  id: number;
  sprites: {
    back_shiny: string;
    front_shiny: string;
    front_default: string;
    back_default: string;
  }
  weight: number;
  height: number;
  abilities: {
    ability: {
      name: string
    }
  }[]
}


export default function Home(){

  const [name, setName] = useState<string>('')
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)

  const [pokeImage, setPokeImage] = useState<Pokemon['sprites']>()
  let [sortedNumber, setSortedNumber] = useState<number>()
  const [error, setError] = useState('')
  
    

    function search(){
      if (name.length >= 1 ){
        // math.random < 0.2 redefine to 1, if not, show 0
        

      fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
      .then((res) => {
        if (!res.ok) throw new Error('Pokémon não encontrado!')
        return res.json()
      })
     
      .then((data) => {
        const SortNumber = Math.random() < 0.08 ? 1 : 0
        if (SortNumber === 1) {
          setPokeImage(data.sprites.front_shiny);
        } else {
          setPokeImage(data.sprites.front_default);
        }

        setPokemon(data), console.log(data)})
        

      .catch(() => {
        setPokemon(null)
        setError('Pokémon não encontrado!')
      });
      setName('')
    }
    }

  return(
    <Flex
      h='100vh'
      w='100vw'
      bgColor='gray.900'
      color='white'
      justify="center"
      align="center"
      position='absolute'
    >
      <Flex
       flex="1"
       height='100%'
       w='100%'
       padding='10px'
       gap='20px'
       flexDir='column'
      > 
        <Text> Enter the Pokémon's id or name: </Text>
        <Flex> 
          <Input placeholder='oi' borderRadius='10px 0 0 10px'
          bgColor='black'
          value={name}
          onChange={(e) => setName(e.target.value)}
          focusBorderColor='white'
          _focus={{ outline: 'none', boxShadow: 'none' }}
          />
          <Button bgColor='gray.300' borderRadius='0 10px 10px 0' onClick={() => search()}>Pesquisar</Button>
        </Flex>
        <Flex
        flexDir='column'
        fontSize='18px'
        gap='10px'
        align='center'  
        width='100%'
        height='100%'
        >
          {pokemon ? (
            <Flex 
            width="100%" 
            maxWidth="700px" 
            minWidth="300px" 
            position='relative'
            flexDir='column'
            >

              <Text 
              align='center' 
              zIndex='2' 
              position='absolute'  
              top='60%'
              left='30%'
              transform='translateX(-50%)'  
              fontSize='25px' 
              color='black'
              >
                {pokemon.name}
              </Text>   
              {/* @ts-ignore*/}
              <Img src={pokeImage} width='150px' height='150px' position='absolute' zIndex='2' top='30%' left='26%' transform='translateX(-50%)'  />
              
              <Img src={Pokedex.src} zIndex='1'  width="100%" maxWidth="700px" justifyContent='center' />

              <Flex position='absolute' left='60%' top='30%' zIndex='2' width='100%' height='100%'> 
                  <Text> N.0{pokemon.id}</Text>

                  <Flex
                  width='25%'
                  height='100%'
                  justify='end'
                  > 
                    <Text>{pokemon.name}</Text>

                  </Flex>
              </Flex>

              
               

              </Flex>

          ) : (<Flex color='red'> {error} </Flex>)}
        </Flex>
      
      </Flex>
    </Flex>
  )
}