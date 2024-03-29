class MealSerializer < ActiveModel::Serializer
  has_many :user_meals
  has_many :users
  
  attributes :id, :name, :calories, :created_at, :image_url
end
