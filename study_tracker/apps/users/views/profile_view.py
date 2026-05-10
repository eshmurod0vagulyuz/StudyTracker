from rest_framework import generics, permissions
from apps.users.serializers.user_serializer import UserSerializer, UpdateProfileSerializer


class ProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method in ["PUT", "PATCH"]:
            return UpdateProfileSerializer
        return UserSerializer

    def get_object(self):
        return self.request.user
