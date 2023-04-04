import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExercise } from "../../features/exercises/exerciseSlice";

function ExerciseInput() {
    const dispatch = useDispatch();
    const error = useSelector((state) => state.exercises.error);
    const [formData, setFormData] = useState({
        name: "",
        calories_burned: ""
    });

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        }); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addExercise(formData));
        setFormData({
            name: "",
            calories_burned: ""
        });
    };

    return (
        <div>
            <h1>Add Today's Exercises</h1>
            <form className="form" onSubmit={ handleSubmit } >
                <label>
                    Name:
                    <input type="text" name="name" onChange={ handleChange } value={ formData.name } />
                </label>
                <br />
                <label>
                    Calories Burned:
                    <input type="number" name="calories_burned" onChange={ handleChange } value={ formData.calories_burned } />
                </label>
                <br />
                <input type="submit" value="Submit" />
            </form>
            { error }
        </div>
    )
};

export default ExerciseInput;