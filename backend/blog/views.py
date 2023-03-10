from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.db.models import Count
from rest_framework.pagination import LimitOffsetPagination

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Post, Tag
from .serializers import PostSerializer, CommentSerializer, CommentCreateSerializer, TagSerializer, RecentPostSerializer


class PostList(APIView, LimitOffsetPagination):
    def get(self, request):
        queryset = Post.published.all()
        results = self.paginate_queryset(queryset, request, view=self)
        serializer = PostSerializer(results, many=True, context={"request": request})    
        return self.get_paginated_response(serializer.data)


class RecentPostList(APIView):
    def get(self, request):
        queryset = Post.published.all()[:5]
        serializer = RecentPostSerializer(queryset, many=True)
        return Response(serializer.data)


class MostCommentedPosts(APIView):
    def get(self, request):
        queryset = Post.published.annotate(most_comments=Count("comments")).order_by("-most_comments")[:5]
        serializer = RecentPostSerializer(queryset, many=True)
        return Response(serializer.data)

class PostDetail(APIView):
    def get(self, request, id):
        object = get_object_or_404(Post, id=id, status=Post.Status.PUBLISHED)
        serializer = PostSerializer(object, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)

class SimilarPostDetail(APIView):
    def get(self, request, id):
        post = get_object_or_404(Post, id=id, status=Post.Status.PUBLISHED)
        tags_in_post = post.tags.values_list("id", flat=True)
        similar_posts = Post.objects.filter(tags__in=tags_in_post).exclude(id=post.id)
        similar_posts.annotate(same_tags=Count("tags")).order_by("-same_tags", "-publish")[:5]
        serializer = RecentPostSerializer(similar_posts, many=True)
        return Response(serializer.data)


class PostDetailCommentCreate(APIView):
    def post(self, request):
        data = request.data
        serializer = CommentCreateSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        print(serializer.validated_data)
        serializer.save()
        return Response({"success": "Comment was succesfully published!"}, status=status.HTTP_201_CREATED)


class PostShare(APIView):
    def post(self, request, id):
        data = request.data
        object = Post.objects.get(id=id)
        post_url = request.build_absolute_uri(object.get_absolute_url())
        subject = f"Sharing: {object.title}"
        message = f"Message: /n/n {data['comment']} /n/n Url: {post_url}"
        send_mail(subject, message, from_email=data["email_from"], recipient_list=[data["email_to"]])
        return Response({"success": "Email was succesfully sent!"})


class UserPostList(APIView):
    def get(self, request, username):
        user = User.objects.get(username=username)
        queryset = Post.objects.filter(author=user.id)
        serializer = PostSerializer(queryset, many=True)
        return Response(serializer.data)

class TagPostList(APIView):
    def get(self, request, slug):
        tag = Tag.objects.get(slug=slug)
        queryset = Post.objects.filter(tags=tag)
        serializer = PostSerializer(queryset, many=True)
        return Response(serializer.data)


class TagList(APIView):
    def get(self, request):
        queryset = Tag.objects.all()
        serializer = TagSerializer(queryset, many=True)
        return Response(serializer.data)

class TagDetail(APIView):
    def get(self, request, slug):
        tag = Tag.objects.get(slug=slug)
        serializer = TagSerializer(tag)
        return Response(serializer.data)