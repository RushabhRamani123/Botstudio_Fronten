import { useEffect, useRef, useState } from "react";
import { Grid } from "@giphy/react-components";
import { GiphyFetch } from "@giphy/js-fetch-api";
import type { IGif } from "@giphy/js-types";
import _ from "lodash";
import { Search } from "lucide-react";
import { useGifStore } from "../../app/gifStore";

const gf = new GiphyFetch("sG67AALL8JPT6lHv0T1UmRqTxWYhhz0o");

export default function Giphy() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [gifs, setGifs] = useState<IGif[]>([]);

  const fetchGifs = async (offset: number) => {
    return gf.search(value || "trending", { offset, limit: 10 });
  };

  const { toggleGifModal } = useGifStore();

  const debouncedfetchGifs = _.debounce(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const newGifs = await fetchGifs(0);
      setGifs(newGifs.data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, 500);

  useEffect(() => {
    const fetchInitialGifs = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const initialGifs = await fetchGifs(0);
        setGifs(initialGifs.data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialGifs();

    return () => {
      debouncedfetchGifs.cancel();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleGifClick = (gif: IGif, e: React.SyntheticEvent) => {
    e.preventDefault();
    const gifUrl = gif.images.original.url;
    console.log(gifUrl);
    toggleGifModal(true, gifUrl);
  };

  return (
    <div className="flex flex-col h-full max-h-[400px] bg-white">
      {/* Search Section */}
      <div className="relative w-full flex-shrink-0 p-4">
        <Search className="absolute left-7 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search for GIFs..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            debouncedfetchGifs();
          }}
        />
      </div>

      {/* GIFs Container */}
      <div className="flex-1 overflow-y-auto min-h-0 px-4">
        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-red-500 py-4">
            Error: {error}
          </div>
        )}

        {/* GIFs Grid */}
        {!isLoading && gifs.length > 0 ? (
          <Grid
            onGifClick={handleGifClick}
            fetchGifs={fetchGifs}
            width={1500}
            columns={3}
            gutter={6}
            key={value}
            noLink={true}
            ref={gridRef}
          />
        ) : (
          !isLoading && (
            <div className="flex justify-center items-center py-4 text-gray-500">
              Please search for any Gif
            </div>
          )
        )}
      </div>
    </div>
  );
}