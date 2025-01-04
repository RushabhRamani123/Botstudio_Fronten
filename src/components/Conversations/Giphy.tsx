/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { Grid } from "@giphy/react-components";
import { GiphyFetch } from "@giphy/js-fetch-api";
import type { IGif } from '@giphy/js-types';
import _ from "lodash";
import { Search } from "lucide-react";
import { useGifStore } from "../../app/gifStore";

const gf = new GiphyFetch("sG67AALL8JPT6lHv0T1UmRqTxWYhhz0o");

export default function Giphy() {
    const gridRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [gifs, setGifs] = useState<IGif[]>([]); // store fetched gifs
  
    const fetchGifs = async (offset: number) => {
      return gf.search(value||'trending', { offset, limit: 10 });
    };
    
    const {toggleGifModal} = useGifStore();
    
    const debouncedfetchGifs = _.debounce(async () => {
      setIsLoading(true);
      setError(null); // clear any previous errors
  
      try {
        const newGifs = await fetchGifs(0);
        setGifs(newGifs.data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    }, 500); // Debounce time (500ms)
  
    useEffect(() => {
      // fetch GIFs initially based on search term
      const fetchInitialGifs = async () => {
        setIsLoading(true);
        setError(null);
  
        try {
          const initialGifs = await fetchGifs(0);
          setGifs(initialGifs.data);
        } catch (error) {
          setError(error instanceof Error ? error.message : 'An error occurred');
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchInitialGifs();
    }, []);
  
    const handleGifClick = (gif: IGif, e: React.SyntheticEvent) => {
      e.preventDefault();
      const gifUrl = gif.images.original.url;
      console.log(gifUrl); 
      toggleGifModal(true, gifUrl);
    };
  
    return (
        <div ref={gridRef} className="fixed bottom-20 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50">
            <div className="p-4">
                <div className="relative">
                    <input 
                        placeholder="Search for Gif..."  
                        className="border border-stroke dark:border-strokedark rounded-md p-2 pl-9 w-full mb-2 outline-none bg-transparent" 
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                            debouncedfetchGifs();
                        }}
                    />
                    <Search className="absolute left-2 top-2 text-gray-500 h-5 w-5" />
                </div>

                {isLoading && (
                    <div className="h-48 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                )}

                {error && (
                    <div className="text-red-500 p-4 text-center">
                        Error: {error}
                    </div>
                )}

                <div className="h-48 overflow-auto no-scrollbar">
                    {!isLoading && gifs.length > 0 ? (
                        <Grid
                            width={gridRef.current?.offsetWidth || 0}
                            columns={6}
                            gutter={6}
                            fetchGifs={fetchGifs}
                            key={value}
                            onGifClick={handleGifClick}
                            data={gifs}
                            className="cursor-pointer"
                        />
                    ) : !isLoading && (
                        <div className="flex flex-col items-center justify-center h-full space-y-2">
                            <Search size={48} className="text-gray-400" />
                            <span className="text-xl text-body font-semibold">
                                Please search for any Gif
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}