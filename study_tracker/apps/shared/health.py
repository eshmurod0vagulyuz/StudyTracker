from django.http import JsonResponse
from django.db import connection
from django.db.utils import OperationalError


def health_check(request):
    """Render health check — /api/health/ URL'ida ishlaydi."""
    try:
        connection.ensure_connection()
        db_status = "ok"
    except OperationalError:
        db_status = "error"

    status = "ok" if db_status == "ok" else "error"
    return JsonResponse(
        {"status": status, "database": db_status},
        status=200 if status == "ok" else 503
    )