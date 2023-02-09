from django.urls import path
from . import views

app_name = "blog"

urlpatterns = [
    path("posts/", views.PostList.as_view(), name="post_list"),
    path("posts/<int:id>/", views.PostDetail.as_view(), name="post_detail"),
    path("posts/<int:id>/share/", views.PostShare.as_view(), name="post_share"),
    path("posts/comment/create/", views.PostDetailCommentCreate.as_view(), name="post_create"),
]
