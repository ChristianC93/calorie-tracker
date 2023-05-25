import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExerciseToUser } from "../../features/Auth/authSlice";
import { addExercise } from "../../features/exercises/exerciseSlice";
import exerciseImage from "../../assets/exercise-image.jpg"

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
        dispatch(addExercise(formData))
        .then((data) => {
            const exercise = data.payload
            if (exercise) {
                dispatch(addExerciseToUser(exercise))
            }
            setFormData({
                name: "",
                calories_burned: ""
            });
        })
    };

    return (
        <div>
            <h1>Add Today's Exercises</h1>
            <div className='hero'>
                <img src={ exerciseImage } alt='exerciseImage' />
            </div>
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
            <div className='error-message'>
                { error }
            </div>
        </div>
    )
};

export default ExerciseInput;