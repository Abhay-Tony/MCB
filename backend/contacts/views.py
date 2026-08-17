from rest_framework import viewsets
from .models import Contact
from .serializers import ContactSerializer
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer


class ContactViewSet(viewsets.ModelViewSet):
    serializer_class = ContactSerializer

    def get_queryset(self):
        return Contact.objects.filter(
            owner=self.request.user
        ).order_by('name')

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(
                {
                    'message': 'User registered successfully.'
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )