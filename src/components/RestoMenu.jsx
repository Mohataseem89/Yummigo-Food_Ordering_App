import React from "react";
import Shimmer from "./shimmer";
import { useParams } from "react-router-dom";
import { useState } from "react";
import useRestoMenu from "../utils/useRestoMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestoMenu = () => {
  const { id } = useParams();
  const restoinfo = useRestoMenu(id);
  
  
  const [openCategoryIndex, setOpenCategoryIndex] = useState(null);

  if (restoinfo == null) return <Shimmer />;

  // extract restaurant basic info
  const { name, avgRating, costForTwoMessage, cuisines } =
    restoinfo?.cards[2]?.card?.card?.info || {};

  const categories = restoinfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards
    ?.filter((c) =>
       c.card?.["card"]?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    )
    ?.map((c) => c.card?.card);

  
  // console.log( categories);
  // console.log( restoinfo);

  // Function to handle category toggle
  const handleCategoryToggle = (index) => {
    // If the same category is clicked, close it. Otherwise, open the new one
    setOpenCategoryIndex(openCategoryIndex === index ? null : index);
  };

  return (
    <div className="resto-menu max-w-4xl mx-auto p-6">
     
      <div className="text-center mb-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h1 className="font-bold text-3xl text-gray-800 dark:text-white mb-4">
          {name}
        </h1>
        <div className="flex justify-center items-center gap-6 text-gray-600 dark:text-gray-300">
          <div className="flex items-center">
            <span className="text-2xl mr-2">⭐</span>
            <span className="font-semibold">{avgRating}</span>
          </div>
          <div className="font-bold text-lg text-orange-500">
            {costForTwoMessage}
          </div>
        </div>
        <h2 className="font-semibold text-lg text-gray-700 dark:text-gray-300 mt-4">
          Cuisines: {cuisines?.join(", ")}
        </h2>
      </div>

      {/* categories */}
      <div className="space-y-4">
        {categories && categories.length > 0 ? (
          categories.map((category, index) => (
            <RestaurantCategory
              key={category?.title || index}
              data={category}
              isOpen={openCategoryIndex === index}
              onToggle={() => handleCategoryToggle(index)}
            />
          ))
        ) : (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🍽️</div>
            <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-400">
              Menu categories not available
            </h2>
            <p className="text-gray-500 dark:text-gray-500 mt-2">
              This restaurant's menu might be loading or temporarily unavailable.
            </p>
          </div>
        )}
      </div>

     
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <h3 className="font-bold mb-2">Debug Info:</h3>
          <p>Categories found: {categories?.length || 0}</p>
          <p>Currently open category index: {openCategoryIndex}</p>
          <p>Restaurant ID: {id}</p>
          <details className="mt-2">
            <summary className="cursor-pointer font-semibold">
              View full API response structure
            </summary>
            <pre className="mt-2 text-xs overflow-auto max-h-96 bg-gray-50 dark:bg-gray-800 p-2 rounded">
              {JSON.stringify(restoinfo, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
};

export default RestoMenu;