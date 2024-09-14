import PickShelf from '~/components/app/pick-shelf'

import { getShelves } from '~/lib/notion/getShelves'

export default async function Home() {
  const shelves = await getShelves()

  // if (dbs.length === 1) {
  //   redirect(`/${dbs[0].id}`)
  // }

  return <PickShelf shelves={shelves} />
}
