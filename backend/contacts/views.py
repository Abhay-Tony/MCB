from rest_framework import viewsets
from .models import Contact
from .serializers import ContactSerializer


class ContactViewSet(viewsets.ModelViewSet):
    serializer_class = ContactSerializer

    def get_queryset(self):
        return Contact.objects.filter(
            owner=self.request.user
        ).order_by('name')

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)