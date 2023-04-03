import React, { useState } from "react";

function ExerciseInput() {
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

    return (
        <div>
            <form className="form" >
                <label>
                    Name:
                    <input type="name" name="name" onChange={ handleChange } value={ formData.name } />
                </label>
                <br />
                <label>
                    Calories Burned:
                    <input type="password" name="calories_burned" onChange={ handleChange } value={ formData.calories_burned } />
                </label>
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
};

export default ExerciseInput;