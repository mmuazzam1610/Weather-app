import { AppLayout } from "@components/shared";
import { useRouter } from "next/router";
import { FC, useState } from "react";

const Home: FC = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  return (
    <AppLayout>
      <div className="items-center">
        <div className="form-control w-full max-w-full">
          <label className="label">
            <span className="label-text">Search Location</span>
          </label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type location"
            className="input input-bordered w-full max-w-full"
          />
          <button
            className="btn mt-4"
            onClick={() => router.push("/weather/" + query)}
          >
            Search
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Home;
