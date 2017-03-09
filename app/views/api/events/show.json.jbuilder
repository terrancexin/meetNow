json.partial! 'api/events/event', event: @event



json.set! json.rsvp_count @event.users.count
