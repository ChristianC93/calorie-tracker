import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserMeals } from "../../features/meals/mealsSlice";
import Meal from "./Meal";


function Meals({ user }) {
    const dispatch = useDispatch();
    const userMeals = useSelector((state) => state.meals.entities);

    useEffect(() => {
        dispatch(setUserMeals(user.meals));
    }, [dispatch, user.meals])

    return (
        <div>
            {userMeals.map((meal) => {
                return (
                    <Meal key={ meal.id } meal={ meal } />
                )
            })}
        </div>
    )
}

export default Meals;