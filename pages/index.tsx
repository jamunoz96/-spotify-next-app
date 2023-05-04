import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { customGet } from "../utils/customGet";
import { isAuthenticated } from "../utils/isAuthenticated";

export { default } from "../components/Home";

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

  const featuredPlaylists = await customGet(
    "https://api.spotify.com/v1/browse/featured-playlists?country=CO",
    session
  );

  return { props: { featuredPlaylists } };
};
