import os
USE_SSL = False
REMOTE_HOST = "47.107.155.180"
REMOTE_PORT = 18081
REMOTE_HOST = os.getenv('MITM_REMOTE_HOST') if os.getenv('MITM_REMOTE_HOST') != None else REMOTE_HOST
REMOTE_PORT = int(os.getenv('MITM_REMOTE_PORT')) if os.getenv('MITM_REMOTE_PORT') != None else REMOTE_PORT
USE_SSL = bool(os.getenv('MITM_USE_SSL')) if os.getenv('MITM_USE_SSL') != None else USE_SSL
print(f'MITM Remote Host: {REMOTE_HOST}')
print(f'MITM Remote Port: {str(REMOTE_PORT)}')
print(f'MITM Use SSL {str(USE_SSL)}')
