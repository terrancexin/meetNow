class Api::GroupsController < ApplicationController

  def index
    search_bar_filter = params[:filter]
    if search_bar_filter
      @groups = Group.includes(:users, :events).where("LOWER(name) LIKE ?", "%#{search_bar_filter.downcase}%")
    else
      @groups = Group.all.includes(:users, :events)
    end

    render :index
  end

  def create

    unless logged_in?
      render json: ["must log in first"]
    end

    @group = current_user.groups.new(group_params)
    if @group.save
      Organizer.create(group_id: @group.id, user_id: current_user.id)
      Membership.create(group_id: @group.id, user_id: current_user.id)
      render :show
    else
      render json: @group.errors.full_messages, status: 422
    end
  end

  def show
    @group = Group.find(params[:id])

    if @group
      render :show
    else
      render json: ["Group not found"], status: 404
    end
  end

  def update
    @group = Group.find(params[:id])

    if @group.update(group_params)
      render :show
    else
      render json: @group.errors.full_messages, status: 422
    end
  end

  def destroy
    @group = Group.find(params[:id])
    if @group.destroy
      render :show
    else
      render json: @group.errors.full_messages, status: 422
    end
  end

  private
  def group_params
    params.require(:group).permit(:name, :description, :category, :location, :member_count, :about, :founded)
  end
end
