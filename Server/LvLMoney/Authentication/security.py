import hashlib


def hash_details(parameter):
    parameter = str(parameter) + str(parameter)
    parameter = hashlib.sha256(parameter.encode()).hexdigest()
    return parameter
