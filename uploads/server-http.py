#coding:utf-8
import http.server
import socketserver #pour faire communique 2 appli via un reseau

port = 80
address = ("", port)

handler = http.server.SimpleHTTPRequestHandler #gerer les requetes http
httpd = socketserver.TCPServer(address, handler) 

print(f"Serveur demarre sur le port {port}")

httpd.serve_forever()