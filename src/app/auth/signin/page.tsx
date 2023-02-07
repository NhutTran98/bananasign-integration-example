'use client'
import { Input, Checkbox, HStack, Button, Text, VStack, Img, } from '@chakra-ui/react';

import Logo from "@/components/Logo";
import "./signin.scss";
import Link from 'next/link';

export default function Signin() {

  const signinWithLumin = () => {
    window.lumin.auth.initialize({
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      scope: 'openid bananasign:document.create',
      response_type: 'id_token token',
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI
    })
    window.lumin.auth.signin({
      onSuccess: ({ access_token, id_token }) => {
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('id_token', id_token);
      },
      onError: (error) => console.log(error),
    })
  }

  return (
    <div className="SignIn">
      <div className="SignIn__LeftPanel">
        <Logo />
        <span className="SignIn__LeftPanel--title">Welcome back, Claudia</span>
        <span className="SignIn__LeftPanel--subtitle">Welcome back! Please enter your details.</span>
        <VStack>
          <Button className="SignIn__LeftPanel--button" variant="outline" p={6} width={"100%"}>
            <Img src="/assets/google-logo.svg" alt="ad" mr={4}/>
            Sign in with Google
          </Button>
          <Button className="SignIn__LeftPanel--button" variant="outline" p={6} width={"100%"} onClick={signinWithLumin}>
            <Img src="/assets/lumin-logo.svg" alt="ad" mr={4}/>
            Sign in with Lumin
          </Button>
        </VStack>
        <span className="SignIn__LeftPanel--separation">Or</span>
        <Input
          className="SignIn__LeftPanel--input"
          variant='flushed'
          placeholder='Email'
          mt={10}
          fontSize={14}
        />
        <Input
          className="SignIn__LeftPanel--input"
          variant='flushed'
          placeholder='Password'
          mt={9}
          fontSize={14}
        />
        <HStack justify="space-between" mt={6}>
          <Checkbox>Remember account</Checkbox>
          <Link href="/auth/signin" className="SignIn__LeftPanel--forgot">Forgot password</Link>
        </HStack>
        <Button mt={10} p={7} colorScheme='messenger'>
          Sign In
        </Button>
        <HStack justify="center" mt={6}>
          <Text>Don’t have an account?</Text>
          <Link href="/auth/signin" className="SignIn__LeftPanel--signupfree">Sign up for free</Link>
        </HStack>
      </div>
      <div className="SignIn__RightPanel">
        <Text fontWeight={600} fontSize={28} color="neutral.100">
          Lorem ipsum dolor sit. Lorem urna neque dictumst egestas. Lorem urna neque dictumst egestas.
        </Text>
        <HStack justify="space-between" alignItems="center" mr={12} mt={7}>
          <span className="SignIn__RightPanel--separation">Anton Stezhkin</span>
          <HStack>
            {
              Array(5).fill(0).map((_, i) => (
                <img key={i} src="/assets/star.svg" alt="star" />
              ))
            }
          </HStack>
        </HStack>
        <Text fontWeight={500} fontSize={18} color="neutral.100" opacity={0.18}>Invester, Grapejuice.com</Text>
        <Img src="/assets/ad.png" alt="ad" position="fixed" right={0} bottom={0} />
      </div>
    </div>
  )
}
