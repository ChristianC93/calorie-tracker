class ExerciseSerializer < ActiveModel::Serializer
  belongs_to :user
  
  attributes :id, :name, :calories_burned
end
