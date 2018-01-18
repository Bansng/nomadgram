from rest_framework import serializers
from . import models
from nomadgram.users import models as user_models


class FeedUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = user_models.User
        fields = (
            'username',
            'profile_image'
        )


class CommentSerializer(serializers.ModelSerializer):

    creator = FeedUserSerializer()

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



class ImageSerializer(serializers.ModelSerializer):

    likes = LikeSerializer(many=True)
    creator = FeedUserSerializer()
    comments = CommentSerializer(many=True)

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
            'like_count'
        )
