# Formativa-PWFE

- Este projeto se consiste em um **FrontEnd\Interface realizado em React**;
- Para realizar este projeto utilizei uma **API em Django/Django rest-framework realizado na aula de PWBE**;
- Este projeto foi realizado para meu projeto Inegrador\Formativo da matéria de PWFE na instituição SENAI "Roberto Mange"!;
- Espero que você possa viajar profundamente neste mundo de aprendizados e conhecimentos! 💙;

# Passo a passo
## 🚨 Importante
- Os comandos podem variar de acordo com o sistema operecional;
- O projeto foi realizado em um computador windows então os comandos aqui descritos são para windows!

# Como rodar o Backend? 🤔
## 💫 1- Instalando dependencias
Antes de tudo é necessário instalar algumas ferramentas em seu computador.
### 🛠️ Ferramentas 
- [VSCODE](https://code.visualstudio.com/download)
- [Python 3.9+](https://www.python.org/downloads/)
- [GIT](https://git-scm.com/downloads)
- [SQLite](https://sqlitebrowser.org/dl/)

## 📂 2- Entrando na pasta e rodando o projeto
- Abra o terminal e digite: cd Formativa\ (cd + tecla tab);
- Crie um ambiente virtual: python -m venv env;
- Entre no ambiente: .\env\Scripts\activate;
- Instale as dependencias: pip install -r .\requeriments.txt;
- Entre no projeto: cd .\projeto\ (cd + tecla tab);
- Rode o projeto: python .\manage.py runserver;

## ⚙ 3- Alterando Banco de Dados
- Abra a pasta projeto dentro da pasta projeto;
- Abra o arquivo: settings.py;
- Em DATABASES: Altere para as informações do seu banco;

````python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'cadastro',
        'USER': 'root',
        'HOST': 'localhost',
        'PASSWORD': 'senai',
        'PORT': '3306'
    }
}
````
- Crie um usuário: python .\manage.py createsuperuser
- Insira as informações necessárias (**este usuário sempre será um professor para criar um gestor faça na página de admin**)
- Seguindo o passo a passo está tudo certinho para o BackEnd, agora bora rodar esse FrontEnd 🎉

# Rodando o FrontEnd ✨
## 📁 4- Entrando na pasta
- No seu canto direito do terminal clique no ícone: + (ele irá abrir um novo terminal);
- Neste terminal, entre na pasta: cd \formativa gieduc (cd + tecla tab);
- Entre no projeto: cd .\gieduc\ (cd + tecla tab);

## 🎁 5- Instalando dependencias
- Para instalar o npm, faça o comando: npm i;
- Para rodar o projeto: npm run dev
- Entre no Link: tecla Ctrl + clique botão esquedo do mouse;

# 🔓 Modelos de login para acessar o sistema
- **Modelo login professor:** Nome: gigiC || Senha: gigiC1@3
- **Modelo login gestor:** Nome: admin || Senha: Giovana1@3

# E você pensa que acabou?
- Veja a documentação que foi preparada com todo carinho para aprender ainda mais sobre nosso BackEnd!
- Link documentação: [Clique aqui!](https://documenter.getpostman.com/view/43171648/2sB2qZENTN)
- Agora sim chegamos ao final, parabéns por sua evolução! 🚀
