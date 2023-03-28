class CreateUserMeals < ActiveRecord::Migration[6.1]
  def change
    create_table :user_meals do |t|
      t.references :user, null: false, foreign_key: true
      t.references :meal, null: false, foreign_key: true
      t.datetime :date_time

      t.timestamps
    end
  end
end
