import re
from django.core.exceptions import ValidationError


def validate_hex_color(value):
    if not re.match(r'^#[0-9A-Fa-f]{6}$', value):
        raise ValidationError(f"'{value}' is not a valid hex color. Use format: #RRGGBB")


def validate_positive(value):
    if value <= 0:
        raise ValidationError("Value must be greater than 0.")
