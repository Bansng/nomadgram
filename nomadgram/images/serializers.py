from rest_framework import serializers
from . import models
from nomadgram.users import models as user_models
from taggit_serializer.serializers import (TagListSerializerField, TaggitSerializer)


class OnlyImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Image
        fields = (
            'file',
        )


class SimpleImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Image
        fields = (
            'id',
            'file',
            'likes_count',
            'comments_count'
        )


class FeedUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = user_models.User
        fields = (
            'username',
            'profile_image'
        )


class CommentSerializer(serializers.ModelSerializer):

    creator = FeedUserSerializer(read_only=True)

    class Meta:
        model = models.Comment
        fields = (
            'id',
            'message',
            'creator'
        )


class LikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Like
        fields = '__all__'


class ImageSerializer(TaggitSerializer, serializers.ModelSerializer):

    likes = LikeSerializer(many=True)
    creator = FeedUserSerializer()
    comments = CommentSerializer(many=True)
    tags = TagListSerializerField()

    class Meta:
        model = models.Image
        #fields = ('__all__')
        fields = (
            'id',
            'file',
            'location',
            'created_at',
            'comments',
            'likes',
            'creator',
            'likes_count',
            'tags',
        )


class InputImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Image
        fields = (
            'file',
            'location',
            'caption',
        )
