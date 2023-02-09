from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.core.mail import send_mail
from rest_framework.pagination import LimitOffsetPagination

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Post
from .serializers import PostSerializer, CommentSerializer, CommentCreateSerializer


class PostList(APIView, LimitOffsetPagination):
    def get(self, request):
        queryset = Post.published.all()
        results = self.paginate_queryset(queryset, request, view=self)
        serializer = PostSerializer(results, many=True, context={"request": request})
        
        return self.get_paginated_response(serializer.data)


class PostDetail(APIView):
    def get(self, request, id):
        object = get_object_or_404(Post, id=id, status=Post.Status.PUBLISHED)
        serializer = PostSerializer(object, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class PostDetailCommentCreate(APIView):
    def post(self, request):
        data = request.data
        serializer = CommentCreateSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        print(serializer.validated_data)
        serializer.save()
        return Response({"success": "Comment was succesfully published!"})


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