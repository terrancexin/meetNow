class Api::UsersController < ApplicationController
  def index
    @users = User.all
    render :index
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    # debugger
    # if current_user
    #   @user = User.includes(:groups).find(current_user.id)
    # end
    @user = User.find(params[:id])

    if @user
      render :show
    else
      render json: ["User not found"], status: 404
    end
  end

  def groups
    @group = User.find(params[:id].groups)
    render :show
  end

  private
  def user_params
    params.require(:user).permit(:username, :password, :email, :password, :first_name, :last_name, :city, :bio)
  end
end
