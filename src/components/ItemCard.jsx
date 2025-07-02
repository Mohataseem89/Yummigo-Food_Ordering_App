const ItemCard = ({ itemInfo, onAction, actionLabel = "ADD", showImage = true }) => {
  if (!itemInfo) return null;

  const price =
    (itemInfo.price ?? itemInfo.defaultPrice ?? 0) / 100;

  return (
    <div className="border-b border-gray-200 dark:border-gray-600 pb-4 last:border-b-0 flex justify-between items-start">
      <div className="flex-1 pr-4">
        <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
          {itemInfo.name}
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          ₹{price}
        </p>
        {itemInfo.description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
            {itemInfo.description}
          </p>
        )}
        {itemInfo.ratings?.aggregatedRating?.rating && (
          <div className="flex items-center mt-2">
            <span className="text-xs text-green-600 dark:text-green-400 font-semibold">
              ⭐ {itemInfo.ratings.aggregatedRating.rating}
            </span>
            {itemInfo.ratings.aggregatedRating.ratingCountV2 && (
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                ({itemInfo.ratings.aggregatedRating.ratingCountV2})
              </span>
            )}
          </div>
        )}
      </div>

      {showImage && itemInfo.imageId && (
        <div className="flex-shrink-0 relative">
          <img
            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${itemInfo.imageId}`}
            alt={itemInfo.name}
            className="w-24 h-24 object-cover rounded-lg"
          />
          <button
            onClick={onAction}
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-700 border-2 border-orange-500 text-orange-500 dark:text-orange-400 px-4 py-1 rounded-lg text-sm font-bold hover:bg-orange-50 dark:hover:bg-gray-600 transition-colors duration-200 shadow-md"
          >
            {actionLabel}
          </button>
        </div>
      )}
    </div>
  );
};

export default ItemCard;
