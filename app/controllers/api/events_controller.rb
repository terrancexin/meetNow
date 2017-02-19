class Api::EventsController < ApplicationController

  # def index
  #   @events = Event.all
  # end

  def show
    @event = Event.find(params[:id])

    if @event
      render :show
    else
      render json: ["Event not found"], status: 404
    end
  end

  def create
    @event = current_user.rsvps.new(event_params)
    @event.group_id = params[:group_id]

    if @event.save
      Rsvp.create(event_id: @event.id, user: current_user.id)
      render json :show
    else
      render json @event.errors.full_messages, status: 422
    end
  end

  def updated
    @event = Event.find(params[:id])

    if @event.update(event_params)
      render :show
    else
      render json: @event.errors.full_messages, status: 422
    end
  end

  def destroy
    @event = Event.find(params[:id])
    unless @event.destroy
      render json: @event.errors.full_messages, status: 422
    end
  end

  private
  def event_params
    params.require(:event).permit(:name, :time, :location, :description, :group_id, :lat, :lng)
  end
end
