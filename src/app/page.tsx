'use client'

import { useState, useRef } from 'react'
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel
} from '@chakra-ui/react'

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  Portal
} from '@chakra-ui/react'


interface Project {
  name: string,
  id: number,
  money: number,
  createdAt: Date;
  lastTimeEdited: Date;
}

export default function Home() {

  const [project, setProject] = useState<Project[]>([])
  const [projectName, setProjectName] = useState<Project['name']>('')
  const [projectMoney, setProjectMoney] = useState<Project['money']>(0);

  const [creatingMenu, setCreatingMenu] = useState(false)
  const [editProjectId, setEditProjectId] = useState<number>(0)
  const [editProjectName, setEditProjectName] = useState<string>('')
  const [editProjectMoney, setEditProjectMoney] = useState<number>(0)


  const [firstModalOpen, setFirstModalOpen] = useState(false)
  const [secondModalOpen, setSecondModalOpen] = useState(false)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = useRef(null)
  const finalRef = useRef(null)


  const openCreatingMenu = () => {

    setCreatingMenu(true);
  }


  function handleCreateProject() {
    if (projectName.length > 2 && projectName.length < 30 && projectMoney >= 5000) {
      const _project: Project = {
        name: projectName,
        money: projectMoney,
        id: Date.now(),
        createdAt: new Date(),
        lastTimeEdited: new Date(),
      }

      const updatedProjectArray = [...project, _project];

      setCreatingMenu(false)
      setProjectName('')
      setProjectMoney(0)
      setProject(updatedProjectArray)
    } else

      if (projectName.length <= 2 && projectMoney > 5000) {
        alert(`you cant create project with ${projectName.length} caracters`)
      } else

        if (projectMoney == 0 && projectName.length == 0) {
          alert('are you kiding me?')
        } else if (projectMoney < 5000 && projectName.length > 2) {
          alert(`You cant create project with ${projectMoney} of money, your project must have at least $5000,00`)
        } else if (projectName.length <= 2 && projectMoney < 5000) {
          alert('are you kiding me? Put the name of the project and your money')
        }



  }

  function handleDeleteProject(id: number) {
    // 
    setSecondModalOpen(false)
    setProject(project.filter((p) => p.id !== id))
  }

  function openEditModal(id: number, name: string, money: number) {
    setEditProjectId(id)
    setEditProjectName(name)
    setEditProjectMoney(money)
    onOpen()

  }


  function handleUpdateProject() {
    // se o id nao for null
    if (editProjectId !== null) {
      setProject(project.map((p) =>
        p.id === editProjectId ? { ...p, name: editProjectName, money: editProjectMoney, lastTimeEdited: new Date } : p
      ))
      onClose()
    }



    // errado
    // setProject((post) => post. === id ? {...post, updatedName} : post)
    // setProjectMoney(editProjectMoney)
  }

  return (
    <Flex
      zIndex='1'
      flexDir='column'

      fontFamily='monospace'

      h='100vh'
      w='100vw'
      bgColor='gray.800'

      color='white'
    >
      <Flex
        h='8%'
        w='100vw'
        bgColor='blackAlpha.700'
      >
      </Flex>

      <Flex
        flexDir='column'
        h='92%'
        w='100%'
      >
        <Flex
          padding='10px'
          justify='end'
          align='center'
          bgColor='blackAlpha.600'
          w='100vw'
          h='8%'
        >
          <Button
            onClick={openCreatingMenu}

            color='white'
            transition='.3s'
            _hover={{
              bgColor: 'blackAlpha.900',
              color: '#ccc',
            }}
            bgColor='blackAlpha.700'
          >
            <Text
            > Create</Text>
          </Button>

        </Flex>

        {creatingMenu && (
          <Flex
            zIndex='3'
            position='absolute'
            top='0'
            left='0'
            h='100vh'
            w='100vw'
            bgColor='blackAlpha.700'
            align='center'
            justify='center'
          >

            <Flex
              align='center'
              flexDir='column'

              bgColor='#000'
              width='550px'
              h='600px'

              padding='10px'
              gap='30px'
            >
              <Flex
                align='center'
                flexDir='column'
                gap='10px'
              >
                <Text
                  fontSize='25px'
                > Type the project name</Text>
                <Input value={projectName} onChange={(e) => setProjectName(e.target.value)}
                  width='400px'
                />
              </Flex>

              <Flex
                align='center'
                flexDir='column'
                gap='10px'
              >
                <Text
                  fontSize='25px'
                > Type the project money</Text>
                <Input value={projectMoney} onChange={(e) => setProjectMoney(Number(e.target.value))} type='number'
                  width='400px'
                />
              </Flex>

              <Button onClick={handleCreateProject}>Create</Button>
            </Flex>

            <Text fontSize='25px' color="white">

            </Text>
          </Flex>
        )}

        <Flex
          gap='20px'
          flexDir='column'
          padding='10px'
        >
          {project.map((post, index) => (
            <Flex

              width='100%'
              align='center'
              padding='10px'
              bgColor='blackAlpha.400'
              key={index}
            >

              <Flex
                w='100%'
                h='100%'
                gap='10%'
              >

                <Text
                  width='500px'
                  fontSize='18px'
                >
                  {post.name}
                </Text>

                <Text
                  width='500px'
                  fontSize='18px'
                >
                  R$ {post.money},00
                </Text>

                <Popover closeOnBlur={false} placement='left'>
                  {() => (
                    <>
                      <PopoverTrigger>
                        <Button
                          colorScheme='blue'
                        >Info</Button>
                      </PopoverTrigger>
                      <Portal>
                        <PopoverContent
                          color='white'
                          border='none'
                        >
                          <PopoverCloseButton />
                          <PopoverBody

                            borderRadius='5px'
                            bgColor='blue.900'
                          >

                            <Text>
                              {post.name ? `Project name: ${post.name}` : 'Name doesnt exist'}
                            </Text>

                            <Text>
                              {post.money ? `Project money: ${post.money}` : 'Money doesnt exist'}
                            </Text>

                            <Text>
                              {post.createdAt ? `Created in: ${new Date(post.createdAt).toLocaleTimeString([], { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}` : 'date doesnt exist'}
                            </Text>

                            <Text>
                              {post.lastTimeEdited ? `Last time edited in: ${new Date(post.lastTimeEdited).toLocaleTimeString([], { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}` : 'date doesnt exist'}
                            </Text>
                          </PopoverBody>
                        </PopoverContent>
                      </Portal>
                    </>
                  )}
                </Popover>

              </Flex>
              <Flex
                gap='20px'
              >



                <Button colorScheme='gray' onClick={() => openEditModal(post.id, post.name, post.money)}>Edit</Button>

                <Modal
                  initialFocusRef={initialRef}
                  finalFocusRef={finalRef}
                  isOpen={isOpen}
                  onClose={onClose}
                >
                  <ModalOverlay />
                  <ModalContent
                    color='white'
                    bgColor='black'
                  >
                    <ModalHeader>Edit:</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody

                      bgColor='black'
                      pb={6}
                      padding='20px'
                      gap='20px'
                    >

                      <Flex
                        padding='5px'
                        gap='5px'
                        flexDir='column'
                      >
                        <Text
                          fontSize='15px'
                        > Edit Project Name</Text>
                        <Input ref={initialRef} placeholder='Edited Name' value={editProjectName} onChange={(e) => setEditProjectName(e.target.value)} />
                      </Flex>

                      <Flex
                        padding='10px'
                        gap='5px'
                        flexDir='column'
                      >
                        <Text
                          fontSize='15px'
                        > Edit Project Money</Text>
                        <Input ref={initialRef} placeholder='Edited Money' value={editProjectMoney} onChange={(e) => setEditProjectMoney(Number(e.target.value))} type='number' />
                      </Flex>
                    </ModalBody>
                    <ModalFooter>

                      <Button colorScheme='red' mr={3} onClick={handleUpdateProject}>
                        Save
                      </Button>

                      <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>



                <Button colorScheme='red' onClick={() => setSecondModalOpen(true)}>Delete Project</Button>
                <Modal closeOnOverlayClick={false} isOpen={secondModalOpen} onClose={() => setSecondModalOpen(false)}>
                  <ModalOverlay />
                  <ModalContent
                    color='white'
                    bgColor='#000'
                  >
                    <ModalHeader>Delete your Post</ModalHeader>

                    <ModalFooter
                      gap='10px'
                    >
                      <Button colorScheme='red' onClick={() => handleDeleteProject(post.id)}> Delete </Button>
                      <Button onClick={() => setSecondModalOpen(false)}>Cancel</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>

              </Flex>
            </Flex>
          ))}
        </Flex>

      </Flex>
    </Flex>
  );
}
