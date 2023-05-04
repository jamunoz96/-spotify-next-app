import axios from "axios";
import { createContext, useContext, useState } from "react";
import { PlaylistType } from "../types/types";

interface ContextProps {
  playlists: PlaylistType[];
  fetchPlaylists: () => void;
}

const SpotifyContext = createContext({} as ContextProps);

export const SpotifyProvider = ({ children }: any) => {
  const [playlists, setPlaylists] = useState<PlaylistType[]>([]);

  const fetchPlaylists = async () => {
    try {
      const resp = await axios.get("/api/playlists");
      const data = resp.data;
      setPlaylists(data.items);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SpotifyContext.Provider
      value={{
        playlists,
        fetchPlaylists,
      }}
    >
      {children}
    </SpotifyContext.Provider>
  );
};

export const useSpotify = () => useContext(SpotifyContext);
