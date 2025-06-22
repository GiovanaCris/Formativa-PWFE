from rest_framework import serializers
from .models import Usuario, Disciplina, ReservaAmbiente, Sala
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True}
        }

    #Criptografar a senha no banco de dados
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = Usuario(**validated_data)
        user.set_password(password)
        user.save()
        return user

class DisciplinaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disciplina
        fields = '__all__'

class ReservaAmbienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReservaAmbiente
        fields = '__all__'

class LoginSerializer(TokenObtainPairSerializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    
# Valida o login usando o serializer padrão do Simple JWT,
    def validate(self, attrs):
        data = super().validate(attrs)

        data['user'] = {
            'username': self.user.username,
            'email': self.user.email,
            'tipo': self.user.tipo
        }
        return data
    
class ReservaSalaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sala
        fields = '__all__'

    def validate_nome(self, value):
        # Verifica se está atualizando
        if self.instance:
            if self.instance.nome == value:
                return value
        # Verifica se já existe outra sala com esse nome
        if Sala.objects.filter(nome=value).exists():
            raise serializers.ValidationError("Já existe uma sala com esse nome!")
        return value