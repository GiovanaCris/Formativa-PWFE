from django.urls import path
from .views import LoginView, UsuarioListCreate, UsuarioRestrieveUpdateDestroy, ReservaAmbienteListCreate, ReservaAmbienteRetrieveUpdateDestroy, ReservaAmbienteProfessorList, DisciplinaListCreate, DisciplinaRetrieveUpdateDestroy, DisciplinaProfessorList, SalaList, SalaListCreate

urlpatterns = [
    #Login
    path('login/', LoginView.as_view()),

    #Usuario
    path('usuario/', UsuarioListCreate.as_view()), #Criar e listar todos os usuários
    path('usuario/<int:pk>/', UsuarioRestrieveUpdateDestroy.as_view()), #Listar informações de um usuário em específico

    #Disciplina
    path('disciplinas/', DisciplinaListCreate.as_view()),
    path('disciplinas/<int:pk>', DisciplinaRetrieveUpdateDestroy.as_view()),
    path('professor/disciplinas/', DisciplinaProfessorList.as_view()),

    #Sala
    path('salalistcreate/', SalaListCreate.as_view()),
    path('salalist/', SalaList.as_view()),

    #Reserva
    path('reservas/', ReservaAmbienteListCreate.as_view()), #Criar e listar as reservas
    path('reservas/<int:pk>/', ReservaAmbienteRetrieveUpdateDestroy.as_view()), #Listar as informações de uma reserva em específico
    path('professor/reservas/', ReservaAmbienteProfessorList.as_view()), 
]