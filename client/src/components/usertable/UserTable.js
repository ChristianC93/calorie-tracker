import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeExerciseFromUser, removeMealFromUser } from "../../features/Auth/authSlice";
import { removeExercise } from "../../features/exercises/exerciseSlice";
import { deleteMeal } from "../../features/meals/mealsSlice";
import EditMeal from "../meals/EditMeal";

function UserTable({ user }) {
    const dispatch = useDispatch();
    const [editingMealId, setEditingMealId] = useState(null);
    const total_calories_by_date = useSelector((state) => state.auth.user.total_calories_by_date)
    const totalCaloriesByDateArray = Object.entries(total_calories_by_date);
    

    const handleEdit = (meal) => {
        setEditingMealId(meal.id);
    };
   
    const handleCloseEdit = () => {
        setEditingMealId(null);
    };

    const handleMealDelete = (id) => {
        dispatch(deleteMeal(id))
        .then((id) => {
            dispatch(removeMealFromUser(id))
        });
    };

    const handleExerciseDelete = (id) => {
        dispatch(removeExercise(id))
        .then((id) => {
            dispatch(removeExerciseFromUser(id))
        });
    };

    return (
        <div>
            <h1>Welcome, { user.username }</h1>

            <div className="table-container">
                <h2>{user.username}'s Meals</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Meal Name</th>
                        <th>Calories</th>
                        <th>Date</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {user.meals?.map((meal) => (
                        <React.Fragment key={meal.id}>
                            <tr key={meal.id}>
                            <td>{meal.name}</td>
                            <td>{meal.calories}</td>
                            <td>{new Date(meal.created_at).toLocaleDateString()}</td>
                            <td>
                                <button onClick={() => handleEdit(meal)}>Edit</button>
                            </td>
                            <td>
                                <button onClick={() => handleMealDelete(meal.id) }>Delete</button>
                            </td>
                            </tr>
                            {editingMealId === meal.id && (
                                <tr>
                                    <td colSpan={5}>
                                        <EditMeal meal={ meal } onClose={ handleCloseEdit } />
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
                
                <h2>{user.username}'s Exercises</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Exercise</th>
                        <th>Calories Burned</th>
                        <th>Date</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {user.exercises.map((exercise) => (
                        <tr key={exercise.id}>
                        <td>{exercise.name}</td>
                        <td>{exercise.calories_burned}</td>
                        <td>{new Date(exercise.created_at).toLocaleDateString()}</td>
                        <td>
                            <button onClick={() => handleExerciseDelete(exercise.id)}>Delete</button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <h2>Total Calories By Date</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Total Calories</th>
                    </tr>
                    </thead>
                    <tbody>
                    {totalCaloriesByDateArray.map(([date, calories]) => (
                        <tr key={date}>
                        <td>{date}</td>
                        <td>{calories}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserTable;