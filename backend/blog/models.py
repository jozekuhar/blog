from django.db import models
from django.urls import reverse
from django.utils import timezone
from django.contrib.auth.models import User
from django.utils.text import slugify


class PublishManager(models.Manager):
    """
    To je custom manager, ki lahko deluje na vsak model, ki ima status=Post.Status.PUBLISHED
    """
    def get_queryset(self):
        return super().get_queryset().filter(status=Post.Status.PUBLISHED)


class CustomManager(models.Manager):
    """
    To je custom manager, ki direktno filtrira Post model
    """
    def get_queryset(self):
        queryset = Post.objects.filter(title="testiram")
        return queryset

class Tag(models.Model):
    name = models.CharField(max_length=50)
    slug = models.SlugField(max_length=50)

    def __str__(self):
        return self.name

    def save(self):
        if not self.slug:
            self.slug = slugify(self.title)
        return super().save()

class Post(models.Model):

    class Status(models.TextChoices):
        DRAFT = "DF", "Draft"
        PUBLISHED = "PB", "Published"

    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique_for_date="publish")
    body = models.TextField()
    publish = models.DateTimeField(default=timezone.now)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=2, choices=Status.choices, default=Status.DRAFT)
    # Django shell for choices
    # Post.Status.choices, Post.Status.names, Post.Status.labels
    author = models.ForeignKey(User, related_name="blog_posts", on_delete=models.CASCADE)
    # Related name je za dostop do podatkov. Recimo User.blog_posts.all()
    tags = models.ManyToManyField(Tag)

    objects = models.Manager()
    published = PublishManager() # custom manager for published posts
    testiram = CustomManager() # Testiram custom manager

    class Meta:
        # default_manager_name
        # db_table
        ordering = ["-publish"]
        indexes = [
            models.Index(fields=["-publish"])
        ]

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("blog:post_detail", kwargs={"id": self.pk})
        # nujno mora biti id string (ker to ni js)


class Comment(models.Model):
    post = models.ForeignKey(Post, related_name="comments", on_delete=models.CASCADE)
    name = models.CharField(max_length=80)
    email = models.EmailField()
    body = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateField(auto_now=True)
    active = models.BooleanField(default=True)

    class Meta:
        ordering = ["-created"]
        indexes = [
            models.Index(fields=["-created"])
        ]

    def __str__(self):
        return f"Comment by {self.name} on {self.post}"


