from django.urls import path
from restapi.views import welcome,tools
urlpatterns = [
    path('',welcome, name="welcome"),
    path('tools/', tools,name="tools"),

]