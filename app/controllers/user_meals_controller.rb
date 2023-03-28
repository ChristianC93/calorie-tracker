class UserMealsController < ApplicationController
    #GET all of a user's meals (read)
    def index
        user_meals = @current_user.user_meals
        render json: user_meals
    end
    
        #GET one user_meal (read)
    def show
        user_meals = @current_user.user_meals.find_by!(id: params[:id])
        render json: user_meals, status: :ok
    end
    
    #POST an meals to current user's user_meals (create)
    def create
        user_meals = @current_user.user_meals.create!(user_meals_params)
        render json: user_meals, status: :created
    end
    
    #PATCH current user's user_meals/id (update) 
    def update
        user_meals = @current_user.user_meals.find_by!(id: params[:id])
        user_meals.update!(user_meals_params)
        render json: user_meals, status: :ok
    end
    
    #DELETE a user_meals from current user (delete)
    def destroy
        user_meals = @current_user.user_meals.find_by!(id: params[:id])
        user_meals.destroy
        render json: {}, status: :no_content
    end

    private

    def user_meals_params
        params.permit(user: @current_user, meal: @meal, date_time: DateTime.now)
    end
end
