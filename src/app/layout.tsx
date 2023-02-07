'use client'
import { ChakraProvider, extendBaseTheme } from '@chakra-ui/react'
import chakraTheme from '@chakra-ui/theme'
import Script from 'next/script'
import './globals.scss'

const { Input, Checkbox, Button } = chakraTheme.components

const theme = extendBaseTheme({
  colors: {
    neutral: {
      100: "#102D42"
    },
    common: {
      blue: "#3180F1"
    }
  },
  fonts: {
    body: "Axiforma, arial, sans-serif",
  },
  components: {
    Input,
    Checkbox,
    Button,
  }
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <Script src="/lib.js" />
        <ChakraProvider theme={theme}>
          {children}
        </ChakraProvider>
      </body>
    </html>
  )
}
