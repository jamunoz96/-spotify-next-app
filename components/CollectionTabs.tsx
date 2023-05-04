import Link from "next/link";
import { useRouter } from "next/router";

const collectionTabs = ["playlists", "artists"];

export default function CollectionTabs() {
  const router = useRouter();

  return (
    <div className="flex items-center gap-8 bg-transparent">
      {collectionTabs.map((tab) => (
        <Link href={`/collection/${tab}`} key={tab}>
          <span
            className={`${
              router.pathname === `/collection/${tab}`
                ? "bg-[#323233]"
                : "bg-gray"
            } text-white rounded capitalize text-sm font-bold px-6 py-3`}
          >
            {tab}
          </span>
        </Link>
      ))}
    </div>
  );
}
