import graphene
from graphene_django import DjangoObjectType
from TODO.models import TODO, Project
from userapp.models import User

# class Query(graphene.ObjectType):
#     hello = graphene.String(default_value='Hi!')


class TODOType(DjangoObjectType):
    class Meta:
        model = TODO
        fields = (
            "id",
            "text",
            "project",
            "user",
            "is_active",
        )


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = "__all__"


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = (
            "username",
            "first_name",
            "last_name",
            "email",
        )  #'is_stuff', 'is_active'


class TODOMutaion(graphene.Mutation):
    class Arguments:
        text = graphene.String()
        is_active = graphene.Boolean(required=True)
        id = graphene.ID()

    todo = graphene.Field(TODOType)

    @classmethod
    def mutate(cls, root, info, is_active, id, text=None):
        todo = TODO.objects.get(id=id)
        if text:
            todo.text = text
        todo.is_active = is_active
        todo.save()
        return TODOMutaion(todo=todo)


class Mutation(graphene.ObjectType):
    update_todo = TODOMutaion.Field()


class Query(graphene.ObjectType):
    all_todo = graphene.List(TODOType)
    all_projects = graphene.List(ProjectType)
    all_users = graphene.List(UserType)
    project_by_id = graphene.Field(ProjectType, id=graphene.ID(required=True))
    todo_by_project_name = graphene.List(TODOType, name=graphene.String(required=False))
    todo_by_username = graphene.List(TODOType, username=graphene.String(required=False))

    def resolve_all_todo(root, info):
        return TODO.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_users(root, info):
        return User.objects.all()

    def resolve_project_by_id(self, info, id=None):
        try:
            return Project.objects.get(id=id)
        except Project.DoesNotExist:
            return None

    def resolve_todo_by_project_name(self, info, name=None):
        todo = TODO.objects.all()
        return todo.filter(project__name=name) if name else todo

    def resolve_todo_by_username(self, info, username=None):
        todo = TODO.objects.all()
        return todo.filter(user__username=username) if username else todo


schema = graphene.Schema(query=Query, mutation=Mutation)
