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
      puts "meal_params: #{meal_params.inspect}"
      meal = Meal.new(meal_params)
      if meal.save! 
        UserMeal.create!(user: @current_user, meal: meal, date_time: DateTime.now)
        render json: meal, status: :created
      end
    end

    # PATCH/PUT /meals/1
    def update
      if @meal.update(meal_params)
        render json: @meal
      else
        render json: @meal.errors, status: :unprocessable_entity
      end
    end

    # DELETE /meals/1
    def destroy
      @meal.destroy
    end

    private
    
      def set_meal
        @meal = Meal.find(params[:id])
      end

      def meal_params
        params.require(:meal).permit(:name, :calories, :image)
      end
end
