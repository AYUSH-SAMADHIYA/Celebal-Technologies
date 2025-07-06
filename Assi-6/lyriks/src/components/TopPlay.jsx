import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import PlayPause from "./PlayPause";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

import "swiper/css";
import "swiper/css/free-mode";

// Top Chart Card
const TopChartCard = ({ song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => (
  <div className="w-full flex flex-row items-center p-4 py-2 hover:bg-[#4c426e] bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
    <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img
        className="w-16 h-16 rounded-lg"
        src={song.attributes?.artwork?.url
          ?.replace("{w}", "125")
          ?.replace("{h}", "125")}
        alt={song.attributes?.name || "No Title"}
      />
      <div className="flex-1 flex flex-col justify-center mx-3">
        <Link to={`/songs/${song.id}`}>
          <p className="text-lg font-semibold text-white truncate">
            {song.attributes?.name || "Unknown Title"}
          </p>
        </Link>
        <Link
          to={
            song.attributes?.artistName
              ? `/artists/${encodeURIComponent(song.attributes.artistName)}`
              : "/top-artists"
          }
        >
          <p className="text-sm text-gray-300 mt-1">
            {song.attributes?.artistName || "Unknown Artist"}
          </p>
        </Link>
      </div>
    </div>
    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={handlePauseClick}
      handlePlay={() => handlePlayClick(song, i)}
    />
  </div>
);

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) return <p className="text-white">Loading Top Charts...</p>;
  if (error) return <p className="text-red-500">Error loading data</p>;

  const topPlays = data?.slice(0, 5) || [];

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="xl:ml-6 ml-0 xl:mr-6 mr-0 flex-1 xl:max-w-[500px] max-w-full flex flex-col">
      {/* Top Charts */}
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="font-semibold text-lg text-white">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {topPlays.map((song, i) => (
            <TopChartCard
              key={song.id || `${song.attributes?.name}-${i}`}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={handlePlayClick}
            />
          ))}
        </div>
      </div>

      {/* Top Artists */}
      <div className="mt-6 w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="font-semibold text-lg text-white">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          modules={[FreeMode]}
          className="mt-4"
        >
          {topPlays.map((song, i) => (
            <SwiperSlide
              key={song.id || `${song.attributes?.name}-${i}`}
              style={{ width: "25%", height: "auto" }}
              className="shadow-lg rounded-full animate-slideright"
            >
              <Link to={
                song.attributes?.artistName
                  ? `/artists/${encodeURIComponent(song.attributes.artistName)}`
                  : "/top-artists"
              }>
                <img
                  src={song.attributes?.artwork?.url
                    ?.replace("{w}", "500")
                    ?.replace("{h}", "500")}
                  alt={song.attributes?.artistName || "artist"}
                  className="rounded-full w-full object-cover"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
