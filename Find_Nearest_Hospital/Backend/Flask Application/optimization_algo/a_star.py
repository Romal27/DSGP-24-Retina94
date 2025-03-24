from geopy.distance import geodesic
import heapq


def a_star(user_location, hospitals):
    """
    A* algorithm to find the nearest hospital from user's location.

    :param user_location: Tuple (lat, lon) of user.
    :param hospitals: List of hospital dictionaries with 'name', 'lat', 'lon'.
    :return: Nearest hospital.
    """
    priority_queue = []

    for hospital in hospitals:
        distance = geodesic(user_location, (hospital['lat'], hospital['lon'])).km
        heapq.heappush(priority_queue, (distance, hospital))

    return heapq.heappop(priority_queue)[1]  # Return nearest hospital
