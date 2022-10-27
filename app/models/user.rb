# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  username        :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_users_on_email          (email) UNIQUE
#  index_users_on_session_token  (session_token) UNIQUE
#  index_users_on_username       (username) UNIQUE
#
class User < ApplicationRecord
  before_validation :ensure_session_token
  has_secure_password

  validates :username, :email, :session_token, uniqueness:true
  validates :username, length: { in: 3..30 }
  validates :email, length: { in: 3..255 }
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :username, format: { without: URI::MailTo::EMAIL_REGEXP }
  validates :password, length: {in: 6..255}, allow_nil:true
  validates :session_token, presence:true

  has_many :tracks, foreign_key: :artist_id, class_name: :Track

  def self.find_by_credentials(credential, password)
    if URI::MailTo::EMAIL_REGEXP.match(credential)
      @user = User.find_by(email: credential)
    else
      @user = User.find_by(username: credential)
    end

    if @user && @user.authenticate(password)
      @user
    else
        nil
    end
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save! 
    self.session_token
  end

  private

  def generate_unique_session_token
      valid_session_token = false

      while valid_session_token == false
        self.session_token = SecureRandom.urlsafe_base64
        if User.exists?(self.session_token)
          valid_session_token = true
        end
      end
      self.session_token
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end
end
