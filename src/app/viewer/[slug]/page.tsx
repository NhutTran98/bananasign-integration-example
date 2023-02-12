'use client'

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'
import { get, del } from 'idb-keyval';
import { Document, Page, pdfjs } from 'react-pdf';
    // @ts-ignore
import url from "pdfjs-dist/build/pdf.worker";

import {
  Avatar,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Portal,
  HStack, Text, Divider, IconButton, Spinner } from '@chakra-ui/react'
import Logo from "@/components/Logo";
import "../viewer.scss";

pdfjs.GlobalWorkerOptions.workerSrc = url

export default function Viewer({ params }: any) {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [scale, setScale] = useState<any>(0.8);
  const [currentPage, setCurrentPage] = useState(1);
  const [file, setFile] = useState<any>(null);
  const [numPages, setNumPages] = useState(0);
  const [sendAndSignLoading, setSendAndSignLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadFile = async () => {
      const fileList = await get('file-list');
      if (!fileList[Number(params.slug)]) {
        router.push('/auth/signin');
        return;
      }
      setFile({
        ...fileList[Number(params.slug)],
        file: URL.createObjectURL(fileList[Number(params.slug)].file),
      });
      setPageLoaded(true);
    }
    if (!localStorage.getItem('id_token') || Number.isNaN(Number(params.slug))) {
      router.push('/auth/signin');
    } else {
      loadFile();
    }
  }, [])

  const sendAndSign = () => {
    if (!file) {
      return;
    }
    window.lumin.sign.sendAndSign({
      accessToken: localStorage.getItem('access_token'),
      fileData: file.file,
      fileName: file.fileName,
      onError: (e: any) => console.log(e),
      onLoading: setSendAndSignLoading,
    }) 
  }

  return !pageLoaded ? <div></div> : (
    <div className="Viewer">
      <div className="Viewer__Header">
        <div className="Viewer__Logo">
          <Logo />
        </div>
        <HStack justifyContent="center" alignItems="center" bg="other.24" padding="4px" borderRadius="30px">
          <Button
            fontWeight={500}
            fontSize={12}
            borderRadius="30px"
            colorScheme="messenger">
            View mode
          </Button>
          <Button
            fontWeight={500}
            fontSize={12}
            bg="unset"
            borderRadius="30px">
            Edit mode
          </Button>
        </HStack>
        <HStack>
          <Button
            fontWeight={500}
            fontSize={12}
            leftIcon={<img src="/assets/person.svg" alt="person" />}
            borderRadius="30px">
            Add Collaborators
          </Button>
          <Button
            fontWeight={500}
            fontSize={12}
            leftIcon={<img src="/assets/help.svg" alt="help" />}
            borderRadius="30px">
            Share
          </Button>
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
        </HStack>
      </div>
      <div className="Viewer__Body">
        <div className="Viewer__Body--sendBtn">
          {
            // @ts-ignore */}
             sendAndSignLoading ? <Spinner width={8} height={8} /> : <lumin-sign onClick={sendAndSign}/>
          }
        </div>
        <div className="Viewer__Body--container">
          <Document file={file.file} onLoadSuccess={({ numPages }) => setNumPages(numPages)} onLoadError	={(e) => console.log(e)}>
            <Page pageNumber={currentPage} renderAnnotationLayer={false} renderTextLayer={false} scale={Number(scale)}/>
          </Document>
        </div>
        <div className="Viewer__Body--navigator">
          <HStack>
            <img style={{ cursor: 'pointer' }} src="/assets/minus.svg" alt="minus" onClick={() => scale > 0.1 && setScale((Number(scale) - 0.1).toFixed(1))}/>
            <Text fontSize="14px">{scale * 100}%</Text>
            <img style={{ cursor: 'pointer' }} src="/assets/plus.svg" alt="plus" onClick={() => scale < 1 && setScale((Number(scale) + 0.1).toFixed(1))} />
          </HStack>
          <Divider orientation="vertical" ml={3} mr={3}/>
          <HStack>
            <IconButton cursor="pointer" aria-label="double_left" icon={<img src="/assets/double_left.svg" alt="double_left" />} bg="unset" onClick={() => currentPage - 2 > 0 && setCurrentPage(currentPage - 2)} />
            <IconButton cursor="pointer" marginLeft="0px !important" aria-label="left" icon={<img src="/assets/left.svg" alt="left" />} bg="unset" onClick={() => currentPage - 1 > 0 && setCurrentPage(currentPage - 1)}/>
            <Text fontSize="14px">{currentPage}/{numPages}</Text>
            <IconButton cursor="pointer" aria-label="right" icon={<img src="/assets/right.svg" alt="right" />} bg="unset" onClick={() => currentPage + 1 <= numPages && setCurrentPage(currentPage + 1)}/>
            <IconButton cursor="pointer" marginLeft="0px !important" aria-label="double_right" icon={<img src="/assets/double_right.svg" alt="double_right" />} bg="unset" onClick={() => currentPage + 2 <= numPages && setCurrentPage(currentPage + 2)}/>
          </HStack>
        </div>
      </div>
    </div>
  )
}
