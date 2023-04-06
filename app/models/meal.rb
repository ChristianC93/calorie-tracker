class Meal < ApplicationRecord
    has_one_attached :image

    has_many :user_meals
    has_many :users, through: :user_meals
    
    validates :name, :calories, presence: true
    validates :calories, numericality: { only_integer: true }

    def image_url
        Rails.application.routes.url_helpers.url_for(image) if image.attached?
    end
end
