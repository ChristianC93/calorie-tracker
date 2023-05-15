import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUpdatedMealToUser } from "../../features/Auth/authSlice";
import { editMeal } from "../../features/meals/mealsSlice";

function EditMeal({ meal, onClose }) {
    const error = useSelector((state) => state.meals.error);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: meal.name,
        calories: meal.calories
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedMeal = { id: meal.id, ...formData }
        dispatch(editMeal(updatedMeal))
        .then((data) => {
            if (data.payload) {
                dispatch(addUpdatedMealToUser(data.payload))
                onClose();
            }
        })
    };

    return (
        <div>
            <form className='form' encType="multipart/form-data" onSubmit={ handleSubmit }>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={ formData.name } onChange={ handleChange } />
                </div>
                <div>
                    <label htmlFor="calories">Calories:</label>
                    <input type="number" id="calories" name="calories" value={ formData.calories } onChange={ handleChange } />
                </div>
                <div>
                    <input type="submit" value="Submit" />
                </div>
                <div className='error-message'>
                    { error }
                </div>
            </form>
        </div>
    )
};

export default EditMeal;