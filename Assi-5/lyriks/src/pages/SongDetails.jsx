import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { useGetSongDetailsQuery } from "../redux/services/shazamCore";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { songid } = useParams();

  console.log("Song ID:", songid);

  const { data: songData, isFetching: isFetchingSongDetails, error } = useGetSongDetailsQuery(songid);

  if (isFetchingSongDetails) return <Loader title="Loading song details..." />;
  if (error) return <Error />;
  

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId="" songData={songData} />

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
        <div className="mt-5">
          {songData?.sections[1]?.type === "LYRICS"
            ? songData?.sections[1]?.text.map((line, i) => (
                <p key={i} className="text-gray-400 text-base my-1">{line}</p>
              ))
            : <p className="text-gray-400 text-base my-1">Sorry, no lyrics found!</p>
          }
        </div>
      </div>
    </div>
  );
};

export default SongDetails;
