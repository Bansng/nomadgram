from django.db import models
from nomadgram.users import models as user_models
from nomadgram.images import models as image_models


class Notification(image_models.TimeStampedModel):

    TYPE_CHOICES = (
        ('like', 'Like'),
        ('comment', 'Comment'),
        ('follow', 'Follow')
    )

    from_user = models.ForeignKey(user_models.User, related_name='from_user')
    to_user = models.ForeignKey(user_models.User, related_name='to_user')
    notifications_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    image = models.ForeignKey(image_models.Image, null=True, blank=True)
    comment = models.TextField(null=True, blank=True)




