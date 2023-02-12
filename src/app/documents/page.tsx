'use client'
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'
import { get, set, del } from 'idb-keyval';
import {
  Avatar,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Portal,
  Spinner,
  HStack, Link, Text, VStack, Box, Image, Divider } from '@chakra-ui/react'
import Logo from "@/components/Logo";
import "./documents.scss";

const Links = [
  'Dashboard',
  'My Properties',
  'Messages',
  'Statistics',
  'Settings'
]

const Filters = [
  'Active',
  'Expired',
  'Drafts',
]

export default function Document() {
  const [pageLoaded, setPageLoaded] = useState(false);
  const inputRef = useRef(null);
  const [fileList, setFileList] = useState<{
    fileName: string, file: File | unknown, stat: number, day: number, status: number, price: number
  }[]>([]); 
  const [sendAndSignLoading, setSendAndSignLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      const fileList = await get('file-list') || [];
      setFileList(fileList);
      setPageLoaded(true);
    }
    if (!localStorage.getItem('id_token')) {
      router.push('/auth/signin');
    } else {
      loadData();
    }
  }, [])

  const convertFileToBlob = (file: File) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = function(e: any) {
        const blob = new Blob([new Uint8Array(e.target.result)], {type: file.type });
        resolve(blob)
      };
      reader.onerror = function() {
        resolve(file);
      }
      reader.readAsArrayBuffer(file);
    })
  };

  const addFiles = async (files: File[]) => {
    const newFiles = [];
    for (const file of files) {
      const blobFile = await convertFileToBlob(file);
      const fileData = {
        file: blobFile,
        fileName: file.name,
        stat: Math.floor(Math.random() * (999 - 111) + 111),
        day: Math.floor(Math.random() * (6 - 1) + 1),
        status: Math.floor(Math.random() * (31 - 1) + 1),
        price: Math.floor(Math.random() * (9999 - 2000) + 2000)
      };
      newFiles.push(fileData);
    }
    const newFileList = [...fileList, ...newFiles];
    set('file-list', newFileList)
      .finally(() => {
        setFileList(newFileList);
      })
  }

  const sendAndSign = (file: File, fileName: string) => {
    window.lumin.sign.sendAndSign({
      accessToken: localStorage.getItem('access_token'),
      fileData: file,
      fileName,
      onError: (e: any) => console.log(e),
      onLoading: setSendAndSignLoading,
    }) 
  }

  return !pageLoaded ? <div></div> : (
    <div className="Document">
      <div className="Document__Header">
        <div className="Document__Logo">
          <Logo />
        </div>
        <HStack justifyContent="space-around" width="50%" alignItems="center">
          {
            Links.map((el, i) => (
              <Link
                _after={i === 1 ? {
                  content: `""`,
                  position: "absolute",
                  left: 0,
                  bg: 'common.blue',
                  top: "52px",
                  width: "100%",
                  height: "4px",
                } : {}}
                position="relative"
                key={el}
                fontWeight={400}
                fontSize={18}
                color={ i === 1 ? 'primary.100' : 'other.11'}>
                {el}
              </Link>
            ))
          }
        </HStack>
        <Popover>
          <PopoverTrigger>
            <Avatar width={50} height={50} src="https://picsum.photos/200/300"/>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverBody>
                <Button colorScheme='blue' onClick={() => {
                  del('file-list');
                  localStorage.clear();
                  router.push('/auth/signin');
                }}>Logout</Button>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      </div>
      <div className="Document__Body">
        <div className="Document__Body--header">
          <HStack width="80%">
            <div style={{ marginRight: 60 }}>
              <Text fontWeight={500} fontSize={23} color="primary.100">
                My Properties
              </Text>
              <Text fontWeight={500} fontSize={12} color="primary.80">
                Showing 06 results | active
              </Text>
            </div>
            <HStack>
              {
                Filters.map((el, i) => {
                  const isActive = i === 0;
                  return (
                    <Button
                      key={i}
                      border={isActive ? '1px solid' : '2px solid'}
                      fontWeight={500}
                      fontSize={14}
                      lineHeight={22}
                      borderRadius={12}
                      colorScheme={isActive ? 'messenger' : undefined}
                      borderColor="primary.100">
                      {el}
                    </Button>
                  )
                })
              }
            </HStack>
          </HStack>
          <input
            onChange={(e: any) => addFiles(e.target.files)}
            type='file'
            accept="application/pdf"
            multiple
            ref={inputRef}
            hidden />
          <Button
            fontWeight={500}
            fontSize={14}
            borderRadius={12}
            colorScheme='messenger'
            minWidth={190}
            // @ts-ignore */}
            onClick={() => inputRef.current?.click()}
            leftIcon={<span style={{ fontSize: 20 }}>+</span>}
            borderColor="primary.100">
            List a Property
          </Button>
        </div>
        <div className="Document__Body--content">
          <HStack
            justify="space-between"
            width="100%"
            bg="other.24"
            borderTopLeftRadius={8}
            borderTopRightRadius={8}
            padding="12px 40px"> 
              <Text minWidth="30%" width="30%" fontWeight={500} fontSize={12} color="primary.100">PROPERTY</Text>
              <Text width="20%" fontWeight={500} fontSize={12} color="primary.100">LEADS</Text>
              <Text width="10%" fontWeight={500} fontSize={12} color="primary.100">STATS</Text>
              <Text width="20%" fontWeight={500} fontSize={12} color="primary.100">POSTED ON</Text>
              <Text width="10%" fontWeight={500} fontSize={12} color="primary.100">STATUS</Text>
              <Text width="20%" fontWeight={500} fontSize={12} color="primary.100">ACTIONS</Text>
          </HStack>
          <VStack bg="#ffffff" height="100%" padding="0 40px" overflowY="scroll">
             {
             fileList.map((file, i) => (
                <React.Fragment key={i}>
                  <HStack width="100%" paddingTop={5} paddingBottom={i === 9 ? 5 : 0} onClick={() => router.push(`/viewer/${i}`)} cursor="pointer">
                    <Box minWidth="30%" width="30%">
                      <HStack width="100%" overflow="hidden">
                        <Image alt="prod" src={`https://picsum.photos/200/300?random=${i}`} minWidth={20} height={20} borderRadius={8}/>
                        <VStack alignItems="flex-start" width="inherit" overflow="hidden">
                          <Text width="100%" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden" fontWeight={500} fontSize={16} color="primary.100">{file.fileName}</Text>
                          <Text fontWeight={500} fontSize={10} color="primary.80">41 Esplanade</Text>
                          <Text fontWeight={500} fontSize={10} color="primary.80">{file.price} p/m</Text>
                        </VStack>
                      </HStack>
                    </Box>
                    <Box width="20%">
                      <VStack alignItems="flex-start">
                        <Text fontWeight={500} fontSize={10} color="primary.100">3 major leads</Text>
                        <HStack>
                          <Avatar width={8} height={8} src="https://picsum.photos/200/300"/>
                          <Avatar width={8} height={8} src="https://picsum.photos/200/300"/>
                          <Avatar width={8} height={8} src="https://picsum.photos/200/300"/>
                        </HStack>
                      </VStack>
                    </Box>
                    <Box width="10%">
                      <VStack alignItems="flex-start">
                        <HStack>
                          <Image alt="arrow" src="/assets/arrow.svg" width="14px" height="14px" borderRadius={8}/>
                          <Text fontWeight={500} fontSize={14} color="primary.100">{file.stat}</Text>
                        </HStack>
                        <Text fontWeight={500} fontSize={10} color="primary.100">Total view</Text>
                      </VStack>
                    </Box>
                    <Box width="20%">
                      <VStack alignItems="flex-start">
                        <Text fontWeight={500} fontSize={14} color="primary.100">6 Aug | 12:20pm</Text>
                        <Text fontWeight={500} fontSize={10} color="primary.100">{file.day} days ago</Text>
                      </VStack>
                    </Box>
                    <Box width="10%">
                      <Text fontWeight={500} fontSize={10} color="pr  imary.100">Till {file.status} Dec</Text>
                    </Box>
                    <Box width="20%">
                      <HStack alignItems="flex-start">
                        <Image alt="edit" src="/assets/edit.svg" width="54px" height="32px" borderRadius={8}/>
                        {
                          sendAndSignLoading ? <Spinner width={8} height={8}/> : (
                            // @ts-ignore */}
                            <lumin-sign size="small" onClick={() => sendAndSign(file.file, file.fileName)}/>
                          )
                        }
                      </HStack>
                    </Box>
                  </HStack>
                  { i !== 9 && <Divider color="primary.40"/> }
                </React.Fragment>
              ))
             }
          </VStack>
        </div>
      </div>
    </div>
  )
}
