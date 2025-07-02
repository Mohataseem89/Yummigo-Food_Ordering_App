import { useDispatch } from "react-redux";
import { addItem } from "../utils/Slice/cartSlice";
import ItemCard from "./ItemCard";

const RestaurantCategory = ({ data, isOpen, onToggle }) => {
  const dispatch = useDispatch();
  const handleaddItem = (item) => {
    //dispatch an action
    dispatch(addItem(item));
  };
  // Debug: Log the data to see what we're receiving
  // console.log("RestaurantCategory data:", data);

  const title = data?.title || "Category";
  const itemCards = data?.itemCards || [];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-4 overflow-hidden border border-gray-200 dark:border-gray-700">
      
      <div
        className="w-full bg-gray-50 dark:bg-gray-700 p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
        onClick={onToggle}
      >
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg text-gray-800 dark:text-white">
            {title} ({itemCards.length})
          </span>
          <span
            className={`transform transition-transform duration-200 text-gray-600 dark:text-gray-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            🔽
          </span>
        </div>
      </div>

      {isOpen && (
        <div className="p-4 bg-white dark:bg-gray-800">
          {itemCards.length > 0 ? (
            <div className="space-y-4">
              {itemCards.map((item, index) => {
                const itemInfo = item?.card?.info;
                if (!itemInfo) return null;

                return (
                  <ItemCard
                    key={itemInfo.id || index}
                    itemInfo={itemInfo}
                    onAction={() => handleaddItem(item)}
                    actionLabel="ADD"
                    showImage={true}
                  />
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              No items available in this category
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default RestaurantCategory;
