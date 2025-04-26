from functools import wraps
from rest_framework.exceptions import PermissionDenied

def role_required(allowed_roles):
    def decorator(view_func):
        @wraps(view_func)
        def wrapped_view(request, *args, **kwargs):
            if not request.user.is_authenticated:
                raise PermissionDenied("Authentication required")
            
            if not request.user.role or request.user.role.name not in allowed_roles:
                raise PermissionDenied("You don't have permission to perform this action")
            
            return view_func(request, *args, **kwargs)
        return wrapped_view
    return decorator