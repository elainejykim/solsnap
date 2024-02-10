import type { NextPage } from 'next';
import Head from 'next/head';
import { HomeView } from '../views';

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Solsnap</title>
        <meta name="description" content="Solsnap" />
      </Head>
      <HomeView />
    </div>
  );
};

export default Home;
