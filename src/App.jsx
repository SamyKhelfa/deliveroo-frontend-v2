import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

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
                <li key={index} className="meal-item">
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
    </div>
  );
}

export default App;
