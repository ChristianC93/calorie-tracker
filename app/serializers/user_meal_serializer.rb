class UserMealSerializer < ActiveModel::Serializer
  attributes :id, :date_time
  has_one :user
  has_one :meal
end
