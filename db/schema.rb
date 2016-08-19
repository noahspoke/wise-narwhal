# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160819135246) do

  create_table "posts", force: :cascade do |t|
    t.string   "code",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "showtimes", force: :cascade do |t|
    t.string   "title",         null: false
    t.string   "rating",        null: false
    t.string   "image_url"
    t.string   "video_url"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "structure"
    t.integer  "visible_level"
    t.string   "details"
  end

  create_table "the_times", force: :cascade do |t|
    t.integer  "showtime_id", null: false
    t.string   "thetime",     null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "things", force: :cascade do |t|
    t.string   "type",        null: false
    t.string   "name",        null: false
    t.string   "description", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: :cascade do |t|
    t.integer  "code",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
