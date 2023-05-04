import { getGreeting } from "../utils/getGreeting";
import Heading from "./Heading";
import Layout from "./Layout";
import PlaylistList from "./PlaylistList";

export default function Home(props: any) {
  return (
    <Layout title="Welcome to Spotify">
      <h1 className="mb-5 text-3xl text-btnText font-bold">
        Good {getGreeting()}
      </h1>
      <Heading text="New releases" className="mt-10" />
      <PlaylistList playlists={props?.featuredPlaylists?.playlists.items} />
    </Layout>
  );
}
