from rest_framework.permissions import BasePermission

#Permissês do Gestor
class IsGestor(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.tipo == 'G'

#Permissões do Professor
class IsProfessor(BasePermission):
    def has_permission(self, request, view): #Permissão geral, acessa qualquer view
        return request.user.is_authenticated and request.user.tipo == 'P'
    
# Permissão personalizada que permite acesso total a usuários com tipo 'G' (Gestor).
# Usuários com tipo diferente como professores só têm permissão se forem os donos do objeto (obj.professor == request.user).
class IsDonoOuGestor(BasePermission):
    def has_object_permission(self, request, view, obj): #Consulta um objeto em específico
        if request.user.tipo == 'G':
            return True
        return obj.professor == request.user