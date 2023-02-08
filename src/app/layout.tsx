/* eslint-disable @next/next/no-sync-scripts */
'use client'
import { ChakraProvider, extendBaseTheme } from '@chakra-ui/react'
import chakraTheme from '@chakra-ui/theme'
import './globals.scss'

const { Input, Checkbox, Button, Divider } = chakraTheme.components

const theme = extendBaseTheme({
  colors: {
    neutral: {
      100: "#102D42"
    },
    common: {
      blue: "#3180F1"
    },
    primary: {
      100: "#0C395B",
      80: "#50677A",
      40: "#C6C8C9"
    },
    other: {
      11: "#8e979f",
      24: "#E7ECF2",
    }
  },
  fonts: {
    body: "Axiforma, arial, sans-serif",
  },
  components: {
    Input,
    Checkbox,
    Button,
    Divider,
  }
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script type="text/javascript" src="/lib.js"></script>
      </head>
      <body>
        <ChakraProvider theme={theme}>
          {children}
        </ChakraProvider>
      </body>
    </html>
  )
}
