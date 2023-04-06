function UserTable({ user }) {
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
                    {user.meals.map((meal) => (
                        <tr key={meal.id}>
                        <td>{meal.name}</td>
                        <td>{meal.calories}</td>
                        <td>{new Date(meal.created_at).toLocaleDateString()}</td>
                        <td>
                            <button>Edit</button>
                        </td>
                        <td>
                            <button>Delete</button>
                        </td>
                        </tr>
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
                        <th>Edit</th>
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
                            <button>Edit</button>
                        </td>
                        <td>
                            <button>Delete</button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserTable;