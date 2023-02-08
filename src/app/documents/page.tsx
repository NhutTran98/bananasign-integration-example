'use client'
import React, { useEffect } from 'react';
import { Avatar, Button, HStack, Link, Text, VStack, Box, Image, Divider } from '@chakra-ui/react'
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

  useEffect(() => {
//     Array(10).fill(0).map((_, i) => {
//       console.log("🚀 ~ file: page.tsx ~ line 31 ~ Array ~ window.lumin", window.lumin.auth)
//       window.lumin.sign
// .renderButton({
//         id: i.toString(),
//         size: 'small'
//       })
//     });
// window.lumin.sign
// .renderButton({
//         id: 0,
//         size: 'small'
//       })
  }, []);
  return (
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
        <Avatar width={50} height={50} src="https://picsum.photos/200/300"/>
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
          <Button
            border="1px solid"
            fontWeight={500}
            fontSize={14}
            borderRadius={12}
            colorScheme='messenger'
            minWidth={190}
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
              <Text width="30%" fontWeight={500} fontSize={12} color="primary.100">PROPERTY</Text>
              <Text width="20%" fontWeight={500} fontSize={12} color="primary.100">LEADS</Text>
              <Text width="10%" fontWeight={500} fontSize={12} color="primary.100">STATS</Text>
              <Text width="20%" fontWeight={500} fontSize={12} color="primary.100">POSTED ON</Text>
              <Text width="10%" fontWeight={500} fontSize={12} color="primary.100">STATUS</Text>
              <Text width="20%" fontWeight={500} fontSize={12} color="primary.100">ACTIONS</Text>
          </HStack>
          <VStack bg="#ffffff" height="100%" padding="0 40px" overflowY="scroll">
             {
              Array(10).fill(0).map((_, i) => (
                <React.Fragment key={i}>
                <HStack width="100%" paddingTop={5} paddingBottom={i === 9 ? 5 : 0}>
                  <Box width="30%">
                    <HStack>
                      <Image alt="prod" src="https://picsum.photos/200/300" width={20} height={20} borderRadius={8}/>
                      <VStack alignItems="flex-start">
                        <Text fontWeight={500} fontSize={16} color="primary.100">Californian Living</Text>
                        <Text fontWeight={500} fontSize={10} color="primary.80">41 Esplanade</Text>
                        <Text fontWeight={500} fontSize={10} color="primary.80">$5500 p/m</Text>
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
                        <Text fontWeight={500} fontSize={14} color="primary.100">245</Text>
                      </HStack>
                      <Text fontWeight={500} fontSize={10} color="primary.100">Total view</Text>
                    </VStack>
                  </Box>
                  <Box width="20%">
                    <VStack alignItems="flex-start">
                      <Text fontWeight={500} fontSize={14} color="primary.100">6 Aug | 12:20pm</Text>
                      <Text fontWeight={500} fontSize={10} color="primary.100">6 days ago</Text>
                    </VStack>
                  </Box>
                  <Box width="10%">
                    <Text fontWeight={500} fontSize={10} color="primary.100">Till 6 Dec</Text>
                  </Box>
                  <Box width="20%">
                    <HStack alignItems="flex-start">
                      <Image alt="edit" src="/assets/edit.svg" width="54px" height="32px" borderRadius={8}/>
                      <lumin-sign size="small"/>
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
