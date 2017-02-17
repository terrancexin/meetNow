class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_param)
    if @user.save
      login!(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private
  def user_param
    params.require(:user).permit(:username, :password, :email, :password, :first_name, :last_name, :city, :bio)
  end
end
