class User < ApplicationRecord
    has_secure_password
    has_many :exercises
    has_many :user_meals, dependent: :destroy
    has_many :meals, through: :user_meals
    validates :username, presence: true, uniqueness: true
end
