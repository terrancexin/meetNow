# == Schema Information
#
# Table name: groups
#
#  id          :integer          not null, primary key
#  name        :string           not null
#  description :text             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  category    :string
#  about       :string
#  location    :string
#  founded     :datetime
#

class Group < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true
  validates :category, :description, :location, presence: true
  validates :description, length: { minimum: 1 }
  after_initialize :init

  def init
    self.photo_url ||= "https://s3.amazonaws.com/meetnow-DEV/category/tech.png"
  end

  has_many :memberships
  has_many :events
  has_many :organizers

  has_many :users, through: :memberships, source: :user
  has_many :group_organizers, through: :organizer, source: :user
end
