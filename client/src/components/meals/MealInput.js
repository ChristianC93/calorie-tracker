import React, { useState } from "react";

function MealInput() {   
    const [formData, setFormData] = useState({
        name: "",
        calories: "",
        image: null
    }); 
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "image-upload") {
            setFormData({ ...formData, image: e.target.files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div>
            <h1>Add a Meal</h1>
            <form onSubmit={ handleSubmit }>
                <div>
                    <label htmlFor="meal-name">Meal Name:</label>
                    <input type="text" id="meal-name" name="mealName" value={ formData.mealName } onChange={ handleChange } />
                </div>
                <div>
                    <label htmlFor="calorie-count">Calories:</label>
                    <input type="number" id="calories" name="calories" value={ formData.calories } onChange={ handleChange } />
                </div>
                <div>
                    <label htmlFor="image-upload">Upload an image:</label>
                    <input type="file" id="image-upload" name="image-upload" accept="image/*" onChange={ handleChange } />
                </div>
                <div>
                    <input type="submit" value="Add Meal" />
                </div>
            </form>
        </div>
    )
};

export default MealInput;