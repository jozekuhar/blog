from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.core.mail import send_mail

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Post
from .serializers import PostSerializer


class PostList(APIView):
    def get(self, request):
        queryset = Post.published.all()
        serializer = PostSerializer(queryset, many=True, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class PostDetail(APIView):
    def get(self, request, id):
        object = get_object_or_404(Post, id=id, status=Post.Status.PUBLISHED)
        serializer = PostSerializer(object, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)

class PostShare(APIView):
    def post(self, request, id):
        data = request.data
        object = Post.objects.get(id=id)
        subject = f"Sharing: {object.title}"
        message = data["comment"]
        send_mail(subject, message, from_email=data["email_from"], recipient_list=[data["email_to"]])
        return Response({"success": "Email was succesfully sent!"})


class UserPostList(APIView):
    def get(self, request, username):
        user = User.objects.get(username=username)
        queryset = Post.objects.filter(author=user.id)
        serializer = PostSerializer(queryset, many=True)
        return Response(serializer.data)