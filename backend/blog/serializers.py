from django.urls import reverse

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Post


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "username"
        ]


class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer()
    # url = serializers.SerializerMethodField()
    # url2 = serializers.URLField(source="get_absolute_url")
    # url3 = serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = "__all__"

    # def get_url(self, object):
    #     return reverse("blog:post_detail", kwargs={"id": object.id})

    # def get_url3(self, object):
    #     request = self.context["request"]
    #     test = request.build_absolute_uri(reverse("blog:post_detail", kwargs={"id": object.id}))
    #     print(test)
    #     return test
        # return self.context["request"].build_absolute_uri()
