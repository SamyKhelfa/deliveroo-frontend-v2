import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--deliveroo-backend--pv9pjt8nl4p9.code.run/"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  // Fonction pour ajouter un repas au panier
  const addToCart = (mealId) => {
    setCart([...cart, mealId]);
  };

  // Fonction pour supprimer un repas du panier
  const removeFromCart = (mealId) => {
    // Complétez cette fonction pour gérer la suppression d'un repas du panier
  };

  // Calculer le prix total en fonction du panier
  const totalPrices = cart.reduce(
    (acc, meal) => acc + parseFloat(meal.price),
    0
  );

  return isLoading ? (
    <span className="loading-message">En cours de chargement...</span>
  ) : (
    <div className="restaurant-container">
      <h1 className="restaurant-name">{data.restaurant.name}</h1>
      <p className="restaurant-description">{data.restaurant.description}</p>
      <img
        className="restaurant-image"
        src={data.restaurant.picture}
        alt="Restaurant"
      />
      <ul className="categories-list">
        {data.categories.map((category, index) => (
          <li key={index} className="category-item">
            {category.name}
            <ul className="meals-list">
              {category.meals.map((meal, index) => (
                <li
                  key={index}
                  className="meal-item"
                  onClick={() => addToCart(meal)} // Incrément du panier au clic
                >
                  {meal.title} {meal.description} {meal.price} €
                  {meal.picture && (
                    <img
                      className="meal-picture"
                      src={meal.picture}
                      alt="meal-picture"
                    />
                  )}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <div className="cart-container">
        <button> Valider mon panier </button>
        <ul className="cart-list">
          {cart.map((item, index) => (
            <li key={index}>
              {item.title} {item.price} €
            </li>
          ))}
        </ul>
        {cart.length > 0 ? (
          <div className="total-price">
            <span>Total : {totalPrices.toFixed(2)} €</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
