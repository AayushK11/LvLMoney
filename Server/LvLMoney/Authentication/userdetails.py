from API.models import AuthenticationDB
import Authentication.security


def userimage(request):
    UserImage = AuthenticationDB.objects.get(
        Username=Authentication.security.hash_details(request["Username"])
    ).UserImage
    FirstName = AuthenticationDB.objects.get(
        Username=Authentication.security.hash_details(request["Username"])
    ).FirstName
    LastName = AuthenticationDB.objects.get(
        Username=Authentication.security.hash_details(request["Username"])
    ).LastName

    return UserImage, (str(FirstName) + " " + str(LastName))
