class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
    params[:user][:email],
    params[:user][:password]
    )

    if @user
      login!(@user)
      render 'api/users/show'
    else
      errors = {}
      errors[:email_address] = ["Please enter your"] if params[:user][:email].blank?
      errors[:password] = ["Please enter your"] if params[:user][:password].blank?
      errors[:email_address_or_password] = ["Invalid"] if errors.empty?

      render json: errors, status: 401
    end
  end

  def destroy
    if logged_in?
      logout!
      render json: {}
    else
      render json: ["Login first!"], status: 404
    end
  end
end
