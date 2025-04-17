import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navbar } from "../components/ui/Navbar";
import { getGameById } from "../api/getData";
import { useTilt } from "../hooks/useTilt";
import { Screenshots } from "../components/game/Screenshots";
import { Video } from "../components/game/Video";
import { Genres } from "../components/game/Genres";
import { Stores } from "../components/game/Stores";
import { Website } from "../components/game/Website";
import { Developers } from "../components/game/Developers";
import { GameHero } from "../components/game/GameHero";
import { GameInfo } from "../components/game/GameInfo";

export const Game = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const { store, actions } = useContext(Context);

  const { addFavorites, removeFavorites } = actions;
  const { favorites } = store;

  const isFavorite = favorites.some((favorite) => favorite.id == id);
  const [like, setLike] = useState(isFavorite);

  const handlerLikes = (like, id) => {
    if (!favorites.some((favorite) => favorite.id == id)) {
      addFavorites(data);
    } else {
      removeFavorites(data);
    }
    setLike(!like);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getGameById(id);
      setData(data);
    };

    fetchData();
  }, [id]);

  const { rotate, onMouseMove, onMouseLeave } = useTilt();

  // mantener el scroll en la parte superior
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <>
      <main
        className="relative min-h-screen bg-cover bg-center bg-no-repeat text-white z-0"
        style={{
          backgroundImage: data
            ? `linear-gradient(to top, rgba(0, 0, 0, 0.2), rgba(0, 0, 1, 0.1), rgba(0, 0, 0, 8)), url(${data?.background_image_additional})`
            : "linear-gradient(to top, rgba(0, 0, 0, 0.2), rgba(0, 0, 1, 0.1), rgba(0, 0, 0, 8))",
        }}
      >
        <Navbar />
        <div className="relative z-10 flex flex-col bg-gradient-to-t from-black via-black/50 to-transparent min-h-screen xl:px-10">
          <div className="flex flex-col lg:flex-row justify-between items-center w-full lg:w-12/12 mx-auto mt-5 lg:mt-0 lg:px-5">
            {/* Imagen principal */}
            <GameHero
              data={data}
              rotate={rotate}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
            />
            {/* Información del juego */}
            <GameInfo
              data={data}
              navigate={navigate}
              like={like}
              handlerLikes={handlerLikes}
              id={id}
            />
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="pb-10 pt-5 md:pt-1 text-center w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full px-2 lg:px-5">
                <Video data={data} />
                <Screenshots data={data} />
              </div>

              <Developers data={data} />

              <Stores data={data} />

              <Genres data={data} />

              <Website data={data} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
