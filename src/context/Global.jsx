import {
  createContext,
  useActionState,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
const GlobalContext = createContext();

//==================URL=======================
const baseUrl = "https://api.jikan.moe/v4";

//==============ACTIONS=======================
const LOADING = "LOADING";
const SEARCH = "SEARCH";
const GET_POPULAR_MANGA = "GET_POPULAR_MANGA";
const GET_ONGOING_MANGA = "GET_UPCOMING_MANGA";
const GET_FINISHED_MANGA = "GET_AIRING_MANGA";
const GET_MANGA_PICTURES = "GET_MANGA_PICTURES";
//==============REDUCER FUNCTION===============
const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case GET_POPULAR_MANGA:
      return { ...state, popularManga: action.payload, loading: false };
    case SEARCH:
      return { ...state, searchResults: action.payload, loading: false };
    case GET_ONGOING_MANGA:
      return { ...state, ongoingManga: action.payload, loading: false };
    case GET_FINISHED_MANGA:
      return { ...state, finishedManga: action.payload, loading: false };
    case GET_MANGA_PICTURES:
      return { ...state, picture: action.payload, loading: false };
    default:
      return state;
  }
};

export const GlobalContextProvider = ({ children }) => {
  //Initialising Sate
  const initialState = {
    popularManga: [],
    ongoingManga: [],
    finishedManga: [],
    picture: [],
    isSearch: false,
    searchResults: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  //=================FOR SEARCH CONTAINER=================

  const [search, setSearch] = useState("");
  const handleChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      // dispatch({ type: GET_POPULAR_MANGA, payload: [] });
      state.isSearch = false;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      searchManga(search);
      state.isSearch = true;
    } else {
      state.isSearch = false;
      alert("Please enter a valid search term");
    }
  };
  //===============FETCHING POPULAR MANGA=====================
  const getPopularManga = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseUrl}/top/manga?filter=bypopularity`);
    const data = await response.json();
    dispatch({ type: GET_POPULAR_MANGA, payload: data.data });
  };
  //===================FETCHING ONGOING MANGA===================
  const getOngoingManga = async () => {
    dispatch({ type: LOADING });
    try {
      const response = await fetch(`${baseUrl}/top/manga?filter=publishing`);
      const data = await response.json();
      dispatch({ type: GET_ONGOING_MANGA, payload: data.data });
    } catch (error) {
      console.error("Failed to fetch ongoing manga:", error);
    }
  };

  //===================FETCHING FINISHED MANGA===================
  const getFinishedManga = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseUrl}/top/manga?status=completed
`);
    const data = await response.json();
    dispatch({ type: GET_FINISHED_MANGA, payload: data.data });
  };

  //========================SEARCH MANGA======================
  const searchManga = async (manga) => {
    if (!manga) {
      console.log("Please provide a valid search query.");
      return;
    }
    dispatch({ type: LOADING });

    try {
      const response = await fetch(`https://api.jikan.moe/v4/manga?q=${manga}`);
      const data = await response.json();

      if (data.data && data.data.length > 0) {
        dispatch({ type: SEARCH, payload: data.data });
      } else {
        console.log("No results found.");
      }
    } catch (error) {
      console.error("Failed to search manga:", error);
    }
  };
  //=======================GET CHARACTER GALLERY=====================
  const getMangaPictures = async (id) => {
    dispatch({ type: LOADING });
    // const response = await fetch(`${baseUrl}/manga/${id}/pictures`);
    const response = await fetch(
      `https://api.jikan.moe/v4/characters/${id}/pictures`
    );

    const data = await response.json();
    dispatch({ type: GET_MANGA_PICTURES, payload: data.data });
  };
  //=======================INITIAL RENDER=====================
  useEffect(() => {
    getPopularManga();
  }, []);
  return (
    <GlobalContext.Provider
      value={{
        ...state,
        handleChange,
        handleSubmit,
        searchManga,
        search,
        getPopularManga,
        getOngoingManga,
        getFinishedManga,
        getMangaPictures,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
