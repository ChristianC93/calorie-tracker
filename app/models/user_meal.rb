class UserMeal < ApplicationRecord
  belongs_to :user
  belongs_to :meal

  validates :meal, presence: true
end
