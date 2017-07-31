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

ActiveRecord::Schema.define(version: 20170727155944) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "pages", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "prices", force: :cascade do |t|
    t.string  "name",        null: false
    t.integer "price",       null: false
    t.string  "description"
  end

  create_table "shows", force: :cascade do |t|
    t.string "title",       null: false
    t.string "description"
    t.string "adt_notes"
    t.string "runtime",     null: false
    t.string "rating",      null: false
    t.string "image_url"
  end

  create_table "showtimes", force: :cascade do |t|
    t.string   "thetime",  null: false
    t.datetime "beg_date", null: false
    t.datetime "end_date", null: false
  end

  create_table "things", force: :cascade do |t|
    t.string   "name",        null: false
    t.string   "description", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "beg_date"
    t.datetime "end_date"
    t.integer  "page_id"
  end

  create_table "users", force: :cascade do |t|
    t.string   "name",            null: false
    t.string   "password_digest", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
