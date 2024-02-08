# Base-Image
FROM gitpod/workspace-full

# Nutzer, von dem die folgenden Befehle ausgeführt werden.
USER gitpod

RUN sudo apt-get update && sudo apt-get install -y kafkacat 
