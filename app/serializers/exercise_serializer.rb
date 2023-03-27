class ExerciseSerializer < ActiveModel::Serializer
  attributes :id, :name, :calories_burned
  has_one :user
end
