from django.contrib import admin
from django.urls import path, include, re_path
from blog import views as blog_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/blog/", include("blog.urls", namespace="blog")),
    path("api/users/<str:username>/", blog_views.UserPostList.as_view(), name="user_post_list")
]
