class MealsController < ApplicationController
  before_action :set_meal, only: [:show, :update, :destroy]
  
    # GET /meals
    def index
      @meals = Meal.all
      render json: @meals
    end

    # GET /meals/1
    def show
      render json: @meal
    end

    # POST /meals
    def create
      meal = Meal.new(meal_params)
      if meal.save! 
        UserMeal.create!(user: @current_user, meal: meal, date_time: DateTime.now)
        render json: meal, status: :created
      end
    end

    # PATCH/PUT /meals/1
    def update
      @meal.update!(meal_params)
        render json: @meal, status: :ok
    end

    # DELETE /meals/1
    def destroy
      @meal.destroy
    end

    #GET logged in users meals
    def current_user_meals
      render json: @current_user.meals.all, status: :ok 
    end

    private
    
      def set_meal
        @meal = Meal.find(params[:id])
      end

      def meal_params
        params.require(:meal).permit(:name, :calories, :image)
      end
end
