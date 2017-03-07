json.partial! 'api/events/event', event: @event
# 
# json.set! @event.id do
#   json.partial! 'event', event: @event
#   json.rsvp_count event.users.count
# end




json.set! json.rsvp_count @event.users.count
