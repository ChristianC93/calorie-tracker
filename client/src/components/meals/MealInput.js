import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMealToUser } from "../../features/Auth/authSlice";
import { addMeal, clearErrors } from "../../features/meals/mealsSlice";

function MealInput() {
    const dispatch = useDispatch();
    const error = useSelector((state) => state.meals.error);   
    const [formData, setFormData] = useState({
        name: "",
        calories: "",
        image: null
    }); 
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "image") {
            setFormData({ ...formData, image: e.target.files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(clearErrors());
        const data = new FormData();

        data.append("meal[name]", e.target.name.value);
        data.append("meal[calories]", e.target.calories.value);

        if (e.target.image.files[0] !== undefined ) {
            data.append("meal[image]", e.target.image.files[0]);
        }
        
        dispatch(addMeal(data))
        .then((data) => {
            const meal = data.payload
            if (meal) {
                dispatch(addMealToUser(meal));
            }
            setFormData({
                name: "",
                calories: "",
                image: null
            });
        });
    };

    return (
        <div>
            <h1>Add Today's Meals</h1>
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
                    <label htmlFor="image">Upload an image:</label>
                    <input type="file" id="image" name="image" accept="image/*" onChange={ handleChange } />
                </div>
                <div>
                    <input type="submit" value="Add Meal" />
                </div>
            </form>
            <div className='error-message'>
                { error }
            </div>
        </div>
    )
};

export default MealInput;