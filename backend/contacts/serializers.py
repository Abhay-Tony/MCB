import re
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Contact


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = [
            'id',
            'name',
            'email',
            'phone',
            'company',
        ]
        read_only_fields = ['id']

    def validate_name(self, value):
        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                'Name cannot be empty.'
            )

        return value

    def validate_phone(self, value):
        if not value:
            return value

        pattern = r'^\d{10}$'

        if not re.match(pattern, value):
            raise serializers.ValidationError(
                'Enter a valid phone number.'
            )

        return value


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        min_length=8
    )

    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'password',
        ]

    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
        )