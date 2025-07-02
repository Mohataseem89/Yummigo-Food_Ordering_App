import React from "react";
import { CDN_URL } from "../utils/constant";
import { useContext } from "react";
import UserContext from "../utils/UserContext";

const RestoCard = (props) => {
  const { resdata } = props;
  // console.log("resdata", resdata);
  const { loggedInuser } = useContext(UserContext);

  const {
    name,
    costForTwo,
    cloudinaryImageId,
    cuisines = [],
    avgRatingString,
    avgRating,
    sla,
    veg,
  } = resdata;

  // Function to get rating color
  const getRatingColor = (rating) => {
    const numRating = parseFloat(rating) || 0;
    if (numRating >= 4.0)
      return "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900";
    if (numRating >= 3.5)
      return "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900";
    return "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900";
  };

  // Function to truncate text
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="resto-card group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-orange-200 dark:hover:border-orange-800">
    
      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          className="w-full h-48 sm:h-52 object-cover group-hover:scale-110 transition-transform duration-300"
          src={CDN_URL + cloudinaryImageId}
          alt={name}
          loading="lazy"
        />

       
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        
        {veg !== undefined && (
          <div className="absolute top-3 left-3 flex items-center">
            <div
              className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center ${
                veg ? "border-green-500" : "border-red-500"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  veg ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
            </div>
          </div>
        )}


        {avgRatingString && (
          <div
            className={`absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-bold ${getRatingColor(
              avgRatingString
            )}`}
          >
            <span className="flex items-center">
              <svg
                className="w-3 h-3 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {avgRatingString}
            </span>
          </div>
        )}

       
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <button className="bg-white dark:bg-gray-800 text-orange-500 dark:text-orange-400 p-2 rounded-full shadow-lg hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors duration-200"
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* content */}
      <div className="p-4">
        {/* redto name */}
        <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2 leading-tight">
          {truncateText(name, 25)}
        </h3>

        {/* cuisines */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">
          {cuisines.length > 0
            ? truncateText(cuisines.join(", "), 40)
            : "Cuisines not available"}
        </p>

       
        <div className="space-y-2">
          {/* delv time and cost */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-medium">
                {sla?.deliveryTime ? `${sla.deliveryTime} min` : "N/A"}
              </span>
            </div>

            {/* <h4>User: {loggedInuser}</h4> */}

            <div className="flex items-center text-gray-600 dark:text-gray-400 font-semibold">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
              {costForTwo || "Price N/A"}
            </div>
          </div>
        </div>
      </div>

   
      <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-orange-400 dark:group-hover:ring-orange-500 transition-all duration-300 pointer-events-none"></div>
    </div>
  );
};

// higher order component

export const withPromotedBadge = (RestoCard) => {
  return (props) => {
    return (
      <div className="relative">
        {/* Promoted Badge */}
        <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg ">
          🔥 Promoted
        </div>
        {/* Original RestoCard */}
        <RestoCard {...props} />
      </div>
    );
  };
};

export default RestoCard;
