from django.urls import path
from .views import LoginView, UsuarioListCreate, UsuarioRestrieveUpdateDestroy, GestoresListView, ReservaAmbienteListCreate, ReservaAmbienteRetrieveUpdateDestroy, ReservaAmbienteProfessorList, DisciplinaListCreate, DisciplinaRetrieveUpdateDestroy, DisciplinaProfessorList, SalaList, SalaListCreate, SalaretrieveUpdateDestroy, ProfessoresListView

urlpatterns = [
    #Login
    path('login/', LoginView.as_view()), #Feito Postman

    #Usuario
    path('usuario/', UsuarioListCreate.as_view()), #Criar e listar todos os usuários #Feito postman
    path('usuario/<int:pk>/', UsuarioRestrieveUpdateDestroy.as_view()), #atualizar e deletar as informações de um usuário em específico #Feito Postman
    path('professores/', ProfessoresListView.as_view(), name='professores-list'),
    path('gestores/', GestoresListView.as_view(), name='gestores-list'),

    #Disciplina
    path('disciplinas/', DisciplinaListCreate.as_view()), #Feito Postan
    path('disciplinas/<int:pk>/', DisciplinaRetrieveUpdateDestroy.as_view()), #Feito Postman
    path('professor/disciplinas/', DisciplinaProfessorList.as_view()), #Feito Postman

    #Sala
    path('salalistcreate/', SalaListCreate.as_view()), #Gestor vai listar e criar a sala #Feito postman
    path('sala/<int:pk>/', SalaretrieveUpdateDestroy.as_view(), name='sala-detail'), #Feito postman
    path('salalist/', SalaList.as_view()), #Listar as salas para o professor

    #Reserva
    path('reservas/', ReservaAmbienteListCreate.as_view()), #Criar e listar as reservas #Feito postman 
    path('reservas/<int:pk>/', ReservaAmbienteRetrieveUpdateDestroy.as_view()), #atualizar e deletar as informações de uma reserva em específico #Feito Postman
    path('professor/reservas/', ReservaAmbienteProfessorList.as_view()), #Feito Postman
]