import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Message
from users.models import CustomUser
import uuid

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.receiver_id = self.scope['url_route']['kwargs']['receiver_id']
        self.user = self.scope['user']

        
        ids = sorted([str(self.user.id), str(self.receiver_id)])
        self.room_name = "_".join(ids)
        self.room_group_name = f"chat_{self.room_name}"

        
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        
        receiver = await CustomUser.objects.aget(id=self.receiver_id)
        await Message.objects.acreate(sender=self.user, receiver=receiver, content=message)

       
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'sender': str(self.user.id),
            }
        )

    async def chat_message(self, event):
        message = event['message']
        sender = event['sender']

        await self.send(text_data=json.dumps({
            'message': message,
            'sender': sender
        }))
