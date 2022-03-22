from API.models import AuthenticationDB
import Authentication.security
import Authentication.emails


def forgot_password_stage_one(request):
    if AuthenticationDB.objects.filter(
        Username=Authentication.security.hash_details(request["Username"]),
        Email=request["Email"],
    ).exists():
        if AuthenticationDB.objects.get(
            Username=Authentication.security.hash_details(request["Username"])
        ).TwoFactorEnabled:
            return "2FA"
        else:
            Authentication.emails.forgot_password_email(
                AuthenticationDB.objects.get(
                    Username=Authentication.security.hash_details(request["Username"])
                ).FirstName,
                request["Email"],
                request["Username"],
            )
            return "Email"
    return False


def forgot_password_stage_two(request):
    if (
        Authentication.security.two_factor_now(
            Username=Authentication.security.hash_details(request["Username"]),
        )
        == request["TwoFA"]
    ):
        Authentication.emails.forgot_password_email(
            AuthenticationDB.objects.get(
                Username=Authentication.security.hash_details(request["Username"])
            ).FirstName,
            request["Email"],
            request["Username"],
        )
        return True
    return False


def forgot_password_stage_three(request):
    if AuthenticationDB.objects.filter(
        Username=Authentication.security.hash_details(request["Username"]),
        Email=request["Email"],
    ).exists():
        AuthenticationDB.objects.filter(
            Username=Authentication.security.hash_details(request["Username"])
        ).update(Password=Authentication.security.hash_details(request["NewPassword"]))
        return True
    return False
