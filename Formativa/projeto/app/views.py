from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveDestroyAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, CreateAPIView
from .models import Usuario, Disciplina, ReservaAmbiente, Sala
from .serializers import UsuarioSerializer, DisciplinaSerializer, ReservaAmbienteSerializer, LoginSerializer, ReservaSalaSerializer
from .permissions import IsGestor, IsProfessor, IsDonoOuGestor
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView

class UsuarioListCreate(ListCreateAPIView): #Listar e criar
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [IsGestor]

class UsuarioRestrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [IsGestor]
    lookup_field = 'pk'

    #Mensagem ao deletar um usuário
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(
            {"detail": f"Professor (a) {instance.username} deletado com suceso!"},
            status=status.HTTP_200_OK
        )

class DisciplinaListCreate(ListCreateAPIView):
    queryset = Disciplina.objects.all()
    serializer_class = DisciplinaSerializer

    def get_permissions(self):
        return [IsGestor()]
    
class DisciplinaRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Disciplina.objects.all()
    serializer_class = DisciplinaSerializer
    permission_classes = [IsGestor]
    lookup_field = 'pk'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(
            {"detail": f"Disciplina {instance.nome} deletada com suceso!"},
            status=status.HTTP_200_OK
        )

class DisciplinaProfessorList(ListAPIView):
    serializer_class = DisciplinaSerializer
    permission_classes = [IsProfessor]

    def get_queryset(self):
        return Disciplina.objects.filter(professor=self.request.user) #Filtra todas as disciplinas do usuário 'professor' atual
    
class ReservaAmbienteListCreate(ListCreateAPIView):
    queryset = ReservaAmbiente.objects.all()
    serializer_class = ReservaAmbienteSerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]
        return [IsGestor()]
    
    def get_queryset(self): #Ver reserva do professor de um ID específico, adiciona um filtro no queryset pai
        queryset = super().get_queryset()
        professor_id = self.request.query_params.get('professor', None)
        if professor_id:
            queryset = queryset.filter(professor_id=professor_id)
        return queryset
    
    #Tratação para não criar reserva no mesmo período
    def perform_create(self, serializer):
        data_inicio = serializer.validated_data['data_inicio']
        data_termino = serializer.validated_data['data_termino']
        periodo = serializer.validated_data['periodo']
        sala = serializer.validated_data['sala_reservada']

        if data_inicio > data_termino:
            raise ValidationError("A data de início não pode ser posterior à data de término.")

        tratativa = ReservaAmbiente.objects.filter(
        sala_reservada=sala,
        periodo=periodo,
        data_inicio__lte=data_termino,
        data_termino__gte=data_inicio
        )

        if tratativa.exists():
            raise ValidationError("Já essiste uma reserva nesta sala neste mesmo dia e período!")
        
        serializer.save(professor=self.request.user)

class ReservaAmbienteRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = ReservaAmbiente.objects.all()
    serializer_class = ReservaAmbienteSerializer
    permission_classes = [IsGestor]
    lookup_field = 'pk'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(
            {"detail": f"Reserva {instance.sala_reservada} deletada com suceso!"},
            status=status.HTTP_200_OK
        )

class ReservaAmbienteProfessorList(ListAPIView):
    serializer_class = ReservaAmbienteSerializer
    permission_classes = [IsProfessor]

    def get_queryset(self):
        return ReservaAmbiente.objects.filter(professor=self.request.user) #Filtra só as reservas de um professor específico
    
class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer

class SalaList(ListAPIView):
    queryset = Sala.objects.all()
    serializer_class = ReservaSalaSerializer
    permission_classes = [IsProfessor]

class SalaListCreate(ListCreateAPIView):
    queryset = Sala.objects.all()
    serializer_class = ReservaSalaSerializer
    permission_classes = [IsGestor]

class SalaretrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Sala.objects.all()
    serializer_class = ReservaSalaSerializer
    permission_classes = [IsGestor]
    lookup_field = 'pk'

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(
            {"detail": f"Reserva {instance.nome} deletada com suceso!"},
            status=status.HTTP_200_OK
        )

#ADMIN
#username: admin
#password: 12345

#GESTOR
#username: GESTOR
#password: giovana10

#julia
#username: julia
#password: Giovana1@3