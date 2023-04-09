class User < ApplicationRecord
    has_secure_password
    has_many :exercises
    has_many :user_meals, dependent: :destroy
    has_many :meals, through: :user_meals
    validates :username, presence: true, uniqueness: true

    def total_calories_by_date 
        total_calories = {}

        meals.each do |meal|
            meal_date = meal.created_at.to_date.to_s
            total_calories[meal_date] ||= 0
            total_calories[meal_date] += meal.calories
        end

        exercises.each do |exercise|
            exercise_date = exercise.created_at.to_date.to_s
            total_calories[exercise_date] ||= 0
            total_calories[exercise_date] -= exercise.calories_burned
        end

        total_calories
    end
end
