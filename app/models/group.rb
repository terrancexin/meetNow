# == Schema Information
#
# Table name: groups
#
#  id          :integer          not null, primary key
#  name        :string           not null
#  description :text             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Group < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true
  has_many :memberships
  has_many :users, through: :memberships, source: :user
end
