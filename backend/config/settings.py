from pathlib import Path
import os
from datetime import timedelta


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-#2ek*^umv5z7x)wot&6(34(wzyw3y*mvb&ymhu(%33-mhtf3en'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True  # В продакшене всегда False
ALLOWED_HOSTS = [
    'carefree-reflection-production-feae.up.railway.app',
    '.railway.app',
]  # Убраны лишние символы

# CSRF и куки
CSRF_TRUSTED_ORIGINS = ['https://carefree-reflection-production-feae.up.railway.app']  # Убраны слеши в конце

CSRF_COOKIE_DOMAIN = None  # Важно! Не используйте .railway.app для кук
# Сессии
SESSION_COOKIE_SAMESITE = 'Lax'
SESSION_COOKIE_DOMAIN = None  # Аналогично CSRF
# Security
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

# Static files
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
# Важно для Railway

# CORS (если используете API)
CORS_ALLOWED_ORIGINS = [
    'https://carefree-reflection-production-feae.up.railway.app',
    "http://localhost:3000",
]
CORS_ALLOW_CREDENTIALS = True

# Прокси и HTTPS
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SECURE_SSL_REDIRECT = True
SECURE_HSTS_SECONDS = 31536000 


# Application definition

INSTALLED_APPS = [
    'jazzmin',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    "whitenoise.runserver_nostatic",
    'django.contrib.staticfiles',

    'rest_framework',
    'rest_framework.authtoken',
    'django_filters',
    'rest_framework_simplejwt',
    'corsheaders',

    'todo.apps.TodoConfig',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    "whitenoise.middleware.WhiteNoiseMiddleware",
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

STORAGES = {
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly',
        'rest_framework.permissions.IsAuthenticated',
    ],

    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ],
    'DEFAULT_SCHEMA_CLASS': 'rest_framework.schemas.coreapi.AutoSchema',
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=7),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=30),
}

ROOT_URLCONF = 'config.urls'

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'todo/static'),
]
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media/')

JAZZMIN_SETTINGS = {
    "site_title": "NOTE",
    "site_header": "Admin",
    "site_brand": "NOTE",
    "site_logo": "todo/img/note.svg",
    "login_logo": "todo/img/note.svg",
    "site_icon": "todo/img/note.svg",
    "site_logo_classes": "img",
    "welcome_sign": "Добро пожаловать в админку NOTE Todo!",
    "show_ui_builder": True,
    "navigation_expanded": True,
    
    "topmenu_links": [
        {"name": "Главная", "url": "admin:index"},
        {"app": "todo"},
    ],
    "theme": "cyborg",  # Устаревший параметр (для версий <3.0)
    "dark_mode_theme": "cyborg",  # Актуальный параметр
}

JAZZMIN_UI_TWEAKS = {
    "theme": "cyborg",  # Альтернативный вариант
    "dark_mode_theme": "cyborg",  # Дублирование для надежности
}
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': ['templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.2/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'railway',
        'USER': 'postgres',
        'PASSWORD': 'yekMHMahJCxrjERcBYlfbShMtjzCltrd',
        'HOST': 'postgres-q-66.railway.internal',
        'PORT': '5432',
        'OPTIONS': {
            'connect_timeout': 5,
            'sslmode': 'require'
        }
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.2/topics/i18n/

LANGUAGE_CODE = 'ru-ru'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.2/howto/static-files/


# Default primary key field type
# https://docs.djangoproject.com/en/5.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
