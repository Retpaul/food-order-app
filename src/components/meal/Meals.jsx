import MealItem from "./MealItem";
import useHttp from "../../hooks/useHttp";
import Error from "../Error";

const reqConfig = {}
export default function Meals() {
  const {
    data:loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals",reqConfig,[]);
  
  if(isLoading){
    return <p className="center">Fetching Meals...</p>
  }

  if(error){
    <Error title='Failed to Fetch Meals' message={error} />
  }

  if(!loadedMeals){
  return <p>No Meals Found ...</p>
}
  return (
    <ul id="meals">
      {loadedMeals.map((meal) => {
        return <MealItem key={meal.id} meal={meal} />;
      })}
    </ul>
  );
}
