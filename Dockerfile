# ใช้ NodeJS เวอร์ชั่น LTS ที่เป็น Alpine (ขนาดเล็ก)
FROM node:lts-alpine

# กำหนด Working directory 
WORKDIR /app

# Copy package File
COPY package*.json ./

# ติดตั้ง Dependencies
RUN npm install

# Copy Code ทั้งหมด
COPY . .

# บอกให้ Docker รู้ว่า Container จะใช้งาน Port 5173
EXPOSE 5173

# คำสั่งสำหรับ Development Server ของ Vite
CMD [ "npm","run","dev" ]