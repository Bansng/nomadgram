from django.conf.urls import url

from . import views

urlpatterns = [
    url(
        regex=r'^$',
        view=views.Feed.as_view(),
        name='feed'
    ),
    url(
        regex=r'(?P<image_id>[0-9]+)/like/',
        view=views.LikeImage.as_view(),
        name='like_image'
    ),
]

'''
/images/3/like/

0 create the url and the view
1 take the id from the url
2 find an image with this id
3 create a like for that image   
'''
