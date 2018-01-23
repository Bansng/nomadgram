from rest_framework import serializers
from . import models

from nomadgram.images import serializers as image_serializers
from nomadgram.users import serializers as users_serializers


class NotificationSerializer(serializers.ModelSerializer):

    from_user = image_serializers.FeedUserSerializer()
    to_user = image_serializers.FeedUserSerializer()
    image = image_serializers.OnlyImageSerializer()

    class Meta:
        model = models.Notification
        fields = '__all__'
