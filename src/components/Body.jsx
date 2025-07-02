import React from "react";
import RestoCard, { withPromotedBadge } from "./RestoCard";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useActiveStatus from "../utils/useActiveStatus";
import UserContext from "../utils/UserContext";

const Body = () => {
  const [listofResto, setListofResto] = useState([]);
  const [filteredResto, setFilteredResto] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchFocused, setSearchFocused] = useState(false);

  const PromotedRestoCard = withPromotedBadge(RestoCard);

  // console.log("Body Rendered");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent(
          // "https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.07480&lng=72.88560&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
          "https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.07480&lng=72.88560&collection=80463&tags=&sortBy=&filters=&type=rcv2&offset=0&page_type=null"
        )}`
      );

      const data = await response.json();
      const actualData = JSON.parse(data.contents);
      const json = actualData;

      const restaurantData = json.data.cards
        .slice(2)
        .filter((card) => card.card?.card?.info)
        .map((card) => card.card.card.info);

      // console.log("Extracted restaurants:", restaurantData);
      setListofResto(restaurantData);
      setFilteredResto(restaurantData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const activeStatus = useActiveStatus();

  if (activeStatus === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md mx-4">
          <div className="text-6xl mb-4">📡</div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            You're Offline
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Please check your internet connection and try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { loggedInuser, setUserName } = useContext(UserContext);

  if (isLoading || !listofResto || listofResto.length === 0) {
    return <Shimmer />;
  }

  const handleSearch = () => {
    const filteredresto = listofResto.filter((res) =>
      res.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredResto(filteredresto);
  };

  const handleTopRated = () => {
    const filteredlist = listofResto.filter((res) => res.avgRating > 4.0);
    setFilteredResto(filteredlist);
  };

  const clearFilters = () => {
    setFilteredResto(listofResto);
    setSearchText("");
  };

  return (
    <div className="body min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Discover Amazing Food
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8">
            Order from the best restaurants in your area
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  data-testid="search-input"
                  className={`w-full px-6 py-4 text-gray-800 placeholder-gray-500 bg-white rounded-full border-2 transition-all duration-300 focus:outline-none ${
                    searchFocused
                      ? "border-orange-400 shadow-xl scale-105"
                      : "border-transparent shadow-lg"
                  }`}
                  placeholder="Search for restaurants, cuisines..."
                  value={searchText}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <button
                  data-testid="search-button"
                    onClick={handleSearch}
                    className="p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-all duration-200 hover:scale-110"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleTopRated}
              className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-full hover:border-orange-500 hover:text-orange-500 dark:hover:text-orange-400 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
            >
              ⭐ Top Rated (4.0+)
            </button>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-full hover:border-gray-500 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
            >
              🔄 Clear Filters
            </button>
            <div className="m-4 p-4 flex text-white font-bold items-center">
              <label htmlFor="">Username :</label>
              <input type="text" className="border p-1  border-black" value={loggedInuser} onChange={(e)=>setUserName(e.target.value)} />
            </div>
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            {filteredResto.length} restaurants found
          </div>
        </div>

        {/* Results Section */}
        {filteredResto.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">
              No restaurants found
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Try adjusting your search or clear the filters
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-all duration-200 font-medium"
            >
              Show All Restaurants
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredResto.map((restaurant) => (
              <Link
                key={restaurant.id}
                to={"/restaurants/" + restaurant.id}
                className="transform hover:scale-105 transition-all duration-300"
              >
                {restaurant.promoted ? (
                  <PromotedRestoCard resdata={restaurant} />
                ) : (
                  <RestoCard resdata={restaurant} />
                )}

                {/* <RestoCard resdata={restaurant} /> */}
              </Link>
            ))}
          </div>
        )}
      </div>

      
      {filteredResto.length > 0 && (
        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-12 mt-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-orange-500 mb-2">
                  {filteredResto.length}+
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  Restaurants
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-500 mb-2">
                  {Math.round(
                    (filteredResto.reduce(
                      (acc, r) => acc + (r.avgRating || 0),
                      0
                    ) /
                      filteredResto.length) *
                      10
                  ) / 10}
                  ⭐
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  Avg Rating
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-500 mb-2">
                  30min
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  Avg Delivery
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-500 mb-2">
                  24/7
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  Service
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Body;
