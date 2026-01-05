import { Box, Divider } from '@chakra-ui/react'
import Head from 'next/head'
import Content from '../components/content'
import Footer from '../components/footer'
import Header from '../components/header'

export default function Home() {
  return (
    <Box>
      <Head>
        <title>Countryquest</title>
        <meta
          name="description"
          content="An interactive scratch-off map. Keep track of which places you have been, how much of the world you have conquered, and where to go next."
        />
        <link rel="icon" href="/favicon.svg" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Header />
      <Divider />
      <Content />
      <Divider />
      <Footer />
    </Box>
  )
}
