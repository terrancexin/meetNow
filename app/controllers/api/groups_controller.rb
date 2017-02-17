class Api::GroupsController < ApplicationController
  def index
    @groups = Group.all
    render :index
  end

  def create
    @group = Group.create!(group_param)
    if @group.save
      render :show
    else
      render json: @group.errors.full_messages, status: 422
    end
  end

  def show
    @group = Group.find(params[:id])
    render :show
  end

  def update
    @group = Group.find(params[:id])
    if @group.update(group_param)
      render json: @group
    else
      render json: @group.errors.full_messages, status: 422
    end
  end

  private
  def group_param
    params.require(:group).permit(:name, :description)
  end
end
