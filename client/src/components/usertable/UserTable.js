function UserTable({ user }) {
    return (
        <div>
            <h1>Welcome, { user.username }</h1>

            <div>
                <h2>{user.username}'s Meals</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Meal Name</th>
                        <th>Calories</th>
                        <th>Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {user.meals.map((meal, index) => (
                        <tr key={index}>
                        <td>{meal.name}</td>
                        <td>{meal.calories}</td>
                        <td>{new Date(meal.created_at).toLocaleDateString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                
                <h2>{user.username}'s Exercises</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Exercise</th>
                        <th>Date</th>
                        <th>Calories Burned</th>
                    </tr>
                    </thead>
                    <tbody>
                    {user.exercises.map((exercise, index) => (
                        <tr key={index}>
                        <td>{exercise.name}</td>
                        <td>{exercise.calories_burned}</td>
                        <td>{new Date(exercise.created_at).toLocaleDateString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserTable;