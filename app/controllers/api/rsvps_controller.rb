class Api::RsvpsController < ApplicationController
  def index
  end

  def create
    # debugger
    @rsvp = current_user.rsvps.new(rsvp_params)
    @event = @rsvp.event

    if @rsvp.save
      render 'api/events/show'
    else
      render json: @rsvp.errors.full_messages, status: 422
    end
  end

  def destroy
    @rsvp = Rsvp.find_by(
      user_id: current_user.id,
      event_id: params[:event_id]
    )

    if @rsvp
      @event = @rsvp.event
      @rsvp.destroy
      render 'api/events/show'
    else
      render json: ["rsvp not found"], status: 404
    end

  end

  def rsvp_params
    params.require(:rsvp).permit(:event_id)
  end
end
