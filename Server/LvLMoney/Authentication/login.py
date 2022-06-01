from API.models import AuthenticationDB
import Authentication.security


def login_stage_one(request):
    if AuthenticationDB.objects.filter(
        Username=Authentication.security.hash_details(request["Username"]),
        Password=Authentication.security.hash_details(request["Password"]),
    ).exists():
        return (
            True,
            AuthenticationDB.objects.get(
                Username=Authentication.security.hash_details(request["Username"])
            ).TwoFactorEnabled,
        )
    return False, False


def login_stage_two(request):

    if (
        Authentication.security.two_factor_now(
            Username=Authentication.security.hash_details(request["Username"]),
        )
        == request["TwoFA"]
    ):
        return True
    return False


def login_folio(email, password):
    if AuthenticationDB.objects.filter(
        Email=email,
        Password=Authentication.security.hash_details(password),
    ).exists():
        return True
    return False
