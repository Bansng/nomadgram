from django.db import models
from nomadgram.users import models as user_models

class TimeStampedModel(models.Model):

    """ TimeStampedModel """

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Image(TimeStampedModel):

    """ Image Model """

    file = models.ImageField()
    location = models.CharField(max_length=140)
    caption = models.TextField()
    creator = models.ForeignKey(user_models.User, null=True, related_name='images')

    @property
    def likes_count(self):
        return self.likes.all().count()

    @property
    def comments_count(self):
        return self.comments.all().count()

    def __str__(self):
        return 'location: {} - Image Caption: {}'.format(self.location, self.caption)

    class Meta:
        ordering = ['-created_at']


class Comment(TimeStampedModel):

    """ Common Model """

    message = models.TextField()
    creator = models.ForeignKey(user_models.User, null=True)
    image = models.ForeignKey(Image, null=True, related_name='comments')

    def __str__(self):
        return self.message


class Like(TimeStampedModel):

    """ Like Model """

    creator = models.ForeignKey(user_models.User, null=True)
    image = models.ForeignKey(Image, null=True, related_name='likes')

    def __str__(self):
        return 'User: {} - Image Caption: {}'.format(self.creator.username, self.image.caption)

