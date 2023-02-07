from django.urls import path
from . import views

app_name = "blog"

urlpatterns = [
    path("posts/", views.PostList.as_view(), name="post_list"),
    path("posts/<int:id>/", views.PostDetail.as_view(), name="post_detail"),
]
