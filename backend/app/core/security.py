from cryptography.fernet import Fernet
import os

# In real prod, this comes from ENV or KMS
SECRET_KEY = os.getenv("FIELD_ENCRYPTION_KEY")

if not SECRET_KEY:
    # dev fallback (DO NOT SHIP THIS)
    SECRET_KEY = Fernet.generate_key().decode()

fernet = Fernet(SECRET_KEY.encode())


def encrypt_int(value: int) -> str:
    """
    Encrypts an integer and returns a string.
    """
    return fernet.encrypt(str(value).encode()).decode()


def decrypt_int(token: str) -> int:
    """
    Decrypts encrypted integer string.
    """
    return int(fernet.decrypt(token.encode()).decode())
