import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ _id, name, price, description, image }) => {
    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

    return (
        <div className="food-item">
            <div className="food-item-image-container">
                <img
                    className="food-item-image"
                    src={image}
                    alt={name}
                />
                {!cartItems[_id] ? (
                    <img
                        className="add"
                        onClick={() => addToCart(_id)}
                        src={assets.add_icon_white}
                        alt="Add"
                        style={{ width: "30px" }}
                    />
                ) : (
                    <div className="food-item-counter">
                        <img
                            onClick={() => removeFromCart(_id)}
                            src={assets.remove_icon_red}
                            alt="Remove"
                        />
                        <p>{cartItems[_id]}</p>
                        <img
                            onClick={() => addToCart(_id)}
                            src={assets.add_icon_green}
                            alt="Add"
                        />
                    </div>
                )}
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_stars} alt="Rating" />
                </div>
                <p className="food-item-desc">{description}</p>
                <p className="food-item-price">${price}</p>
            </div>
        </div>
    );
};

export default FoodItem;
