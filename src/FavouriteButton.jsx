function FavouriteButton({ isFavourite, onToggle, projectName }) {
  return (
    <button
      type="button"
      className={`favourite-button${isFavourite ? " is-favourite" : ""}`}
      onClick={onToggle}
      aria-label={`${isFavourite ? "Remove" : "Save"} ${projectName} ${isFavourite ? "from" : "to"} favourites`}
      aria-pressed={isFavourite}
      title={isFavourite ? "Remove from favourites" : "Save to favourites"}
    >
      {isFavourite ? "★" : "☆"}
    </button>
  );
}

export default FavouriteButton;
