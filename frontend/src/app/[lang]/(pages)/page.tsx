
import { getDictionary } from '../dictionaries';
import HomePageComponenent from './HomePageComponenent';

export default async function Home({ params }: { params: any }) {

  const dict = await getDictionary(params) // en

  return (
    <HomePageComponenent dict={ dict } />
  );
}
