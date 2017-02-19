# == Schema Information
#
# Table name: users
#
#  id                 :integer          not null, primary key
#  username           :string           not null
#  password_digest    :string           not null
#  session_token      :string           not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  first_name         :string
#  last_name          :string
#  email              :string
#  city               :string
#  bio                :text
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#

class User < ActiveRecord::Base
  validates :username, :email, presence: true, uniqueness: true
  validates :session_token, :password_digest, :first_name, :last_name, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  # has_attached_file :image, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "aa-logo-test.png"
  # validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

  after_initialize :ensure_session_token

  attr_reader :password

  has_many :memberships
  has_many :comments
  has_many :organizers
  has_many :rsvps

  has_many :groups, through: :memberships, source: :group
  has_many :comment_events, through: :comments, source: :event
  has_many :organizer_groups, through: :organizer, source: :group
  has_many :events, through: :rsvps, source: :event

  def self.find_by_credentials(username, password)
    user = self.find_by(username: username)
    user && user.is_password?(password) ? user : nil
  end

  def self.generate_random_token
    SecureRandom.urlsafe_base64(16)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = self.class.generate_random_token
    self.save
    self.session_token
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  private
  def ensure_session_token
    self.session_token ||= self.class.generate_random_token
  end
end
