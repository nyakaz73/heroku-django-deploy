from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view()
def welcome(request):
    return Response({
        'data':'Welcome to our Rest API '
    })

@api_view()
def tools(request):
    return Response([
        {
            'name':'GitHub Actions',
            'url':'https://docs.github.com/en/free-pro-team@latest/actions'
        },
        {
            'name':'Jenkins',
            'url':'https://jenkins.io/'
        },
        {
            'name':'CircleCI',
            'url':'https://circleci.com/'
        },
        {
            'name':'Bamboo',
            'url':'https://www.atlassian.com/software/bamboo'
        },
        {
            'name':'Travis CI',
            'url':'https://travis-ci.com/'
        },
        {
            'name':'GitLab',
            'url':'https://about.gitlab.com/'
        },
        
    ])