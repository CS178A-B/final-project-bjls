from rest_framework import permissions


class UpdateOwnProfile(permissions.BasePermission):
    """Allow users to update their own profile"""

    def has_object_permission(self, request, view, obj):

        if request.method in permissions.SAFE_METHODS:
            return True
        # print (obj.id, request.user.id)
        return obj.id == request.user.id