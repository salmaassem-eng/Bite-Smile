import useHttp from "../util/useHttp";
import MealItem from "./MealItem";

const requestConfig = {};

export default function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("https://bitesmilebackend-production.up.railway.app/meals", requestConfig, []);

  if (isLoading) {
    return <p className="center">Fetching Data ...</p>;
  }

  if (error) {
    return (
      <div className="error">
        <h2>failed to fetch Meals</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
