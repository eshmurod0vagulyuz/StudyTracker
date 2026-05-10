"""
study_tracker/core/settings.py ga quyidagi o'zgarishlarni kiriting.
Hozirgi settings.py ni o'zgartiring, yangi fayl yaratmang.
"""

# ═══════════════════════════════════════════════════════════════
# 1. TOP QISMDAGI O'ZGARISHLAR (mavjud import'lardan keyin)
# ═══════════════════════════════════════════════════════════════

import os
from pathlib import Path
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-key-change-in-production")
DEBUG = os.getenv("DEBUG", "True") == "True"

# ✅ Render uchun ALLOWED_HOSTS ni kengaytiring
ALLOWED_HOSTS_STR = os.getenv("ALLOWED_HOSTS", "*")
ALLOWED_HOSTS = [h.strip() for h in ALLOWED_HOSTS_STR.split(",")]


# ═══════════════════════════════════════════════════════════════
# 2. INSTALLED_APPS ga whitenoise qo'shing
# ═══════════════════════════════════════════════════════════════

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "rest_framework_simplejwt",
    "rest_framework_simplejwt.token_blacklist",
    "drf_yasg",
    "django_filters",
    "corsheaders",
    "apps.users",
    "apps.tasks",
    "apps.statistics",
    "apps.achievements",
    "apps.study_history",
]


# ═══════════════════════════════════════════════════════════════
# 3. MIDDLEWARE ga whitenoise qo'shing (2-qatorga)
# ═══════════════════════════════════════════════════════════════

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",  # ← QO'SHING
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]


# ═══════════════════════════════════════════════════════════════
# 4. DATABASE — DATABASE_URL ni qo'llab-quvvatlash
# ═══════════════════════════════════════════════════════════════

import dj_database_url

DATABASE_URL = os.getenv("DATABASE_URL")
if DATABASE_URL:
    # Render PostgreSQL URL formatida beradi
    DATABASES = {
        "default": dj_database_url.config(
            default=DATABASE_URL,
            conn_max_age=600,
            conn_health_checks=True,
        )
    }
else:
    # Local development: alohida env vars
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": os.getenv("POSTGRES_DB", "studytracker"),
            "USER": os.getenv("POSTGRES_USER", "postgres"),
            "PASSWORD": os.getenv("POSTGRES_PASSWORD", "1234"),
            "HOST": os.getenv("POSTGRES_HOST", "localhost"),
            "PORT": os.getenv("POSTGRES_PORT", "5432"),
        }
    }


# ═══════════════════════════════════════════════════════════════
# 5. STATIC FILES — whitenoise bilan
# ═══════════════════════════════════════════════════════════════

STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"  # "static" emas "staticfiles"
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"


# ═══════════════════════════════════════════════════════════════
# 6. SECURITY — production uchun
# ═══════════════════════════════════════════════════════════════

if not DEBUG:
    SECURE_SSL_REDIRECT = True
    SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_HSTS_SECONDS = 31536000

# CORS: production'da faqat frontend domeniga ruxsat
CORS_ALLOW_ALL_ORIGINS = DEBUG
if not DEBUG:
    CORS_ALLOWED_ORIGINS = [
        "https://study-tracker-frontend.onrender.com",
        # Boshqa domenlar bu yerga qo'shing
    ]



