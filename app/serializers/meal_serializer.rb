class MealSerializer < ActiveModel::Serializer
  attributes :id, :name, :calories
  has_many :user_meals
  has_many :users
end
