from rest_framework.response import Response
from rest_framework import status as http_status


def success_response(data=None, message="Success", status=http_status.HTTP_200_OK):
    return Response({"success": True, "message": message, "data": data}, status=status)


def created_response(data=None, message="Created successfully"):
    return success_response(data=data, message=message, status=http_status.HTTP_201_CREATED)


def error_response(message="An error occurred", status=http_status.HTTP_400_BAD_REQUEST):
    return Response({"success": False, "message": message}, status=status)


def not_found_response(message="Not found"):
    return error_response(message=message, status=http_status.HTTP_404_NOT_FOUND)
