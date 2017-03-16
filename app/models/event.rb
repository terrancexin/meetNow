# == Schema Information
#
# Table name: events
#
#  id          :integer          not null, primary key
#  name        :string           not null
#  time        :datetime         not null
#  location    :string           not null
#  description :text             not null
#  group_id    :integer          not null
#  lat         :float
#  lng         :float
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Event < ActiveRecord::Base
  validates :name, :time, :location, presence: true
  validates :description, length: { minimum: 1 }

  geocoded_by :location   # can also be an IP address
  after_validation :geocode          # auto-fetch coordinates


  belongs_to :group


  has_many :comments
  has_many :rsvps

  has_many :users, through: :rsvps, source: :user
  has_many :comment_users, through: :comments, source: :user
end
