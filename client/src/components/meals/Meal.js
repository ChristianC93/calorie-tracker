function Meal({ meal }) {
    return (
        <div key={meal.id}>
            <h2>{meal.name}</h2>
            <img src={meal.image_url} alt={meal.name} className='image' />
            <p>Date: {new Date(meal.created_at).toLocaleDateString()}</p>
            <p>Calories: {meal.calories}</p>
        </div>
    );
};

export default Meal;