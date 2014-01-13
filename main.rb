require 'pry'
require 'sinatra'
require 'sinatra/reloader'

# stations per line
subway = {
    "N Line" => ["Times Square","34th","28th on the N","Union Square","8th on the N"],
    "L Line" => ["8th","6th","Union Square","3rd","1st"],
    "6 Line" => ["Grand Central","33rd","28th","23rd","Union Square","Astor Place"]
  }

# display the home page of the MTA application
get '/' do
  @subway = subway
  @route = []
  erb :form
end

# the form submits the start and end values in a hash
post '/route' do
  @subway = subway
  # get the route value stored for the start key
  @start = params[:start]

  # get the route value stored for the end key
  @end = params[:end]

  # determine the stations on the route
  # split the start value into line and station stored in an array
  journey_start = @start.split(',')
  journey_end = @end.split(',')
  start_line = journey_start[0]
  start_station = journey_start[1]
  end_line = journey_end[0]
  end_station = journey_end[1]

  # determine the number of stops based on the route array
  # return to the root path and display the journey stops
  @route = route_info(start_line, start_station, end_line, end_station, subway)

  erb :form
end

def route_info(start_line, start_station, end_line, end_station, subway)
  # use to store the route stops
  route = []

  # find the intersecting station where the users should change lines
  interchange = (@subway[start_line] & @subway[end_line]).first

  # check where the route starts on the line because if it's stored in an array it's read from pos 0 up
  start_index = subway[start_line].index(start_station)
  end_index = subway[end_line].index(end_station)

  start_interchange_index = subway[start_line].index(interchange)
  end_interchange_index = subway[end_line].index(interchange)

  unless start_station == end_station

    # if the journey starts and ends on the same line
    if start_line == end_line

      # determine direction of journey on the line
      if start_index > end_index
          #starting from the end of the line
          route = subway[start_line].slice(end_index..start_index).reverse
      else
        # starting from the begining of the line
        # extract the route and return it
        route = subway[start_line].slice(start_index..end_index)
      end

    else
      # if the journey starts and ends on different lines
      # determine the direction of journey to the interchange
      if start_index < start_interchange_index
        route = route + subway[start_line].slice(start_index..start_interchange_index)
      else
        route = route + subway[start_line].slice(start_interchange_index..start_index).reverse
      end

      #determine the direction of the journey from the interchange
      if end_interchange_index < end_index
          route = route + subway[end_line].slice(end_interchange_index..end_index)
          #raise subway[end_line].slice(end_index..end_interchange_index).inspect
      else
          #raise 'err'
          route = route + subway[end_line].slice(end_index..end_interchange_index).reverse
      end

    end

  end

  route
end