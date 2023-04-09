class UserSerializer < ActiveModel::Serializer
  has_many :exercises
  has_many :user_meals
  has_many :meals
  
  attributes :id, :username, :password_digest, :total_calories_by_date
  
end
