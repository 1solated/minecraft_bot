#!/bin/bash
cd /home/ec2-user/minecraft_bot/
pm2 list
pm2 stop minecraft_bot
pm2 start npm --name minecraft_bot -- start