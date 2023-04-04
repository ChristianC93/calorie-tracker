class Exercise < ApplicationRecord
  belongs_to :user
  validates :name, :calories_burned, presence: true
  validates :calories_burned, numericality: { only_integer: true }
end
