# nomadgram

Cloning Instagram with Python Django and React


## 1. cookiecutter settings
#### to initialize python3 virtual env and cookiecutter
```
pipenv --three
pipenv shell
cookiecutter https://github.com/pydanny/cookiecutter-django
```
#### project initial settings
```
project_name [Project Name]: Nomadgram
project_slug [nomadgram]: 
author_name [Daniel Roy Greenfeld]: Nomad Coders
email [you@example.com]: bansng@gmail.com
description [A short description of the project.]: Cloning IG with Py
domain_name [example.com]: nomadcoders.co
version [0.1.0]: 
timezone [UTC]: Asia/Seoul
use_whitenoise [y]: n
use_celery [n]: 
use_mailhog [n]: 
use_sentry_for_error_reporting [y]: n
use_opbeat [n]: n
use_pycharm [n]: n
windows [n]: 
use_docker [n]: 
use_heroku [n]: 
use_elasticbeanstalk_experimental [n]: 
use_compressor [n]: 
```
#### to delete files and make file in project
```
delete docs
delete utility
delete .coveragerc
delete .travis.yml
delete CONTRIBUTORS.txt
delete env.example
delete README.rst
make README.md
```
#### create table in DB postgre 
```
CREATE TABLE nomadgram
```
## 2. git settings
#### git initial settings in PC
```
git init
git remote add origin https://github.com/Bansng/nomadgram
git add .
git status
git commit -m "Cookiecutter + cleanup"
git push origin master
```
#### project settings after git cloning
```
pipenv --three
pipenv install -r requirements/local.txt
pipenv shell
```
#### to make django app
```
django-admin startapp images
```
```
/setttings/base.py 에서 LOCAL_APPS 추가
```
## 3. Models
#### models : a object to communicate with DB by using ORM
#### abstract model : a model not saved on the database but used by the other models to extend from themselves
```
class TimeStampedModel(models.Model):

    created_at = models.DateTimeField(auto_now_add=True) 
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
```
#### ForeignKey / to view the name of object in Django-admin 
```
class Image(TimeStampedModel):

    file = models.ImageField()
    location = models.CharField(max_length=140)
    caption = models.TextField()
    creator = models.ForeignKey(user_models.User, null=True)

    def __str__(self):
        return 'location: {} - Image Caption: {}'.format(self.location, self.caption)
```
#### to get datas from DB 
```
nicolas = Owner.objects.get(pk=1)
nico_cats = nicolas.cat_set.all()
```
#### many to many : many users can follow many users / many users can be followed by many users
```
follower = models.ManyToManyField('self')
following = models.ManyToManyField('self')
```
#### to insert or update ManyToManyField
```
nicolas.followers.add(jisu, pedro)
```
## 4. django-admin
#### to make superusers in django-admin 
```
python manage.py createsuperuser
```
#### to register/cutomize models in django-admin
```
from . import models

@admin.register(models.Image)
class ImageAdmin(admin.ModelAdmin):
    
    list_display_links = (
        'location',
    )

    search_fields = (
        'location',
        'caption'
    )

    list_filter = (
        'location',
    )

    list_display = (
        'created_at',
        'updated_at',
        'file',
        'location',
        'caption',
        'creator'
    )
```
#### to update fieldsets in User models for viewing ManyToManyField
```
[/nomadgram/users/admin.py]
@admin.register(User)
class MyUserAdmin(AuthUserAdmin):
    ...
    fieldsets = (
                ('User Profile', {'fields': ('name', 'follower', 'following')}),
        ) + AuthUserAdmin.fieldsets
    ...
``` 
## 5. django rest framework
#### djangorestframework settings
```
pipenv shell
pipenv install djangorestframework

[base.py]
THIRD_PARTY_APPS = [
    'allauth',  # registration
    'allauth.account',  # registration
    'allauth.socialaccount',  # registration
    'rest_framework',  # REST framework
]
```
#### serializer.py : python object to json object / json object to python object
```
class ImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Image
        fields = '__all__'
```
#### to declare nested serializer
```
class LikeSerializer(serializers.ModelSerializer):

    image = ImageSerializer()

    class Meta:
        model = models.Like
        fields = '__all__'
```
#### native variables from model A when model A is refered by model B using ForeignKey
```
[serializers.py]
comment_set = CommentSerializer(many=True)
like_set = LikeSerializer(many=True)
```
#### 'related_name' attirbute
```
class Comment(TimeStampedModel):

    """ Common Model """

    message = models.TextField()
    creator = models.ForeignKey(user_models.User, null=True)
    image = models.ForeignKey(Image, null=True, related_name='comments')

    def __str__(self):
        return self.message
```
```
comments = CommentSerializer(many=True)
likes = LikeSerializer(many=True)
```
#### how to get data from DB using models and ORM / to respond to client 
```
[views.py]

class ListAllImage(APIView):
    
    def get(self, request, format=None):

        all_images = models.Image.objects.all()
        
        serializer = serializers.ImageSerializer(all_images, many=True)

        return Response(data=serializer.data)


class ListAllComments(APIView):
    
    def get(self, request, format=None):

        user_id = request.user.id
        #all_comments = models.Comment.objects.all()
        all_comments = models.Comment.objects.filter(creator=user_id)
        
        serializer = serializers.CommentSerializer(all_comments, many=True)

        return Response(data=serializer.data)
```
