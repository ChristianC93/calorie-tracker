import { useState } from "react";
import { useDispatch } from "react-redux";

function EditMeal({ meal }) {
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
        console.log(formData)
        dispatch(EditMeal(formData))
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
            </form>
        </div>
    )
};

export default EditMeal;