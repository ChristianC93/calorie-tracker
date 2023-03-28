class UserMealSerializer < ActiveModel::Serializer
  belongs_to :user
  belongs_to :meal
  
  attributes :id, :date_time
end
