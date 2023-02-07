from django.shortcuts import get_object_or_404

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