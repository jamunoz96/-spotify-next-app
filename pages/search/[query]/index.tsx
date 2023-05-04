import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Link from "next/link";
import AlbumList from "../../../components/AlbumList";
import ArtistList from "../../../components/ArtistList";
import Heading from "../../../components/Heading";
import Layout from "../../../components/Layout";
import PlaylistList from "../../../components/PlaylistList";
import { SearchResults, Track } from "../../../types/types";
import { customGet } from "../../../utils/customGet";
import { fmtMSS } from "../../../utils/formatDuration";
import { isAuthenticated } from "../../../utils/isAuthenticated";

interface IProps {
  query: string;
  searchResults: SearchResults;
}

export default function Search({ query, searchResults }: IProps) {
  return (
    <Layout title="Spotify - Search">
      {searchResults && (
        <>
          <div className="mt-5">
            <Link href={`/search/${query}/tracks`}>
              <Heading text="Songs" />
            </Link>

            {searchResults.tracks.items?.slice(0, 5).map((track) => (
              <div
                className={`grid grid-cols-12 col-span-12 p-1 ${
                  !track.preview_url ? "opacity-50" : ""
                }`}
                key={track.id}
              >
                <div className="flex items-center w-full col-span-11 my-3">
                  <div className="flex items-center w-full gap-4">
                    <div className="flex-shrink-0 w-10 h-10">
                      <img
                        src={track.album.images[0].url}
                        alt={track.name}
                        className="object-contain w-10 h-10"
                      />
                    </div>

                    <div className="w-full text-btnText">
                      <div className="w-10/12 text-sm font-medium truncate cursor-default">
                        {track.name}
                      </div>

                      <div className="flex flex-wrap items-center w-10/12 gap-1 text-sm">
                        <span className="truncate ">
                          {track.artists.map((artist, index) => (
                            <span
                              key={artist.id}
                              className="hover:text-white hover:underline text-btnText"
                            >
                              {index !== 0 ? `, ${artist.name}` : artist.name}
                            </span>
                          ))}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center col-span-1 my-3 text-sm text-gray ">
                  {fmtMSS(track.duration_ms)}
                </div>
              </div>
            ))}
          </div>

          {searchResults.artists.items.length > 0 && (
            <div className="mt-5">
              <Link href={`/search/${query}/artists`}>
                <Heading text="Artists" />
              </Link>
              <ArtistList artists={searchResults.artists.items.slice(0, 6)} />
            </div>
          )}

          <div className="mt-5">
            <Link href={`/search/${query}/albums`}>
              <Heading text="Albums" />
            </Link>
            <AlbumList albums={searchResults.albums.items.slice(0, 6)} />
          </div>

          <div className="mt-5">
            <Link href={`/search/${query}/playlists`}>
              <Heading text="Playlists" />
            </Link>
            <PlaylistList
              playlists={searchResults.playlists.items.slice(0, 6)}
            />
          </div>
        </>
      )}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!(await isAuthenticated(session))) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const query = ctx.params?.query;
  const searchResults = await customGet(
    `https://api.spotify.com/v1/search?q=${query}&market=from_token&type=album,artist,track,playlist&limit=50`,
    session
  );
  return { props: { query, searchResults } };
};
